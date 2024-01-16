import React from "react";
import Header from "../Components/Header";
import Edit from "../Components/Orders/EditOrders";
import Sidebar from "../Components/sidebar";
import { useParams } from "react-router-dom";

const EditOrdersScreen = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Edit id={id} />
      </main>
    </>
  );
};

export default EditOrdersScreen;
