import React, { Component } from 'react';
import {OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import moment from "moment";
import {API_URL} from "../../Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import Editable from "../Modals/Editable";

export default class MyFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myFiles: this.props.myFiles
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.myFiles !== this.props.myFiles) {
            this.setState({myFiles: nextProps.myFiles})
        }
    }

    render() {
        console.log('caused render');
        return ( <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>File name</th>
                <th>Size (kb)</th>
                <th>Modified</th>
                <th>Owner</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {this.state.myFiles.map((file,i) => {
                return (<tr key={i}>
                    <td>{i}</td>
                    <Editable file={file} fetchFiles={this.props.fetchFiles} showAlert={this.props.showAlert}/>
                    <td>{Math.round(file.size * 100 ) / 100000}</td>
                    <td>{moment(file.date).fromNow()}</td>
                    <td>{file.ownerEmail}</td>
                    <td className="text-center actionIcon">
                        <Dropdown>
                            <Dropdown.Toggle><FontAwesomeIcon icon={faEllipsisH}/></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href={`${API_URL}/${file.download}`}>Download</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.props.selectFile(file._id)}>
                                    Share
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Rename</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.props.deleteFile(file)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </td>
                </tr>)
            })}</tbody></Table>)
    }
}