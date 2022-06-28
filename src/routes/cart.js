
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { changeName } from "./../store.js"

function Cart(){
    let state = useSelector((state) => { return state } )
    let dispatch = useDispatch();

    console.log(state)
    let items = state.cart;
    return(
        <div>
            <h4>{state.user} 의 장바구니</h4>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((v, i, arr)=>{
                            return(
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{v.name}</td>
                                    <td>{v.count}</td>
                                    <td>
                                    <button onClick={()=>{
                                        dispatch(changeName())
                                    }}>버튼임</button> 
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}
export default Cart;