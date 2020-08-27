import React, { Component } from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { Button, Modal, Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import Parser from 'html-react-parser';
import Swal from 'sweetalert2';
import Loader from './Loader';
import $ from 'jquery';
import adminurl from '../base.js'
import Warning from "./Warning";
import ResultCard from "./ResultCard";
import WhatSatta from "./WhatSatta";
var request = require("request");



export default class ShowResult extends Component {

    constructor(props) {
        super(props);
        this.state = {

            name: "",
            year: "",
            satta_type: "",
            satta_year: "",
            loading: false,
            modal_details: false,
            yearly_history_chart: "",
            fetch_name: "",
            fetch_year: "",
            history_chart: "",
            mobile: "",
            description: ""


        }

    }

    handleClose = () => {

        this.setState({ modal_details: false });

    }

    handleShow = () => {
        this.setState({ modal_details: true });
    }

    hideLoader = () => {
        this.setState({ loading: false });
    }

    showLoader = () => {
        this.setState({ loading: true });
    }


    componentDidMount() {


        this.getSattaType()
        this.getSattaYear()
        this.getkahiwal()

    }


    getkahiwal = () => {


        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "khaiwalBottom" },
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




    columnClickHandler = (index) => {

        $('.highlighted-Column-history').removeClass();
        var rowColumn = document.getElementsByClassName('rowColumn-history');
        for (let i = 0; i < rowColumn.length; i++) {
            rowColumn[i].children[index].classList.add('highlighted-Column-history')
        }

    }

    removeMouseHover = () => {

        $('.highlighted-Column-history').removeClass();

    }

    renderRowOne = (value) => {

        let rowData = Object.keys(value);

        return rowData.map((column, index) => {
            return (
                <td onMouseOver={() => this.columnClickHandler(index)} onMouseOut={this.removeMouseHover}>{value[column]}</td>
            )
        })


    }




    getSattaType = () => {



        this.showLoader();
        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "get_satta_type_for_history" },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {

                const satta_type_data = apidata.data.satta_types.map((value) => {
                    return (
                        <option value={value.satta_type_id}>{value.name}</option>
                    );

                });
                this.setState({ satta_type: satta_type_data });
                this.hideLoader()
            }

        })

    }


    getSattaYear = () => {


        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "get_satta_type_for_history" },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {

                const satta_year_data = apidata.data.years.map((year) => {
                    return (
                        <option value={year}>{year}</option>
                    );

                });
                this.setState({ satta_year: satta_year_data });
            }

        })

    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }




    submitForm = () => {


        if (this.state.name == '') {
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: "Please fill the Satta Name"
                })
            )
        } else if (this.state.year == '') {
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: "Please fill the Year"
                })
            )
        }



        this.showLoader();
        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "yearly_history_chart", "satta_type_id": this.state.name, "year": this.state.year },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {



                console.log('apidata.data.data', apidata.data.data);
                const data_yearly_history = apidata.data.data.map((value, index) => {
                    return (
                        <tr className="rowColumn-history">
                            {
                                this.renderRowOne(value)
                            }
                        </tr>
                    );
                })


                this.setState({ yearly_history_chart: data_yearly_history });
                this.setState({ fetch_name: apidata.data.name });
                this.setState({ fetch_year: apidata.data.year });
                this.hideLoader()
                this.handleShow();
            }

        })


    }



    render() {

        const what_up_url = `https://wa.me/+91${this.state.mobile}`;


        return (
            <>
                <section className="mt-4">
                    {
                        (this.state.loading) ? <Loader /> : null
                    }
                    <Container className="p-2">
                        <div className="col p-3 rounded my-shadow" style={{ backgroundColor: '#2b699f' }}>
                            <Row>
                                <div className="col">
                                    <br />
                                    <h5 className="text-white text-center my-text-shadow">Yahan Aap Month Aur Year Select Karke Gali,
                                    Desawar,
                                    Ghaziabad
                                    Aur
                                    Faridabad Ka Combined Chart Dekh
                            Sakte Hai.</h5>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-lg-4 col-6">
                                    <select className="form-control my-select" name="name" id="take_satta_name" onChange={this.handleChange} required>
                                        <option value="">Name</option>
                                        {
                                            this.state.satta_type
                                        }
                                    </select>
                                    <br />

                                </div>
                                <div className="col-lg-4 col-6">
                                    <select className="form-control my-select" name="year" id="setYear" onChange={this.handleChange} required>
                                        <option value="">Year</option>
                                        {
                                            this.state.satta_year
                                        }
                                    </select>
                                    <br />
                                </div>
                                <div className="col-lg-4">
                                    <button className="btn-warning btn btn-block btn-lg" onClick={() => this.submitForm()}>
                                        Show
                                        Result
                                      </button>
                                    <br />
                                </div>
                            </Row>
                        </div>
                    </Container>
                </section>
                <div className="container px-2">
                    <div className="text-scroller my-shadow my-text-shadow">
                        <marquee>SATTA KING, SATTAKING, SATTA RESULT, SATTA KING NOW, SATTA KING ONLINE RESULT,
                        SATTA RESULT DESAWAR, SATTA KING GALI, FARIDABAD SATTA KING, GHAZIABAD SATTA KING, FAST SATTA RESULT,
                        SATTA LIVE RESULT, SATTA KING LEAK JODI, SATTA KING DARBAR, SATTA NO, SATTA, SATTA KING, SATTA KING NOW,
                        SATTAKINGNOW, SATTA-KING, SUPER FAST KING, SATTA KING UP, SATTA KING ONLINE
                       </marquee>
                    </div>
                </div>
                <Modal show={this.state.modal_details} onHide={this.state.modal_details} size="lg">
                    <Modal.Header onClick={this.handleClose} closeButton>
                        <Modal.Title>{this.state.fetch_name} Satta Chart Record {this.state.fetch_year}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered responsive className="history-chart">
                            <thead>
                                <tr >
                                    <th>{this.state.fetch_year}</th>
                                    <th>Jan</th>
                                    <th>Feb</th>
                                    <th>Mar</th>
                                    <th>Apr</th>
                                    <th>May</th>
                                    <th>Jun</th>
                                    <th>Jul</th>
                                    <th>Aug</th>
                                    <th>Sep</th>
                                    <th>Oct</th>
                                    <th>Nov</th>
                                    <th>Dec</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.yearly_history_chart}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                <section className="kahiwal">
                    <Container>
                        <Row>
                            <div className="col p-2">
                                <div className="box my-shadow">
                                    <h2 className="my-text-shadow">{Parser(this.state.description)}</h2>
                                    <h3 className="my-text-shadow">ONLINE KAIWAL</h3>
                                    <h4 className="my-text-shadow">
                                        <a href={what_up_url} target="_new">WhatsApp Available</a>
                                    </h4>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </section>
                <ResultCard />
                <Warning />
                <WhatSatta />
               
            </>
        );
    }
}






