import { body, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import {
  PRODUCT_CATEGORY,
  PRODUCT_TYPE,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
} from "../utils/constants.js";
import Product from "../models/ProductModel.js";
import News from "../models/NewsModel.js";
import User from "../models/UserModel.js";
import { param } from "express-validator";
import { isAdult, parseAndValidateDate, isChild } from "../utils/dateUtils.js";
import { languageOptions } from "../utils/constants.js";

// Constants
const MIN_DESCRIPTION_LENGTH = 5;
const MAX_DESCRIPTION_LENGTH = 350;
const MIN_IMAGES = 1;
const MIN_VARIANTS = 1;
const MAX_PRICE = 1000;
const MAX_STOCK = 10000;

// News
const MIN_TITLE_LENGTH = 5;
const MAX_TITLE_LENGTH = 150;
const MIN_ABSTRACT_LENGTH = 5;
const MAX_ABSTRACT_LENGTH = 350;
const MIN_CONTENT_LENGTH = 20;

const validateVariant = (variant) => {
  const errors = [];

  if (!PRODUCT_COLORS.hasOwnProperty(variant.color.toUpperCase())) {
    errors.push(`Invalid color: ${variant.color}`);
  }
  // if (!PRODUCT_SIZES.hasOwnProperty(variant.size.toUpperCase())) {
  //   errors.push(`Invalid size: ${variant.size}`);
  // }
  if (!Object.values(PRODUCT_SIZES).includes(variant.size)) {
    errors.push(`Invalid size: ${variant.size}\n`);
  }
  if (typeof variant.price !== "number" || variant.price < 0) {
    errors.push(
      `Invalid price for ${variant.color} ${variant.size}: ${variant.price}`
    );
  }
  if (!Number.isInteger(variant.stockQuantity) || variant.stockQuantity < 0) {
    errors.push(
      `Invalid stock quantity for ${variant.color} ${variant.size}: ${variant.stockQuantity}`
    );
  }

  return errors;
};

const validateVariants = (variants) => {
  const errors = [];
  const seenCombinations = {};

  variants.forEach((variant) => {
    const variantErrors = validateVariant(variant);
    errors.push(...variantErrors);

    const combinationKey = `${variant.color.toUpperCase()}-${variant.size.toUpperCase()}`;
    if (seenCombinations[combinationKey]) {
      errors.push(
        `Duplicate combination of color '${variant.color}' and size '${variant.size}'`
      );
    }
    seenCombinations[combinationKey] = true;
  });

  if (errors.length > 0) {
    throw new Error(errors.join(". "));
  }

  return true;
};

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (
          errorMessages[0].startsWith("No product") ||
          errorMessages[0].startsWith("User not")
        ) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateProductInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .trim()
    .escape(),
  body("category")
    .isIn(Object.values(PRODUCT_CATEGORY))
    .withMessage("Invalid product category"),
  body("type")
    .isIn(Object.values(PRODUCT_TYPE))
    .withMessage("Invalid product type"),
  body("description")
    .isLength({ min: MIN_DESCRIPTION_LENGTH, max: MAX_DESCRIPTION_LENGTH })
    .withMessage(
      `Description must be between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} characters long`
    )
    .trim()
    .escape(),
  body("images")
    .isArray({ min: MIN_IMAGES })
    .withMessage(`At least ${MIN_IMAGES} image is required`)
    .custom((images) => {
      images.forEach((image) => {
        if (typeof image !== "string" || image.trim() === "") {
          throw new Error("Each image must be a non-empty string");
        }
      });
      return true;
    }),
  body("variants")
    .isArray({ min: MIN_VARIANTS })
    .withMessage(`At least ${MIN_VARIANTS} variant is required`)
    .custom(validateVariants),
]);

// export const validateProductIdParam = withValidationErrors([
//   param("productId").custom(async (value) => {
//     const productId = Number(value);
//     if (!Number.isInteger(productId))
//       throw new BadRequestError("Invalid product ID, must be a whole number");

//     const product = await Product.findOne({ productId });
//     if (!product)
//       throw new NotFoundError(`No product with product ID : ${productId}`);
//   }),
// ]);

