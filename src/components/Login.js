import React from "react";
import {
    ScrollContainer,
    ScrollPage,
    Animator,
    Sticky,
    batch,
    Fade,
    MoveOut
} from 'react-scroll-motion';
import '../stylesheets/styles.css';

const StickyFade = batch(Sticky(), Fade(), MoveOut(0, -200));

export default class Login extends React.Component {
  state = {
    url: "",
  };

  render() {
    let url;
    fetch("http://99.235.159.110:8888/api/getAuthLink")
      .then((response) => response.json())
      .then((data) => this.setState({ url: data["url"] }));

    return (
        <div className="offset">
            <ScrollContainer>
                <ScrollPage page={0}>
                    <Animator animation={StickyFade}>
                        <div>
                            <a href={this.state.url}>Login to Spotify</a>
                        </div>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
        </div>
        
    );
  }
}
