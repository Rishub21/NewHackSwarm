import React from 'react';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';

import {
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Switch
} from 'react-native';

export default class KeyboardScreen extends React.Component {
    constructor(){
	super();
    }

    static navigationOptions = {
	header: null,
    };

    render() {
	var code;
	var lineNumber;
	if(this.props.screenProps.state.isHtml){
	    code = this.props.screenProps.state.html.code;
	    lineNumber = this.props.screenProps.state.html.currentLine;
	}else{
	    code = this.props.screenProps.state.css.code;
	    lineNumber = this.props.screenProps.state.css.currentLine;
	}
	var currentCode = code[lineNumber - 1];
	return (
	    <View style={styles.container}>
		<ScrollView style={styles.container}
			    contentContainerStyle={styles.contentContainer}
			    bounce={false}
			    alwaysBounceVertical={false}
			    keyboardShouldPersistTaps={'always'}
		>

      <View style = {styles.boxrow}>
      <Text>
          {this.props.screenProps.state.isHtml ? "HTML " : "CSS "}
      </Text>
    
		    <Text>
			line {lineNumber}
		    </Text>
        <Switch
            style = {{marginLeft: 50 }}
  			    onValueChange={(value) => {
  				    this.props.screenProps.events.next({
  					action: 'swap_html_css',
  					value: value
  				    })
  			    }}
  			    value={this.props.screenProps.state.isHtml} />

      </View>

		    <TextInput
			style={styles.textInput}
			      defaultValue={currentCode}
			      placeholder={'new line'}
			      onChangeText={(text) => {
				this.props.screenProps.events.next(
				    {
					action: 'change_line',
					value: text
				    });

			}}
			      onSubmitEditing={() => {
				      this.props.screenProps.events.next(
					  {
					      action: 'insert_line',
					      value: null
					  });

			      }}

			      autoCapitalize={'none'}
			      autoFocus={false}
			      blurOnSubmit={false}
		    />

		    <View style={styles.boxrow}>
			<View
			    style={styles.button}>
          <RaisedTextButton color = "rgb(51, 153, 255)" titleColor = "white"
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'insert_line',
						value: null
					    });
				}}
					title={"insert line"}
			    />
			</View>
			<View
			    style={styles.button}>
          <RaisedTextButton color = "rgb(51, 153, 255)" titleColor = "white"
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'kill_line',
						value: null
					    });
				}}
					title={"kill line"}
			    />
			</View>
      <View
			    style={styles.button}>
			    <RaisedTextButton color = "rgb(51, 153, 255)" titleColor = "white"
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'key_arrow_up',
						value: null
					    });
				}}
					title={"↑"}
			    />
			</View>
      <View
			    style={styles.button}>
          <RaisedTextButton color = "rgb(51, 153, 255)" titleColor = "white"
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'key_arrow_down',
						value: null
					    });
				}}
					title={"↓"}
			    />
			</View>
		    </View>



		    <View style={styles.boxrow}>

		    </View>

		</ScrollView>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    lineNumber: {
	flex: 1,
	//color: 'red'
    },
    currentLine: {
	backgroundColor: "blue"
    },
    boxrow: {
	flexDirection: "row",
	alignItems: 'flex-end',
  justifyContent: "center",
  flex : 1
    },
    textInput: {
	fontSize: 50,
	height: 80,
	borderColor: 'gray',
	borderWidth: 1,
	paddingLeft: 2
    },
    button: {
	flex: 1,
	//borderColor: 'red',
	borderWidth: 0,
	padding: 10
    },
    container: {
	flex: 1,
	paddingLeft: 2,
	paddingRight: 2,
	backgroundColor: '#fff',
    },
    contentContainer: {
	paddingTop: 30,
    }
});
