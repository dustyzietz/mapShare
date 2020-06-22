import React, { useState } from "react";

const ItemForm = ({ addItem, setItemOpen }) => {
 
  const [item, setItem] = useState({
   quantity: "",
    name: "",
    effect: "",
  });

  const {
   quantity,
   name,
   effect,
  } = item;

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form-group"   style={{width:"50px",display:"inline-block"}}>
                <label htmlFor="itemQuantity">Quantity</label>
                <input
                  id="itemQuantity"
                  className="form-control"
                  form="itemForm"
                  type="number"
                  placeholder="0"
                  name="quantity"
                  value={quantity}
                  onChange={onChange}
                />
              </div>
           <div className="form-group"   style={{width:"200px",display:"inline-block"}}>
                <label htmlFor="itemName">Item</label>
                <input
                  id="itemName"
                  className="form-control"
                  form="itemForm"
                  type="text"
                  placeholder="Item"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group"   style={{width:"200px",display:"inline-block"}}>
                <label htmlFor="itemEffect">Effect</label>
                <input
                  id="itemEffect"
                  className="form-control"
                  form="form"
                  type="text"
                  placeholder="Effect"
                  name="effect"
                  value={effect}
                  onChange={onChange}
                />
              </div>
              <br/>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          addItem(e, item);
          setItemOpen(false);
        }}
      >
        Add Item
      </button>
      <button
      style={{marginLeft: "10px"}}
        className="btn btn-secondary"
        onClick={(e) => {
          setItemOpen(false);
        }}
      >
        Cancel
      </button>
    </>
  );
};


export default ItemForm



