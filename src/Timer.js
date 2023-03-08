import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import bleepSound from './bleep.mp3';
import 'font-awesome/css/font-awesome.min.css'
import React from 'react';

let interval;

class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //Button Inputs need to be separate states to stay unchanged during active timer
            sessionInput: 25,
            breakInput: 5,
            //Seconds used for actual timer
            sessionSec: 25*60,
            breakSec: 5*60,
            running: false
        }
        this.handleSessionChange = this.handleSessionChange.bind(this);
        this.handleBreakChange = this.handleBreakChange.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.secToStr = this.secToStr.bind(this);
        this.alarmSound = React.createRef();

    }

    handleSessionChange(event) {
        if(this.state.sessionInput + parseInt(event.target.value) >= 1) {
            this.setState({
                sessionInput:  this.state.sessionInput + parseInt(event.target.value),
                sessionSec: this.state.sessionSec + parseInt(event.target.value)*60
            })
        }
    }

    handleBreakChange(event) {
        if(this.state.breakInput + parseInt(event.target.value) >= 1) {
            this.setState({
                breakInput: this.state.breakInput + parseInt(event.target.value),
                breakSec: this.state.breakSec + parseInt(event.target.value)*60
            })
        }
    }

     handleStart(){
         this.setState({
             running: !(this.state.running)
         });
         if(this.state.sessionSec > 0){
             this.runSession();
         }else{
             this.runBreak();
         }
     }

     runSession(){
         this.alarmSound.current.play();
         interval = setInterval(() => {
             //<= due to asynchronous runtime of setState
             if(this.state.sessionSec <= 0) {
                 clearInterval(interval);
                 this.setState({
                     breakSec: this.state.breakInput * 60
                 });
                 this.runBreak();
             }
             this.setState({
                 sessionSec: this.state.sessionSec - 1
             })
         }, 1000);
     }

     runBreak(){
         this.alarmSound.current.play();
         interval = setInterval(() => {
             //<= due to asynchronous runtime of setState
             if(this.state.breakSec <= 0) {
                 clearInterval(interval);
                 this.setState({
                     sessionSec: this.state.sessionInput * 60
                 });
                 this.runSession();
             }
             this.setState({
                 breakSec: this.state.breakSec - 1
             })
         }, 1000);
     }

     handlePause(){
         clearInterval(interval);
         this.setState({
             running: !(this.state.running)
         });
     }

     handleReset(){
         clearInterval(interval);
         this.setState({
             sessionInput: 25,
             sessionSec: 25*60,
             breakInput: 5,
             breakSec: 5*60,
             running: !(this.state.running)
         });
     }

    secToStr(){
        if(this.state.sessionSec < 0){
            return new Date(this.state.breakSec*1000).toISOString().slice(11,19);
        }else{
            return new Date(this.state.sessionSec*1000).toISOString().slice(11,19);
        }

    }

    render(){
        return(
            <section className="text-center d-flex flex-column align-items-center" style={{background: `${this.props.bgColor}`}}>
                <div className="row pt-5 w-75 gy-3">
                    <div className="col">
                        <h4>Break Length</h4>
                        <div className="btn-group bg-dark">
                            <button type="button"
                                    onClick={this.handleBreakChange}
                                    value={-1}
                                    className="btn btn-dark"
                                    disabled={this.state.running ? true : false}
                            >
                                <i className="fa fa-minus"></i>
                            </button>
                            <h5 className="text-white px-5" style={{paddingTop: 5}}>{this.state.breakInput}</h5>
                            <button type="button"
                                    onClick={this.handleBreakChange}
                                    value={1}
                                    className="btn btn-dark"
                                    disabled={this.state.running ? true : false}
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <h4>Sesson Length</h4>
                        <div className="btn-group bg-dark">
                            <button type="button"
                                    onClick={this.handleSessionChange}
                                    value={-1}
                                    className="btn btn-dark"
                                    disabled={this.state.running ? true : false}
                            >
                                <i className="fa fa-minus"></i>
                            </button>
                            <h5 className="text-white px-5" style={{paddingTop: 5}}>{this.state.sessionInput}</h5>
                            <button type="button"
                                    onClick={this.handleSessionChange}
                                    value={1}
                                    className="btn btn-dark"
                                    disabled={this.state.running ? true : false}
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="rounded p-4 mt-5 w-75 bg-white">
                    <audio ref={this.alarmSound}>
                        <source src={bleepSound} type="audio/mpeg"></source>
                    </audio>
                    {this.state.sessionSec > 0
                        ? <div className="text-center">
                            <h4>Session</h4>
                            <h1 className={`${this.state.running && this.state.sessionSec < 60 ? "text-danger" : ""}`}>
                                {this.secToStr()}
                            </h1>
                        </div>
                        : <div className="text-center">
                            <h4>Break</h4>
                            <h1 className={`${this.state.running && this.state.breakSec < 60 ? "text-danger" : ""}`}>
                                {this.secToStr()}
                            </h1>
                        </div>
                    }
                    <div className="pt-3 btn-group w-50" role="group" aria-label="controls">
                        <button type="button"
                                onClick={this.handleStart}
                                className="btn btn-dark"
                                disabled={this.state.running ? true : false}
                        >
                            <i className="fa fa-play"></i>
                        </button>
                        <button type="button"
                                onClick={this.handlePause}
                                disabled={this.state.running ? false : true}
                                className="btn btn-dark"
                        >
                            <i className="fa fa-pause"></i>
                        </button>
                        <button type="button"
                                onClick={this.handleReset}
                                disabled={this.state.running ? false : true}
                                className="btn btn-dark"
                        >
                            <i className="fa fa-repeat"></i>
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}

export default Timer;