import React from 'react';
import "../stylesheets/styles.css";
import { 
    Sticky, 
    ScrollContainer, 
    ScrollPage, 
    Animator 
} from 'react-scroll-motion';

export default class NotFound extends React.Component {
    render() {
        return (
            <div className='offset'>
                <ScrollContainer>
                    <ScrollPage page={0}>
                        <Animator animation={Sticky()}>
                            <div>404 Page not Found</div>
                            <a href="/">Go Back</a>
                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
            </div>
            
        )
    }
}
