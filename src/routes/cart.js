
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { changeName, addCount, deleteItem } from "./../store.js"

function Cart(){
    let state = useSelector((state) => { return state } )
    let dispatch = useDispatch();
    let items = state.cart;
    return(
        <div>
            <h4>{state.user} 의 장바구니</h4>
            {/* <button onClick={()=>{
                dispatch(changeName())
            }}>버튼임</button>  */}
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((v, i, arr)=>{
                            return(
                                <tr key={i}>
                                    <td>{i} id:{v.id}</td>
                                    <td>{v.name}</td>
                                    <td>{v.count}</td>
                                    <td>
                                        <button onClick={ ()=>{
                                            dispatch(addCount(v.id)) 
                                        } }>+</button>
                                    </td>
                                    <td>
                                        <button onClick={ ()=>{
                                            dispatch(deleteItem(v.id)) 
                                        } }>-</button>
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