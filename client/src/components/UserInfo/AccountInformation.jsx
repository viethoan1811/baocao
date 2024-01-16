import React, { useState } from "react";
import icon_setting from "../../assets/icon_setting.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../features/userSlide/userSlide";
import CartMessage from "../CartMessage/CartMessage";

function AccountInformation() {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("Nam");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage,setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { email: emailOld, name: nameOld, phone: phoneOld, id, sex:sexOld } = userLogin;

  const mutation = useMutationHooks(
    async (data) =>
      await UserService.updateUser(data)
    
  );
  const { data, error, isLoading, isError, isSuccess } = mutation;

  const formSubmit = () => {
    const data = {
      id,
      name,
      sex,
      phoneNumber: phone,
      email,
    }
    // e.preventDefault();

    mutation.mutate(data);
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  useEffect(() => {
    if (error === null && isSuccess) {
        handleGetDetailsUser(id, data.data.access_token);
        setMessage("Cập nhật thành công")
        setShowMessage(true);
      
    } else if (error) {
        setMessage("Cập nhật thất bại")
        setShowMessage(true);
    }
    setTimeout(()=>{
      setShowMessage(false);

    },1000)
  }, [isSuccess, error]);

  useEffect(() => {
    if (emailOld && nameOld) {
      setEmail(emailOld);
      setName(nameOld);
      setPhone(phoneOld);
      setSex(sexOld)
    }
  }, [emailOld, nameOld]);
  return (
    <>
      <div className="container h-screen">
        <h1 className="text-3xl uppercase font-semibold border-b-2 border-[#D52C2C]">
          Thông tin tài khoản
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-80">
          <div className="grid grid-cols-2 col-span-1">
            <div className="space-y-10 font-semibold">
              <div className="p-2">
                <p>
                  Họ và tên <span className="text-[#FF0505]">*</span>
                </p>
              </div>
              <div className="p-2">
                <p>Giới tính</p>
              </div>
              <div className="p-2">
                <p>Ngày sinh</p>
              </div>
            </div>
            <div className="space-y-10">
              <div className="border">
                <input
                  className="w-full p-4 text-xl"
                  type="text"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="border">
                <select
                  className="border w-full px-3 py-2"
                  name="gender"
                  id="gender"
                  onChange={(e)=>setSex(e.target.value)}
                >
                  <option value="Nam" selected={sex == "Nam"}>Nam</option>
                  <option value="Nữ"  selected={sex == "Nữ"}>Nữ</option>
                </select>
              </div>
              <div className="border">
                <input className="w-full p-4 text-xl" type="date" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 col-span-1">
            <div className="space-y-10 font-semibold">
              <div className="p-2">
                <p>
                  Số điện thoại <span className="text-[#FF0505]">*</span>
                </p>
              </div>
              <div className="p-2">
                <p>
                  Email <span className="text-[#FF0505]">*</span>
                </p>
              </div>
              
            </div>
            <div className="space-y-10">
              <div className="border">
                <input
                  className="w-full p-4 text-xl"
                  type="text"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="border">
                <input
                  className="w-full p-4 text-xl"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
          
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-7">
          <button className="flex items-center gap-2 text-center px-3 py-2 text-2xl text-white rounded-lg bg-[#00C6F1] hover:bg-[#8DEAFF] transition duration-300" onClick={()=>formSubmit()}>
            <span>
              <img className="w-[36px]" src={icon_setting} alt="icon setting" />
            </span>
            Cập nhật
          </button>
        </div>
      </div>
      {showMessage && <CartMessage text={message} status={isError} />}

    </>
  );
}

export default AccountInformation;
