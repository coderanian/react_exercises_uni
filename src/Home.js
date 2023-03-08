import React, {useState} from 'react';
import ReactDOM from "react-dom/client";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <section className="text-center pb-5 d-flex align-items-center justify-content-center" style={{background: `${this.props.bgColor}`}}>
                <div className="px-5 pb-5">
                    <h1>Welcome to my React projects!</h1>
                    <h3 className="pt-3">Feel free to browse via the navbar. :)</h3>
                    <h3 className="pt-1">More projects available on my <a href="https://github.com/wrigglingmoray">GitHub</a>.</h3>
                </div>
            </section>
        )
    }
}

export default Home;