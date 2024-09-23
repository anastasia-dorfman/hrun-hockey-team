import React, { useContext, useEffect, useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { GoTag } from "react-icons/go";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import Wrapper from "../assets/wrappers/Cart";
import ProductDetailCard from "../components/ProductDetailCard";
import FormRow from "../components/shared/FormRow";
import { CartContext } from "../context/CartContext";
import customFetch from "../utils/customFetch";
import { shouldUseMockData } from "../utils/environment";
import { mockProducts } from "../data/mockData";

export const loader = async ({ request }) => {
  try {
    if (shouldUseMockData) {
      return {
        data: { products: mockProducts },
      };
    }
    const { data } = await customFetch.get("/products");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Cart = () => {
  const { data } = useLoaderData();
  const allProducts = data.products || [];
  const { cart, dispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // TODO add taxes
  const [formData, setFormData] = useState({
    promoCode: "",
    discount: 0,
    deliveryFee: 0,
  });

  useEffect(() => {
    const cartProductIds = [...new Set(cart.map((item) => item.productId))];
    const cartProducts = allProducts.filter((p) =>
      cartProductIds.includes(p.productId)
    );
    setProducts(cartProducts);
  }, [cart, allProducts]);

  const { subtotal, total } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => {
      const product = products.find((p) => p.productId === item.productId);
      const variant = product?.variants.find(
        (v) => v.color === item.variant.color && v.size === item.variant.size
      );
      return sum + (variant?.price || 0) * item.quantity;
    }, 0);

    formData.deliveryFee = subtotal > 0 ? 15 : 0;

    const discountAmount = (formData.discount / 100) * subtotal;
    const total = subtotal - discountAmount + formData.deliveryFee;
    return { subtotal, total };
  }, [cart, products, formData.discount, formData.deliveryFee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const applyPromoCode = () => {
    //TODO check promo code
    if (formData.promoCode) {
      setFormData((prevData) => ({
        ...prevData,
        discount: 10,
      }));
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Please enter a promo code");
    }
  };

  return (
    <Wrapper>
      <h1>Your Cart</h1>
      <div className="cart-wrapper">
        <div className="products-container">
          {cart.length === 0 ? (
            <h2 className="cart-empty-message">Your cart is empty</h2>
          ) : (
            cart.map((cartItem) => {
              const product = products.find(
                (p) => p.productId === cartItem.productId
              );
              return product ? (
                <ProductDetailCard
                  key={cartItem.id}
                  product={product}
                  cartItem={cartItem}
                />
              ) : null;
            })
          )}
        </div>

        <div className="form-section">
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Order Summary</h3>
            <div className="subtotal-section">
              <p className="b1">Subtotal</p>
              <h4>${subtotal.toFixed(2)}</h4>
            </div>
            <div className="discount-section">
              <p className="b1">
                Discount
                {formData.discount > 0 ? ` (-${formData.discount}%)` : ""}
              </p>
              <h4 className={`${formData.discount > 0 ? "red" : ""}`}>
                {formData.discount > 0 ? "-" : ""}$
                {((formData.discount / 100) * subtotal).toFixed(2)}
              </h4>
            </div>
            <div className="delivery-section">
              <p className="b1">Delivery Fee</p>
              <h4>${formData.deliveryFee.toFixed(2)}</h4>
            </div>
            <div className="total-section">
              <h3>Total</h3>
              <h3>${total.toFixed(2)}</h3>
            </div>
            <div className="promo-code-section">
              <FormRow
                type="text"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleInputChange}
                placeholder={
                  <>
                    <GoTag /> Add promo code
                  </>
                }
              />
              <button onClick={applyPromoCode}>Apply</button>
            </div>
            <button className="checkout-btn selected">Go to checkout</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
