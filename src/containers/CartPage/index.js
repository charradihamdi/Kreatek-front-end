import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import PriceDetails from "../../components/PriceDetails";

import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";

const CartPage = (props) => {
  const giftValue = 100; //static value
  const [gitsSelected, setGiftsSelected] = useState(0);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    cartItems[_id].price = products.productDetails.prix_ttc;
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };
  console.log(auth.user.remise_defaut);
  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={`My Cart`}
          headerRight={
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "col",
                  border: "1 px solid grey",
                }}
              >
                <label style={{ color: "#2874F0" }}>
                  Total gifts Amount:
                  {auth.user.nbr_gifts * giftValue}DT
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "col",
                  border: "1 px solid grey",
                }}
              >
                <div>
                  {
                    <input
                      type="range"
                      min="0"
                      max={auth.user.nbr_gifts}
                      value={gitsSelected}
                      onChange={(e) => {
                        setGiftsSelected(e.target.value);
                      }}
                    />
                  }
                </div>
                <label style={{ color: "#2874F0" }}>
                  ({gitsSelected}gift used)
                </label>
              </div>
            </>
          }
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
          ))}

          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          ></div>
        </Card>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            products.products.map((item) => {
              if (key === item._id) cart.cartItems[key].price = item.prix_ttc;
            });
            return totalPrice + price * qty;
          }, 0)}
          totalPriceAfterReuction={Object.keys(cart.cartItems).reduce(
            (totalPrice, key) => {
              const { price, qty } = cart.cartItems[key];
              products.products.map((item) => {
                if (key === item._id) {
                  cart.cartItems[key].price = item.prix_ttc;
                  totalPrice = item.is_gift
                    ? totalPrice + price * qty * 0.3
                    : totalPrice + price * qty - auth.user.remise_defaut;
                  if (
                    !item.is_gift &&
                    gitsSelected * giftValue < totalPrice &&
                    cart.cartItems.length == 4
                  ) {
                    //try
                    cart.cartItems[5].price =
                      cart.cartItems[5].price * 0.1 * 0.7 +
                      (cart.cartItems[5].price * 0.9 - auth.user.remise_defaut);
                  }
                }
              });
              return totalPrice;
            },
            0
          )}
        />
      </div>
    </Layout>
  );
};

export default CartPage;
