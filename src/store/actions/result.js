import axios from "axios"

export const STORE_RESULT='STORE_RESULT'
export const DELETE_RESULT='DELETE_RESULT'
export const MAKE_REQ='MAKE_REQ'

export const store_res=(count)=>{
    return{
        type:STORE_RESULT,
        count
    }
}

// now we handler async store_res 
// just that  we will store result after dispatching the action one second delay
export const store_async =(count)=>{
    return (dispatch)=>{
        setTimeout(() => {
            dispatch(store_res(count))
            
        }, 1000);
    }   
}
export const del_res=(id)=>{
    return{
        type:DELETE_RESULT,
        id
    }
}


const make_req=(activity)=>{
    return{
    type:MAKE_REQ,
    payload:activity
}}

// now let's make a web request
export const req_async=()=>{
     
        return dispatch=>{
            axios.get('https://www.boredapi.com/api/activity').then(response=>{
        let activity=response.data.activity
        console.log(activity);
            dispatch(make_req(activity))
        }).catch(e=>{
            console.log(e);
         })
     }
    

    
}