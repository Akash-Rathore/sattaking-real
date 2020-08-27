import React, { useState } from "react";
import '../App.css';


const DateTime = () => {

    let time = new Date().toLocaleTimeString();
    const [currentTime, updateCurrentTime] = useState(time)

    const UpdateTime=()=>{
          time = new Date().toLocaleTimeString();
          updateCurrentTime(time);
    }

    setInterval(UpdateTime,1000);
    function currentDate() {

        const date = new Date();
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
        const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)

        return (`${day}-${month}-${year}`)

    }


    return (
        <>

            <section className="section-4">
                <div className="container-fluid live-result-date-time py-0">
                    <div className="row">
                        <div className="col-6 col-lg-4 text-lg-center">
                            <h3>Date : <span id="tt">{currentDate()}</span></h3>
                        </div>

                        <div className="col-6 col-lg-4 text-right text-lg-center order-lg-last">
                            <h3>Time : <span id="tt">{currentTime}</span></h3>
                        </div>

                        <div className="col col-lg-4 my-2 text-center">
                            
                      </div>
                    </div>
                </div>
            </section>


        </>);
};

export default DateTime;
