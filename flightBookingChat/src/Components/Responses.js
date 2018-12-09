import React, { Component } from 'react';
import { QuickReply, MessageGroup, Message, Bubble, MessageText, Row, Avatar } from '@livechat/ui-kit'

class Responses extends Component {
    responses() {
        const components = []
        for (let i = 0; i < this.props.responses.length; i++) {
            components.push(<QuickReply 
                children={this.props.responses[i]} 
                onClick={() => this.props.buttonPressed(this.props.responses[i])}
                />)
            
        }
        return components
    }
    render() {
    return (
        <Row>
            <div style={{position: 'absolute', right: '0'}}>
                {this.responses()}
            </div>
        </Row>
    );
  }
}

export default Responses;
