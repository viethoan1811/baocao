import React, { useEffect, useState } from "react";
import PaymentByCard from "../MethodPayment/PaymentByCard";
import InternetBanking from "../MethodPayment/InternetBanking";
import ShipCOD from "../MethodPayment/ShipCOD";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/helpers";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import CartMessage from "../CartMessage/CartMessage";
import { clearCart } from "../../store/cartSlice";

function Shipping() {
  const [isShipCod, setShipCod] = useState(false);
  const [isInternetBanking, setInternetBanking] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState(false);
  const { carts, totalAmount } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user);
  const total = (totalAmount * 10) / 9;
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [errorMessage, setError] = useState(false);
  const history = useNavigate();
  const handleInternetBanking = () => {
    setInternetBanking(true);
    setShipCod(false);
  };

  const handleShipCod = (text) => {
    if (text == "shipCode") {
      setShipCod(true);
      setInternetBanking(false);
    } else if (text == "internetBank") {
      setInternetBanking(true);
      setShipCod(false);
    }
    setType(true);
  };

  const handleDefaultAddress = () => {
    setDefaultAddress(!defaultAddress);
  };
  const mutation = useMutationHooks(
    async (data) => await OrderService.CreateOrder(data)
  );
  const { data, error, isLoading, isError, isSuccess } = mutation;
  const dispatch = useDispatch();
  const formSubmit = async () => {
    // e.preventDefault();
    if (!name || !phone || !address || !note) {
      setShowMessage(true);
      setMessage("Vui lòng nhập đầy đủ thông tin");
      setError(true);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
      return;
    }
    if (type == false) {
      if (showMessage) {
        console.log("Loi gi đó");
        setError(false);
        setShowMessage(false);
      }
      setShowMessage(true);
      setMessage("Vui lòng nhập chọn phương thức thanh toán");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
      setError(true);
      return;
    }
    const products = carts.map((item) => ({
      idProduct: item._id,
      quantity: item.quantity,
      price: item.price,
    }));
    const data = {
      products,
      idUser: userInfo.id,
      local: address,
      note: note,
      numberPhone: phone,
    };
    await mutation.mutate(data);
  };

  useEffect(() => {
    if (defaultAddress) {
      setName(userInfo.name);
      setPhone(userInfo.phone);
      setAddress(userInfo.address);
      setNote(userInfo.note);
    } else {
      setName("");
      setPhone("");
      setAddress("");
      setNote("");
    }
    if (error === null && isSuccess) {
      dispatch(clearCart());
      setShowMessage(true);
      setMessage("Đặt hàng thành công");
      setTimeout(() => {
        history("/");
      }, 1000);
    } else if (error) {
      setShowMessage(true);
      setMessage("Đặt hàng thất bại");
      setError(true);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  }, [defaultAddress, error, isSuccess]);

  return (
    <div className="mx-auto mb-5">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Địa chỉ giao hàng
        </a>
        <div className="mt-4 py-2  sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200  font-semibold text-emerald-700"
                  to="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </Link>
                <span className="font-semibold text-gray-900">Mua hàng</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600  font-semibold text-white ring ring-gray-600 ring-offset-2"
                  to="#"
                >
                  2
                </Link>
                <span className="font-semibold text-gray-900">Giao hàng</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium">Đơn mua</p>
          <p className="text-gray-400">
            Kiểm tra lại đơn hàng của bạn trước khi đặt hàng.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 sm:px-6">
            {carts?.map((item) => (
              <div className="flex flex-col items-center rounded-lg bg-white sm:flex-row space-y-3">
                <img
                  className="m-2 h-28 w-32 rounded-md border object-cover object-center"
                  src={item.imgUrl[0]}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="float-right text-gray-400">
                    {item.description}
                  </span>
                  <p className="font-bold">
                    {formatPrice(item.price)}
                    <span className="text-[#FA7862]">
                      <span className="font-medium mx-1">x</span>
                      {item.quantity}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className=" mb-10">
            <div className="">
              <div className=" pt-8">
                <p className=" font-medium">Phương thức thanh toán</p>
                <form className="mt-5 grid gap-6">
                  <div className="relative">
                    <input
                      className="peer hidden"
                      id="radio_3"
                      type="radio"
                      name="radio"
                      onClick={() => handleShipCod("shipCode")}
                    />
                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                      className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                      htmlFor="radio_3"
                    >
                      <img
                        className="w-14 object-contain"
                        src="/images/naorrAeygcJzX0SyNI4Y0.png"
                        alt=""
                      />
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">
                          Thanh toán khi nhận hàng
                        </span>
                        <p className="text-slate-500  leading-6">
                          Giao hàng khoảng: 2-4 ngày
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      className="peer hidden"
                      id="radio_2"
                      type="radio"
                      name="radio"
                      onClick={() => handleShipCod("internetBank")}
                    />
                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                      className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                      htmlFor="radio_2"
                    >
                      <img
                        className="w-14 object-contain"
                        src="/images/naorrAeygcJzX0SyNI4Y0.png"
                        alt=""
                      />
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">
                          Chuyển khoản ngân hàng
                        </span>
                        <p className="text-slate-500  leading-6">
                          Giao hàng khoảng: 2-4 ngày
                        </p>
                      </div>
                    </label>
                  </div>
                </form>
              </div>
              {isInternetBanking && (
                <>
                  <div className="mt-5">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 border-r-2 border-black pr-4">
                        <img
                          className=""
                          src="https://homepage.momocdn.net/img/momo-upload-api-230627140125-638234712853800898.jpg"
                          alt="Momo"
                        />
                        <p className="uppercase text-center text-3xl font-semibold">
                          Techmedia
                        </p>
                      </div>
                      <div className="col-span-2 ml-4">
                        <p>
                          <span>Tên chủ tài khoản: </span>{" "}
                          <span className="uppercase">Techmedia</span>
                        </p>
                        <p>
                          <span>STK: </span>{" "}
                          <span className="uppercase">0123456789</span>
                        </p>
                        <p>
                          <span>Lưu ý</span>{" "}
                          <span className="text-[#FF0000]">*</span>
                        </p>
                        <p className="font-semibold">
                          Khách hàng kiểm tra kĩ thông tin trước khi chuyển
                          khoản
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <h3 className="font-semibold text-3xl">Thông tin giao hàng</h3>
          <label className="relative inline-flex items-center cursor-pointer mt-3">
            <input
              type="checkbox"
              value=""
              className="sr-only peer text-2xl"
              onClick={handleDefaultAddress}
            />
            <div
              className="w-16 h-9 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full
                            peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
                            after:absolute after:top-[2.5px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full
                            after:h-7 after:w-7 after:transition-all peer-checked:bg-blue-600"
            ></div>
            <span className="ml-3 text-2xl text-gray-900">
              Sử dụng địa chỉ mặc định
            </span>
          </label>

          <div className="">
            <label
              htmlFor="numberPhone"
              className="mt-4 mb-2 block font-medium"
            >
              Họ và tên <span className="text-[#FF1010]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl w-full rounded-md border border-gray-200 px-3 py-3 pl-11 shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Tên người nhận"
              />
            </div>

            <label
              htmlFor="numberPhone"
              className="mt-4 mb-2 block font-medium"
            >
              Số điện thoại <span className="text-[#FF1010]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="numberPhone"
                name="numberPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-xl w-full rounded-md border border-gray-200 px-3 py-3 pl-11 shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Số điện thoại nhận hàng"
              />
            </div>

            <label
              htmlFor="numberPhone"
              className="mt-4 mb-2 block font-medium"
            >
              Địa chỉ giao hàng <span className="text-[#FF1010]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-xl w-full rounded-md border border-gray-200 px-3 py-3 pl-11 shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Địa chỉ giao hàng"
              />
            </div>

            <label
              htmlFor="numberPhone"
              className="mt-4 mb-2 block font-medium"
            >
              Ghi chú
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="text-xl w-full rounded-md border border-gray-200 px-3 py-3 pl-11 shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ghi chú"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">Thành tiền</p>
                <p className="font-semibold text-gray-900">
                  {formatPrice(total)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">Giảm giá</p>
                <p className="font-semibold text-gray-900">
                  {formatPrice(total * 0.1)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="font-medium text-gray-900">Tổng tiền</p>
              <p className="font-semibold text-gray-900">
                {formatPrice(totalAmount)}
              </p>
            </div>
          </div>
          <Link>
            <button
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white hover:opacity-80 transition duration-300"
              onClick={() => formSubmit()}
              disabled={carts.length > 0 ? false : true}
            >
              Thanh toán
            </button>
          </Link>
        </div>
      </div>

      {showMessage && <CartMessage status={errorMessage} text={message} />}
    </div>
  );
}

export default Shipping;
