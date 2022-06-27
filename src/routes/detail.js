import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import styled from 'styled-components'

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
  id = parseInt(id);
  let item = props.shoes.find(function(x){
    return x.id == id;
  });

  useEffect( ()=>{ //mount, update시 실행
    //let timer = setTimeout(()=>{
    //  setBox(!box);
    //}, 2000);
    console.log(tab);
    if(isNaN(num) == true){
      alert('그러지마세요')
      
    }
    return ()=>{
      //clearTimeout(timer);
    }
  }, [box, num, tab] );

  return(
    <div className="container">
      <button onClick={()=>{ setCount(count++) }}>{count}</button>
      <input type="text" onChange={(e)=>{
        setNum(e.target.value);
      }}/>
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
          <button className="btn btn-danger">주문하기</button> 
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
  return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab];
  // if(props.tab == 0){
  //   return <div>내용0</div>
  // }else if(props.tab == 1){
  //   return <div>내용1</div>
  // }else if(props.tab == 2){
  //   return <div>내용2</div>
  // }
}

export default Detail;