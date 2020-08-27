import React, { Component } from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import $ from 'jquery';
import Loader from './Loader';
import adminurl from '../base.js'

var request = require("request");

const date = new Date();
const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' })
const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)

export default class WhatupDetails extends Component {

    constructor() {
        super()
        this.state = {
            monthlyDataAllOne: [],
            monthlyDataAllTwo: [],
            MonthlyHeaderOne: "",
            MonthlyHeaderTwo: "",
            monthData: [],
            offset: "",
            limit: "",
            year_prev: "",
            month_prevOne: "",
            month_prevTwo: "",
            year_next: "",
            month_nextOne: "",
            month_nextTwo: "",
            month_label_next: "",
            month_label_prevOne: "",
            month_label_prevTwo: "",
            loading: false,
            current_monthOne: "",
            current_monthSec: ""

        }

        /*   this.columnClickHandlerOne = this.columnClickHandlerOne.bind(this); */
        /*   this.columnClickHandlerTwo = this.columnClickHandlerTwo.bind(this); */

    }



    componentDidMount() {


        this.getMonthlyDataOne()
        this.getMonthlyDataTwo()
        this.getMonthlyHeaderOne()
        this.getMonthlyHeaderTwo()




    }


    /*  
     removeMouseHover=()=>{
 
         $('.highlighted-Column').removeClass();
     
     } */






    /*  columnClickHandlerOne = (index) => {
 
         $('.highlighted-Column').removeClass();
         var rowColumn = document.getElementsByClassName('rowColumnOne');
         for (let i = 0; i < rowColumn.length; i++) {
             rowColumn[i].children[index].classList.toggle('highlighted-Column')
         }
 
 
     } */

    /*   columnClickHandlerTwo = (index) => {
  
          $('.highlighted-Column').removeClass();
          var rowColumn = document.getElementsByClassName('rowColumnTwo');
          for (let i = 0; i < rowColumn.length; i++) {
              rowColumn[i].children[index].classList.toggle('highlighted-Column')
          }
  
  
      } */

    hideLoader = () => {
        this.setState({ loading: false });
    }

    showLoader = () => {
        this.setState({ loading: true });
    }


    renderRowOne = (value) => {
        let rowData = Object.keys(value);
        return rowData.map((column, index) => {
            return (
                <td className="coltd">{value[column]}</td>
            )
        })
    }

    renderRowTwo = (value) => {
        let rowData = Object.keys(value);
        return rowData.map((column, index) => {
            return (
                <td className="coltd">{value[column]}</td>
            )
        })
    }



    renderSattaDataOne = () => {


        return this.state.monthlyDataAllOne.map((value, index) => {
            return (

                <tr className="rowColumnOne" key={value.id} >
                    {
                        this.renderRowOne(value)
                    }
                </tr>

            );

        });
    }

