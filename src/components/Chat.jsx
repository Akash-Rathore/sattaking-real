import React, { Component } from "react";
import '../App.css';
import Parser from 'html-react-parser';
import adminurl from '../base.js'

var request = require("request");



export default class ShowResult extends Component {

    constructor() {
        super()
        this.state = {
            url: "https://cdn.iconscout.com/icon/free/png-512/avatar-380-456332.png",
            mobile_chat: "",
            pc_chat: "",
            default_message: "",
            condition: false

        }
    }

    componentDidMount() {

        this.default_message();

    }







    default_message = () => {


        var options = {

            method: 'POST',
            url: adminurl,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
            form: { "method": "default_message" },
            json: true

        };

        request(options, (error, response, apidata) => {
            if (error) {
                console.log("Error", error);
            }
            else {


                this.setState({ default_message: apidata.data.value });
                this.setState({ condition: true })


            }
        })


    }




    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }



    submitForm = () => {

        var chat_details = this.state.mobile_chat + this.state.pc_chat;

        if (chat_details != '') {

            var options = {
                method: 'POST',
                url: adminurl,
                headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' },
                form: { "method": "chat", "chat_details": this.state.mobile_chat + this.state.pc_chat },
                json: true
            };

            request(options, (error, response, apidata) => {
                if (error) {
                    console.log("Error", error);
                }
                else {

                    console.log(apidata);
                }

            })

        }


    }



    render() {

        return (
            <>

                <div id="custom-chat">
                    <button className="close-chat d-lg-none">&times;</button>
                    <header>
                        <img src={this.state.url} width="40" />
                        <h5 className="title">Satta King 2<br /><small>Customer Support</small></h5>
                    </header>
                    <div className="body">
                        <h4 className="time">Today</h4>
                          <div className="received">
                            {
                                Parser(this.state.default_message)
                            }

                        </div>
                        <div id="last"></div>
                    </div>
                    <footer>

                        <div className="d-lg-none">
                            <textarea className="autoresizing textarea-in-mobile" rows="2" name="mobile_chat" placeholder="Type here mobile" onChange={this.handleChange}></textarea>
                            <button id="send-mobile" className="send-btn" onClick={() => this.submitForm()} >&#10148;</button>
                        </div>

                        <div className="d-none d-lg-block">
                            <textarea className="autoresizing textarea-in-pc" rows="2" name="pc_chat" placeholder="Type here PC" onChange={this.handleChange}></textarea>
                            <button id="send-pc" onClick={() => this.submitForm()} className="send-btn">&#10148;</button>
                        </div>
                    </footer>
                </div>
                <button type="button" id="chat-open-mobile" className="d-block d-lg-none " style={{ zIndex: '9999' }}><i class="fa fa-whatsapp" style={{ fontSize: "59px" }} /></button>


            </>
        );
    }
}





