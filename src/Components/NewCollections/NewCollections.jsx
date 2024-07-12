import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import axios from "axios";

const NewCollections = () => {
  const [state, setState] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:4000/newcollections")
        .then((res) => {
          console.log(res.data);
          setState(res.data)
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {state.map((item, i) => {
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

export default NewCollections;
