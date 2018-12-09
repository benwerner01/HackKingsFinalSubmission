import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgentBar, Avatar, Column, Title, Subtitle, MessageList } from '@livechat/ui-kit';
import { Bubble, ThemeProvider, MessageGroup, MessageMedia, Message, MessageTitle, MessageText, MessageButtons, MessageButton, defaultTheme, Row, IconButton, SendIcon, FixedWrapper, QuickReplies, QuickReply } from '@livechat/ui-kit'
import {Emoji} from 'react-emoji-render'
//Components
import Chat from './Components/Chat'
import Responses from './Components/Responses'
import Header from './Components/Header'

var locations = ['Munich', 'Edinburgh', 'Bucharest', 'London', 'Paris', 'Madrid', 'Moscow', 'Warsaw', 'Athens', 'Milan']
var numbers = ["1 passenger", "2 passengers", "3 passengers", "4 passengers"]
var classes = ["Economy", "Economy Plus", "Business"]

const themes = {
  defaultTheme: {
    FixedWrapperMaximized: {
      css: {
          boxShadow: '0 0 1em rgba(0, 0, 0, 0.1)',
      },
    },
  }
}

let responseNum = 0

class App extends Component {
  constructor(props) {
    super(props)

    this.handleResponse = this.handleResponse.bind(this)
    this.state = {
      date: new Date(),
      getCheapFlights: false,
      allFlightDataRecorded: false,
      chatLog: [
        {bot: "Hi there, what can I do for you?", buttons: ["Book a Flight", "Cheap Flights of the Day"]},
      ],
      ticket: {return: false}
    }
  }

  handleResponse = (response) => {
    let chatLog = this.state.chatLog
    let ticket = this.state.ticket
    chatLog[responseNum].user = response

    if (this.state.allFlightDataRecorded) {
      ticket.status = true
    } else if (this.state.getCheapFlights) {
      switch(responseNum) {
        case 1:
          ticket.class = "ECONOMY"
          chatLog[responseNum].buttons = null
          if (response == "Current Location (London)") {
            ticket.departureLocation = "London"   
          } else {
            ticket.departureLocation = response
          }
          chatLog.push({})
          chatLog[responseNum + 1].bot = "When would you like to go?"
          chatLog[responseNum + 1].calendar = true;
          var date = new Date()
          chatLog[responseNum + 1].calendarMinDate = String(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear());
          break;  
        case 2:
          ticket.date = response.substring(8, response.length)
          chatLog[responseNum].calendar = null
          chatLog.push({})
          chatLog[responseNum + 1].bot = "And finally, for how many people?"
          chatLog[responseNum + 1].buttons = numbers
          break;
        case 3:
          ticket.passengernumber = response.substring(0, 1)
          chatLog[responseNum].buttons = null
          chatLog.push({})
          chatLog[responseNum + 1].bot = "These are that cheapest flights of the day. Which would you like to chose?"
          chatLog[responseNum + 1].buttons = [this.state.ticket.departureLocation + " - Lisbon (20$)", this.state.ticket.departureLocation + " - Moscow (50$)", this.state.ticket.departureLocation + " - Berlin (30$)"]
          break;
        case 4:
          if (response.includes("- Lisbon")) {
            ticket.arrivalLocation = "Lisbon"
          } else if (response.includes("- Moscow")) {
            ticket.arrivalLocation = "Moscow"
          } else if (response.includes("- Berlin")) {
            ticket.arrivalLocation = "Berlin"
          }
          this.setState({allFlightDataRecorded: true})
          ticket.status = true
          chatLog.push({})
          chatLog[responseNum + 1].status = true
          break;
      }
    } else {
      switch(responseNum) {
        case 0:
          chatLog[responseNum].buttons = null
          if (response == "Book a Flight") {
            chatLog.push({})
            chatLog[responseNum + 1].bot = "Okay, where are you leaving from?"
            locations.unshift("Current Location (London)")
            chatLog[responseNum + 1].buttons = locations
          } else if (response = "Cheap Flights of the Day") {
            chatLog.push({})
            this.setState({getCheapFlights: true})
            chatLog[responseNum + 1].bot = "Okay, where are you leaving from?"
            locations.unshift("Current Location (London)")
            chatLog[responseNum + 1].buttons = locations
          }
          this.setState({currentResponses: []})
          break;
        case 1:
          chatLog[responseNum].buttons = null
          if (response == "Current Location (London)") {
            ticket.departureLocation = "London"
          } else {
            ticket.departureLocation = response
          }
          chatLog.push({})
          chatLog[responseNum + 1].bot = "Great! Where do you want to go?"
          chatLog[responseNum + 1].buttons = locations.filter(e => e !== this.state.ticket.departureLocation && e !== "Current Location (London)")
          break;
        case 2:
          ticket.arrivalLocation = response
          chatLog[responseNum].buttons = null
          chatLog.push({})
          chatLog[responseNum + 1].bot = "Lovely choice! When do you want to go?"
          chatLog[responseNum + 1].calendar = true;
          var date = new Date()
          chatLog[responseNum + 1].calendarMinDate = String(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear());
          break;
        case 3:
          ticket.date = response.substring(8, response.length)
          chatLog.push({})
          chatLog[responseNum].calendar = null
          chatLog[responseNum + 1].bot = "Okay… And how many people?"
          chatLog[responseNum + 1].buttons = numbers
          break;   
        case 4:
          ticket.passengernumber = response.substring(0, 1)
          chatLog[responseNum].buttons = null
          chatLog.push({})
          chatLog[responseNum + 1].bot = "And finally, which class?"
          chatLog[responseNum + 1].buttons = classes
          break;      
        case 5:
          ticket.class = response.toUpperCase().replace(" ", "")
          chatLog[responseNum].buttons = null
          chatLog.push({})
          chatLog[responseNum + 1].bot = "Would you also like to book a return flight?"
          chatLog[responseNum + 1].buttons = ["Yes", "No"]
          break;
        case 6:
          chatLog[responseNum].buttons = null
          console.log(response)
          if (response == "Yes") {
            console.log('it happened')
            chatLog.push({})
            ticket.return = true
            chatLog[responseNum + 1].bot = "When would you like to return?"
            chatLog[responseNum + 1].calendar = true;
            chatLog[responseNum + 1].calendarMinDate = this.state.ticket.date
          } else {
            this.setState({allFlightDataRecorded: true})
            chatLog.push({})
            chatLog[responseNum+ 1].status = true
          }
          break;
        case 7:
          ticket.returnDate = response.substring(8, response.length)
          chatLog.push({})
          chatLog[responseNum].calendar = null
          chatLog[responseNum + 1].status = true
          break;
      }
    }
    this.setState({ticket})
    this.setState({chatLog})
    responseNum++
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider>
        <div>
          <Header />
          <Chat chatLog={this.state.chatLog} handleResponse={this.handleResponse} ticket={this.state.ticket}/>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
