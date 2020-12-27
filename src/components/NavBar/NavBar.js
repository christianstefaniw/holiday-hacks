import React, { Component } from 'react';
import './NavBar.css'
import logo from './logo.png'
class Navbar extends Component {
    render() {
        return(
            <nav className="NavbarItems">
                <a href={"/"} style={{textDecoration : "none"}}><img alt='logo' className="navbar-logo" src={logo}></img></a>
                <ul className={'nav-menu'}>
                    <li>
                        <a className={'nav-links'} href={'/'}>RECIPES</a>
                        <a className={'nav-links'} href={'/imagesearch'}>UPLOAD</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;
