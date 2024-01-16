import React, {useState} from "react"
import {Link} from "react-router-dom";
import AccountInformation from "./AccountInformation";
import AddressDelivery from "./AddressDelivery";
import HistoryProduct from "./HistoryProduct";
import user from "../../assets/user.png"
import icon_profile from "../../assets/icon_profile.png"
import icon_history from "../../assets/icon_history.png"
import icon_marker from "../../assets/icon_marker.png"
import HistoryOrder from "./HistoryOrder";
import {updateUser} from "../../features/userSlide/userSlide";
import {useDispatch} from "react-redux";
import {resetUserInfo} from "../../store/userInfoSlice";
function SliderInfo() {
    const dispatch = useDispatch();

    const [isAccountInformation, setAccountInformation] = useState()
    const [isHistoryOrders, setHistoryOrders] = useState()
    const [isAddressDelivery, setAddressDelivery] = useState()
    const [isClick, setClick] = useState(false)

    const handleAccountInformation = () => {
        setAccountInformation(true)
        setHistoryOrders(false)
        setAddressDelivery(false)
    }
    const handleHistoryOrders = () => {
        setAccountInformation(false)
        setHistoryOrders(true)
        setAddressDelivery(false)
        setClick(false)
        dispatch(resetUserInfo());

    }
    const handleAddressDelivery = () => {
        setAccountInformation(false)
        setHistoryOrders(false)
        setAddressDelivery(true)
    }
    return (
        <>
            <div className="px-4 py-8 bg-gray-50 lg:col-span-1">
                <div className="p-5">
                    <img src={user} alt="user_avatar"/>
                </div>
                <ul className="mt-5 space-y-3 grid">
                    <li>
                        <div className="relative">
                            <input className="peer hidden" id="radio_1" type="radio" name="radio"
                                   onClick={handleAccountInformation}/>
                            <label
                                className="peer-checked:border-2 peer-checked:border-[#0500FF] flex cursor-pointer select-none border border-gray-300 p-4"
                                htmlFor="radio_1">
                                <span className=""><img className="w-10" src={icon_profile} alt="icon profile"/></span>
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Thông tin tài khoản</span>
                                </div>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="relative">
                            <input className="peer hidden" id="radio_2" type="radio" name="radio"
                                   onClick={handleHistoryOrders}/>
                            <label
                                className="peer-checked:border-2 peer-checked:border-[#0500FF] flex cursor-pointer select-none border border-gray-300 p-4"
                                htmlFor="radio_2">
                                <span className=""><img className="w-10" src={icon_history} alt="icon history"/></span>
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Lịch sử mua hàng</span>
                                </div>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div className="relative">
                            <input className="peer hidden" id="radio_3" type="radio" name="radio"
                                   onClick={handleAddressDelivery}/>
                            <label
                                className="peer-checked:border-2 peer-checked:border-[#0500FF] flex cursor-pointer select-none border border-gray-300 p-4"
                                htmlFor="radio_3">
                                <span className=""><img className="w-10" src={icon_marker} alt="icon marker"/></span>
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Địa chỉ giao hàng</span>
                                </div>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="pt-8 px-4 lg:col-span-3">
                {isAccountInformation && <AccountInformation/>}
                {isHistoryOrders && <HistoryOrder clicked={isClick}/>}
                {isAddressDelivery && <AddressDelivery/>}
            </div>
        </>
    )
}

export default SliderInfo