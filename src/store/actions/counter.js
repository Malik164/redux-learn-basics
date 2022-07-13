export const INCREMENT='INCREMENT'
export const DECREMENT='DECREMENT'
export const ADD='ADD'
export const SUB='SUB'
export const RESET='RESET'


// creating -------------action creators---------------
export const increment=()=>{
    return{
        type:INCREMENT
    }
}
export const decrement=()=>{
    return{
        type:INCREMENT
    }
}
export const add=()=>{
    return{
        type:ADD,
        payload:5
    }
}
export const sub=()=>{
    return{
        type:SUB,
        payload:5
    }
}

export const reset=()=>{
    return{
        type:RESET
    }
}