import React, { useEffect, useState } from "react";

import "./HotelListItem.scss";

import { getHotelsData } from "../api";

const HotelListItem = ({
  id,
  freeServices = [],
  imageUrl,
  name,
  totalReviewCount,
  reviewScore,
  rate
}) => {
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const [priceLoading, setPriceLoading] = useState(false);

  const getHotelPrice = async (id, stop) => {
    setPriceLoading(true);
    try {
      const price = await getHotelsData({ id });
      if (!stop) {
        if (!price.message) {
          setPrice(price[id]);
        } else {
          setError(price.message);
        }
      }
    } catch (err) {
      if (!stop) {
        setError(err.message);
      }
    } finally {
      if (!stop) {
        setPriceLoading(false);
      }
    }
  };

  const reFetchPrice = async id => {
    setError("");
    getHotelPrice(id, false);
  };

  useEffect(() => {
    let stop = false;
    getHotelPrice(id, stop);

    return () => {
      stop = true;
    };
  }, [id]);

  return (
    <div className="hotel-list__item">
      <div className="hotel-image">
        <img
          src="../images/placeholder.jpg"
          data-src={imageUrl}
          alt="hotel"
          className="lazy"
        />
      </div>
      <div className="hotel-info">
        <>
          <h3 className="name">{name}</h3>
          <div className="free-services">
            <ul className="services">
              {freeServices.map(service => (
                <li key={service} className="service">
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <h4 className="hotel-rate">{rate}성급 호텔</h4>
          <div className="reviews">
            <span>{totalReviewCount}개의 이용후기</span>
            <span>{reviewScore}</span>
          </div>
          <span className="price" onClick={() => error && reFetchPrice(id)}>
            {priceLoading ? (
              <i className="fas fa-redo refresh loading" />
            ) : error ? (
              <i className="fas fa-redo refresh" />
            ) : (
              Number(price.toFixed(1)).toLocaleString() + "원~"
            )}
          </span>
        </>
      </div>
    </div>
  );
};

export default HotelListItem;
