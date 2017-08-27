import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
class Header extends Component {
  render(){
        return(
            <div>
            <PageHeader bsStyle="info">{this.props.title}</PageHeader>
            </div>
        )
    }
}

export default Header;