import React from 'react';
import '../App.scss';
import {
    Link
  } from "react-router-dom";

function Menu() {
  return (
    <nav>
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/login">Login</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;
