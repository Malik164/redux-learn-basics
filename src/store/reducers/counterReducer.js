import * as actionTypes from "../actions/counter"
import { updateObject } from "../utility"
const initialState={
    count:0,
}
const counterReducer=(state=initialState,action)=>{

    // update the counter state if dispatch is called
    switch (action.type) {
        case actionTypes.INCREMENT:
            return updateObject(state,{count:state.count+1})
        case actionTypes.DECREMENT:
            return updateObject(state,{count:state.count-1})
        case actionTypes.ADD:
            return updateObject(state,{count:state.count+action.payload})
            case actionTypes.SUB:
                return updateObject(state,{count:state.count-action.payload})
        case actionTypes.RESET:
            return updateObject(state,{count:0})
       

        default:
            return state
    }

}

export default counterReducer