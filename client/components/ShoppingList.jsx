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

  const removeItem = (item) => {
    axios.put('/shopping/removeItem', { item: item })
      .then(() => {
        getAllItems();
      })
      .catch(err => console.error(err));
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
        <div className='shopping-list'>
          {
            // items.map((item, i) => <button key={i} type="button"
            // className="list-group-item list-group-item-action" aria-current="true">
            //   <span className="shopping-list-item" onClick={(e) => e.target.classList.toggle("complete")}>{item}</span>
            //   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" onClick={() => removeItem(item)}>
            //     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            //     <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            //   </svg>
            // </button>)
          }
        </div>
      </div>
    </div>
  )
}


export default ShoppingList;