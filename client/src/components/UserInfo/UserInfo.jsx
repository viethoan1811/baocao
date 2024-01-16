import React from "react"
import {Link} from "react-router-dom";
import PaymentByCard from "../MethodPayment/PaymentByCard";
import InternetBanking from "../MethodPayment/InternetBanking";
import ShipCOD from "../MethodPayment/ShipCOD";
import SliderInfo from "./SliderInfo";
import AccountInformation from "./AccountInformation";

function UserInfo() {
    return (
        <>
            <div className="bg-gray-300 mx-auto">
                <div
                    className="flex flex-col justify-between items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 uppercase">Thông tin người dùng</h1>
                    </div>
                    <div>
                        {/*<h3 className="text-2xl font-semibold text-capitalize text-gray-800">Change Password</h3>*/}
                    </div>
                </div>
                <div className="bg-white grid sm:px-10 lg:grid-cols-4 lg:px-20 xl:px-32">
                    <SliderInfo/>
                </div>

            </div>

        </>
    )
}

export default UserInfo