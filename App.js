import * as React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
import Constants from 'expo-constants';

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


export class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      names: [],
     image : { uri: "https://blog.yelp.com/wp-content/uploads/2019/02/startingasmallbiz.png" }
    }
  }
  reveal = () =>{
   Yelp.search('pizza', 'brooklyn', 'best_match' ).then(bus => 

   {
     console.log(bus);
     this.setState({names:bus})
     }
   )
}
render(){
  return (
    <View style={styles.container}>
    <ImageBackground source={this.state.image} style={styles.image}>
      <Text style={styles.names}>{this.state.names.map(names => names.name + '\n ')}</Text>
      <Card>
      <Button onPress={this.reveal} title='Reveal Names'/>
        <Text style={styles.paragraph}> Andy</Text>
      </Card>
      </ImageBackground>
    </View>
  );
}

}
export default App;
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  }
});