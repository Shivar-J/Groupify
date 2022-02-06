import React from "react";
import { setCookieValue } from "./utility";
import {
    ScrollContainer,
    ScrollPage,
    Animator,
    Sticky,
    batch,
    Fade,
    MoveOut
} from 'react-scroll-motion';
import '../stylesheets/login.css';

const StickyFade = batch(Sticky(), Fade(), MoveOut(0, -200));

export default class Callback extends React.Component {
    state = {
        is_done: false
    }


    componentDidMount(){
    let params = new URL(document.location).searchParams;
    if (!params.get("code")) {
        return
    }

    let code = params.get("code");

    let body = {"code": code}
    fetch("http://99.235.159.110:8888/api/callback", {
    method: "POST",
    body: JSON.stringify(body)
    }).then(response => response.json()).then(data => {
        
        console.log(data);
        setCookieValue("spotify_api", JSON.stringify(data), 60*60*24*365);
        this.setState({ is_done: true })

        })

    }

    render(){
        if (this.state.is_done){
        return (
            <head>
                <meta http-equiv='refresh' content='0; URL=http://99.235.37.139:3000/dashboard'></meta>
            </head>
        );
        } else {
            return (
                <div></div>
            )
        }
    }
}