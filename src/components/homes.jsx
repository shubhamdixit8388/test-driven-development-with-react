import React, { useEffect, useState } from "react";
import ApiClient from "./../services/api-client";

const Homes = () => {
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    const homesDatePromise = ApiClient.getHomes();
    homesDatePromise.then((homesData) => setHomes(homesData));
  }, []);

  return (
    <div>
      {homes.map((home, index) => {
        return (
          <div data-testid="home" key={index}>
            <div data-testid="home-title">{home.title}</div>
            <img src={home.image} data-testid="home-image" />
          </div>
        );
      })}
    </div>
  );
};

export default Homes;
