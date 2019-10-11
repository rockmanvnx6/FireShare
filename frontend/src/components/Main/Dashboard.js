import React, { Component } from 'react';
import AccountService from '../../api/AccountService'
import AuthenticationService from "../../api/AuthenticationService";
import './styles/Dashboard.scss'
import {Button, Table} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import UploadModal from "./UploadModal";
import CustomAlert from "../Notification/CustomAlert";
import axios from "axios";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myFiles: [],
            showUpload: false,
            showAlert: false
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['auth-token'] = sessionStorage.getItem('USER_TOKEN');

        AccountService.retrieveInfo().then(result => {
            this.setState({
                myFiles: result.data
            });
            console.log(result);
        })
    }

    openModal = (option) => {
        this.setState({showUpload: option})
    };

    handleShow = (value) => {
        this.setState({
            showAlert: value
        });
        setTimeout(() => {
            this.setState({showAlert: false})
        },2000);
    };

    showAlert = (heading, message, type) => {
        this.handleShow(true);

        this.setState({
            heading: heading,
            message: message,
            type: type,
        });
    };

    render() {
        return <div className="container mt-5 align-content-center">
            <CustomAlert show={this.state.showAlert} heading={this.state.heading}
                         message={this.state.message} type={this.state.type}
                         handleShow={this.handleShow} />

            <UploadModal show={this.state.showUpload} openModal={this.openModal}
                         showAlert={this.showAlert}/>

            <div className="table-head">
                <div className="pull-left">
                    <p>My File</p>
                </div>
                <div className="pull-right">
                    <Button className="mb-2 float-right" onClick={() => {this.openModal(true)}}>Upload file</Button>
                </div>
                <div className="clearfix"></div>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>File ID</th>
                    <th>File name</th>
                    <th>Size (kb)</th>
                    <th>Modified</th>
                    <th>Owner</th>
                </tr>
                </thead>
                <tbody>
                {this.state.myFiles.map((file,i) => {
                    return (<tr>
                        <td>{i}</td>
                        <td>{file._id}</td>
                        <td>{file.name}</td>
                        <td>{file.size}</td>
                        <td>{file.date}</td>
                        <td>{file.ownerEmail}</td>
                    </tr>)
                })}
                </tbody>
            </Table>
        </div>
    }
}

export default withRouter(Dashboard);