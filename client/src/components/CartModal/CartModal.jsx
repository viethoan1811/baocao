import React from "react";
import "./CartModal.scss";
import { shopping_cart } from "../../utils/images";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";

const CartModal = ({ carts }) => {
  return (
    <div className="cart-modal">
      <h5 className="cart-modal-title fw-5 fs-15 font-manrope text-center">
        Sản phẩm được thêm gần đây
      </h5>
      {carts?.length > 0 ? (
        <div className="cart-modal-list grid">
          {carts.map((cart) => {
            return (
              <div
                className="cart-modal-item grid align-center font-manrope py-2"
                key={cart.id}
              >
                <div className="cart-modal-item-img">
                  <img src={cart?.imgUrl[0]} alt="" className="img-cover" />
                </div>
                <div className="cart-modal-item-title fs-13 font-manrope text-capitalize">
                  {cart?.description}
                </div>
                <div className="cart-modal-item-price text-orange fs-14 fw-6">
                  {formatPrice(cart?.price)}
                </div>
              </div>
            );
          })}

          <div className="text-capitalize view-cart-btn bg-orange fs-15 font-manrope text-center">
            <Link to="/cart">xem giỏ hàng của tôi</Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-column align-center justify-center cart-modal-empty">
          <img src={shopping_cart} alt="" className="" />
          <h6 className="text-dark fw-4">Chưa có sản phẩm nào</h6>
        </div>
      )}
    </div>
  );
};

export default CartModal;
