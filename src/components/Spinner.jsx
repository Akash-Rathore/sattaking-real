import React, { Component } from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';
import adminurl from '../base.js'
import whatup_coupan from "../images/whatup_coupan.jpg"
import { Col } from "react-bootstrap";
var request = require("request");

export default class ShowResult extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            mobile: "",

        }

    }

    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {



    }

    submitForm() {

        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "name": this.state.name, "mobile": this.state.mobile, "method": "paytm_win" },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {

                if (response.body.swal_title == 'Success') {
                    Swal.fire({
                        icon: response.body.type,
                        title: response.body.swal_title,
                        timer: response.body.swal_timer,
                        html: response.body.swal_message
                    })
                    document.getElementById("submitForm").reset();

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: response.body.swal_message,
                    })
                }

            }

        })

    }





    render() {

        return (
            <>
                <section className="custom-spinner">
                    <Container>
                        <Row>
                            <div className="col-md-5" style={{ marginTop: "130px" }}>


                                <form id="submitForm">
                                    <div className="main-visitor" style={{ backgroundColor: "#6c757d10", borderRadius: "5px", padding: "20px", justifyContent: 'center' }}>
                                        <img src={whatup_coupan} style={{ maxWidth: "100%" }} alt="whatup_coupan" />
                                        <h3 className="spin-title mb-3 my-text-shadow" style={{ color: "#0087ff" }}>Win ₹ 100 Daily on Paytm</h3>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" name="name" className="form-control" onChange={this.handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Mobile</label>
                                            <input type="number" name="mobile" className="form-control" onChange={this.handleChange} required />
                                        </div>
                                        <button type='button' className="btn btn-secondary btn-block" onClick={() => this.submitForm()}>Submit</button>
                                    </div>
                                </form>



                            </div>
                            <div className="col-md-4 offset-md-3">
                                <h3 className="spin-title">Spin & Get Today Lucky Harup</h3>
                                <canvas id="canvas" className="the_wheel" width="367" height="541" data-responsiveminwidth="true" data-responsivescaleheight="true" data-responsivemargin="50">
                                    <p style={{ color: "white" }} align="center">Sorry, your browser doesn't support canvas. Please
                            try another.</p>
                                    <div id="myTabSetPanel">
                                        <div className="active" id="set-1">
                                            <textarea id="wheelvalueinput1" style={{ display: "none" }}></textarea>
                                        </div>
                                    </div>
                                </canvas>
                                <button className="btn btn-secondary btn-block btn-lg" id="spin_buttons">Spin</button>
                            </div>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                <div className="privacy_policy">
                                    <div className="footer-first">
                                        <a>Terms &amp; Conditions</a>
                                        <a>Privacy Policy</a>
                                        <a>Disclaimer</a>
                                        <a>Contact Us</a>
                                        <a>About Us</a>
                                    </div>
                                    <div className="footer-second">
                                        <span>Copyright © 2020 sattaking-real Corporation</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}





