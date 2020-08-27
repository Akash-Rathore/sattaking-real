import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/sliderdown.css';


export default class Sliderdown extends Component {


    constructor(props) {
        super(props)

    }

    close_slider = () => {

        var html=document.querySelector('.onesignal-reset');
        if(html.classList.item(2)=='slide-down'){
             html.classList.remove('slide-down')
         }
    }



    render() {
        return (<>
            <div id="onesignal-slidedown-container" className="onesignal-slidedown-container onesignal-reset slide-down">
                <div id="onesignal-slidedown-dialog" className="onesignal-slidedown-dialog">
                    <div id="normal-slidedown">
                        <div className="slidedown-body" id="slidedown-body">
                            <div className="slidedown-body-icon">
                                <img alt="notification icon" src="https://img.onesignal.com/permanent/1030ab53-b0c9-42c0-8570-7a9cb7294400.png" />
                            </div>
                            <div className="slidedown-body-message">क्या आप गली दिसावर गाजियाबाद और फरीदाबाद के नंबर आते ही अपने मोबाइल सुचना पाना चाहते है?</div>
                            <div className="clearfix"></div>
                            <div id="onesignal-loading-container"></div>
                        </div>
                        <div className="slidedown-footer" id="slidedown-footer">
                            <button className="align-right primary slidedown-button" id="onesignal-slidedown-allow-button">हाँ</button>
                            <button className="align-right secondary slidedown-button" id="onesignal-slidedown-cancel-button" onClick={this.close_slider}>नहीं</button>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }

}