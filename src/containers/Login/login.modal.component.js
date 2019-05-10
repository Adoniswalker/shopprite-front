import React from "react";
import Modal from "react-modal";
// import "./login.scss";
import LoginForm from "../../components/Auth/login.forms.components";
import SignUp from "../SignUp/signup-container";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default class AuthenticationComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: props.openModel
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = "#f00";
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <nav>
                                <div
                                    className="nav nav-tabs nav-fill"
                                    id="nav-tab"
                                    role="tablist"
                                >
                                    <a
                                        className="nav-item nav-link active"
                                        id="nav-home-tab"
                                        data-toggle="tab"
                                        href="#nav-home"
                                        role="tab"
                                        aria-controls="nav-home"
                                        aria-selected="true"
                                    >
                                        Login
                                    </a>
                                    <a
                                        className="nav-item nav-link"
                                        id="nav-profile-tab"
                                        data-toggle="tab"
                                        href="#nav-profile"
                                        role="tab"
                                        aria-controls="nav-profile"
                                        aria-selected="false"
                                    >
                                        Sign Up
                                    </a>
                                </div>
                            </nav>
                            <div
                                className="tab-content py-3 px-3 px-sm-0"
                                id="nav-tabContent"
                            >
                                <div
                                    className="tab-pane fade show active"
                                    id="nav-home"
                                    role="tabpanel"
                                    aria-labelledby="nav-home-tab"
                                >
                                    <LoginForm closeModal={this.closeModal} />
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="nav-profile"
                                    role="tabpanel"
                                    aria-labelledby="nav-profile-tab"
                                >
                                    <SignUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
