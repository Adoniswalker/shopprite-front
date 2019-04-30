import React, { Fragment } from "react";
import "./navCss.scss";
import AuthenticationComponent from "./../Login/login.modal.component";
export class NavBar extends React.Component {
    state = {
        render: false
    };
    render_modal = () => {
        this.setState({ render: !this.state.render });
    };
    render() {
        return (
            <Fragment>
                <div className="navbar navbar-expand-lg first-nav">
                    <ul className="navbar-nav mr-auto text-dark">
                        <li className="nav-item mr-4">
                            Hi!
                            <button
                                type="button"
                                onClick={() => this.render_modal()}
                                className="btn btn-link"
                            >
                                Sign in
                            </button>{" "}
                            or
                            <button type="button" className="btn btn-link">
                                Register
                            </button>
                            {this.state.render && (
                                <AuthenticationComponent openModel={true} />
                            )}
                        </li>
                        <li>
                            <a className="nav-link" href="#">
                                Daily Deals
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#">
                                sell
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#">
                                Help and contact
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav justify-content-center text-dark">
                        <li>
                            <a className="nav-link" id="float-right" href="">
                                GBP
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="float-right" href="">
                                Your Bag
                            </a>
                        </li>
                    </ul>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark second-nav">
                    <a className="navbar-brand" href="#">
                        SHOPMATE
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon" />
                    </button>
                    <div
                        class="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul class="navbar-nav mr-auto mx-auto text-white">
                            <li className="nav-item">
                                <a href="#test1" className="nav-link">
                                    Women
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="active nav-link" href="#test2">
                                    Men{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#test3" className="nav-link">
                                    Kids
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#test4" className="nav-link">
                                    Shoes
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#test4" className="nav-link">
                                    Brands
                                </a>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <input
                                class="form-control mr-sm-2 search-btn"
                                type="search"
                                placeholder="Search anything"
                                aria-label="Search"
                            />
                        </form>
                    </div>
                </nav>
            </Fragment>
        );
    }
}
