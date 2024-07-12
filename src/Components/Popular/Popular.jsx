import React, { useEffect, useState } from "react";
import "./Popular.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";
import axios from "axios";

const Popular = () => {
  const [data, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:4000/popularinpottery")
        .then((res) => {
          console.log(res.data);
          setState(res.data)
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData()
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN KNITTING</h1>
      <hr />
      <div className="popular-item">
        {data.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
