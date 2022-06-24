import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import bg from './bg.png'
import data from './data.js'
import { useState } from 'react';

function App() {
  let [shoes, setShoes] = useState(data);
  let [shoes_title, setShoes_title] = useState([]);
  let [shoes_price, setShoes_price] = useState([]);


  return (
    <div>
      <div className="main-bg"></div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <div>
        
      </div>
      <div className="container">
        <div className="row">
          {
            shoes.map(function(v, i, arr){
              return <Card v={v} i={i}/>
            })
          }
        </div>
      </div>
    </div>
  );
}
function Card(props){
  return(
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`} width="80%" />
      <h4>{props.v.title}</h4>
      <p>{props.v.price}</p>
    </div>
  )
}
export default App;
