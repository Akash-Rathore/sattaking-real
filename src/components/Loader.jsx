import React from "react";
import '../App.css';

const Loader = () => {
    return (
        <div id="loader">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="30" stroke="#2b699f" stroke-width="10" fill="none"></circle>
                <circle cx="50" cy="50" r="30" stroke="#222222" stroke-width="8" stroke-linecap="round" fill="none" transform="rotate(615.177 50 50)">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;180 50 50;720 50 50" keyTimes="0;0.5;1"></animateTransform>
                    <animate attributeName="stroke-dasharray" repeatCount="indefinite" dur="1s" values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882" keyTimes="0;0.5;1"></animate>
                </circle>
            </svg>
        </div>
    );
}

export default Loader;