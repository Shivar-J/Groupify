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
import ScrollToTop from 'react-scroll-to-top';
import '../stylesheets/styles.css';

const StickyFade = batch(Sticky(), Fade(), MoveOut(0, -200));

export default class Contact extends React.Component {
    render() {
        return (
            <div className="offset">
                <ScrollContainer>
                    <ScrollPage page={0}>
                        <Animator animation={StickyFade}>
                            <h1>Shivar - sbshivar@gmail.com</h1>
                            <h1>Brian - brianchan818@gmail.com</h1>
                            <h1>Riken - riken.allen.business@gmail.com</h1>
                            <h1>Robby - robbysodhi@hotmail.com</h1>
                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
                <ScrollToTop smooth />
                <p>▲</p>
            </div>
        )
    }
}