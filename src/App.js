import './App.css'
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import bg from './bg.png'
import data from './data.js'
import {a, b} from './data2.js'
import Detail from './routes/detail.js'
import { useState } from 'react'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
    {/* <div>{a}</div>
    <div>{b}</div> */}
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/event')}}>Event</Nav.Link>
        </Nav>
        <Link to="/">Home</Link>
        <Link to="/detail">Detail</Link>
        </Container>
      </Navbar>
      

      <Routes >
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map(function(v, i, arr){
                    return <Card v={v} i={i} key={i}/>
                  })
                }
              </div>
            </div>
          </>
        }></Route>

        <Route path="/detail/:id" element={
          <Detail shoes={shoes}/>
            // <Detail shoes={shoes}></Detail>
        }></Route>
        

        <Route path="/about" element={
          <>
            <button onClick={()=>{navigate('/about/member')}}>member</button>
            <button onClick={()=>{navigate('/about/location')}}>location</button>
            <About></About>
          </>
        }>
          <Route path="member" element={
            <div>멤버임</div>
          }></Route>
          <Route path="location" element={
            <div>위치임</div>
          }></Route>
          
        
        </Route>

        <Route path="event" element={<Event></Event>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}>

          </Route>
          <Route path="two" element={<p>생일기념 쿠폰 받기</p>}>

          </Route>
        </Route>
        <Route path="*" element={<div>404 NOT FOUND </div>}>
        </Route>
      </Routes>

    </div>
  );
}
function Card(props){
  return(
    <div className="col-md-4">
      <Link to={`/detail/${props.i}`}>
        <img src={`https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`} width="80%" />
      </Link>
      <h4>{props.v.title}</h4>
      <p>{props.v.price}</p>
    </div>
  )
}
function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}
function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}
export default App;
