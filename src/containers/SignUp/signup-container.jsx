import React from "react";
import { Mutation } from "react-apollo";
import Loading from "react-loading-components";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
    mutation loginMutation($username: String!, $password: String!) {
        createUser(
            input: {
                username: "walker"
                email: "dennisngeno@hotmail.com"
                password: "dennishhsdb"
                firstName: "dennis"
            }
        ) {
            user {
                username
                email
                password
                firstName
            }
        }
    }
`;

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FullName: "",
            email: "",
            username: "",
            password: "",
            password_confirm: ""
        };
    }
    render() {
        const {
            FullName,
            email,
            username,
            password,
            password_confirm
        } = this.state;

        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div className="form-group row">
                    <label
                        htmlFor="full_name_id"
                        className="col-sm-4 col-form-label"
                    >
                        Full Name
                    </label>
                    <div class="col-sm-8">
                        <input
                            type="name"
                            value={FullName}
                            onChange={e =>
                                this.setState({ FullName: e.target.value })
                            }
                            className="form-control"
                            id="full_name_id"
                            placeholder="Full name e.g Joe Doe"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="username-id"
                        className="col-sm-4 col-form-label"
                    >
                        Username
                    </label>
                    <div class="col-sm-8">
                        <input
                            type="name"
                            value={username}
                            onChange={e =>
                                this.setState({ username: e.target.value })
                            }
                            className="form-control"
                            id="username-id"
                            placeholder="Username"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="email_id"
                        className="col-sm-4 col-form-label"
                    >
                        Email
                    </label>
                    <div class="col-sm-8">
                        <input
                            type="name"
                            value={email}
                            onChange={e =>
                                this.setState({ email: e.target.value })
                            }
                            className="form-control"
                            id="email_id"
                            placeholder="Enter email"
                        />
                    </div>
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="password"
                        className="col-sm-4 col-form-label"
                    >
                        Password
                    </label>
                    <div class="col-sm-8">
                        <input
                            type="password"
                            value={password}
                            onChange={e =>
                                this.setState({ password: e.target.value })
                            }
                            className="form-control"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="confirm_password"
                        className="col-sm-4 col-form-label"
                    >
                        Confirm Password
                    </label>
                    <div class="col-sm-8">
                        <input
                            type="password"
                            value={password_confirm}
                            onChange={e =>
                                this.setState({
                                    password_confirm: e.target.value
                                })
                            }
                            className="form-control"
                            id="confirm_password"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>
                <div>
                    <Mutation
                        mutation={SIGNUP_MUTATION}
                        variables={{ username, password }}
                        onCompleted={data => this._confirm(data)}
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
                </div>
            </form>
        );
    }
}
