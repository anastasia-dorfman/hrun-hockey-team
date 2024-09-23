import { useState, useRef, useMemo, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import customFetch from "../utils/customFetch";
import { PRODUCT_COLORS } from "../utils/clientConstants";
import Breadcrumb from "../components/shared/Breadcrumb";
import showToast from "../components/shared/CustomToast";
import Wrapper from "../assets/wrappers/ProductDetail";
import { shouldUseMockData } from "../utils/environment";
import { mockProducts, mockProduct } from "../data/mockData.js";

export const loader = async ({ params }) => {
  const productId = params.id;

  try {
    if (shouldUseMockData) {
      return {
        data: {
          product:
            mockProducts.find((p) => p.productId.toString() === productId) ||
            mockProduct,
        },
      };
    }

    const { data } = await customFetch.get(`/products/${productId}`);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { error };
  }
};

const ProductDetail = () => {
  const { cart, dispatch } = useContext(CartContext);

  const sizeOrder = [
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "XXX-Large",
  ];
  const { data, error } = useLoaderData();
  const product = data.product || null;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedSection, setSelectedSection] = useState("productDetails");
  const isHorizontalScroll = windowWidth <= 1024;
  const isColorsSizesDropdown = windowWidth <= 992 && windowWidth > 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const processedProduct = useMemo(() => {
    if (!product) return null;

    const colors = [...new Set(product.variants.map((v) => v.color))].sort();
    const sizes = [...new Set(product.variants.map((v) => v.size))].sort(
      (a, b) => {
        return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
      }
    );

    const getPrice = (color, size) => {
      const variant = product.variants.find(
        (v) => v.color === color && v.size === size
      );
      return variant ? variant.price : null;
    };

    const getInStock = (color, size) => {
      const variant = product.variants.find(
        (v) => v.color === color && v.size === size
      );
      return variant ? variant.stockQuantity : 0;
    };

    return {
      ...product,
      colors,
      sizes,
      getPrice,
      getInStock,
    };
  }, [product]);

  const [selectedColor, setSelectedColor] = useState(
    processedProduct.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState(processedProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const imagesContainerRef = useRef(null);

  useEffect(() => {
    setQuantity(1);
  }, [selectedColor, selectedSize]);

  const inStock =
    selectedColor && selectedSize
      ? processedProduct.getInStock(selectedColor, selectedSize)
      : 0;
  const price =
    inStock > 0 ? processedProduct.getPrice(selectedColor, selectedSize) : null;

  const getColorValue = (colorName) => {
    const colorMap = {
      Black: "#000000",
      White: "#FFFFFF",
      Red: "#c23404",
      Blue: "#0a3683",
      Brown: "#53432c",
      Multicolor:
        "linear-gradient(to right, #c23404, #0a3683, #53432c, #009688, #e91e63)",
    };
    return colorMap[colorName] || colorName;
  };

  const isLightColor = (color) => {
    const hex = getColorValue(color).replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const getMaxQuantity = () => {
    const selectedVariant = product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );

    if (!selectedVariant) return 0;

    const itemInCart = cart.find(
      (item) =>
        item.productId === product.productId &&
        item.variant.color === selectedColor &&
        item.variant.size === selectedSize
    );

    const maxQuantity =
      selectedVariant.stockQuantity - (itemInCart?.quantity || 0);

    return Math.max(0, maxQuantity);
  };

  const maxQuantity = getMaxQuantity();

  const incrementQuantity = (e) => {
    e.preventDefault();
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };
  const decrementQuantity = (e) => {
    e.preventDefault();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleScroll = (direction) => {
    if (imagesContainerRef.current) {
      imagesContainerRef.current.scrollBy({
        left: isHorizontalScroll ? (direction === "up" ? -100 : 100) : 0,
        top: !isHorizontalScroll ? (direction === "up" ? -100 : 100) : 0,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color");
      return;
    }

    const selectedVariant = processedProduct.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    if (!selectedVariant) {
      toast.error("Selected variant not found");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: `${processedProduct.productId}-${selectedColor}-${selectedSize}`,
        productId: processedProduct.productId,
        name: processedProduct.name,
        variant: {
          color: selectedColor,
          size: selectedSize,
          price: selectedVariant.price,
          stockQuantity: selectedVariant.stockQuantity,
        },
        quantity: quantity,
        image: processedProduct.images[0],
      },
    });

    // toast.success("Added to cart successfully!");
    // showToast({
    //   type: "success",
    //   title: "Thank you for your order!",
    //   message: "A Confirmation has been sent to  your email.",
    //   linkText: "Go to home page",
    //   link: "/",
    // });
  };

  if (error) return <div>Error loading product: {error.message}</div>;
  if (!processedProduct) return <div>Loading...</div>;

  const breadcrumbLinks = [
    { address: "shop", linkText: "Shop" },
    {
      address: `shop?category=${processedProduct.category}`,
      linkText: `${processedProduct.category}`,
    },
    {
      address: `shop?category=${processedProduct.category}&type=${processedProduct.type}`,
      linkText: `${processedProduct.type}`,
    },
    { address: "", linkText: `${processedProduct.name}` },
  ];

  return (
    <Wrapper>
      <Breadcrumb links={breadcrumbLinks} />
      <h1>Our Products</h1>
      <div className="product-container">
        <div className="images-section">
          <div className="images-container-wrapper">
            <div className="images-container" ref={imagesContainerRef}>
              {processedProduct.images.map((img, index) => (
                <div key={index} className="image-preview-container">
                  <img
                    src={img}
                    alt=""
                    className={`image-preview ${
                      selectedImageIndex === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <img
            src={processedProduct.images[selectedImageIndex]}
            alt={processedProduct.name}
            className="chosen-image"
          />
        </div>
        <div className="details">
          <h2>
            {processedProduct.name} - {processedProduct.category}
          </h2>
          <h4>{price ? `${price} $CAD` : "Out of stock"}</h4>
          <p className="b2 product-description">
            {processedProduct.description}
          </p>
          <div className="colors">
            <p className="b3">Select Color</p>
            {isColorsSizesDropdown !== isColorsSizesDropdown ? (
              <select
                className="color-dropdown"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {processedProduct.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            ) : (
              <div className="colors-container">
                {processedProduct.colors.map((color) => (
                  <div
                    key={color}
                    className={`color-option ${
                      selectedColor === color ? "selected" : ""
                    } ${color === "Multicolor" ? "multi-color" : ""}`}
                    style={{ backgroundColor: getColorValue(color) }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <span
                        className="checkmark"
                        style={{
                          color: isLightColor(color) ? "black" : "white",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="sizes">
            <p className="b3">Select Size</p>
            {isColorsSizesDropdown !== isColorsSizesDropdown ? (
              <select
                className="size-dropdown"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {processedProduct.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            ) : (
              <div className="sizes-container">
                {processedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`btn-ocean b2 size ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="add-to-cart-section">
              <div className="left-side">
                <div className="quantity-selector">
                  <button onClick={decrementQuantity} disabled={!inStock}>
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    name="quantity"
                    onChange={(e) =>
                      setQuantity(
                        Math.min(
                          inStock,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    min={inStock > 0 ? 1 : 0}
                    max={inStock}
                    disabled={!inStock}
                    className="b3"
                  />
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= maxQuantity || !inStock}
                  >
                    +
                  </button>
                </div>
                <p
                  className={`b4 more-details ${
                    selectedSection === "shippingReturns" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSection("shippingReturns")}
                >
                  Shipping and returns
                </p>
              </div>
              <div className="right-side">
                <input
                  type="hidden"
                  name="selectedColor"
                  value={selectedColor || ""}
                />
                <input
                  type="hidden"
                  name="selectedSize"
                  value={selectedSize || ""}
                />
                <button
                  type="submit"
                  className="b2 selected long add-to-cart"
                  disabled={!inStock || maxQuantity === 0}
                >
                  Add to Cart
                </button>
                <p
                  className={`b4 more-details ${
                    selectedSection === "productDetails" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSection("productDetails")}
                >
                  Product details
                </p>
              </div>
            </div>
          </form>
          <div className="b2 details-info">
            {selectedSection === "productDetails"
              ? processedProduct.details || "No product details available."
              : selectedSection === "shippingReturns"
              ? "We offer free shipping on all orders over $100. For returns, please contact our customer service within 30 days of purchase. Items must be in original condition with tags attached."
              : ""}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductDetail;