    previous_next_montly_dataOne = (year_prev, month_prev, offset, limit) => {

        this.showLoader();
        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "monthly_data", "offset": `${offset}`, "limit": `${limit}`, "month": `${month_prev}`, "year": `${year_prev}` },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {


                this.setState({ monthlyDataAllOne: apidata.data.body });
                this.setState({ year_prev: apidata.data.year_prev });
                this.setState({ month_prevOne: apidata.data.month_prev });
                this.setState({ year_next: apidata.data.year_next });
                this.setState({ month_nextOne: apidata.data.month_next });
                this.setState({ month_label_next: apidata.data.month_label_next });
                this.setState({ month_label_prevOne: apidata.data.month_label_prev });
                this.setState({ offset: apidata.data.offset });
                this.setState({ limit: apidata.data.limit });
                this.setState({ current_monthOne: apidata.data.current_month });
                this.hideLoader();


            }

        })
    }


    previous_next_montly_dataTwo = (year_prev, month_prev, offset, limit) => {

        this.showLoader();
        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "monthly_data", "offset": `${offset}`, "limit": `${limit}`, "month": `${month_prev}`, "year": `${year_prev}` },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {


                this.setState({ monthlyDataAllTwo: apidata.data.body });
                this.setState({ year_prev: apidata.data.year_prev });
                this.setState({ month_prevTwo: apidata.data.month_prev });
                this.setState({ year_next: apidata.data.year_next });
                this.setState({ month_nextTwo: apidata.data.month_next });
                this.setState({ month_label_next: apidata.data.month_label_next });
                this.setState({ month_label_prevTwo: apidata.data.month_label_prev });
                this.setState({ offset: apidata.data.offset });
                this.setState({ limit: apidata.data.limit });
                this.setState({ current_monthSec: apidata.data.current_month });

                this.hideLoader();


            }

        })
    }





    renderSattaDataTwo = () => {

        return this.state.monthlyDataAllTwo.map((value, index) => {
            return (

                <tr className="rowColumnTwo" key={value.id} >
                    {
                        this.renderRowTwo(value)
                    }
                </tr>

            );

        });
    }



    getMonthlyDataOne = () => {




        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "monthly_data", "offset": "0", "limit": "4", "month": `${month}`, "year": `${year}` },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {

                this.setState({ monthlyDataAllOne: apidata.data.body });
                this.setState({ year_prev: apidata.data.year_prev });
                this.setState({ month_prevOne: apidata.data.month_prev });
                this.setState({ year_next: apidata.data.year_next });
                this.setState({ month_nextOne: apidata.data.month_next });
                this.setState({ month_label_next: apidata.data.month_label_next });
                this.setState({ month_label_prevOne: apidata.data.month_label_prev });
                this.setState({ offset: apidata.data.offset });
                this.setState({ limit: apidata.data.limit })
                this.setState({ current_monthOne: apidata.data.current_month });



            }

        })

    }


    getMonthlyDataTwo = () => {



        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "monthly_data", "offset": "4", "limit": "4", "month": `${month}`, "year": `${year}` },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {


                this.setState({ monthlyDataAllTwo: apidata.data.body });
                this.setState({ year_prev: apidata.data.year_prev });
                this.setState({ month_prevTwo: apidata.data.month_prev });
                this.setState({ year_next: apidata.data.year_next });
                this.setState({ month_nextTwo: apidata.data.month_next });
                this.setState({ month_label_next: apidata.data.month_label_next });
                this.setState({ month_label_prevTwo: apidata.data.month_label_prev });
                this.setState({ offset: apidata.data.offset });
                this.setState({ limit: apidata.data.limit });
                this.setState({ current_monthSec: apidata.data.current_month });




            }


        })

    }



    getMonthlyHeaderOne = () => {

        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "monthly_data", "offset": "0", "limit": "4", "month": `${month}`, "year": `${year}` },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {
                console.log("Respone ::", apidata.data.header);

                const monthlyHeader = apidata.data.header.map(function (value) {
                    return (
                        <th style={{ minWidth: '70px', width: '70px', maxWidth: '70px' }}>{value}</th>
                    );

                });

                this.setState({ MonthlyHeaderOne: monthlyHeader });


            }

        })

    }


    getMonthlyHeaderTwo = () => {

        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "monthly_data", "offset": "4", "limit": "4", "month": `${month}`, "year": `${year}` },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {
                console.log("Respone ::", apidata.data.header);

                const monthlyHeader = apidata.data.header.map(function (value) {
                    return (
                        <th style={{ minWidth: '70px', width: '70px', maxWidth: '70px' }}>{value}</th>
                    );

                });

                this.setState({ MonthlyHeaderTwo: monthlyHeader });


            }

        })

    }




    render() {



        return (
            <>
                <section class="section-6">
                    {
                        (this.state.loading) ? <Loader /> : null
                    }
                    <Container>
                        <Row>
                            <div className="col table-responsive p-0 mr-2 ml-2 mt-4">
                                <table className="my-table table-sm my-shadow" width="100%" cellSpacing="3">
                                    <thead>
                                        <tr>
                                            <th colSpan={5}>{this.state.current_monthOne}</th>
                                        </tr>
                                        <tr>
                                            {this.state.MonthlyHeaderOne}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.renderSattaDataOne()
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-6 pl-2 pr-1">
                                <a onClick={() => this.previous_next_montly_dataOne(this.state.year_prev, this.state.month_prevOne, this.state.offset, this.state.limit)} className="prev my-shadow">{this.state.month_label_prevOne}</a>
                            </div>
                            <div className="col-6 pl-2 pr-1">
                                {
                                    (this.state.month_nextOne) ? <a onClick={() => this.previous_next_montly_dataOne(this.state.year_next, this.state.month_nextOne, this.state.offset, this.state.limit)} className="prev my-shadow">{this.state.month_label_next}</a> : null
                                }
                            </div>
                        </Row>
                    </Container>
                </section>
                <section class="section-6">
                    <Container>
                        <Row>
                            <div className="col table-responsive p-0 mr-2 ml-2 mt-4">
                                <table className="my-table table-sm my-shadow" width="100%" cellSpacing="3">
                                    <thead>
                                        <tr>
                                            <th colSpan={5}>{this.state.current_monthSec}</th>
                                        </tr>
                                        <tr>
                                            {this.state.MonthlyHeaderTwo}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSattaDataTwo()}
                                    </tbody>
                                </table>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-6 pl-2 pr-1">
                                <a onClick={() => this.previous_next_montly_dataTwo(this.state.year_prev, this.state.month_prevTwo, this.state.offset, this.state.limit)} className="prev my-shadow">{this.state.month_label_prevTwo}</a>
                            </div>
                            <div className="col-6 pl-2 pr-1">
                                {
                                    (this.state.month_nextTwo) ? <a onClick={() => this.previous_next_montly_dataTwo(this.state.year_next, this.state.month_nextTwo, this.state.offset, this.state.limit)} className="prev my-shadow">{this.state.month_label_next}</a> : null
                                }
                            </div>
                        </Row>
                    </Container>
                </section>
            </>
        );

    }

}





