import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import * as OrderService from "../../Services/OrderSevice";
import { error } from "jquery";
import DetailOrder from "../DetailOrder/DetailOrder";
const ShowOrder = (props) => {
  const { code } = props;
  //   const orderList = useSelector((state) => state.orderList);
  //   const { loading, error, orders } = orderList;
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [tempData, setTempData] = useState([]);
  const [search, SetSearch] = useState("");

  const hangldeGetAll = async () => {
    setLoading(true);
    const access_token = localStorage.getItem("access_token");
    await OrderService.getOrderDetailByCode(code)
      .then((res) => {
        setLoading(false);
        setTempData(res);
      })
      .catch((error) => {
        setError(error);
      });
  };
  useEffect(() => {
    if (search === "") {
      hangldeGetAll();
    } else {
      const result = tempData.filter((product) => {
        const values = Object.values(product).join().toLowerCase();
        return values.includes(search.toLowerCase());
      });
      setTempData(result);
    }
  }, [search]);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Chi tiết đơn đặt hàng</h2>
        </div>
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <DetailOrder data={tempData} search={search} code={code} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowOrder;
