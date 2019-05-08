import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { cache } from "../../App";
import Loading from "react-loading-components";

const LOGIN_MUTATION = gql`
    mutation loginMutation($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`;

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true, // switch between Login and SignUp
            email: "",
            username: "",
            password: "",
            name: ""
        };
    }
    // state = {};
    _confirm = data => {
        this.createCookie("jwt-token", data.tokenAuth.token, 3);
        cache.writeData({
            data: {
                isLoggedIn: true
            }
        });
        this.props.closeModal();
    };
    createCookie = (name, value, days) => {
        let expires;
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        let cookie = name + "=" + value + expires;
        document.cookie = cookie;
        return cookie;
    };
    render() {
        const { login, email, password, username } = this.state;

        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="name"
                        value={username}
                        onChange={e =>
                            this.setState({ username: e.target.value })
                        }
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e =>
                            this.setState({ password: e.target.value })
                        }
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <div>
                    <Mutation
                        mutation={LOGIN_MUTATION}
                        variables={{ username, password }}
                        onCompleted={data => this._confirm(data)}
                    >
                        {(mutation, { loading, error }) => {
                            if (loading)
                                return (
                                    <Loading
                                        type="tail_spin"
                                        width={10}
                                        height={10}
                                        fill="#f44242"
                                    />
                                );
                            if (error) {
                                console.log(error);
                                console.log(error.message);
                            }

                            return (
                                <button
                                    className="btn btn-primary"
                                    onClick={mutation}
                                >
                                    {"login"}
                                </button>
                            );
                        }}
                    </Mutation>
                    {login
                        ? "need to create an account?"
                        : "already have an account?"}
                </div>
            </form>
        );
    }
}
