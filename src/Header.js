
import React, { Component } from 'react';
import './Header.css'

export default class Header extends Component {
  render() {  
    return (
      <div className="well nav">
        <div className="container">
          {this.props.buttons}
        </div>
      </div>
      );
  }
}