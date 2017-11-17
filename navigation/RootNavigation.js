import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import * as Rx from "rxjs/Rx";

import {Subject} from "rxjs/Subject";

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    html: {
		code: [
		    "<h1>",
		    "hello world",
		    "</h1>"
		],
		currentLine: 1
	    },
	    css: {
		code: [],
		currentLine: 1
	    },
	    isHtml: true
	};
    }
    
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

    render() {
	var events = new Subject();
	events.subscribe((event) => {
	    var newNumber;
	    var code;
	    var state;

	    switch(event.action){
		case "key_arrow_up":
		    if(this.state.isHtml){
			newNumber = this.state.html.currentLine == 1 ? 1 : this.state.html.currentLine - 1;
			this.setState({
			    html: {
				code: this.state.html.code,
				currentLine: newNumber
			    }
			});
		    }
		    if(!this.state.isHtml){
			newNumber = this.state.css.currentLine == 1 ? 1 : this.state.css.currentLine - 1;
			this.setState({
			    css: {
				code: this.state.css.code,
				currentLine: newNumber
			    }
			});

		    }
		    break;
		case "key_arrow_down":
		    if(this.state.isHtml){
			newNumber = this.state.html.currentLine == this.state.html.code.length + 1 ? this.state.html.code.length + 1 : this.state.html.currentLine + 1;
			this.setState({
			    html: {
				code: this.state.html.code,
				currentLine: newNumber
			    }
			});
		    }
		    if(!this.state.isHtml){
			newNumber = this.state.css.currentLine == this.state.css.code.length + 1 ? this.state.css.code.length + 1 : this.state.css.currentLine + 1;
			this.setState({
			    css: {
				code: this.state.css.code,
				currentLine: newNumber
			    }
			});
		    }
		    break;
		case "change_line":
		    if(this.state.isHtml){
			code = this.state.html.code;
			code[this.state.html.currentLine - 1] = event.value;
			this.setState({html: {
			    code: code,
			    currentLine: this.state.html.currentLine}
			});
		    }else{
			code = this.state.css.code;
			code[this.state.css.currentLine - 1] = event.value;
			this.setState({css: {
			    code: code,
			    currentLine: this.state.css.currentLine}
			});
		    }
		    break;
		case "insert_line":
		    if(this.state.isHtml){
			code = this.state.html.code;
			code.splice(this.state.html.currentLine, 0, "");
			this.setState({
			    html: {
				code: code,
				currentLine: this.state.html.currentLine + 1
			    }
			});
		    }else{
			code = this.state.css.code;
			code.splice(this.state.css.currentLine, 0, "");
			this.setState({
			    css: {
				code: code,
				currentLine: this.state.css.currentLine + 1
			    }
			});
		    }
		    break;
		case "kill_line":
		    if(this.state.isHtml){
			code = this.state.html.code;
			code.splice(this.state.html.currentLine, 1);
			this.setState({
			    html: {
				code: code,
				currentLine: this.state.html.currentLine + 1
			    }
			});
		    }else{
			code = this.state.css.code;
			alert(typeof code);
			code.splice(this.state.css.currentLine, 1);
			this.setState({
			    css: {
				code: code,
				currentLine: this.state.css.currentLine + 1
			    }
			});
		    }
		    break;
		case "swap_html_css":
		    state = this.state;
		    state.isHtml = event.value;
		    this.setState(state);
		    break;
	    }
	});
	return <RootStackNavigator screenProps={{events: events,
						 state: this.state
	}} />;
    }
    
  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
