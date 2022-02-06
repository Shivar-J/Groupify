import React from 'react';
import {
    ScrollContainer,
    ScrollPage,
    Animator,
    Sticky,
    batch,
    Fade,
    MoveOut
} from 'react-scroll-motion';
import ScrollToTop from "react-scroll-to-top";
import '../stylesheets/styles.css';

const StickyFade = batch(Sticky(), Fade(), MoveOut(0, -200));

export default class Home extends React.Component {
    render() {
        return (
            <div className="offset">
                <ScrollContainer>
                    <ScrollPage page={0}>
                        <Animator animation={StickyFade}>
                            <h1 className="big">Welcome to Groupify</h1>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage page={1}>
                        <Animator animation={StickyFade}>
                            <h1>Made by Shivar, Brian, Riken, and Robby</h1>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage page={2}>
                        <Animator animation={StickyFade}>
                            <h1>Groupify uses Spotify API to allow users to create and join rooms where they can listen to music together.</h1>
                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
                <ScrollToTop smooth />
                <p>▲</p>
            </div>
            
            
        )
    }
}