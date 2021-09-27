import React, { useState } from "react";

class Recipes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dranks: [],
    };
  }

  componentDidMount(){

  }

  handleClick() {
    console.log('clicked')
  }


  render() {
  return (
    <div className="list-group">
      <h1 className='drinkBookHeader'>Drink Book</h1>
  <a href="#" className="list-group-item list-group-item-action" aria-current="true">
    <div className="d-flex w-100 justify-content-between" onClick={this.handleClick}>
      <h5 className="mb-1">Drink 1</h5>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/MargaritaReal.jpg/1200px-MargaritaReal.jpg" width="100" height="100"></img>
    </div>
    <p className="mb-1">Some placeholder content in a paragraph.</p>
    <small>And some small print.</small>
  </a>
  <a href="#" className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Drink 2</h5>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/MargaritaReal.jpg/1200px-MargaritaReal.jpg" width="100" height="100"></img>
    </div>
    <p className="mb-1">Some placeholder content in a paragraph.</p>
    <small>And some small print.</small>
  </a>
  <a href="#" className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Drink 3</h5>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/MargaritaReal.jpg/1200px-MargaritaReal.jpg" width="100" height="100"></img>
    </div>
    <p className="mb-1">Some placeholder content in a paragraph.</p>
    <small className="text-muted">And some muted small print.</small>
  </a>
</div>
  )
  }
}

export default Recipes;