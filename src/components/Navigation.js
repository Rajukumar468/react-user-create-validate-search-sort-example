import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(){  
    return (
        <ul className='nav'>
            <li>
                <NavLink to="/" activeClassName="selected active">Home</NavLink>
            </li>
            <li>
                <NavLink to="/services">Services</NavLink>
            </li>
        </ul>
    
    )
}
export default Navigation;