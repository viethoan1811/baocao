import React, { useEffect, useState } from "react";
import "./ProductSinglePage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../../store/productSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/helpers";
import {
  addToCart,
  getCartMessageStatus,
  setCartMessageOff,
  setCartMessageOn,
} from "../../store/cartSlice";
import CartMessage from "../../components/CartMessage/CartMessage";

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const history = useNavigate();

  // getting single product
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));

    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus, id]);

  let discountedPrice = product?.price * 0.9;
  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product) => {
    let discountedPrice = product?.price * 0.9;
    let totalPrice = quantity * discountedPrice;
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice,
        price: discountedPrice,
      })
    );
    dispatch(setCartMessageOn(true));
  };
  const addToCartHandlerNew = (product) => {
    let discountedPrice = product?.price * 0.9;
    let totalPrice = quantity * discountedPrice;
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice,
        price: discountedPrice,
      })
    );
    // dispatch(setCartMessageOn(true));
    history("/cart");
  };
  return (
    <main className="py-5 bg-whitesmoke">
      <div className="product-single">
        <div className="container">
          <div className="product-single-content bg-white grid">
            <div className="product-single-l">
              <div className="product-img">
                <div className="product-img-zoom">
                  <img
                    src={
                      product ? (product.imgUrl ? product.imgUrl[0] : "") : ""
                    }
                    alt=""
                    className="img-cover"
                  />
                </div>

                <div className="product-img-thumbs flex align-center my-2">
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.imgUrl ? product.imgUrl[0] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.imgUrl ? product.imgUrl[0] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.imgUrl ? product.imgUrl[0] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.imgUrl ? product.imgUrl[0] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="product-single-r">
              <div className="product-details font-manrope">
                <div className="title fs-20 fw-5">{product?.title}</div>
                <div>
                  <p className="para fw-3 fs-15">{product?.description}</p>
                </div>
                <div className="info flex align-center flex-wrap fs-14">
                  <div className="brand">
                    <span className="text-orange fw-5">Danh mục:</span>
                    <span className="mx-1 text-capitalize">
                      {product?.category ? product.name.replace("-", " ") : ""}
                    </span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-orange fw-5">Hãng:</span>
                    <span className="mx-1">{product?.brand}</span>
                  </div>
                </div>

                <div className="price">
                  <div className="flex align-center">
                    <div className="old-price text-gray">
                      {formatPrice(product?.price)}
                    </div>
                    <span className="fs-14 mx-2 text-dark">Bao gồm cả VAT</span>
                  </div>

                  <div className="flex align-center my-1">
                    <div className="new-price fw-5 font-poppins fs-24 text-orange">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="discount bg-orange fs-13 text-white fw-6 font-poppins">
                      {/*{formatPrice(product?.price)}% OFF*/}
                      10% OFF
                    </div>
                  </div>
                </div>

                <div className="qty flex align-center my-4">
                  <div className="qty-text">Số lượng:</div>
                  <div className="qty-change flex align-center mx-3">
                    <button
                      type="button"
                      className="qty-decrease flex align-center justify-center"
                      onClick={() => decreaseQty()}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="qty-value flex align-center justify-center">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      className="qty-increase flex align-center justify-center"
                      onClick={() => increaseQty()}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  {product?.stock === 0 ? (
                    <div className="qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5">
                      out of stock
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="btns">
                  <button
                    type="button"
                    className="add-to-cart-btn btn"
                    style={{ width: "210px" }}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span
                      className="btn-text mx-2"
                      onClick={() => {
                        addToCartHandler(product);
                      }}
                    >
                      Thêm vào giỏ hàng
                    </span>
                  </button>
                  <button
                    type="button"
                    className="buy-now btn mx-3"
                    style={{ width: "210px" }}
                    onClick={() => {
                      addToCartHandlerNew(product);
                    }}
                  >
                    <span className="btn-text">Mua ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && (
        <CartMessage text="Sản phẩm đã được thêm vào giỏ hàng của bạn." status={false} />
      )}
    </main>
  );
};

export default ProductSinglePage;
