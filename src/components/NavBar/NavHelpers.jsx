import React, { Fragment } from "react";
import AuthenticationComponent from "../../containers/Login/login.modal.component";
import { ApolloConsumer } from "react-apollo";
import { removeCookie } from "../../components/Token";

const LogoutButton = () => {
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
};

export const Auth = props => {
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

export const User = () => {
    return (
        <div className="nav-link">
            Hi! Dennis Ngeno <LogoutButton />
        </div>
    );
};
