import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import "./card.css";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  //   function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn  bg-success mt-2 mb-2 rounded "
        >
                <div className="d-flex justify-content-between">
                   <span className="text-light">Add To Cart &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <span className="text-success text-bold" ><strong> 🛒</strong></span>
                </div> 
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (

      // <div class="container py-5">
      //   <div class="row justify-content-center">
      //     <div class="col-lg-6 col-xl-4">
      //       <div class="card text-black">
      //         <div class="card-body">
      //           {getARedirect(redirect)}
      //           <ImageHelper product={product} />
      //           <div class="text-center">
      //             <h5 class="card-title">{cartTitle}</h5>
      //             <p class="text-muted mb-4">{cartDescrption}</p>
      //           </div>
      //           <div>
      //             <div class="d-flex justify-content-between">
      //               <span>Price</span>
      //               <span>₹{cartPrice}</span>
      //             </div>
      //             <div className="row">
      //               <div className="col-12">{showAddToCart(addtoCart)}</div>
      //               <div className="col-12">
      //                 {showRemoveFromCart(removeFromCart)}
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
   

    <div className="mb-3">
      <div className="container">
      <div className="card  ">

      <div className="card-body">
        {getARedirect(redirect)}
         <ImageHelper product={product}/>
        <h5 className="card-title text-dark">{cartTitle}</h5>
        <p className="card-text text-dark">
          {cartDescrption}
        </p>
                   <div className="d-flex justify-content-between">
                   <span className="text-dark">Price</span>
                    <span className="text-success text-bold" ><strong>₹{cartPrice}</strong></span>
                   </div>
        <div className="row p-2">
          <div className="col-24">{showAddToCart(addtoCart)}</div>
          <div className="col-24">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>

      </div>

    </div>
  );
};

export default Card;
