import React, { Fragment } from "react";
import "./navCss.scss";
import AuthenticationComponent from "./../Login/login.modal.component";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import { removeCookie } from "../../components/Token";

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

export default function LogoutButton() {
    return (
        <ApolloConsumer>
            {client => (
                <div
                    className="logout-btn text-danger"
                    onClick={() => {
                        client.writeData({ data: { isLoggedIn: false } });
                        removeCookie("jwt-token");
                    }}
                >
                    Logout
                </div>
            )}
        </ApolloConsumer>
    );
}

const Auth = props => {
    return (
        <Fragment>
            Hi!
            <button
                type="button"
                onClick={() => props.render_modal()}
                className="btn btn-link"
            >
                Sign in
            </button>{" "}
            or
            <button type="button" className="btn btn-link">
                Register
            </button>
            {props.render && <AuthenticationComponent openModel={true} />}
        </Fragment>
    );
};

const User = () => {
    return (
        <p className="nav-link">
            Hi! Dennis Ngeno <LogoutButton />
        </p>
    );
};
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
                            <Query query={IS_LOGGED_IN}>
                                {({ data }) =>
                                    data.isLoggedIn ? (
                                        <User />
                                    ) : (
                                        <Auth
                                            render={this.state.render}
                                            render_modal={this.render_modal}
                                        />
                                    )
                                }
                            </Query>
                        </li>
                        <li>
                            <a className="nav-link" href="#dennis">
                                Daily Deals
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#walker">
                                sell
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#walker">
                                Help and contact
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav justify-content-center text-dark">
                        <li>
                            <a
                                className="nav-link"
                                id="float-right"
                                href="#wajdsj"
                            >
                                GBP
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                id="float-right"
                                href="#demmis"
                            >
                                Your Bag
                            </a>
                        </li>
                    </ul>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark second-nav">
                    <a className="navbar-brand" href="#new">
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
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto mx-auto text-white">
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
                        <form className="form-inline my-2 my-lg-0">
                            <input
                                className="form-control mr-sm-2 search-btn"
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
