import * as React from 'react';
import '../stylesheets/styles.css';

var ProgressBar = ({ width, percent }) => {

    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        setValue(percent * width);
    });

    return (
        <div>
        <div className="progress-div" style={{ width: width }}>
            <div style={{ width: `${value}px` }} className="progress" />
        </div>
        </div>
    );
};

export default ProgressBar;