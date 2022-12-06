import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import { productImage } from "../../CartPage/CartItem/constants";
const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
  }, []);
  const products = useSelector((state) => state.product.products);

  return (
    <Card
      headerRight={
        <MaterialButton
          title={"VIEW ALL"}
          style={{
            width: "96px",
          }}
          bgColor="#2874f0"
          fontSize="12px"
        />
      }
      style={{
        width: "calc(100% - 40px)",
        margin: "20px",
      }}
    >
      <div style={{ display: "flex" }}>
        {products.map((product) => (
          <Link
            to={`/${product._id}`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "#000",
            }}
            className="productContainer"
          >
            <div className="productImgContainer">
              <img src={productImage} alt="" />
            </div>
            <div className="productInfo">
              <div style={{ margin: "10px 0" }}>{product.libelle}</div>
              <div>
                <Rating
                  value={
                    product.is_gift ? (
                      <>is gifted &nbsp;&nbsp; </>
                    ) : (
                      <span style={{ color: "black" }}>not gifted</span>
                    )
                  }
                />
              </div>
              <br />
              <span
                style={{
                  color: "#777",
                  fontWeight: "500",
                  fontSize: "12px",
                  marginTop: "6px",
                }}
              >
                {product.en_stock ? (
                  <div style={{ color: "#388E3C" }}>in stock</div>
                ) : (
                  <div>out of stock</div>
                )}
              </span>
              <Price value={product.prix_ttc} />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default ProductStore;