export const validateNewsInput = withValidationErrors([
  body("date")
    .isISO8601()
    .withMessage("Invalid date format. Use ISO 8601 format.")
    .toDate(),
  body("title")
    .isLength({ min: MIN_TITLE_LENGTH, max: MAX_TITLE_LENGTH })
    .withMessage(
      `Title must be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} characters long`
    )
    .trim()
    .escape(),
  body("abstract")
    .optional()
    .isLength({ min: MIN_ABSTRACT_LENGTH, max: MAX_ABSTRACT_LENGTH })
    .withMessage(
      `Abstract must be between ${MIN_ABSTRACT_LENGTH} and ${MAX_ABSTRACT_LENGTH} characters long`
    )
    .trim()
    .escape(),
  body("content")
    .isLength({ min: MIN_CONTENT_LENGTH })
    .withMessage(
      `Content must be at least ${MIN_CONTENT_LENGTH} characters long`
    )
    .trim()
    .escape(),
  body("images")
    .isArray({ min: MIN_IMAGES })
    .withMessage(`At least ${MIN_IMAGES} image is required`)
    .custom((images) => {
      images.forEach((image) => {
        if (typeof image !== "string" || image.trim() === "") {
          throw new Error("Each image must be a non-empty string");
        }
      });
      return true;
    }),
]);

export const validateRegisterInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("First name is required\n"),
  body("lastName").notEmpty().withMessage("Last name is required\n"),
  body("dob")
    // .notEmpty()
    .optional()
    .custom((dob) => {
      if (!dob || !dob === "") return true;
      const date = parseAndValidateDate(dob);
      if (!isAdult(date)) {
        throw new Error("You must be at least 18 years old\n");
      }
      return true;
    }),
  body("phone")
    .optional()
    .matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/)
    .withMessage(
      "Phone number must be valid and in the format (123) 456-7890\n"
    ),
  body("email")
    .notEmpty()
    .withMessage("Email is required\n")
    .isEmail()
    .withMessage("Invalid email format\n")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists\n");
      }
    }),
  body("agreeWithDataCollection")
    .notEmpty()
    .withMessage("You must agree with data collection\n"),
  body("password")
    .notEmpty()
    .withMessage("Password is required\n")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long\n")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character\n"
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password\n")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match\n");
      }
      return true;
    }),
]);

// export const validateUpdateUserInput = withValidationErrors([
//   body("firstName").notEmpty().withMessage("First name is required"),

//   body("lastName").notEmpty().withMessage("Last name is required"),

//   body("dob")
//     .optional()
//     .custom((dob) => {
//       if (!dob || !dob === "") return true;
//       const date = parseAndValidateDate(dob);
//       if (!isAdult(date)) {
//         throw new Error("You must be at least 18 years old\n");
//       }
//       return true;
//     }),

//   body("phone")
//     .optional()
//     .matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/)
//     .withMessage("Phone number must be valid and in the format (123) 456-7890"),

//   body("email")
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Invalid email format")
//     .custom(async (email, { req }) => {
//       const user = await User.findOne({ email });
//       if (user && user.userId.toString() !== req.user.userId.toString()) {
//         throw new Error("email already exists");
//       }
//     }),

//   body("address")
//     .optional()
//     .custom((address) => {
//       if (
//         !address ||
//         (!address.streetAddress &&
//           !address.city &&
//           !address.province &&
//           !address.postalCode)
//       ) {
//         return true;
//       }

//       if (address.streetAddress && address.streetAddress.length < 5) {
//         throw new Error("Street address must be at least 5 characters long");
//       }
//       if (address.city && address.city.length < 3) {
//         throw new Error("City must be at least 3 characters long");
//       }
//       if (address.province === undefined || address.province === "") {
//         throw new Error("Province is required");
//       }
//       if (address.postalCode) {
//         const postalCodeRegex =
//           /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
//         if (!postalCodeRegex.test(address.postalCode)) {
//           throw new Error("Postal code is not valid");
//         }
//       } else {
//         throw new Error("Postal code is required");
//       }

//       return true;
//     }),

