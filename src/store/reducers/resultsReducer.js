import * as actionTypes from "../actions/result"
import { updateObject } from "../utility"
const initialState={
    results:[],
    activity:''
}


function filterResults(results,action) {
    return{
        results:results.filter(result=>result.id!==action.id)
    }
}
const resultsReducer=(state=initialState,action)=>{

    // update the counter state if dispatch is called
    switch (action.type) {
        // store the results in array
        case actionTypes.STORE_RESULT:
            let updateProps={
                results:[...state.results,{id:'fx'+(Math.random()*100),value:action.count}]
            }
            return updateObject(state,updateProps)
           
        // store the results in array
        case actionTypes.DELETE_RESULT:
            return updateObject(state,filterResults(state.results,action))
        case actionTypes.MAKE_REQ:
            return updateObject(state,{activity:action.payload})

        default:
            return state
    }

}

export default resultsReducer