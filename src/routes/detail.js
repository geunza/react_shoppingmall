import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import styled from 'styled-components'
import { addItem } from "./../store.js"
import { useDispatch, useSelector } from "react-redux"

// class Detail2 extends react.Component{
//   componentDidMount(){
//     console.log('mount')
//   }
//   componentDidUpdate(){
//     console.log('update')

//   }
//   componentDidUnMount(){
//     console.log('unmount')
//   }
// }

function Detail(props){
  let {id} = useParams();
  let [count, setCount] = useState(0);
  let [box, setBox] = useState(true);
  let [num, setNum] = useState(0);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');
  id = parseInt(id);
  let item = props.shoes.find(function(x){
    return x.id == id;
  });
  let dispatch = useDispatch();

  useEffect( ()=>{ //mount, update시 실행
    //let timer = setTimeout(()=>{
    //  setBox(!box);
    //}, 2000);
    if(isNaN(num) == true){
      alert('그러지마세요')
      
    }
    return ()=>{
      //clearTimeout(timer);
    }
  }, [box, num, tab] );
  useEffect( ()=>{
    setTimeout(()=>{setFade2('end')}, 100)
  }, [] );

  useEffect( ()=>{
    let watched = localStorage.getItem('watched');
    watched = JSON.parse(watched);
    let result = watched.find(function(x){
      return x == id;
    });
    if(result != undefined){
      let idx = watched.indexOf(result);
      watched.splice(idx, 1);
    }
    watched.unshift(id);
    localStorage.setItem('watched', JSON.stringify(watched));
    props.setRecent(watched);
    console.log(watched)
  }, [] )

  return(
    <div className={'container start '+fade2}>
      {/* <button onClick={()=>{ setCount(count++) }}>{count}</button> */}
      {/* <input type="text" onChange={(e)=>{
        setNum(e.target.value);
      }}/> */}
      <div>
        {
          box == true ? 
          <div className="alert alert-warning">
            2초 이내 구매시 할인
          </div> : 
          null
        }
      </div>
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}원</p>
          <div>
            <button className="btn btn-danger">주문하기</button> 
          </div>
          <div>
            <button className="btn btn-primary" onClick={ ()=>{
              dispatch(addItem({id:item.id, name:item.title, count: 1}))
            } }>장바구니</button> 
          </div>
        </div>
      </div>
      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={ ()=>{setTab(0)} }>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={ ()=>{setTab(1)} }>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={ ()=>{setTab(2)} }>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="tabArea">
        <TabContent tab={tab}/>
      </div>

    </div> 
  )
}
function TabContent(props){
  let [fade, setFade] = useState('');
  useEffect( ()=>{
    setTimeout(()=>{setFade('end')}, 100)
  return() =>{
    setFade('');
  }
  }, [props.tab] );


  return (
    <div className={'start '+fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
    </div>
  );
  // if(props.tab == 0){
  //   return <div>내용0</div>
  // }else if(props.tab == 1){
  //   return <div>내용1</div>
  // }else if(props.tab == 2){
  //   return <div>내용2</div>
  // }
}

export default Detail;