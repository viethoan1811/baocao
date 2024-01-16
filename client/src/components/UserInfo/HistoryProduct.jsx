import React, { useEffect, useState } from "react";
import * as HistoryOrderService from "../../services/HistoryOrderService";
import { formatPrice } from "../../utils/helpers";

function HistoryProduct(props) {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const historyData = await HistoryOrderService.getDetailOrder(id);
        setData(historyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(true);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-semibold border-b-2 border-[#D52C2C] space-x-3">
          <span>Lịch sử mua hàng</span>
          <span>-</span>
          <span>{data.orderCode}</span>
        </h1>

        <div className="cat-products-content">
          <div className="product-lists-history grid bg-whitesmoke my-3 ">
            {loading && data.data?.map((item) => (
              <a className="block" href="/product/undefined">
                <div className="product-history bg-white mb-3">
                  <div className="category">Điện thoại</div>
                  <div className="product-item-img">
                    <img
                      className="img-cover"
                      src={item.idProduct.imgUrl[0]}
                      alt={item.idProduct.name}
                    />
                  </div>
                  <div className="product-history-info fs-14">
                    <div className="brand">
                      <span>Brand: </span>
                      <span className="fw-7">{item.idProduct.brand}</span>
                    </div>
                    <div className="title py-2">{item.idProduct.name}</div>
                    <div className="price flex align-center justify-center">
                      <span className="new-price">${formatPrice(item.price)}</span>
                      <span className="discount fw-6">x{item.quantity}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryProduct;
