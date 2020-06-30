import * as React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, Linking, ScrollView, TextInput } from 'react-native';
import Constants from 'expo-constants';
import {Business} from './Business'
import {BusinessList} from './BusinessList'

// You can import from local files


const apiKey = 'IEXP6xrpD99dXZBtX4DzYWMcpq7p991CYJC6yV83LoYZF5C007-3GN1ABryMZXs5rGYeJyjzrJv9NBhb-vGdVo49GARfS4a9dq-kaclTy8O3B6S4f3duDD2U8iejXnYx';
let Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          console.log(jsonResponse)
          if (jsonResponse.businesses) {
            console.log(jsonResponse.businesses)
            return jsonResponse.businesses.map(business => ({
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count, 
              url: business.url
            }));
          }
        });
      }
};

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { onChange, color } from 'react-native-reanimated';


export class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      names: [],
     image : { uri: "https://blog.yelp.com/wp-content/uploads/2019/02/startingasmallbiz.png" },
     searchText : '',
     location:'',
     option: 'best_match',
     option1: 'Best Match'
    }
  }
  reveal = () =>{
   Yelp.search(this.state.searchText, this.state.location, this.state.optiond ).then(bus => 

   {
     console.log(bus);
     this.setState({names:bus})
     }
   )
}
onChange = (text) =>{
  this.setState({searchText: text})
}
buttonPress1 = () =>{
this.setState({option: 'best_match', option1 : 'Best Match'})
}
buttonPress2 = () =>{
  this.setState({option: 'rating', option1 : 'Highest Rated'})
}
buttonPress3 = () =>{
  this.setState({option: 'review_count', option1 : 'Most Reviewed'})

}

render(){
  return (
    
    <ScrollView style={styles.container}>
      <Card style={styles.title}><Text style={styles.titletext}>RAVENOUS</Text></Card>
      <View style={styles.opt}>
      <Card style={styles.options}><Button onPress={this.buttonPress1} title='Best Match'></Button></Card> 
      <Card style={styles.options}><Button onPress={this.buttonPress2} title='Highest Rated'></Button></Card>
      <Card style={styles.options}><Button  onPress={this.buttonPress3} title='Most Reviewed'></Button></Card>
  
      </View>
      <Text style={styles.paragraph}> Sort By: {this.state.option1}</Text>
      <Text style={styles.paragraph}>What are you looking for?</Text>
      <TextInput style={styles.search} onChangeText={(text) => this.setState({ searchText: text})} value={this.state.searchText} ></TextInput>
      <Text style={styles.paragraph}>Where?</Text>
      <TextInput style={styles.search} onChangeText={(locatio) => this.setState({ location: locatio})} value={this.state.location} ></TextInput>
      <View style={styles.button}>
      <Button color="white" style={styles.button} onPress={this.reveal} title='Search'/>
      </View>
      <BusinessList businesses= {this.state.names}/>
    </ScrollView>
  );
}

}
export default App;
  

const styles = StyleSheet.create({
  opt:{
    flexDirection: 'row'
  },
  options:
  {
    marginTop: 10,
    width: 100,
    marginRight: 40,
    marginLeft: 5
  },
  titletext:{
    color:'white',
    fontSize: 20,
    textAlign: "center",
    marginTop: 13

  },
  title:{
    backgroundColor:'darkblue',
    height: 50,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'lightblue',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    marginLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,

  },
  names:{
    margin: 10,
    padding:8, 
    textAlign: "center",
    color:'red',
    backgroundColor: 'white'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  search:{
    flex:1,
    justifyContent: "center",
    backgroundColor: "white",
    fontSize: 18,
    borderRadius: 5,
    width: 350, 
    marginLeft: 20,
    marginBottom: 20
  },
  button:{
    fontSize: 18,
    justifyContent: "center",
    backgroundColor: 'blue',
    color: "white", 
    borderRadius: 10
  }
});