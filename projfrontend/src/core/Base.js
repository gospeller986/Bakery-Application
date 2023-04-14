import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4 mt-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className="main">
        <div className={className}>{children}</div>
      </div>
    </div>
    {/* <div className="footer">
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          Designed With ❤️ By <span className="text-white">©️ Satyajit Pal </span> 
        </span>
      </div>
    </footer>
    </div> */}
    <footer class="w-100 py-4 flex-shrink-0 bg-dark bg-gradient">
      <div class="container py-4">
        <div class="row gy-4 gx-4">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <h5 class="h1 text-white">TTD CAKES.</h5>
            <p class="small text-muted">
              Cake symbolizes joy, love, appreciation, and even
              accomplishments.❤️{" "}
            </p>
          </div>
          <div class="col-lg-4 col-md-6">
            <h5 class="text-white mb-3">Newsletter</h5>
            <p class="small text-muted">
              Join Now And Get FLAT <span className="text-white"> 50% OFF</span>{" "}
              on YOUR first order{" "}
            </p>
            <form action="#">
              <div class="input-group mb-3">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-primary"
                  id="button-addon2"
                  type="button"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="container text-center">
            <span className="text-muted ">
              Designed With ❤️ By{" "}
              <span className="text-white">©️ Satyajit Pal </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Base;
