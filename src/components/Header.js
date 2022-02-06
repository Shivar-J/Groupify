import React from 'react';
import '../stylesheets/styles.css';

export default class Header extends React.Component {
    state = {
        url: "",
    }

    componentDidMount() {
        fetch("http://99.235.159.110:8888/api/getAuthLink")
            .then((response) => response.json())
            .then((data) => this.setState({ url: data["url"] }));
    }

    render() {
        return (
            <span>
                <a href="/" className="aa1">
                    <img src="./pushingG.png" className="logo"></img>
                    ㅤGroupify</a>
                <a href="/contact" className="aa2">Contact</a>
                <a href={this.state.url} className="aa2">Login</a>
            </span>
        )
    }   
}
