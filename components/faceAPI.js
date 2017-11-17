import ModalDropdown from 'react-native-modal-dropdown';
import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Alert, ScrollView, AsyncStorage, StyleSheet} from 'react-native';
let data =  { // in the future we will define data as our master json. It will include all the projects, the current file, and a directory where we can add new fiels

            selectedFile : "",
}
let newFile =  { // in the future we will define data as our master json. It will include all the projects, the current file, and a directory where we can add new fiels

}
let x = "";
let intermediate = "";
let arr = []
let chosenOne = "";

class Dropdown extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: "",
      newFile : "",
      intermediateFile : "",
    }

  }

  render(){
    console.log("THIS IS CUrrent Dropdown");
    data.selectedFile = this.state.selected;
    data.newFile = this.state.newFile; // look into what is the point of this you already have newFile object
    data.fileList = newFile;
    // x = JSON.stringify(data);
    y = JSON.stringify(data);
    x = JSON.stringify(newFile); // string representation of newFile JSON, first run it wont be anything
    console.log("THIS IS X");
    arr = []; // resetting the arr array
    for(var key in newFile){ // every key value pair in newFIle json represents new File that you should add to list
      arr.push(key);
    } // the array is actually of proper length but its just showing object for some reason

    // loop through the data object and if any file is equal to selected file text that out

    for(var key in data.fileList){
      if( key == data.selectedFile){
        chosenOne = key; // This will be useful because we need to go through our master json  find the file that user selected, get its value aka its code and then send that via bluetooth to the other phones where they will store that in their async and then reference that. Come to think of it you could probably just send the master JSON everytime it is edited via bluetooth stream
      }
    }

    console.log(x);
    console.log(arr.length);

  //  console.log(x);
    return(

      <View style = {styles.flexOnEm}>
        <Text> search?type=</Text>
        <ModalDropdown style = {styles.dropStyles} options={["places","locations","cafes"]} defaultValue = "File" onSelect = {(index, value) => this.setState({selected : value})}/>


        <Text style = {styles.other}>{this.state.selected}</Text>
        <Text style = {styles.other}> {y} </Text>

        <TextInput style = {styles.other}
          style={{height: 50}}
          placeholder="Type here to translate!"
          onChangeText={(text) =>{
            this.setState({"intermediateFile" : text });
            //AsyncStorage.setItem("intermediateFile", "trialKey") // setting async intermediate attribute
          }}
        />
        <Button style = {styles.other}
        onPress = {() => {
          //newFile[AsyncStorage.getItem("intermediateFile")] = ""; // this is the part thats not working
          //newFile.AsyncStorage.getItem("intermediateFile") = "";
          newFile[this.state.intermediateFile] = "";
          this.setState({"newFile" : this.state.intermediateFile })


      }}
        title = "Submit input"
        />
          <ModalDropdown style = {styles.dropStyles} options={arr} defaultValue = "File" onSelect = {(index, value) => this.setState({selected : value})}/>
          <Text style = {styles.other}> {chosenOne}</Text>
          <Text style = {styles.other}>{this.state.selected}</Text>



      </View>
    );




  }



};
const styles = StyleSheet.create({
  dropStyles : {
    width : 50,
    height : 50,
    paddingTop : 50,
    backgroundColor : "powderblue",
    //justifyContent : "flex-start",
  //  alignItems : "flex-start",
    position : "absolute",



  },
  other : {

    justifyContent : "center",
    alignItems : "center",
  },

  flexOnEm : {
    flex : 1,
    justifyContent : "space-between",
  }
});
export default Dropdown;
