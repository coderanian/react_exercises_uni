import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';


const CONTROL_KEYS = ["Q","W","E","A","S","D","Z","X","C"];
const SOUNDS_DICTIONARY = {
    "Q": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "W": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "E": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "A": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    "S": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    "D": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "Z": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "X": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    "C": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}

class DrumMachine extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key: null,
            power: false,
            volume: 0,
            sound: SOUNDS_DICTIONARY["Q"],
            recording: false,
            userAudio: [],
            recordingTime: 5,
            recordingPlaying: false
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePowerClick = this.handlePowerClick.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.playAudio = this.playAudio.bind(this);
        this.recordAudio = this.recordAudio.bind(this);
        this.playRecording = this.playRecording.bind(this);
        this.handleRecordingTimeChange = this.handleRecordingTimeChange.bind(this);
    }

    handleKeyPress(event){
        if(this.state.power && !this.state.recordingPlaying){
            if(event.type === 'keydown' && CONTROL_KEYS.includes(String.fromCharCode(event.keyCode))){
                this.setState({
                    key: String.fromCharCode(event.keyCode)
                });
                this.playAudio();
            }
            else if(event.type === 'click'){
                this.setState({
                    key: event.target.value
                });
                this.playAudio();
            }
        }
    }

    playAudio(){
        const audioPlay = document.getElementById(this.state.key);
        audioPlay.volume = this.state.volume/100;
        audioPlay.pause();
        audioPlay.currentTime = 0;
        if(this.state.recording){
            this.setState({userAudio: [...this.state.userAudio, this.state.key]})
        }
        audioPlay.play();
    }

    handlePowerClick(){
        this.setState({
            power: !(this.state.power)
        })
    }

    handleVolumeChange(event){
        if(this.state.power){
            this.setState({
                volume: event.target.value
            })
        }
    }

    recordAudio(){
        this.setState({
            recording: true,
            userAudio: []
        });
        setTimeout(()=>{
            console.log(this.state.userAudio)
            this.setState({
                recording: false
            })
            }, this.state.recordingTime * 1000
        )
    }

    playRecording(){
        this.setState({
            recordingPlaying: !(this.state.recordingPlaying)
        });
        this.playRecordingSound(this.state.userAudio);
    }

    playRecordingSound(sound){
        if(sound.length === 0){
            return (
                this.setState({
                    recordingPlaying: !(this.state.recordingPlaying)
                })
            );
        }else{
            let audioContainer = document.getElementById(sound[0]);
            audioContainer.play();
            audioContainer.onended = () => {
                return this.playRecordingSound(sound.slice(1,));
            }
        }
    }

    handleRecordingTimeChange(event){
        this.setState({
            recordingTime: event.target.value
        })
    }

    render(){
        window.addEventListener("keydown", this.handleKeyPress)
        return(
            <section className="col-xs-1 pt-5 pb-5 px-2 py-5 d-flex flex-column align-items-center" style={{background: `${this.props.bgColor}`}}>
                {CONTROL_KEYS.map((key)=>(
                    <audio id={key}>
                        <source src={SOUNDS_DICTIONARY[key]} type="audio/mpeg"></source>
                    </audio>
                ))}
                <div className="row w-75 gy-5">
                    <div className="col-sm">
                        <div className="row w-100 d-flex justify-content-center">
                            {CONTROL_KEYS.slice(0,3).map((key) =>
                                <div className="col-3 px-0"><button className="btn rounded-0 btn-dark btn-lg w-100" style={{height: "10vh", width: "10vw"}} onClick={this.handleKeyPress} value={key}>{key}</button></div>
                            )}
                        </div>
                        <div className="row w-100 d-flex justify-content-center">
                            {CONTROL_KEYS.slice(3,6).map((key) =>
                                <div className="col-3 px-0"><button className="btn rounded-0 btn-dark btn-lg w-100" style={{height: "10vh", width: "10vw"}} onClick={this.handleKeyPress} value={key}>{key}</button></div>

                            )}
                        </div>
                        <div className="row w-100 d-flex justify-content-center">
                            {CONTROL_KEYS.slice(6,).map((key) =>
                                <div className="col-3 px-0"><button className="btn rounded-0 btn-dark btn-lg w-100" style={{height: "10vh", width: "10vw"}} onClick={this.handleKeyPress} value={key}>{key}</button></div>
                            )}
                        </div>
                    </div>
                    <div className="col-sm">
                        {!this.state.power
                            ? <button onClick={this.handlePowerClick} className="btn btn-success btn-md w-100"><i className="fa fa-power-off"></i></button>
                            : <button onClick={this.handlePowerClick} className="btn btn-danger btn-md w-100"><i className="fa fa-power-off"></i></button>
                        }
                        {this.state.power &&
                            <div className="pt-5">
                                <h4 className="pb-1 text-center w-100">
                                    {!this.state.power
                                        ? "Turn on the drum machine"
                                        : `Volume: ${this.state.volume}`
                                    }
                                </h4>
                                <input className="form-range w-100"
                                       id="volSlider"
                                       type="range"
                                       min="0"
                                       max="101"
                                       value={this.state.volume}
                                       onChange={this.handleVolumeChange}
                                ></input>
                                <button className="btn btn-dark btn-md w-100"
                                        value="0"
                                        onClick={this.handleVolumeChange}
                                >
                                    <i className="fa fa-volume-off"></i>
                                </button>
                                <div className="input-group pt-3">
                                    <span className="input-group-text bg-dark text-white border-dark">Enter recording time in sec.</span>
                                    <input className="form-control text-center border-dark"
                                           type="number"
                                           defaultValue={this.state.recordingTime}
                                           onChange={this.handleRecordingTimeChange}
                                    />
                                </div>
                                <div className="btn-group w-100 pt-3">
                                    <button className="btn btn-dark btn-md "
                                            value="0"
                                            onClick={this.recordAudio}
                                    >
                                        {!this.state.recording ? "New recording" : "Recoding"}
                                    </button>
                                    <button className="btn btn-dark btn-md "
                                            disabled={this.state.userAudio.length == 0 ? true : false}
                                            value="0"
                                            onClick={this.playRecording}
                                    >
                                        {!this.state.recordingPlaying ? "Play recording" : "Playing recoding"}
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default DrumMachine;