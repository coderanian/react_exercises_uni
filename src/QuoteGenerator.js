import './quoteGenerator.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'font-awesome/css/font-awesome.min.css'

import React from 'react';

const QUOTE_CATEGORIES = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success"
]

class QuoteGenerator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            category:"",
            quote: ""
        };
        this.fetchQuote = this.fetchQuote.bind(this);
        this.handleCategorySelection = this.handleCategorySelection.bind(this);
    }
    fetchQuote(){
        let url = "https://api.api-ninjas.com/v1/quotes";
        if(this.state.category !== ""){
            url += ("?category="+this.state.category);
        }
        console.log(url);
        fetch(url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.REACT_APP_API_KEY_QUOTES
                },
            })
            .then((response) => response.json())
            .then((data) => {
              console.log("Received: ", data);
              this.setState({
                  quote: data[0]
              });
            })
            .catch((error) => {
                console.error("Error: ", error);
            });

    }
    handleCategorySelection(event){
        this.setState({
            category: event.target.value
        })
    }
    render(){
        return (
            <section className="col-xs-1 pt-5 pb-5 px-2 py-5 d-flex flex-column align-items-center" style={{background: `${this.props.bgColor}`}}>
                <select className="form-select w-75"
                        aria-label="Quote Category"
                        onChange={this.handleCategorySelection}
                >
                    <option selected disabled>Choose quote category</option>
                    {QUOTE_CATEGORIES.map((category) =>
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase()+category.slice(1)}
                        </option>)}
                </select>

                {this.state.quote !== "" &&
                    <div className="p-5 mt-5 w-75 bg-white rounded">
                        <h3 className="fst-italic text-start">
                            <i className="fa fa-quote-left"></i> {this.state.quote.quote} <i className="fa fa-quote-right"></i>
                        </h3>
                        <h5 className="text-end pt-2">- {this.state.quote.author}</h5>
                    </div>
                }

                {this.state.category !== ""
                    ? <button onClick={this.fetchQuote} className="mt-3 btn btn-dark btn-md w-75">Get me a new {this.state.category} quote</button>
                    : <button onClick={this.fetchQuote} className="mt-3 btn btn-dark btn-md w-75">Get me a new random quote</button>
                }

                {this.state.quote !== "" &&
                    <div className="btn-group w-75 pt-2">
                        <button className="btn btn-dark w-25"><i className="fa fa-twitter"></i></button>
                        <button className="btn btn-dark w-25"><i className="fa fa-tumblr"></i></button>
                    </div>
                }
            </section>
        )
    }
}

export default QuoteGenerator;