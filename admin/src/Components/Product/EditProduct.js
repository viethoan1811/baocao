import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link,useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as ProductService from "../../Services/ProductService";
import { fetchAsyncProductSingle } from "../../features/productSlide/productSlice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateProductSingle } from "../../features/productSlide/ProductSliceNew";
import { useQuery } from "react-query";
import CartMessage from "../CartMessage/CartMessage";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { id } = props;
  const history = useNavigate();

  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [priceReal, setPriceReal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [origin, setOrigin] = useState("");
  const [showMessage,setShowMessage] = useState(false);
  const handleGetDetailsProduct = async () => {
    const res = await ProductService.getDetilsProduct(id);
    return res;
  };
  const { access_token } = useSelector((state) => state.user);
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    ProductService.updateProduct(id, rests, access_token);
  });
  const { data, error, isLoading, isError, isSuccess } = mutation;
  const handleUpdate = (e) => {
    e.preventDefault();
    mutation.mutate({
      id: id,
      name,
      category,
      description,
      images,
      rate,
      priceReal,
      quantity,
      access_token,
    });

    // mutation.mutate(decoded?.id, { phone, name, email, sex })
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const { isLoading: getDetail, data: dataDetail } = useQuery(
    ["products"],
    handleGetDetailsProduct
  );
  useEffect(() => {
    if (dataDetail) {
      setName(dataDetail.name);
      setCategory(dataDetail.category);
      setDescription(dataDetail.description);
      setImages(dataDetail.imgUrl);
      setRate(dataDetail.rate);
      setPriceReal(dataDetail.price);
      setQuantity(dataDetail.quantity);
    }
  }, [dataDetail]);

  useEffect(()=>{
    if (error === null && isSuccess) {
      setShowMessage(true);
      const timeoutId = setTimeout(() => {
        history('/products'); 
      }, 1000); 

      return () => clearTimeout(timeoutId);
    }
  },[error, isSuccess])
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleUpdate}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Về trang sản phẩm
            </Link>
            <h2 className="content-title">Sửa sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">Xác nhận sửa
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* Error Loading */}
                  {false && <Message variant="alert-danger">error</Message>}
                  {/* Update Loading */}

                  {/* {productSingleStatus && <Loading />} */}

                  {/* productSingleStatus Loading */}
                  {getDetail ? (
                    <Loading />
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Danh mục
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          readOnly
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Mô tả
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                  
                      <div className="mb-4">
                        <label className="form-label">Giá bán</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={priceReal}
                          onChange={(e) => setPriceReal(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Đánh giá</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Số lượng còn lại</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        ></input>
                      </div>
                      <div className={origin != "" ? "mb-4" : "d-none"}>
                        <label className="form-label">Nguồn gốc</label>
                        <select
                          className="form-select"
                          onChange={(e) => setOrigin(e.target.value)}
                        >
                          <option value="" selected disabled>
                            None
                          </option>
                          <option
                            value="vietnam"
                            selected={origin == "Việt Nam"}
                          >
                            Việt Nam
                          </option>
                          <option
                            value="philippines"
                            selected={origin == "Philippines"}
                          >
                            Philippines
                          </option>
                          <option
                            value="indonesia"
                            selected={origin == "Indonesia"}
                          >
                            Indonesia
                          </option>
                          <option value="indonesia" selected={origin == "Lào"}>
                            Lào
                          </option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">
                          Ảnh
                        </label>
                        <input
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          // onChange={handleFileInputChange}
                          multiple
                        />
                        <div className="d-flex mt-3 ">
                          {images.map((item) => (
                            <img
                              src={item}
                              width="10%"
                              style={{ marginLeft: "12px" }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        {showMessage && <CartMessage text = "Sửa thành thành công" />}
      </section>
    </>
  );
};

export default EditProductMain;
