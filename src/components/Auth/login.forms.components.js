import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { cache } from "../../App";
import Loading from "react-loading-components";
import { createCookie } from "./../Token";
import { IS_LOGGED_IN } from "./../NavBar/nav.component";
import { onError } from "apollo-link-error";

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
            name: "",
            loginError: ""
        };
    }
    _confirm = data => {
        createCookie("jwt-token", data.tokenAuth.token, 3);
        cache.writeData({
            data: {
                isLoggedIn: true
            }
        });
        this.props.closeModal();
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
                    <p className="help-inline text-danger">
                        {this.state.loginError}
                    </p>
                    <label htmlFor="exampleInputEmail1">Username</label>
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
                        refetchQueries={[{ query: IS_LOGGED_IN }]}
                        onError={error =>
                            this.setState({
                                loginError: error.graphQLErrors.map(
                                    ({ message }, i) => (
                                        <span key={i}>{message}</span>
                                    )
                                )
                            })
                        }
                    >
                        {(mutation, { loading }) => {
                            if (loading)
                                return (
                                    <Loading
                                        type="tail_spin"
                                        width={10}
                                        height={10}
                                        fill="#f44242"
                                    />
                                );

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
