import React, { useEffect } from "react";
import "./HeaderSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "./../../store/productSlice";
import { Link } from "react-router-dom";


function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
      <div
          className={className}
          style={{
            ...style,
            display: "flex",
            zIndex: "1000",
            color: "white",
            marginRight: "30px",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClick}
      />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
      <div
          className={className}
          style={{
            ...style,
            display: "flex",
            zIndex: "1000",
            color: "white",
            marginLeft: "30px",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClick}
      />
  );
}
const HeaderSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAsyncProducts({
        limit: 25,
        skip: 25,
      })
    );
  }, []);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }
  return (
    <div className="slider">
      <div className="container">
        <div className="slider-content overflow-x-hidden">
          <Slider {...settings}>
            <div className="slider-item">
              <Link to={`/product/${tempProducts[0]?.id}`}>
                <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone15.jpg" alt="" />
              </Link>
            </div>
              <div className="slider-item">
                  <Link to={`/product/${tempProducts[0]?.id}`}>
                      <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone15.jpg" alt="" />
                  </Link>
              </div>
              <div className="slider-item">
                  <Link to={`/product/${tempProducts[0]?.id}`}>
                      <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:80/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone15.jpg" alt="" />
                  </Link>
              </div>


          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
