import React, { Component } from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from './Loader';
import { Button, Modal, Table } from 'react-bootstrap';
import $ from 'jquery';
import adminurl from '../base.js'
var request = require("request");


export default class ResultCard extends Component {

    constructor(props) {
        super(props);
        this.state = {

            name: "",
            prev_month: "",
            next_month: "",
            prev_year: "",
            next_year: "",
            loading: false,
            modal_details: false,
            number: "",
            time: "",
            satta_types: "",
            month_history_header: "",
            month_history_body: "",
            satta_id: "",
            show_modal_satta_name: "",
            month_label_prev: "",
            month_label_next: ""


        }

    }


    currentDate = () => {
        const date = new Date();
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
        const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)
        return (`${day} ${month}, ${year}`);
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


    table_header = (value) => {
        return value.map((item) => {
            return (
                <td>{item}</td>
            )
        })
    }

    table_body = (value) => {
        return value.map((item) => {
            return (
                <td>{item}</td>
            )
        })
    }

    satta_month_history_prev_next(id, month, year) {



        this.handleClose();
        this.showLoader();
        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "satta_month_history", "satta_id": `${id}`, "month": `${month}`, "year": `${year}` },
            json: true


        };
        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {

                const thead_data = apidata.data.thead.map((value, index) => {
                    return (
                        <tr key={index}>
                            {
                                this.table_header(value)
                            }
                        </tr>
                    );

                });


                const tbody_data = apidata.data.tbody.map((value, index) => {
                    return (
                        <tr key={index}>
                            {
                                this.table_body(value)
                            }
                        </tr>
                    );

                });


                this.setState({ month_history_header: thead_data });
                this.setState({ month_history_body: tbody_data });
                this.setState({ prev_month: apidata.data.month_prev });
                this.setState({ prev_year: apidata.data.year_prev });
                this.setState({ next_month: apidata.data.month_next });
                this.setState({ next_year: apidata.data.year_next });
                this.setState({ satta_id: apidata.data.satta_id });
                this.setState({ month_label_prev: apidata.data.month_label_prev });
                this.setState({ month_label_next: apidata.data.month_label_next });
                this.hideLoader()
                this.handleShow();

            }

        })


    }




    types_modal(id, month, year, name) {



        this.setState({ show_modal_satta_name: name });
        this.showLoader();
        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "satta_month_history", "satta_id": `${id}`, "month": `${month}`, "year": `${year}` },
            json: true


        };
        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {

                const thead_data = apidata.data.thead.map((value, index) => {
                    return (
                        <tr key={index}>
                            {
                                this.table_header(value)
                            }
                        </tr>
                    );

                });


                const tbody_data = apidata.data.tbody.map((value, index) => {
                    return (
                        <tr key={index}>
                            {
                                this.table_body(value)
                            }
                        </tr>
                    );

                });


                this.setState({ month_history_header: thead_data });
                this.setState({ month_history_body: tbody_data });
                this.setState({ prev_month: apidata.data.month_prev });
                this.setState({ prev_year: apidata.data.year_prev });
                this.setState({ next_month: apidata.data.month_next });
                this.setState({ next_year: apidata.data.year_next });
                this.setState({ satta_id: apidata.data.satta_id });
                this.setState({ month_label_prev: apidata.data.month_label_prev });
                this.setState({ month_label_next: apidata.data.month_label_next });
                this.hideLoader()
                this.handleShow();

            }

        })



    }

    componentDidMount() {
        this.satta_types();


    }



    satta_types = () => {

        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "satta_types" },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {


                const satta_type_data = apidata.data.map((value) => {
                    return (
                        <div className='col-lg-6 px-2'>
                            <div className='box'>
                                <h4>{value.name}</h4>
                                <p>At {value.time} <a className='btn' onClick={() => this.types_modal(value.id, value.month, value.year, value.name)}>Record Chart</a></p>
                                <div className='no'>{value.number}</div>
                            </div>
                        </div>
                    );

                });


                this.setState({ satta_types: satta_type_data });


            }

        })




    }






    render() {

        return (
            <>
                <section className="section-7 my-4">
                    {
                        (this.state.loading) ? <Loader /> : null
                    }
                    <Container>
                        <Row>
                            <Col lg={12} className="px-2">
                                <h4 className="heading text-white my-shadow my-text-shadow" style={{ backgroundColor: '#2b699f' }}
                                >Satta King Result Chart of <br className="d-lg-none" />{this.currentDate()}</h4>
                            </Col>
                            {
                                this.state.satta_types
                            }
                        </Row>
                    </Container>
                </section>

                <Modal show={this.state.modal_details} onHide={this.state.modal_details}>
                    <Modal.Header onClick={this.handleClose} closeButton>
                        <Modal.Title style={{fontSize:"15px !important"}}>{this.state.show_modal_satta_name} Satta Chart Record </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover responsive className="satta_types_table">
                            <thead>
                                {
                                    this.state.month_history_header
                                }
                            </thead>
                            <tbody>
                                {
                                    this.state.month_history_body
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-between">
                        <Button style={{ backgroundColor: "#2b699f" }} onClick={() => this.satta_month_history_prev_next(this.state.satta_id, this.state.prev_month, this.state.prev_year)}>
                            Previous                        </Button>
                        {(this.state.next_month) ? <Button style={{ backgroundColor: "#2b699f" }} onClick={() => this.satta_month_history_prev_next(this.state.satta_id, this.state.next_month, this.state.next_year)}>
                            {this.state.month_label_next}
                        </Button> : null}

                    </Modal.Footer>
                </Modal>



            </>
        );
    }
}





