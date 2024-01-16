import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Table/Table";
import * as OrderService from "../../Services/OrderSevice";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import CustomModal from "../Modal/Modal";
import {formatPrice} from "../../utils/helpers";

const DetailOrder = (props) => {
  const { data, code } = props;
  const [loading, setLoading] = useState("");
  const [tempData, setTempData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setIsDeleteConfirmed(false);
  };
  const confirmDelete = (id) => {
    setIsDeleteConfirmed(true);
    setShowModal(true);
    setId(id)
  };
  const [error, setError] = useState("");
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
  const hangldeGetAll = async () => {
    setLoading(true);
    await OrderService.getOrderDetailByCode()
      .then((res) => {
        setLoading(false);
        setTempData(res);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleDelete = async (id) => {
    if (id) {
      await OrderService.deleteOrderByCode(code,id)
        .then((res) => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Thành công!", Toastobjects);
          }
          hangldeGetAll();
          window.location.reload();
        })
        .catch((error) => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error, Toastobjects);
          }
        });
    }
  };
  const columns = [
    {
      name: "Mã sản phẩm",
      selector: (row) => row.idProduct.productCode,
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.idProduct.name,
    },
    {
      name: "Giá sản phẩm",
      selector: (row) => formatPrice(row.price)
    },
    {
      name: "Số lượng",
      selector: (row) => row.quantity,
    },
   
  ];
  if(data && data.length>0 ){
    if(data[0].status == false){
      columns.push( {
        name: "Hành động",
        selector: (row) => {
          console.log("🚀 ~ file: DetailOrder.jsx:90 ~ DetailOrder ~ row:", row)
          return (
            <div style={{ width: "450px" }}>
                <>
                  {/* <Link to={`/orders/${row._id}/edit`} style={{ marginRight: "5px" }}>
                    <button className="btn btn-warning">Sửa</button>
                  </Link> */}
                  <button
                    type="button"
                    onClick={() => confirmDelete(row.idProduct._id)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </>
        
            </div>
          );
        },
      })
    }
  }
  return (
    <>
      {/* <Toast /> */}
      <CustomModal
        show={showModal}
        handleClose={() => handleClose()}
        handleDelete={() => handleDelete(id)}
      />
      <Table data={data} columns={columns} sub={false} />
    </>
  );
};

export default DetailOrder;
