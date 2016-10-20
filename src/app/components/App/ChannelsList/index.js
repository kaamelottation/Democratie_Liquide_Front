import React, { Component, PropTypes } from 'react';
import {
  Modal,
  FormControl,
  ButtonToolbar,
  Button,
  Glyphicon
} from 'react-bootstrap';
import MarkdownTextArea from '../../MarkdownTextArea';

import { LinkContainer } from 'react-router-bootstrap';
import store from '../../../core/channels-store';

import './index.scss';

export default class ChannelsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange(e, fieldName) {
    e.preventDefault();
    this.setState({ [fieldName]: e.target.value });
  }

  close() {
    this.props.onClose();
  }

  render() {
    return (
      <Modal className="channelsList" show={this.props.show} onHide={()=>this.close()}>
        <Modal.Header closeButton>
          <Modal.Title>Liste des channels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <legend>Channels que vous pouvez rejoindre</legend>
          <ul>
            {
              this.props.unjoinedChannels.map((channel) =>
                <li key={channel.uuid}>
                  <span className="collaborators"><Glyphicon glyph="user"/>{channel.collaborators.length}</span>
                  <span className="title">{channel.title}</span>
                  <span className="description">{channel.description}</span>
                  <Button className="action" onClick={() => this.props.joinChannel(channel.uuid)}>
                    <Glyphicon glyph="log-in"/> Rejoindre
                  </Button>
                </li>
              )
            }
          </ul>

          <legend>Channels auxquels vous appartenez</legend>
          <ul>
            {
              this.props.joinedChannels.map((channel) =>
                <li key={channel.uuid}>
                  <span className="collaborators"><Glyphicon glyph="user"/>{channel.collaborators.length}</span>
                  <span className="title">{channel.title}</span>
                  <span className="description">{channel.description}</span>
                  <Button className="action" onClick={() => this.props.quitChannel(channel.uuid)}>
                    <Glyphicon glyph="log-out"/> Quitter
                  </Button>
                </li>
              )
            }
            <li>
              <span className="collaborators"><Glyphicon glyph="user"/>all</span>
              <span className="title">general</span>
              <span className="description">Le channel par défaut :)</span>
            </li>
          </ul>

        </Modal.Body>
      </Modal>
    );
  }
}
ChannelsList.contextTypes = {
  router: PropTypes.object.isRequired,
};