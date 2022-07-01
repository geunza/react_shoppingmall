import './App.css'
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import bg from './bg.png'
import data from './data.js'
import {a, b} from './data2.js'
import Detail from './routes/detail.js'
import Cart from './routes/cart.js'
import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(2);
  let [btn, setBtn] = useState(true);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let watched = JSON.parse(localStorage.getItem('watched'));
  let [recent, setRecent] = useState([]);
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{return a.data})
  );
  console.log(result);

  useEffect( ()=>{
    let localWatched = localStorage.getItem('watched');
    if(localWatched == null){
      localStorage.setItem('watched', JSON.stringify( [] ));
    }else{
      let localData = JSON.parse(localStorage.getItem('watched'));
      setRecent(localData);
    }

  }, [] );
  return (
    <div className="App">
      {
        loading == true ? 
          <div>로딩중입니다.</div> :
          null
      }
      {
        btn == true ? 
          <button onClick={()=>{
            setLoading(true);
            axios.get(`https://codingapple1.github.io/shop/data${count}.json`).then((res)=>{
              let copy = [...shoes, ...res.data];
              setShoes(copy);
              setCount(count + 1);
              setLoading(false);
            }).catch(()=>{
              alert('마지막 입니다.');
              setBtn(!btn);
              setLoading(false);
            })
          }}>더 끌고오기</button> :
          null
      }

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
          <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
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
            <Recent recent={recent} data={data}></Recent>
          </>
        }></Route>

        <Route path="/detail/:id" element={
          <Detail shoes={shoes} setRecent={setRecent}/>
            // <Detail shoes={shoes}></Detail>
        }></Route>
        
        <Route path="/cart" element={
          <>
            <Cart></Cart>
          </>
        }>
          

        </Route>

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
function Recent(props){
  if(props.recent.length > 0){
    return (
      <div className="recentItems">
        <h4>최근 본 상품</h4>
        <ul>
          {
            props.recent.map(function(v, i, arr){
              let result = data.find(function(x){
                return x.id == v;
              });
              return(
                <li>
                  <p>{result.title}</p>
                  <p>{result.price}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default App;
