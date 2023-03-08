import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';

const MATH_OPERATIONS = ["+", "-", "/", "*"]
const NUMBER_REGEX = /^-?(?!0[0-9])[0-9]+(?:\.[0-9]*)?$/;
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //Full equatopn as string
            currentEquation: "",
            //Current result of equation
            current: "",
            //Current int or float operand
            number: ""
        }
        this.handleOperator = this.handleOperator.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleOperand = this.handleOperand.bind(this);
    }

    handleOperator(event){
        if(this.state.number.length > 0){
            if(MATH_OPERATIONS.slice(0,4).includes(this.state.currentEquation.slice(-1))){
                this.setState({
                    currentEquation: this.state.currentEquation.slice(0,-1).concat(event.target.value),
                    current: event.target.value
                })
            }else{
                this.setState({
                    currentEquation: this.state.currentEquation.concat(event.target.value),
                    //number ends with the valid operand entry
                    number: "",
                    current: event.target.value
                });
            }
        }else if(this.state.number.length === 0 || NUMBER_REGEX.test(this.state.number.concat(event.target.value))){
            this.setState({
                currentEquation: this.state.currentEquation.concat(event.target.value),
                number: this.state.number.concat(event.target.value),
                current: event.target.value
            });
        }
    }

    handleClear(){
        this.setState({current: "", currentEquation: "", number: ""});
    }

    handleResult(){
        //Disable possibility to enter >1 operators in equation with two operands
        if(!MATH_OPERATIONS.includes(this.state.currentEquation.slice(-1))){
            this.setState({current: eval(this.state.currentEquation.replace("--","-"))})
        }
    }

    handleOperand(event){
        if(this.state.number.length === 0 || NUMBER_REGEX.test(this.state.number.concat(event.target.value))){
            this.setState({
                currentEquation: this.state.currentEquation.concat(event.target.value),
                number: this.state.number.concat(event.target.value),
                current: event.target.value
            });
        }
    }


    render(){
        return(
            <section className="col-xs-1 pt-5 pb-5 px-2 py-5 d-flex flex-column align-items-center" style={{background: `${this.props.bgColor}`}}>
                <div className="w-75 rounded p-5" style={{background: "gray", border: "1px solid black"}}>
                    <h5 className="text-end text-white pb-2">HAL 9000</h5>
                    <div className="row border border-dark" style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                        <div className="border px-3  h-100 text-start bg-white align-middle" style={{minHeight: "3vh", paddingTop: 3, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                            {this.state.currentEquation}
                        </div>
                        <div className="border px-3  h-100 text-end bg-white align-middle" style={{minHeight: "3vh", paddingTop: 3}}>
                            {this.state.current}
                        </div>
                    </div>
                    <div className="row text-center border-dark" style={{borderTop:"none", borderBottom:"1px black solid", borderRight:"1px black solid", borderLeft:"1px black solid"}}>
                        <div className="col-9 px-0"><button onClick={this.handleClear} className="btn btn-md btn-danger w-100 rounded-0" value="AC">AC</button></div>
                        <div className="col-3 px-0"><button onClick={this.handleOperator} className="btn btn-md btn-warning w-100 rounded-0" value={MATH_OPERATIONS[2]} style={{borderLeft:"1px black solid"}}>{MATH_OPERATIONS[2]}</button></div>
                    </div>

                    <div className="row text-center" style={{borderTop:"none", borderBottom:"1px black solid", borderRight:"1px black solid", borderLeft:"1px black solid"}}>
                        {NUMBERS.slice(-3,).map(number => (
                            <div className="col-3 px-0"><button onClick={this.handleOperand} className="btn  btn-md btn-dark w-100 rounded-0" value={number}>{number}</button></div>
                        ))}
                        <div className="col-3 px-0"><button onClick={this.handleOperator} className="btn btn-md  btn-warning w-100 rounded-0" value={MATH_OPERATIONS[1]} style={{borderLeft:"1px black solid"}}>{MATH_OPERATIONS[1]}</button></div>
                    </div>

                    <div className="row text-center" style={{borderTop:"none", borderBottom:"1px black solid", borderRight:"1px black solid", borderLeft:"1px black solid"}}>
                        {NUMBERS.slice(-6,-3).map(number => (
                            <div className="col-3 px-0"><button onClick={this.handleOperand} className="btn  btn-md btn-dark w-100 rounded-0" value={number}>{number}</button></div>
                        ))}
                        <div className="col-3 px-0"><button onClick={this.handleOperator} className="btn  btn-md btn-warning w-100 rounded-0" value={MATH_OPERATIONS[0]} style={{borderLeft:"1px black solid"}}>{MATH_OPERATIONS[0]}</button></div>
                    </div>

                    <div className="row text-center" style={{borderTop:"none", borderBottom:"1px black solid", borderRight:"1px black solid", borderLeft:"1px black solid"}}>
                        {NUMBERS.slice(-9,-6).map(number => (
                            <div className="col-3 px-0"><button onClick={this.handleOperand} className="btn  btn-md btn-dark w-100 rounded-0" value={number}>{number}</button></div>
                        ))}
                        <div className="col-3 px-0"><button onClick={this.handleOperator} className="btn  btn-md btn-warning w-100 rounded-0" value={MATH_OPERATIONS[3]} style={{borderLeft:"1px black solid"}}>{MATH_OPERATIONS[3]}</button></div>
                    </div>

                    <div className="row text-center" style={{borderBottom: "1px black solid", borderRight: "1px black solid", borderLeft:"1px black solid" , borderBottomRightRadius: 5, borderBottomLeftRadius: 5}} >
                        <div className="col-6 px-0"><button onClick={this.handleOperand} className="btn btn-md btn-dark w-100" value="0" style={{borderRadius: 0, borderBottomLeftRadius: "5px"}}>0</button></div>
                        <div className="col-3 px-0"><button onClick={this.handleOperand} className="btn  btn-md btn-dark w-100 rounded-0" value=".">.</button></div>
                        <div className="col-3 px-0"><button onClick={this.handleResult} className="btn  btn-md btn-warning w-100" value="=" style={{borderLeft:"1px black solid", borderRadius: 0, borderBottomRightRadius: "5px"}}>=</button></div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Calculator;