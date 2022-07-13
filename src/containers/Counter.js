import React, { Component} from 'react'
import { connect } from 'react-redux'
import * as actionCreator from "../store/main"

class Counter extends Component {
    render() {
        return (
            <div className="container p-2 text-center">
                <h1 className="bg-info text-light rounded p-1 text-center my-2 w-25 mx-auto">Counter</h1>
                <div>
                    <p className=" text-center display-1">
                        {this.props.count}
                    </p>
                    <div className="d-flex justify-content-center">
                        <button className="mx-2 btn btn-info"
                        onClick={this.props.increment}
                        >INCREMENT</button>
                        <button className="mx-2 btn btn-info"
                        onClick={this.props.decrement}
                        >DECREMENT</button>
                        <button className="mx-2 btn btn-info"
                        onClick={this.props.add}
                        >ADD 5</button>
                        <button className="mx-2 btn btn-info"
                        onClick={this.props.sub}
                        >SUB 5</button>
                        <button className="mx-2 btn btn-info"
                        onClick={this.props.reset}
                        >RESET</button>
                    </div>

                    <button className="btn-success btn-lg my-2"
                        onClick={this.props.store_result.bind(null,this.props.count)}
                        >Store Result</button>
                    <hr />
                    <table className="table text-center table-stripped table-responsive w-25 mx-auto table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Result</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.results.map((result,index)=>(
                                <tr key={result.id}>
                                <td>{index+1}</td>
                                <td>{result.value}</td>
                                <td>
                                    <button className="btn btn-outline-danger btn-sm"
                                    onClick={this.props.delete_result.bind(null,result.id)}
                                    >&times;</button>
                                </td>
                            </tr>
                            ))}
                            
                            
                        </tbody>
                    </table>
                </div>

                <hr />
                <div className="my-2 text-center">
                    <button className="btn btn-primary btn-lg"
                    onClick={this.props.make_req}
                    
                    >Getting Bored, Do Something</button>
                </div>
                <div className="w-75 mx-auto p-2 bg-success text-light rounded shadow">
                   <p className='display-5'>
                    {this.props.activity}
                    </p> 
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    // here you can extract the desried the props you  want to extract from whole state
    return({
    count:state.ctr.count,
    results:state.rsr.results,
    activity:state.rsr.activity
})}
// there are many ways to use dispatches first without binder function the tedious one's
// const test=()=>dispatch({
//     type:'TEST'
// })
const mapDispatchToProps=dispatch=>{
    // each field will beocomes props
    return {
        increment:()=> dispatch(actionCreator.increment()),
        decrement:()=> dispatch(actionCreator.decrement()),
        add:()=> dispatch(actionCreator.add()),
        sub:()=> dispatch(actionCreator.sub()),
        reset:()=>dispatch(actionCreator.reset()),
        store_result:(count)=>dispatch(actionCreator.store_async(count)),
        delete_result:id=>dispatch(actionCreator.del_res(id)),
        make_req:()=>dispatch(actionCreator.req_async())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Counter)
