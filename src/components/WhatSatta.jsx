import React, { Component } from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from './Loader';

export default class WhatSatta extends Component {


    render() {
        return (<>
            <section className="section-7 my-4">
                <Container>
                    <Row>
                        <Col lg={12} className="px-2">
                            <div className="heading text-white my-shadow" style={{ backgroundColor: '#000' }}>
                                <h1 className="my-text-shadow" style={{ color: "rgb(239 233 232)", fontSize: "23px" }} >What is Satta King ?</h1>
                                <h1 style={{ color:"#fff" , fontSize:"15px"}}>Satta King game is drawing and lottery based mostly game, however currently it's categorised in gambling, and satta king is currently terribly renowned and largely taking part in game across the globe individuals ar crazy regarding this game. Black Satta is also the most popular website with Sattaking. But currently the foremost necessary factor is that this game is failed to follow the law and rule regulation that’s why Satta King or Play Bazaar and every one the sport UN agency similar those like game these ar prohibited and illegitimate game , as a result of they failed to follow the protocols and rule. Now currently individuals ought to rely on it, if the sport not follow the protocols they need not play the sports however individuals ar still taking part in the game, they play the games on the QT , individuals have rely on it stop to taking part in this type of games, Always aid work and facilitate people that would like facilitate, do something for your Nation do forever sensible thing and be forever happy. i hope you get your answer from here.</h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>);
    }

}