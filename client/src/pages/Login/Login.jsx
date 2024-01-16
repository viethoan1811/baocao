import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import React, { useEffect, useState } from "react";
import Input from "./input";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { updateUser } from "../../features/userSlide/userSlide";
import Toast from "../../components/LoadingError/Toast";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import CartMessage from "../../components/CartMessage/CartMessage";

const schema = yup.object({
  email: yup.string().required("email is a required field"),

  password: yup.string().min(6, "Password must be at least 6 characters"),
});
const provider = new GoogleAuthProvider();

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
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

  const userLogin = useSelector((state) => state.user);
  const { email } = userLogin;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, error, isLoading, isError, isSuccess } = mutation;

  const formSubmit = (data) => {
    // e.preventDefault();
    mutation.mutate(data);
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {
    if (error === null && isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Thành công", Toastobjects);
        }
        setShowMessage(true);
      }

      // dispatch(updateUser({ data }))
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          error.response.data.message,
          Toastobjects
        );
      }
    }

    if (email !== "") {
      history("/");
    }
  }, [isSuccess, history, email, error]);
  return (
    <>
      <div className="login-page">
        <div className="login-wrapper">
          <div className="login-title">
            <h4>Đăng nhập</h4>
          </div>
          <form className="login-body" onSubmit={handleSubmit(formSubmit)}>
            <Input
              id="email"
              label="Email"
              type="text"
              placeholder="Enter Email"
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />

            <Input
              id="Password"
              label="Password"
              type="password"
              placeholder="Enter Password"
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />

            <div className="login-footer">
              <button>ĐĂNG NHẬP</button>

              <Link to={"/register"}>
                <span>Bạn chưa có tài khoản?</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {showMessage && <CartMessage text="Login thành công" />}

    </>
  );
}

export default Login;
