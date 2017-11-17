import React from 'react';
import {
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
import HTMLView from 'react-native-htmlview';

export default class OutputScreen extends React.Component {    
    constructor(){
	super();
    }

    static navigationOptions = {
	header: null,
    };

    render() {
	var compactedHtml = this.props.screenProps.state.html.code.join("");
	var compactedCss = "{" + this.props.screenProps.state.css.code.join("") + "}";
	var style;
	try{
	    style = JSON.parse(compactedCss);
	} catch(error){
	    
	}
	return (
	    <View style={styles.container}>
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		    <HTMLView
			value={compactedHtml}
			stylesheet={style}
		    />
		</ScrollView>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: '#fff',
    },
    contentContainer: {
	paddingTop: 30,
    },
});
