import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import AddCategoryMain from "./../Components/Category/AddCategory";

const AddCategory = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddCategoryMain />
      </main>
    </>
  );
};

export default AddCategory;
