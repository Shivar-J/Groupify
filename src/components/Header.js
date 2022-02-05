import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <span>
                <a href="/" className="a1">Groupify</a>
                <a href="/contact" className="a2">Contact</a>
                <a href="/login" className="a2">Login</a>
                <a href="/register" className="a2">Register</a>
            </span>
        )
    }   
}