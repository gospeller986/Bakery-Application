import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { cartEmpty , loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = products => {
    return (
      <div>
        <h2 className="mb-4">Get ready to taste utter Deliciousness!!!</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-sm-12">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No products</h4>
          )}
        </div>
        <div className="col-6 p-4">
           <StripeCheckout products={products} setReload={setReload} />
           
        </div>
        {/* <div className="col-4">
          <Paymentb products={products} setReload={setReload} />
        </div> */}
      </div>
    </Base>
  );
};

export default Cart;
