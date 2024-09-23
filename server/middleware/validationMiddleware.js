import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Product from "../models/ProductModel.js";
import News from "../models/NewsModel.js";
import User from "../models/UserModel.js";
import {
  PRODUCT_CATEGORY,
  PRODUCT_TYPE,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  VALIDATION_PATTERNS,
  SCHEMA_CONSTRAINTS,
  ERROR_MESSAGES,
  languageOptions,
  allowedUpdateFields,
  ALLOWED_UPDATE_FIELDS,
  userStatusOptions,
  USER_STATUSES,
} from "../utils/constants.js";
import { isAdult, parseAndValidateDate, isChild } from "../utils/dateUtils.js";

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
  body("firstName")
    .optional()
    .notEmpty()
    .withMessage(ERROR_MESSAGES.FIRST_NAME_REQUIRED)
    .isLength({ min: SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH })
    .withMessage(ERROR_MESSAGES.NAME_TOO_SHORT("First name"))
    .isLength({ max: SCHEMA_CONSTRAINTS.NAME.MAX_LENGTH })
    .withMessage(ERROR_MESSAGES.NAME_TOO_LONG("First name")),

  body("lastName")
    .optional()
    .notEmpty()
    .withMessage(ERROR_MESSAGES.LAST_NAME_REQUIRED)
    .isLength({ min: SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH })
    .withMessage(ERROR_MESSAGES.NAME_TOO_SHORT("Last name"))
    .isLength({ max: SCHEMA_CONSTRAINTS.NAME.MAX_LENGTH })
    .withMessage(ERROR_MESSAGES.NAME_TOO_LONG("Last name")),
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

export const validateUpdateUserInput = withValidationErrors([
  body().custom((body) => {
    const bodyKeys = Object.keys(body);
    const isValid = bodyKeys.every((key) => allowedUpdateFields.includes(key));
    if (!isValid) {
      throw new Error(ERROR_MESSAGES.INVALID_UPDATE_FIELDS);
    }
    return true;
  }),

  body(ALLOWED_UPDATE_FIELDS.FIRST_NAME)
    .optional()
    .notEmpty()
    .withMessage(ERROR_MESSAGES.FIRST_NAME_REQUIRED)
    .isLength({
      min: SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH,
      max: SCHEMA_CONSTRAINTS.NAME.MAX_LENGTH,
    })
    .withMessage((value, { path }) =>
      value.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH
        ? ERROR_MESSAGES.NAME_TOO_SHORT(path)
        : ERROR_MESSAGES.NAME_TOO_LONG(path)
    ),

  body(ALLOWED_UPDATE_FIELDS.LAST_NAME)
    .optional()
    .notEmpty()
    .withMessage(ERROR_MESSAGES.LAST_NAME_REQUIRED)
    .isLength({
      min: SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH,
      max: SCHEMA_CONSTRAINTS.NAME.MAX_LENGTH,
    })
    .withMessage((value, { path }) =>
      value.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH
        ? ERROR_MESSAGES.NAME_TOO_SHORT(path)
        : ERROR_MESSAGES.NAME_TOO_LONG(path)
    ),

  body(ALLOWED_UPDATE_FIELDS.DOB)
    .optional()
    .custom((dob) => {
      if (!dob || dob === "") return true;
      const date = parseAndValidateDate(dob);
      if (!isAdult(date)) {
        throw new Error(ERROR_MESSAGES.ADULT_AGE_REQUIRED);
      }
      return true;
    }),

  body(ALLOWED_UPDATE_FIELDS.PHONE)
    .optional()
    .matches(VALIDATION_PATTERNS.PHONE)
    .withMessage(ERROR_MESSAGES.INVALID_PHONE_FORMAT),

  body(ALLOWED_UPDATE_FIELDS.EMAIL)
    .optional()
    .isEmail()
    .withMessage(ERROR_MESSAGES.INVALID_EMAIL_FORMAT)
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user.userId.toString() !== req.user.userId.toString()) {
        throw new Error(ERROR_MESSAGES.EMAIL_EXISTS);
      }
    }),

  body(ALLOWED_UPDATE_FIELDS.ADDRESS)
    .optional()
    .custom((address) => {
      if (!address) return true;

      const errors = [];

      if (
        address.streetAddress &&
        address.streetAddress.length <
          SCHEMA_CONSTRAINTS.STREET_ADDRESS.MIN_LENGTH
      ) {
        errors.push(ERROR_MESSAGES.STREET_ADDRESS_TOO_SHORT);
      }
      if (
        address.city &&
        address.city.length < SCHEMA_CONSTRAINTS.CITY.MIN_LENGTH
      ) {
        errors.push(ERROR_MESSAGES.CITY_TOO_SHORT);
      }
      if (address.province === "") {
        errors.push(ERROR_MESSAGES.PROVINCE_REQUIRED);
      }
      if (address.postalCode) {
        const postalCodeRegex = VALIDATION_PATTERNS.POSTAL_CODE;
        if (!postalCodeRegex.test(address.postalCode)) {
          errors.push(ERROR_MESSAGES.INVALID_POSTAL_CODE);
        }
      }

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      return true;
    }),

  body(ALLOWED_UPDATE_FIELDS.KIDS)
    .optional()
    .custom((kids) => {
      if (!kids || !Array.isArray(kids)) return true;

      const errors = [];

      kids.forEach((kid, index) => {
        if (
          kid.firstName &&
          kid.firstName.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH
        ) {
          errors.push(
            ERROR_MESSAGES.CHILD_NAME_TOO_SHORT(index + 1, "first name")
          );
        }
        if (
          kid.lastName &&
          kid.lastName.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH
        ) {
          errors.push(
            ERROR_MESSAGES.CHILD_NAME_TOO_SHORT(index + 1, "last name")
          );
        }
        if (kid.dob && !isChild(parseAndValidateDate(kid.dob))) {
          errors.push(ERROR_MESSAGES.INVALID_CHILD_DOB(index + 1));
        }
      });

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      return true;
    }),

  body(ALLOWED_UPDATE_FIELDS.LANGUAGE)
    .optional()
    .isIn(languageOptions)
    .withMessage(ERROR_MESSAGES.INVALID_LANGUAGE),

  body(ALLOWED_UPDATE_FIELDS.PASSWORD)
    .optional()
    .isObject()
    .withMessage(ERROR_MESSAGES.PASSWORD_OBJECT_REQUIRED)
    .custom((passwordObj) => {
      const { currentPassword, password, passwordConfirmation } = passwordObj;

      if (!currentPassword || !password || !passwordConfirmation) {
        throw new Error(ERROR_MESSAGES.PASSWORD_FIELDS_REQUIRED);
      }

      if (password !== passwordConfirmation) {
        throw new Error(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
      }

      const passwordRegex = VALIDATION_PATTERNS.PASSWORD;
      if (!passwordRegex.test(password)) {
        throw new Error(ERROR_MESSAGES.INVALID_PASSWORD_FORMAT);
      }

      return true;
    }),

  body(ALLOWED_UPDATE_FIELDS.STATUS)
    .optional()
    .isIn(userStatusOptions)
    .withMessage(ERROR_MESSAGES.INVALID_STATUS),
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
      if (user.status !== USER_STATUSES.DELETED) {
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
