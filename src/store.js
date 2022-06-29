import { current, configureStore, createSlice } from '@reduxjs/toolkit'


let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        addCount(state, action){
            let result = state.find(function(x){
                return x.id == action.payload;
            });
            console.log(current(result));
            result.count++;
        },
        deleteItem(state, action){
            let result = state.find(function(x){
                return x.id == action.payload;
            });
            console.log(current(result));
            result.count++;
        },
    }
});
export let {addCount} = cart.actions;

let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
        changeName(state){
            return 'john ' + state
        }
    }
});
export let { changeName } = user.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer,
   }
}) 