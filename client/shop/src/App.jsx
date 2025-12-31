import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [items, setItems] = useState();
  const [pnum, setPnum] = useState();
  const [pname, setPname] = useState();
  const [pprice, setPprice] = useState();

  useEffect(() => {
    getMyItems();
  }, []);

  const getMyItems = async () => {
    try {
      const res = await fetch("http://localhost:3000/testasync");
      const data = await res.json();

      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = async () => {
    try {
      // const res = await fetch(`http://localhost:3000/test/${pnum}`);
      const res = await fetch(`http://localhost:3000/search?id=${pnum}`);
      const data = await res.json();

      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/testpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_name: pname, product_price: pprice }),
      });
      const data = await res.json();

      // setItems(data);
      getMyItems()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>My Shop</h1>
      <div className='card'>
        <input
          onChange={(e) => setPnum(e.target.value)}
          placeholder='product number'
        />
        <button onClick={() => getItem()}>Get one product</button>
      </div>
      <div>
        <form onSubmit={addItem}>
          <input
            onChange={(e) => setPname(e.target.value)}
            placeholder='product name'
          />
          <input
            onChange={(e) => setPprice(e.target.value)}
            placeholder='product price'
          />
          <input type='submit' />
        </form>
      </div>
      {items &&
        items.map((item) => {
          return (
            <div key={item.id}>
              Name:{item.name} Price:{item.price}
            </div>
          );
        })}
    </>
  );
}

export default App;
