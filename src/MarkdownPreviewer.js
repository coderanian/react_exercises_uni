import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import {marked} from "marked";
import DOMPurify from 'dompurify';
import './markdownPreviewer.css';

import React from 'react';

class MarkdownPreviewer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            input: "Enter your markdown document here!\n" +
                "# This is main heading!\n" +
                "\n" +
                "## This is a sub-heading...\n" +
                "### And here's some other cool stuff:\n" +
                "\n" +
                "Heres some code, `<div></div>`, between 2 backticks.\n" +
                "\n" +
                "```\n" +
                "// this is multi-line code:\n" +
                "\n" +
                "function anotherExample(firstLine, lastLine) {\n" +
                "  if (firstLine == '```' && lastLine == '```') {\n" +
                "    return multiLineCode;\n" +
                "  }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "You can also make text **bold**... whoa!\n" +
                "Or _italic_.\n" +
                "Or... wait for it... **_both!_**\n" +
                "And feel free to go crazy ~~crossing stuff out~~.\n" +
                "\n" +
                "There's also [links](https://www.freecodecamp.org), and\n" +
                "> Block Quotes!\n" +
                "\n" +
                "And if you want to get really crazy, even tables:\n" +
                "\n" +
                "Wild Header | Crazy Header | Another Header?\n" +
                "------------ | ------------- | -------------\n" +
                "Your content can | be here, and it | can be here....\n" +
                "And here. | Okay. | I think we get it.\n" +
                "\n" +
                "- And of course there are lists.\n" +
                "  - Some are bulleted.\n" +
                "     - With different indentation levels.\n" +
                "        - That look like this.\n" +
                "\n" +
                "\n" +
                "1. And there are numbered lists too.\n" +
                "1. Use just 1s if you want!\n" +
                "1. And last but not least, let's not forget embedded images:\n" +
                "\n" +
                "![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
        }
        this.parseInput = this.parseInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    parseInput(){
        const htmlParsed = marked.parse(this.state.input);
        const htmlCleaned = DOMPurify.sanitize(htmlParsed, {USE_PROFILES: {html: true}})
        console.log(htmlCleaned)
        return htmlCleaned;
    }

    handleChange(event){
        this.setState({
            input: event.target.value
        });
    }

    render(){
        return(
            <section className="pt-5 pb-5 px-2 py-5 d-flex flex-column align-items-center" style={{background: `${this.props.bgColor}`}}>

                    <textarea className="form-control w-75 bg-light"
                              onChange={this.handleChange}
                              defaultValue={this.state.input}
                              rows="10"
                    >
                    </textarea>

                    <div className="col-6 w-75 p-5 mt-5 bg-white rounded">
                        <div dangerouslySetInnerHTML={{
                            __html: this.parseInput()
                        }}>
                        </div>
                    </div>
            </section>
        )
    }
}

export default MarkdownPreviewer;