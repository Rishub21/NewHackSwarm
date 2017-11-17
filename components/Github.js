import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Alert, ScrollView, AsyncStorage, StyleSheet, Dimensions} from 'react-native';

var axios = require('axios');
var base64 = require('base-64');


// GLOBAL VARS
BASEURL = 'https://api.github.com'; // this is for creation of repo
//BASEURL2 =  'https://api.github.com/repos/' // this is for adding of file to rep0

let exampleData = {
    name: 'facetestbook25',
};


let exampleData2 = {
};



export class Github extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    NewBoard: '',
	    FinalBoard : 'not ready',
	    data: {
		name: 'facetestbook26',	    
		description: 'This is your repository',
		homepage: 'https://github.com',
		private: false,
		has_issues: true,
		has_projects: true,
		has_wiki: true,
		auto_init: true,
	    },
	    fileData:{
		githubFileName: 'index.html',
		message: 'A simple commit message',
		committer: {
		    name: 'Some Cool guy',
		    email: 'winning@nyu.edu',
		}
	    }
	};
    }

    render(){
	return(
	    <View>
		<Text>
		    Repo Name
		</Text>
		<TextInput
		    style={{height: 40}}
		    placeholder="Type an awesome name"
		    onChangeText={(text) =>
			this.saveData(text)}
		/>
		<Button
		    onPress = {() =>
			{
			    if(this.state.repoProcessing){
				//alert("don't double press");
			    }else{
				this.setState({
				    repoProcessing: true
				});
				var data = this.state.data;
				data.name = this.state.myKey;
				this.createRepo("Rishub21", "vishnu21", this.state.data);
			    }
			}
		    }
		    title={'Create Github Repo'}
		/>
		<Button
		    onPress = {() =>
			{
			    if(this.state.processingFiles){
				//alert("don't double press");
			    }else{
				this.setState({
				    processingFiles: true
				});
				var data = this.state.fileData;
				data.githubRepoName = this.state.myKey;
				data.content = base64.encode(
				    "<html>\n<body>\n" + 
				    this.props.html.code.join('\n')
				    + "\n</body>\n</html>"
				);
				this.pushFiles("Rishub21", "vishnu21", data)
			    }

			}
		    }
		    title={'Push files'}
		/>

	    </View>
	)
    }


    getRepos(username) {

	let url = BASEURL + '/user';
	let configs = {
	    'Access-Control-Allow-Origin': '*',
	};
	axios
	    .get(url, configs)
	    .then(res => {

		alert(1);
	    })
	    .catch((error) => {
		if (error.response) {
		    this.setState({error:error.response.data});
		    console.log(error.response.data);
		    console.log(error.response.status);
		    console.log(error.response.headers);
		} else if (error.request) {
		    this.setState({error:error.request});
		    console.log(error.request);
		} else {
		    this.setState({error:error.message});
		    console.log('Error', error.message);
		}
		console.log(error.config);
	    });
    };


    createRepo(username, password, data) {
	let url = BASEURL + '/user/repos';
	const token = `${username}:${password}`;
	const hash = base64.encode(token);
	const basicAuth = 'Basic ' + hash;
	let configs = {
	    'Access-Control-Allow-Origin': '*',
	    headers: {
		Authorization: basicAuth,
	    },
	};
	axios
	    .post(url, data, configs)
	    .then(res => {
		this.setState({
		    repoProcessing: false
		});
		Alert.alert("Created repo " + this.state.myKey);
	    })
	    .catch((error) => {
		this.setState({
		    repoProcessing: false
		});
		Alert.alert("Error: " + error.response.data.errors[0].message);
	    });
    };

    pushFiles(username, password, data){
	let url =
	    BASEURL +
	    '/repos/' +
	    username +
	    '/' +
	    data.githubRepoName +
	    '/contents/';
	const token = `${username}:${password}`;
	const hash = base64.encode(token);
	const basicAuth = 'Basic ' + hash;
	let configs = {
	    'Access-Control-Allow-Origin': '*',
	    headers: {
		Authorization: basicAuth,
	    },
	};
	axios
	    .get(url, data, configs)
	    .then(res => {
		this.setState({
		    processingFiles: false
		});

		var filenames = res.data.map((file) => {
		    return file.name;
		});
		var files = {};
		res.data.map((file) => {
		    files[file.name] = file;
		});

		let url =
		    BASEURL +
		    '/repos/' +
		    username +
		    '/' +
		    data.githubRepoName +
		    '/contents/' +
		    data.githubFileName;
		const token = `${username}:${password}`;
		const hash = base64.encode(token);
		const basicAuth = 'Basic ' + hash;
		let configs = {
			'Access-Control-Allow-Origin': '*',
		    headers: {
			Authorization: basicAuth,
		    },
		};

		if(filenames.indexOf('index.html') == -1){
		    // index.html not in repo
		    axios
			.put(url, data, configs)
			.then(res => {
			    Alert.alert('created index.html');
			})
			.catch((error) => {
			});		    
		}else{
		    // index.html already exists
		    // so update it instead
		    var sha = files['index.html'].sha;
		    data.sha = sha;
		    axios
			.put(url, data, configs)
			.then(res => {
			    Alert.alert('updated index.html');
			})
			.catch((error) => {
			    alert(JSON.stringify(error));
			});

		}
	    })
    }

    saveData(value){
	this.setState({"myKey": value});
    }
    getState(){
	return this.state.myKey
    }

}
