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
import '../stylesheets/styles.css';

const StickyFade = batch(Sticky(), Fade(), MoveOut(0, -200));

export default class Home extends React.Component {
    render() {
        return (
            <ScrollContainer>
                <ScrollPage page={0}>
                    <Animator animation={StickyFade}>
                        <h1>Welcome to Groupify</h1>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={1}>
                    <Animator animation={StickyFade}>
                        <h1>Made by Shivar, Brian, Riken, and Robby</h1>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
        )
    }
}