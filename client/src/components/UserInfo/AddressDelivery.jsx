import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import CartMessage from "../CartMessage/CartMessage";
import { updateUser } from "../../features/userSlide/userSlide";

function AddressDelivery() {
  const [isEdit, setEdit] = useState(false);
  const [isDefault, setDefault] = useState(true);
  const [typeLocation, setTypeLocation] = useState();
  const [isExist, setExist] = useState(true);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const userLogin = useSelector((state) => state.user);
  const { address: addressOld, note: noteOld, id } = userLogin;
  console.log("🚀 ~ file: AddressDelivery.jsx:19 ~ AddressDelivery ~ noteOld:", noteOld)
  const dispatch = useDispatch();

  const mutation = useMutationHooks(
    async (data) => await UserService.updateAddress(data)
  );
  const { data, error, isLoading, isError, isSuccess } = mutation;

  const formSubmit = () => {
    const data = {
      id,
      address,
      note,
    };
    // e.preventDefault();

    mutation.mutate(data);
  };
  const handleEdit = () => {
    setEdit(!isEdit);
  };
  const handleTypeLocation = (value) => {
    setTypeLocation(value);
  };
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  useEffect(() => {
    setAddress(addressOld);
    setNote(noteOld);

    if (error === null && isSuccess) {
      handleGetDetailsUser(id, data.data.access_token);
      setMessage("Cập nhật thành công");
      setEdit(!isEdit);
      setShowMessage(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (error) {
      setMessage("Cập nhật thất bại");
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  }, [isSuccess, error]);

  return (
    <>
      <div className="container h-screen">
        <h1 className="text-3xl font-semibold border-b-2 border-[#D52C2C]">
          Địa chỉ giao hàng
        </h1>
        {/*Nếu chưa có địa chỉ giao hàng sẽ hiện nút thêm*/}
        {!isExist && (
          <>
            <div className="text-end mt-2 flex justify-end">
              <button
                onClick={handleEdit}
                className="bg-[#F94E31] text-white flex items-center p-3 rounded hover:bg-[#FF8773] transition duration-300"
              >
                <span className="font-semibold text-5xl mr-1">+</span>
                Thêm địa chỉ mới
              </button>
            </div>
          </>
        )}
        {/*Nếu có địa chỉ giao hàng sẽ hiện thị địa chỉ*/}
        {isExist && (
          <>
            <div className="relative mt-3 space-y-3 border-2 border-black px-3 py-3 h-[140px]">
              <div className="space-x-3">
                <span className="text-semibold">{userLogin.name}</span>
                <span className="text-[#ABABAB]">|</span>
                <span className="text-[#ABABAB]">{userLogin.phone}</span>
              </div>
              <div className="">
                <p className="text-bold font-semibold">Địa chỉ: </p>
                <p className="text-[#ABABAB]">{address}</p>
              </div>
              <div className="absolute flex text-[14px] gap-5 right-3 top-1/2 -translate-y-1/2">
                <a
                  className="cursor-pointer text-[#0500FF] hover:text-[#dc3545] transition duration-300"
                  type="button"
                  onClick={handleEdit}
                >
                  Cập nhật
                </a>
              </div>
            </div>
          </>
        )}

        {isEdit && (
          <>
            <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-neutral-700/20">
              <div className="w-[50%] px-10 py-4 relative top-[15%] translate-x-[60%] left-0 bg-[#EEEEEE]">
                <div className="space-y-8">
                  <h4 className="capitalize text-3xl">Địa chỉ giao hàng</h4>
                  <div className="">
                    <input
                      className="p-4 text-2xl w-full"
                      type="text"
                      placeholder="Tỉnh, thành phố, quận huyện, phường xã"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <textarea
                      className="p-4 text-2xl w-full"
                      rows="2"
                      placeholder="Ghi chú"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <p className="text-2xl">Loại địa chỉ</p>
                  <div className="flex gap-3" role="radiogroup">
                    <button
                      onClick={() => handleTypeLocation("home")}
                      className={
                        typeLocation === "home"
                          ? "bg-blue-500 p-3 text-xl"
                          : "bg-white p-3 text-xl transition duration-500 ease-in-out hover:bg-blue-500"
                      }
                    >
                      Nhà riêng
                    </button>

                    <button
                      onClick={() => handleTypeLocation("office")}
                      className={
                        typeLocation === "office"
                          ? "bg-blue-500 p-3 text-xl"
                          : "bg-white p-3 text-xl transition duration-500 ease-in-out hover:bg-blue-500"
                      }
                    >
                      Văn phòng
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-x-1 flex justify-end text-sm">
                  <div className="border border-1 border-black">
                    <button
                      onClick={handleEdit}
                      className="w-[120px] text-black text-2xl py-2 hover:bg-[#ABABAB] transition duration-300"
                    >
                      Trở lại
                    </button>
                  </div>
                  <div className="border border-1 border-[#F94E30] ">
                    <button
                      className="bg-[#F94E30] w-[120px] text-white text-2xl py-2 hover:bg-[#FF8773] transition duration-300"
                      onClick={() => formSubmit()}
                    >
                      Hoàn thành
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {showMessage && <CartMessage text={message} status={isError} />}
    </>
  );
}

export default AddressDelivery;
