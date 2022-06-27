import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
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
  id = parseInt(id);
  let item = props.shoes.find(function(x){
    return x.id == id;
  });

  useEffect( ()=>{ //mount, update시 실행
    let timer = setTimeout(()=>{
      setBox(!box);
    }, 2000);
    if(isNaN(num) == true){
      alert('그러지마세요')
      
    }
    return ()=>{
      clearTimeout(timer);
    }
  }, [box, num] );

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
    </div> 
  )
}


export default Detail;