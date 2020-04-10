import React, { useEffect, useState, useRef, useCallback } from "react";
import HotelListItem from "../HotelListItem/HotelListItem";
import { getHotelsData } from "../api";

import "./HotelList.scss";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Spinner from "../Spinner/Spinner";
import { lazyLoad } from "../utils";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let currentPage = useRef(0);
  const targetRef = useRef(null);

  useIntersectionObserver({
    target: targetRef.current,
    onIntersect: function(entries) {
      // console.log(entries);
      if (entries[0].intersectionRatio <= 0 || loading) {
        return;
      }
      loadMoreHotels();
    }
  });

  useEffect(() => {
    lazyLoad();
  }, [hotels]);

  const getOnePageOfHotels = async stop => {
    let page = currentPage.current;
    page = page + 1;
    setLoading(true);
    try {
      const response = await getHotelsData({ page });

      if (!stop) {
        if (!response.message) {
          setHotels(prevData => [...prevData, ...response]);
          currentPage.current++;
        } else {
          setError(response.message);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreHotels = useCallback(async () => {
    getOnePageOfHotels();
  }, []);

  useEffect(() => {
    let stop = false;
    getOnePageOfHotels(stop);

    return () => {
      stop = true;
    };
  }, []);

  return (
    <div className="hotel-list__container">
      {hotels.map(hotel => (
        <HotelListItem key={hotel.id} {...hotel} />
      ))}
      <Spinner loading={loading} />
      <div className="bottom" ref={targetRef} />
    </div>
  );
};

export default HotelList;
