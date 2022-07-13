import { useState } from "react"
import axios from "axios"
const AxiosTut = props => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    let source = axios.CancelToken.source()

    const fetchHandler = async () => {
        if (source.cancel) {
            // cancel the previous token of axios
            source.cancel()

            source=axios.CancelToken.source()
        }
        try {
            const response = await axios.get(
                "https://reqres.in/api/users/1?delay=2",
                { cancelToken: source.token }
            )
            // update the state
            setResponse(JSON.stringify(response.data))
            setError(null)

        } catch (error) {
            // if user is cancel the request then it is not the error
            
            setResponse(null)
            if (axios.isCancel(error)) {
                console.log(error, 'i am inside if');
                alert(error.message)
                return
            }
            setError(error.message)
            throw Error(error)
        }



    }
    const cancelReqHandler = () => {
        source.cancel('Request is canceled by user!')
    }
    return (
        <div className="container text-center">
            <h1>Axios Cancel Request Example!</h1>
            <div className="text-center my-2 ">
                <button className="btn btn-success btn-lg mx-2" onClick={fetchHandler}>Send Request</button>
                <button className="btn btn-danger btn-lg mx-2" onClick={cancelReqHandler}>Cancel Request</button>
            </div>
            {/* <progress></progress> */}
            <div className="my-2 mt-4">
                    <code className="response bg-dark  text-light p-2  rounded-sm">
                        {error && error}
                        {response && response}
                        {!error && !response && 'No response Yet! Hit the Send Button'}
                    </code>

            </div>

        </div>
    )
}
export default AxiosTut