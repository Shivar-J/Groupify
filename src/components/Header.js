import React from 'react';
import '../stylesheets/styles.css';

export default class Header extends React.Component {
    render() {
        return (
            <span>
                
                <a href="/" className="aa1">
                    <img src="./pushingG.png" className="logo"></img>
                    Groupify</a>
                <a href="/contact" className="aa2">Contact</a>
                <a href="/login" className="aa2">Login</a>
            </span>
        )
    }   
}
