
import React ,{Component} from "react";
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import adminurl from '../base.js'
var request = require("request");


const style={

        margin:"auto !important",
        marginBottom:"20px"
    }

export default class CardNumber extends Component {
    
    constructor(){
        super()
        this.state={
          sattaName:'',
          presentTime:'',
          sattaNumber:'',
          sattaYesterday:'',
          formData:'',
        }
      }
      componentDidMount(){
      
        this.getFeatured();
      
      }
    

      getFeatured = () =>{

          var options = { 
            
             method: 'POST',
             url:adminurl,
             headers: {'content-type': 'application/json','cache-control': 'no-cache' },
             form:{"method":"featured"},
             json: true
        
      };

       request(options, (error, response, body) =>
       {
         if (error)
         {
           console.log("Error", error);
         }
         else
         {
            

             const cardData  =body.data.map(function(value){
               return(   
                         <Col xs={6}  lg={2} className="p-2" style={style}>
                           <div className='card bg-light satta-card my-shadow'>
                              <h5 className='m-0'>{value.name}</h5>
                              <small>{value.time}</small>
                              <div className='card-body'>{value.today_number}</div>
                              <div className='card-footer p-0 mt-2'>
                              <small>Yesterday</small>
                              <h5 className='m-0'>{value.yesterday_number}</h5>
                             </div>
                            </div>
                          </Col>
                    );
         
          });
          
          this.setState({formData:cardData});

            
         }
         
       })
          
    }

     render() {

        return (
     <>
      <section className="section-5">
        <Container fluid>
             <Row>
               {this.state.formData}               
            </Row>
        </Container>
    </section>
  </>
  );
    }
  }
  




