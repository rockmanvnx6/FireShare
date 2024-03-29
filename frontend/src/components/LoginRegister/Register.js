import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import AuthenticationService from "../../api/AuthenticationService";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            retype: '',
            redirect: false,
            valid: false,
        }
    }

    componentDidMount() {
        if(AuthenticationService.isUserLoggedIn() && !this.props.isLoggedIn) {
            this.props.history.push('/dashboard');
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            const { retype, password } = this.state;

            if (retype == password && this.inputChecking()) {
                this.setState({ valid: true });
            } else {
                this.setState({ valid: false });
            }
        });
    };

    inputChecking = () => {
        const { email, password } = this.state;
        return password.length >= 6 && password.length <= 100
            && email.length >= 6 && email.length < 1000
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { valid, email, password } = this.state;
        if (valid) {
            AuthenticationService.registerNewAccount(email, password)
                .then(() => {
                    this.setState({redirect: true});
                    this.props.showAlert(
                        'Successful!',
                        'Look who just got an account',
                        'success');
                })
                .catch((err) => {
                    console.error(err);
                    this.props.showAlert(
                        'Error!',
                        'Sorry, email is already in used',
                        'warning');
                });
        }
    };


    render() {
        const { redirect, valid } = this.state;
        if (redirect) return <Redirect to="/login"/>

        return <div className="container">
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Register</h5>
                            <form className="form-signin" onSubmit={this.handleSubmit}>
                                <div className="form-label-group">
                                    <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"tooltip-bottom"}>Length
                                        must greater than 6</Tooltip>}>
                                    <input type="email" name="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" onChange={this.handleChange} required
                                           autoComplete="off"/>
                                    </OverlayTrigger>
                                        <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <OverlayTrigger placement={"bottom"} overlay={<Tooltip id={"tooltip-bottom"}>Length
                                        must greater than 6</Tooltip>}>
                                    <input type="password" name="password" id="inputPassword" className="form-control"
                                           placeholder="Password" onChange={this.handleChange} required
                                           autoComplete="off"/>
                                    </OverlayTrigger>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" name="retype" id="retypePassword" className="form-control"
                                           placeholder="Retype password" onChange={this.handleChange} required
                                           autoComplete="off"/>
                                    <label htmlFor="retypePassword">Retype Password</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"
                                disabled={valid ? "" : "disabled"}>
                                    Register
                                </button>

                                <Link to="/login" className="d-block text-center mt-2 small">Sign In</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default withRouter(Register);