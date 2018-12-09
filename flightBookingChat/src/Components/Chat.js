import React, { Component } from 'react';
import { MessageList, MessageGroup, Message, Bubble, MessageText, Row, Avatar, MessageButtons, MessageButton } from '@livechat/ui-kit'
import Calendar from 'react-calendar'
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
          date: new Date(),
        }
    }
    onChange = date => this.props.handleResponse("On the: " + String(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()))
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
      }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    messages() {
        const chat = []
        for (let i = 0; i < this.props.chatLog.length; i++) {
            if (this.props.chatLog[i].buttons != null) {
                let result = []
                for (let y = 0; y < this.props.chatLog[i].buttons.length; y++) {
                    result.push(<MessageButton label={this.props.chatLog[i].buttons[y]}  onClick={() => this.props.handleResponse(this.props.chatLog[i].buttons[y])}/>);
                }
                chat.push(
                    <div style={{ width: 300 }}>
                    <Bubble>
                    <Message>
                    <MessageText>{this.props.chatLog[i].bot}</MessageText>
                    <MessageButtons style={{width: '100%'}}>
                        {result}
                    </MessageButtons>
                    </Message>
                    </Bubble>
                    </div>
                )
            } else if (this.props.chatLog[i].calendar != null) {
                var list = this.props.chatLog[i].calendarMinDate.split("-")
                var date = new Date(list[2], list[1], list[0])
                console.log(date)
                chat.push(
                    <div>
                    <Message>
                    <Bubble>
                    <MessageText>{this.props.chatLog[i].bot}</MessageText>
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                        minDate={date}
                    />
                    </Bubble>
                    </Message>
                    </div>
                )
            } else if (this.props.chatLog[i].calendar != null) {
                chat.push(
                    <div>
                    <Message>
                    <Bubble>
                    <MessageText>{this.props.chatLog[i].bot}</MessageText>
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                    </Bubble>
                    </Message>
                    </div>
                )
            } else if (this.props.chatLog[i].status) {
                    if (parseInt(this.props.ticket.passengernumber) == 1 && !this.props.ticket.return) {
                        chat.push(
                            <div>
                            <Message>
                            <Bubble>
                            <MessageText><div style={{textAlign: 'left'}}><b>Your Ticket:</b><br/><br/>Departure Location: {this.props.ticket.departureLocation}<br/>Destination: {this.props.ticket.arrivalLocation}<br />Date: {this.props.ticket.date}<br /><br />Class: {this.props.ticket.class}<br />Seat: 1A<br/><br/></div></MessageText>
                            </Bubble>
                            </Message>
                            </div>)
                    } else if (parseInt(this.props.ticket.passengernumber) == 1 && this.props.ticket.return) {
                        chat.push(
                            <div>
                            <Message>
                            <Bubble>
                            <MessageText><div style={{textAlign: 'left'}}><b>Your Tickets:</b><br/><br/>Departure Location: {this.props.ticket.departureLocation}<br/>Destination: {this.props.ticket.arrivalLocation}<br />Date: {this.props.ticket.date}<br /><br />Class: {this.props.ticket.class}<br />Seat: 1A<br/><br/>Departure Location: {this.props.ticket.arrivalLocation}<br/>Destination: {this.props.ticket.departureLocation}<br />Date: {this.props.ticket.returnDate}<br /><br />Class: {this.props.ticket.class}<br />Seat: 1A<br/><br/></div></MessageText>
                            </Bubble>
                            </Message>
                            </div>)
                    } else if (parseInt(this.props.ticket.passengernumber) > 1 && !this.props.ticket.return) {
                        var tickets = []
                        for (let i = 0; i < this.props.ticket.passengernumber; i++) {
                            tickets.push(<div><b>Passenger</b> {this.props.ticket.passengernumber}<br/>Departure Location: {this.props.ticket.departureLocation}<br/>Destination: {this.props.ticket.arrivalLocation}<br />Date: {this.props.ticket.date}<br /><br />Class: {this.props.ticket.class}<br />Seat: 1A<br/><br/></div>)
                        }
                        chat.push(
                            <div>
                            <Message>
                            <Bubble>
                            <MessageText><div style={{textAlign: 'left'}}><b>Your Tickets:</b><br/><br/>{tickets}</div></MessageText>
                            </Bubble>
                            </Message>
                            </div>) 
                    } else if (parseInt(this.props.ticket.passengernumber) > 1 && this.props.ticket.return) {
                        var tickets = []
                        for (let i = 1; i <= this.props.ticket.passengernumber; i++) {
                            tickets.push(<div><b>Passenger</b> {i}<br/>Departure Location: {this.props.ticket.departureLocation}<br/>Destination: {this.props.ticket.arrivalLocation}<br />Date: {this.props.ticket.date}<br /><br />Class: {this.props.ticket.class}<br />Seat: 1A<br/><br/>Departure Location: {this.props.ticket.arrivalLocation}<br/>Destination: {this.props.ticket.departureLocation}<br />Date: {this.props.ticket.returnDate}<br /><br />Class: {this.props.ticket.class}<br />Seat: 1A<br /><br /></div>)
                        }
                        chat.push(
                            <div>
                            <Message>
                            <Bubble>
                            <MessageText><div style={{textAlign: 'left'}}><b>Your Tickets:</b><br/><br/>{tickets}</div></MessageText>
                            </Bubble>
                            </Message>
                            </div>)      
                    }
            } else {
                chat.push(
                    <div>
                    <Message>
                    <Bubble>
                    <MessageText>{this.props.chatLog[i].bot}</MessageText>
                    </Bubble>
                    </Message>
                    </div>)
            }
            if (this.props.chatLog[i].user != null) {
                chat.push(
                    <Row reverse>
                    <Bubble isOwn style={{
                            background: 'linear-gradient(to right bottom, #5b9aff, #66c9ff)',
                        }}>
                    <Message isOwn>
                    <MessageText style={{
                        color: 'white'
                    }}>{this.props.chatLog[i].user}</MessageText>
                    </Message>
                    </Bubble>
                    </Row>
                )
            } 
            
        }
        return chat
    }

    render() {
        return (
        <div style={{marginTop: '100px'}}>
            <MessageList>
                <div>
                    <MessageGroup>
                    {this.messages()}
                    </MessageGroup>
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
            </MessageList>
        </div>
        );
    }
}

export default Chat;
