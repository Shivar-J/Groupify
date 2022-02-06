import React, { useEffect, useState } from 'react';
import '../stylesheets/dashboard.css';
import { getCookieValue } from './utility';
import ProgressBar from './ProgressBar';

export default class Dashboard extends React.Component {
    state = {
        title: "",
        artist: "",
        image: "",
        ConnectionState: false,
        socket: "",
        currentTrack: "",
        uri: "",
        is_playing: false,
        progress_ms: 0,
        duration_ms: 0,
        percentComplete: 0,
        data_loop: "",
        sessionKey: "",
        redirect: ""
    }

    componentDidMount() {
        this.setState({data_loop: setInterval(() => { this.get_data(true) }, 3000)}) 
        let sessionKey = getCookieValue("spotify_api");
        this.setState({sessionKey: sessionKey})
        if(!sessionKey) {
            this.setState({redirect: <meta http-equiv='refresh' content='0; URL=http://99.235.37.139:3000/'></meta>})
        }
    }
    
    get_data(ping_socket){
        if (this.state.sessionKey){

        fetch("http://99.235.159.110:8888/api/get_current_song", {
            method: "POST",
            body: this.state.sessionKey
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({ title: data.item.name })
            this.setState({ length: data.item.artists.length })
            this.setState({ image: JSON.stringify(data.item.album.images[0].url) });
            let imageStr = this.state.image.replaceAll('"', '');
            this.setState({ image: imageStr });
            this.setState({ uri: data.item.uri });
            this.setState({ is_playing: data.is_playing });
            this.setState({ progress_ms: data.progress_ms });
            this.setState({ duration_ms: data.item.duration_ms });
            
            let percent = Math.round(this.state.progress_ms / this.state.duration_ms * 100) / 100;
            this.setState({ percentComplete: percent });

            var artists = [];
            data.item.artists.forEach(element => artists.push(element["name"]))
            this.setState({"artist": JSON.stringify(artists)})
            let artistStr = this.state.artist.replaceAll(/[\[\]']+/g, '').replaceAll('"', '');
            this.setState({ artist: artistStr });
                if(this.state.socket){
                    this.state.socket.send(JSON.stringify({"type": "track_change", "track": this.state.uri, "progress_ms": this.state.progress_ms.toString()})) 
                }
        })
        }
    }
    
    ManageConnection(){
        if (!this.state.ConnectionState){
            var socket = new WebSocket('ws://99.235.159.110:8765/');


            socket.addEventListener('message', function (event) {
           // console.log('Message from server ', event.data);
                
            event = JSON.parse(event.data)
            let track = event["track"]
            let progress_ms = event["progress_ms"]
        
            let sessionKey = getCookieValue("spotify_api");
            let session_info = JSON.parse(sessionKey);
            let access_token = session_info["access_token"];
            let refresh_token = session_info["refresh_token"]

            let payload = {"refresh_token": refresh_token, "access_token": access_token, "track": track, "progress_ms": progress_ms}
           // console.log(payload)
            fetch("http://99.235.159.110:8888/api/change_song", {
             method: "POST",
                body: JSON.stringify(payload),
            })

                });
                
            this.setState({"socket": socket})
            console.log("joined")
            clearInterval(this.state.data_loop)
            setTimeout(() => setInterval(() => { this.get_data(true) }, 3000), 10000)
            this.setState({ConnectionState: true}) 
        } else {

            this.state.socket.send(JSON.stringify({"type": "leave", "refresh_token": JSON.parse(getCookieValue("spotify_api"))["refresh_token"]}));
            console.log("left")
            this.setState({ConnectionState: false})
        }
    }

    millisecondsToMinutes(millis) {
        var min = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return min + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        if (this.state.redirect){
            return (
                <div>
                {this.state.redirect}
                </div>
            )
        } else {
        return (
            <div>
                <div className="albumArt">
                    <div className="wrapper">
                        <img src={this.state.image}></img>
                    </div>
                </div>

                <div className="center">
                    <h2>{this.state.title}</h2>
                </div>
                    
                <div className="center">
                    {this.state.artist}
                </div>
                
                <div className="progress-bar">
                    {this.millisecondsToMinutes(this.state.progress_ms)}/{this.millisecondsToMinutes(this.state.duration_ms)}
                    <p>ㅤ</p>
                    <ProgressBar width={400} percent={this.state.percentComplete} />
                </div>
                
                <div className="buttonWrapper">
                    <button onClick={() => this.ManageConnection()}>{this.state.ConnectionState ? "Leave room" : "Join Room"}</button>
                </div>
                
            </div>
        )
        }
    }
}