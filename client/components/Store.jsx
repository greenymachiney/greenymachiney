import React from "react";

const Store = ({ store }) => {


  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img className="card-img-top" src={store.image_url}></img>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{store.name}</h2>
            <div className="card-text" style={{marginBottom: '10px'}}>
              {
                store.location.display_address.join('\n')
              }
            </div>
            <div className="card-text">
              {
                store.display_phone
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store;