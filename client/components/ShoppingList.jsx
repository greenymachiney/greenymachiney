import React, { useState, useEffect } from "react";
import axios from "axios";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [add, setAdd] = useState('');

  const getAllItems = () => {
    axios.get('/shopping')
      .then(({ data }) => {
        console.log(data);
        setItems(data);
      })
      .catch(err => console.error(err));
  }

  const addItem = () => {
    axios.put('/shopping/addItem', { item: add })
      .then(() => {
        setAdd('');
        getAllItems();
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      shopping list
      <ul>
        {
          items.map((item, i) => <li key={i}>{item}</li>)
        }
      </ul>
      <input value={add} placeholder="add an item to your list" onChange={(e) => setAdd(e.target.value)}/>
      <button onClick={addItem}>
        Add
      </button>
    </div>
  )
}


export default ShoppingList;