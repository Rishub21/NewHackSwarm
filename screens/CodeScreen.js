import React from 'react';
import {
    AsyncStorage,
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import * as Rx from "rxjs/Rx";

export default class CodeScreen extends React.Component {

    static navigationOptions = {
	header: null,
    };

    componentDidMount(){
    }
    
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
	var x = code.map((line, number) => {
	    number = number + 1;
	    return <Text key={number} style={number == lineNumber ? styles.currentLine : {fontSize: 20,
											  paddingTop: 4,
											  paddingBottom: 4,
	    }}>
		<Text style={styles.lineNumber}> {number < 10 ? ' ' + number : number}: </Text>
		<Text style={{backgroundColor: 'transparent'}}>{line}</Text>
	    </Text>;
	})
	
	return (
	    <View style={styles.container}>
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		    {x}
		</ScrollView>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    lineNumber: {
	fontFamily: 'space-mono',
	backgroundColor: 'transparent',
	color: '#3B5998'
    },
    currentLine: {
	fontSize: 20,
	paddingTop: 4,
	paddingBottom: 4,
	backgroundColor: "rgba(109, 139, 202, .2)"
    },
    container: {
	flex: 1,
	backgroundColor: '#fff'
    },
    contentContainer: {
	paddingTop: 30,
    },
});
