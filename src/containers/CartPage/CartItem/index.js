import React, { useState } from "react";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const products = useSelector((state) => state.product);
  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img
            src={
              "data:image/jpeg;base64,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"
            }
            alt={""}
          />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>
              DT.{" "}
              {products.products.map((item) => {
                if (_id === item._id) return <div>{item.prix_ttc * qty}</div>;
              })}
            </p>
            <p>
              {products.products.map((item) => {
                if (_id === item._id)
                  return (
                    <div>
                      {item.is_gift ? (
                        <div style={{ color: "green" }}>is gifted</div>
                      ) : (
                        <div style={{ color: "red" }}>not gifted</div>
                      )}
                    </div>
                  );
              })}
            </p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
