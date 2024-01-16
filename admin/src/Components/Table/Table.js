import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomModal from "../Modal/Modal";
import Button from "./Button";
import CustomSelect from "./Select";
import { useLocation } from "react-router-dom";
import CartMessage from "../CartMessage/CartMessage";

function Table(props) {
  const { data, columns, sub, loading, showMessage } = props;
  console.log("🚀 ~ file: Table.js:11 ~ Table ~ showMessage:", showMessage)
  const [search, setSearch] = useState("");
  const [datas, setTempData] = useState(data);
  const [selectedOption, setSelectedOption] = useState("");
  const location = useLocation();
  let uniqueCategories;
  if(data.products){
    uniqueCategories = data.products.map((item) => item.category);
  } else{
    uniqueCategories = data.map((item) => item.category);

  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const customHeader = (
    <div>
      <span>Custom Header</span>
      <CustomSelect onChange={handleSelectChange} />
    </div>
  );

  useEffect(() => {
    if (search === "") {
      setTempData(data);
    } else {
      const result = datas.filter((product) => {
        const values = Object.values(product).join().toLowerCase();
        return values.includes(search.toLowerCase());
      });
      setTempData(result);
    }
  }, [search]);
  // useEffect(() => {
  //   if (selectedOption !== null && sub) {
  //     const result = data.filter((product) => {
  //       const values = Object.values(product.category).join().toLowerCase();
  //       return values.includes(selectedOption.toLowerCase());
  //     });
  //     setTempData(result);
  //   }
  // }, [selectedOption, sub]);
  return (
    <>
      {sub ? (
        <DataTable
          columns={columns}
          data={datas}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          progressComponent
          selectableRows
          selectableRowsHighlight
          //   actions={actionsMemo}
          subHeader
          subHeaderComponent={
            <div className="d-flex ">
              <select
                class={
                  location.pathname === "/products"
                    ? "form-select  position-absolute top-0 start-0 w-10"
                    : "d-none"
                }
                aria-label="Default select example"
                style={{ width: "10%" }}
                onChange={handleSelectChange}
              >
                {/* <option value="1"></option> */}

                <option value="1">Choose category</option>

                {uniqueCategories.length >0 && uniqueCategories?.map((item) => (
                  <option value={item?._id} className="text-capitalize">
                    {item?.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search here"
                className="form-control w-25 position-absolute top-0 end-0"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          }
        ></DataTable>
      ) : (
        <div>
          <DataTable
            columns={columns}
            data={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            progressComponent
            selectableRows
            selectableRowsHighlight
          />
          {showMessage && <CartMessage text="Xoá thành công" />}
        </div>
      )}
    </>
  );
}

export default Table;
