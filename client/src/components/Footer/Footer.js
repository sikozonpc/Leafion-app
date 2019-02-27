import React from 'react';

import classes from "./Footer.module.css";

const footer = () => {
    return (
        <div className={classes.Footer}>
            <p>Made by <a
                 href="https://twitter.com/tiago_taquelim" target="_blank">
                 @tiago_taquelim</a>
            </p>
        </div>
    );
};

export default footer;