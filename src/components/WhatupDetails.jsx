import React, { Component } from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import adminurl from '../base.js'
var request = require("request");


export default class WhatupDetails extends Component {

    constructor() {
        super()
        this.state = {
            mobile: "",
            description: "",
           
        }

    }


   

    componentDidMount() {

        this.getkahiwal();

    }


    getkahiwal = () => {


        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "khaiwalTop" },
            json: true

        };


        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {

                this.setState({ mobile: apidata.data.mobile });
                this.setState({ description: apidata.data.description });

            }

        })

    }


    render() {

        const  what_up_url=`https://wa.me/+91${this.state.mobile}`;


        return (
            <>
                <section className="kahiwal">
                    <Container>
                        <Row>
                            <div className="col p-2">
                                <div className="box my-shadow">
                                    <h2 className="my-text-shadow">{this.state.description}</h2>
                                    <h3 className="my-text-shadow">ONLINE KAIWAL</h3>
                                    <h4 className="my-text-shadow">
                                        <a href={what_up_url} target="_new">WhatsApp Available</a>
                                    </h4>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}





