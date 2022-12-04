import React, { useState } from "react";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productImage } from "./constants";
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
          <img src={productImage} alt={""} />
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
