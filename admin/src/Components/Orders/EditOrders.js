import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as PayService from "../../Services/OrderSevice";
import { fetchAsyncProductSingle } from "../../features/productSlide/productSlice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateProductSingle } from "../../features/productSlide/ProductSliceNew";
import CartMessage from "../CartMessage/CartMessage";

const EditOrderMain = (props) => {
  const { id } = props;
  const history = useNavigate();

  const [address, setAddress] = useState("");
  const [quantity, setQuatity] = useState(0);

  const [status, setStatus] = useState(false);
  const [showMessage,setShowMessage] = useState(false);

  const toastId = React.useRef(null);
  const Toastobjects = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const dispatch = useDispatch();

  const handleGetDetailsProduct = async (id, access_token) => {
    const res = await PayService.getDetilsPay(id, access_token);
    setAddress(res.address_line1);
    setQuatity(res.products[0].quantity);
    setStatus(res.isSucces);
    // dispatch(updateProductSingle({ res }));
  };
  // const { productSingle } = useSelector((state) => state.ProductSignle);
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    PayService.updatePay(id, rests, access_token);
  });
  const { data, error, isLoading, isError, isSuccess } = mutation;
  const handleUpdate = () => {
    const access_token = localStorage.getItem("access_token");
    const convert_acces_token = JSON.parse(access_token);
    mutation.mutate({
      id,
      status,
      access_token: convert_acces_token,
    });

    // mutation.mutate(decoded?.id, { phone, name, email, sex })
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    handleGetDetailsProduct(id, JSON.parse(access_token));
    if (!error && isSuccess) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Thành công!", Toastobjects);
        setShowMessage(true);
        setTimeout(() => {
          history('/orders'); 
        }, 1000); 
      }
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          error.response.data.message,
          Toastobjects
        );
      }
    }
  }, [id, error, isSuccess]);
  return (
    <>
      {/* <Toast /> */}
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleUpdate}>
          <div className="content-header">
            <h2 className="content-title text-capitalize">
              Sửa thông tin Đơn hàng
            </h2>
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* Error Loading */}
                  {false && <Message variant="alert-danger">error</Message>}
                  {/* Update Loading */}

                  {/* {productSingleStatus && <Loading />} */}

                  {/* productSingleStatus Loading */}
                  {false ? (
                    <Loading />
                  ) : (
                    <>
                      {/* <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div> */}
                      {/* <div className="mb-4">
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={quantity}
                          onChange={(e) => setQuatity(e.target.value)}
                        ></input>
                      </div> */}
                      <div className="mb-4">
                        <label className="form-label">Trạng thái</label>
                        <select
                          className="form-control"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option
                            value={false}
                            selected={status === false}
                          >
                            Chưa hoàn thành
                          </option>
                          <option
                            value={true}
                            selected={status === true}
                          >
                            Hoàn thành
                          </option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="d-flex gap-1 justify-content-end">
          <Link
            to="/orders"
            className="btn btn-outline-secondary border border-2 text-dark"
          >
            Quay về
          </Link>
          <div>
            <button type="button" className="btn btn-success" onClick={()=> handleUpdate()}>
              Hoàn thành
            </button>
          </div>
        </div>
        {showMessage && <CartMessage text = "Sửa thành thành công" />}

      </section>
    </>
  );
};

export default EditOrderMain;
