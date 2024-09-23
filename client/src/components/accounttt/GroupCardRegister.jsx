import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAccountContext } from "../../pages/Account/AccountLayout";

const GroupCardRegister = ({
  id,
  name,
  minAge,
  maxAge,
  decription,
  startDate,
  endDate,
  schedule,
  tuition,
}) => {
  // TODO update CartContext/updateQuantity/both
  const { dispatch } = useContext(CartContext);
  const { user } = useAccountContext();

  const updateQuantity = (newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: cartItem.id,
        // TODO adjust by kids age
        quantity: Math.max(0, Math.min(newQuantity, user.kids.length)),
      },
    });
  };

  return (
    <div className="group-card">
      {/* TODO checkbox */}
      <div className="class-column">
        <h5 className="name">
          {name} ({minAge}-{maxAge} years old)
        </h5>
        <p className="b2 desc">{decription}</p>
      </div>
      <div className="days-column">
        <p className="b2 days">{schedule}</p>
        <p className="b2 dates">
          {startDate} - {endDate}
        </p>
      </div>
      <p className="b2 tuition">{tuition}</p>
      <div className="quantity-selector">
        <button
          onClick={() => updateQuantity(cartItem.quantity - 1)}
          disabled={cartItem.quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={cartItem.quantity}
          onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
          min={1}
          max={variant.stockQuantity}
          className="b3"
        />
        <button
          onClick={() => updateQuantity(cartItem.quantity + 1)}
          disabled={cartItem.quantity >= variant.stockQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default GroupCardRegister;
