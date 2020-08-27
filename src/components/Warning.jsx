import React, { Component } from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from './Loader';

export default class Warning extends Component {


    render() {
        return (<>
            <section className="section-7 my-4">
                <Container>
                    <Row>
                        <Col lg={12} className="px-2">
                            <div className="heading text-white my-shadow" style={{ backgroundColor: '#fff' }}>
                                <h1 className="my-text-shadow" style={{ color: "#ff1700", fontSize: "23px" }} >SATTA KING WARNING</h1>
                                <h1 style={{ color:"#000" , fontSize:"15px"}}>साइट (sattaking-real.com) पर दिए गए रिजल्ट और लीक नंबर के लिए यह साइट जिम्मेदार नहीं है | यह साइट सिर्फ और सिर्फ मनोरंजन के लिए बनाई गई है । यह साइट सट्टे से जुड़ी किसी भी गतिविधि को बढ़ावा नहीं देती । कृपया लीक नंबर के लिए हमें फोन कर के अपना समय खराब ना करें । सट्टा और जुआं जिस देश या राज्य में प्रतिबंधित है वहां के लोग हमारी साइट को ब्लॉक कर दें | किसी भी लाभ या हानि के लिए आप खुद जिम्मदार होंगे ।</h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>);
    }

}