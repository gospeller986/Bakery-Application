import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import Card from "../core/Card";
import { getProducts } from "../core/helper/coreapicalls";
import exciting from "../assets/exciting-offers.png"

const UserDashBoard = () => {
  
  const [query , setQuery ] = useState("");

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="UserDashBoard page" description="Taste the deliciousness" >

      <div className="container mt-4 mb-4">
        <img src={exciting} />
      </div>
      

      <div class="container pb-4 pt-4 ">
        <div class="row height d-flex justify-content-center align-items-center">
          <div class="col-md-6">
            <div class="form">
              
              <input
                type="text"
                class="form-control form-input"
                placeholder="Search anything..."
                onChange={(e) => setQuery(e.target.value) }
              />
              <span class="left-pan">
                 
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {products.filter((product)=> product.name.toLowerCase().includes(query)).map((product, index) => {
            return (
              <div key={index} className="col-md-4 mb-4 col-sm-12 ">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
