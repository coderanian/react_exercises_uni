import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import QuoteGenerator from "./QuoteGenerator";
import { Outlet, Link } from "react-router-dom";
import './appNavbar.css'
import 'font-awesome/css/font-awesome.min.css';

const COMPONENTS = ["Quote Generator", "Markdown Previewer", "Drum Machine", "Calculator", "Timer"];
class AppNavbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(){
        this.setState({
            collapsed: !(this.state.collapsed)
        })
    }

    render() {
        return(
            <body>
                <header className="fixed-top">
                    <nav className="navbar
                                navbar-expand-lg
                                navbar-dark
                                bg-dark
                                pt-2
                                pb-2
                                px-4
                                py-4"
                    >
                        <Link className="navbar-brand"
                              to="/"
                        >
                            React projects
                        </Link>
                        <button className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbar"
                                aria-controls="navbar"
                                aria-expanded={this.state.collapsed ? true : false}
                                aria-label="Toggle navigation"
                                onClick={this.handleToggle}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`navbar-collapse ${this.state.collapsed ? "collapse" : ""}`}
                             id="navbar"
                        >
                            <div className="navbar-nav">
                                {COMPONENTS.map((component) => (
                                    <Link className="nav-item nav-link"
                                          to={`/${component.replace(/\s/g,"")}`}
                                          key={component}
                                          onClick={this.handleToggle}
                                    >
                                        {component}
                                    </Link>
                                ))
                                }
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <Outlet />
                </main>
                <footer className="text-center bg-dark">
                    <p className="m-0 text-light">Designed and coded by wrigglingmoray</p>
                    <a className="link-light" href="https://github.com/wrigglingmoray"><i className="fa fa-lg fa-github"></i></a>
                </footer>
            </body>
        )
    }
}

export default AppNavbar;