//   body("kids")
//     .optional()
//     .custom((kids) => {
//       if (!kids || !Array.isArray(kids)) return true;
//       kids.forEach((kid) => {
//         if (
//           !kid.firstName ||
//           kid.firstName.length < 3 ||
//           !kid.lastName ||
//           kid.lastName.length < 3
//         ) {
//           throw new Error(
//             "Child's first and last name must be at least 2 characters long"
//           );
//         }
//         if (!kid.dob || !isChild(parseAndValidateDate(kid.dob))) {
//           throw new Error("Child's date of birth is invalid");
//         }
//       });
//       return true;
//     }),
// ]);

export const validateUpdateUserInput = withValidationErrors([
  body("firstName").optional().notEmpty().withMessage("First name is required"),

  body("lastName").optional().notEmpty().withMessage("Last name is required"),

  body("dob")
    .optional()
    .custom((dob) => {
      if (!dob || dob === "") return true;
      const date = parseAndValidateDate(dob);
      if (!isAdult(date)) {
        throw new Error("You must be at least 18 years old\n");
      }
      return true;
    }),

  body("phone")
    .optional()
    .matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/)
    .withMessage("Phone number must be valid and in the format (123) 456-7890"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user.userId.toString() !== req.user.userId.toString()) {
        throw new Error("Email already exists");
      }
    }),

  body("address")
    .optional()
    .custom((address) => {
      if (!address) return true;

      const errors = [];

      if (address.streetAddress && address.streetAddress.length < 5) {
        errors.push("Street address must be at least 5 characters long");
      }
      if (address.city && address.city.length < 3) {
        errors.push("City must be at least 3 characters long");
      }
      if (address.province === "") {
        errors.push("Province is required");
      }
      if (address.postalCode) {
        const postalCodeRegex =
          /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
        if (!postalCodeRegex.test(address.postalCode)) {
          errors.push("Postal code is not valid");
        }
      }

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      return true;
    }),

  body("kids")
    .optional()
    .custom((kids) => {
      if (!kids || !Array.isArray(kids)) return true;

      const errors = [];

      kids.forEach((kid, index) => {
        if (kid.firstName && kid.firstName.length < 2) {
          errors.push(
            `Child ${index + 1}'s first name must be at least 2 characters long`
          );
        }
        if (kid.lastName && kid.lastName.length < 2) {
          errors.push(
            `Child ${index + 1}'s last name must be at least 2 characters long`
          );
        }
        if (kid.dob && !isChild(parseAndValidateDate(kid.dob))) {
          errors.push(`Child ${index + 1}'s date of birth is invalid`);
        }
      });

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      return true;
    }),

  body("language")
    .notEmpty()
    .withMessage("Language is required")
    .isIn(languageOptions)
    .withMessage("Invalid language option"),

  body("password")
    .optional()
    .isObject()
    .withMessage("Password must be an object")
    .custom((passwordObj) => {
      const { currentPassword, password, passwordConfirmation } = passwordObj;

      if (!currentPassword || !password || !passwordConfirmation) {
        throw new Error(
          "Current password, new password, and password confirmation are required"
        );
      }

      if (password !== passwordConfirmation) {
        throw new Error("Passwords do not match\n");
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/;
      if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }

      return true;
    }),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateRestoreAccountInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required\n")
    .isEmail()
    .withMessage("Invalid email format\n")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new BadRequestError("No account found with this email address\n");
      }
      if (user.status === "Active") {
        throw new BadRequestError(
          "This account is already active and doesn't need restoration\n"
        );
      }
      if (user.status !== "Deleted") {
        throw new BadRequestError(
          "This account cannot be restored. Please contact support for assistance\n"
        );
      }
    }),
]);

export const validateIdParam = (paramName, modelName, Model) =>
  withValidationErrors([
    param(paramName)
      .isInt({ min: 1 })
      .withMessage(`Invalid ${modelName} ID. Must be a positive integer.`)
      .custom(async (value) => {
        const id = Number(value);
        const document = await Model.findOne({ [`${modelName}Id`]: id });
        if (!document) {
          throw new NotFoundError(`No ${modelName} found with ID: ${id}`);
        }
      }),
  ]);
