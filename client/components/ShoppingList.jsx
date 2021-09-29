import React, { useState, useEffect } from "react";
import axios from "axios";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [add, setAdd] = useState('');

  const getAllItems = () => {
    axios.get('/shopping')
      .then(({ data }) => {
        setItems(data);
      })
      .catch(err => console.error(err));
  }

  const addItem = () => {
    axios.post('/shopping/addItem', { item: add })
      .then(() => {
        setAdd('');
        getAllItems();
      })
      .catch(err => console.error(err));
  }

  const removeItem = () => {

  }

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <div>
        <h5 className="shopping-header">Shopping List</h5>
      </div>
      <hr />
      <div>
        <div>
          <input className="list-input" value={add} placeholder="add an item to your list" onChange={(e) => setAdd(e.target.value)}/>
          <button onClick={addItem} className="btn btn-success btn-sm" title="add to your shopping list!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 2 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
        </div>
        <hr />
        <div>
          {
            items.map((item, i) => <button key={i} type="button" className="list-group-item list-group-item-action" aria-current="true" onClick={removeItem}><span className="shopping-list-item">{item}</span></button>)
          }
        </div>
      </div>
    </div>
  )
}


export default ShoppingList;