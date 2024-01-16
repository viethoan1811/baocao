import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import AddVoucher from "./../Components/Voucher/AddVoucher";
import ShowOrder from "../Components/Orders/ShowOrder";
import { useParams } from "react-router-dom";

const ShowOrderScreen = () => {
    let { code } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ShowOrder code={code} />
      </main>
    </>
  );
};

export default ShowOrderScreen;