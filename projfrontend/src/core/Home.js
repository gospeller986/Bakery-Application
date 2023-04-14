import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import "./card.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function Home() {
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

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="TTD CAKES" description="Welcome to our Cake Store">
      <div className="row text-center">
        <div className=" container mt-4 mb-4">
          <div>
            <img
              className="im"
              src="https://img.freepik.com/free-vector/cute-bakery-chef-girl-smiling-uniform-mascots-cartoon-art-illustration_56104-571.jpg?w=996&t=st=1664723159~exp=1664723759~hmac=2a380b3529951810541a5cbfe7e668c8bb598c763fe0eefd2691556e4460c384"
            />
          </div>
        </div>


        <div className="m"></div>
        <div className="container mt-4 mb-4">
          <h4 className="text-muted">
            Order Fast !!! <strong className="text-white">50%</strong> Off Ends
            in{" "}
          </h4>
          <div className="cnt">
            <div className="day">
              <CountdownCircleTimer
                {...timerProps}
                colors="#7E2E84"
                duration={daysDuration}
                initialRemainingTime={remainingTime}
              >
                {({ elapsedTime, color }) => (
                  <span style={{ color }}>
                    {renderTime(
                      "days",
                      getTimeDays(daysDuration - elapsedTime)
                    )}
                  </span>
                )}
              </CountdownCircleTimer>
            </div>

            <div className="min">
              <CountdownCircleTimer
                {...timerProps}
                colors="#D14081"
                duration={daySeconds}
                initialRemainingTime={remainingTime % daySeconds}
                onComplete={(totalElapsedTime) => ({
                  shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
                })}
              >
                {({ elapsedTime, color }) => (
                  <span style={{ color }}>
                    {renderTime(
                      "hours",
                      getTimeHours(daySeconds - elapsedTime)
                    )}
                  </span>
                )}
              </CountdownCircleTimer>
            </div>

            <div className="sec">
              <CountdownCircleTimer
                {...timerProps}
                colors="#EF798A"
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => ({
                  shouldRepeat:
                    remainingTime - totalElapsedTime > minuteSeconds,
                })}
              >
                {({ elapsedTime, color }) => (
                  <span style={{ color }}>
                    {renderTime(
                      "minutes",
                      getTimeMinutes(hourSeconds - elapsedTime)
                    )}
                  </span>
                )}
              </CountdownCircleTimer>
            </div>
          </div>
        </div>

        <div className="container mt-4 mb-4">
        <Carousel>
                <div>
                    <img src="https://img.freepik.com/premium-vector/tasty-cake-background-realistic-style_23-2147778621.jpg?w=2000" width="5rem"  />
                 
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" width="5rem"    />
                    
                </div>
            </Carousel>
        </div>

        <div className="container">
          <div className="row">
            {products.map((product, index) => {
              return (
                <div key={index} className="col-md-4 mb-4 col-sm-12 ">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
}
