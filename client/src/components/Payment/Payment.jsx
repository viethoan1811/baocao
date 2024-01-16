import React, {useState} from "react"
import PaymentByCard from "../MethodPayment/PaymentByCard";
import InternetBanking from "../MethodPayment/InternetBanking";
import ShipCOD from "../MethodPayment/ShipCOD";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {formatPrice} from "../../utils/helpers";

function Payment() {
    const [isPaymentByCard, setPaymentByCard] = useState(false)
    const [isShipCod, setShipCod] = useState(false)
    const [isInternetBanking, setInternetBanking] = useState(false)
    const {carts, totalAmount} = useSelector((state) => state.cart);
    const total = totalAmount * 10 / 9;

    const handlePaymentByCard = () => {
        setPaymentByCard(true)
        setShipCod(false)
        setInternetBanking(false)
    }

    const handleInternetBanking = () => {
        setInternetBanking(true)
        setShipCod(false)
        setPaymentByCard(false)
    }

    const handleShipCod = () => {
        setShipCod(true)
        setPaymentByCard(false)
        setInternetBanking(false)
    }

    return (
        <div className="mx-auto mb-5">
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <a href="#" className="text-2xl font-bold text-gray-800">Thanh toán</a>
                <div className="mt-4 py-2  sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200  font-semibold text-emerald-700"
                                   to="/"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg
                                    >
                                </Link>
                                <span className="font-semibold text-gray-900">Mua hàng</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <Link className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200  font-semibold text-emerald-700"
                                   to="/shipping"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg
                                    >
                                </Link>
                                <span className="font-semibold text-gray-900">Giao hàng</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600  font-semibold text-white ring ring-gray-600 ring-offset-2"
                                   href="#">3</a>
                                <span className="font-semibold text-gray-500">Thanh toán</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 h-screen">
                <div className="px-4 pt-8">
                    <p className=" font-medium">Phương thức thanh toán</p>
                    <form className="mt-5 grid gap-6">
                        <div className="relative">
                            <input className="peer hidden" id="radio_2" type="radio" name="radio" onClick={handleInternetBanking}/>
                            <span
                                className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label
                                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                htmlFor="radio_2">
                                <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt=""/>
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Chuyển khoản ngân hàng</span>
                                    <p className="text-slate-500  leading-6">Giao hàng khoảng: 2-4 ngày</p>
                                </div>
                            </label>
                        </div>
                        <div className="relative">
                            <input className="peer hidden" id="radio_3" type="radio" name="radio" onClick={handleShipCod}/>
                            <span
                                className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label
                                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                htmlFor="radio_3">
                                <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt=""/>
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Thanh toán khi nhận hàng</span>
                                    <p className="text-slate-500  leading-6">Giao hàng khoảng: 2-4 ngày</p>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                {isInternetBanking&& <InternetBanking />}
                {/*{isShipCod&& <ShipCOD />}*/}
            </div>

        </div>
    )
}

export default Payment
