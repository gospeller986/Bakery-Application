import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h4 className="mb-4">All Categories :</h4>
      <Link className="btn btn-info rounded " to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12 bg-light text-dark rounded ">
          
          {categories.map((category, index) => {
            return (
              <h3 className="text-dark mb-4 rounded" key={index}>
                {category.name}
              </h3>
            );
          })}

</div>     
<div className="col-12 bg-light text-dark rounded ">
          <div className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-dark text-left">I write code</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/productId`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {}} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
