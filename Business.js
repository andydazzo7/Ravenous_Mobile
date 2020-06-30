import React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, Image, Linking } from 'react-native';
import Constants from 'expo-constants';
import {Card} from 'react-native-paper'
export class Business extends React.Component{
    render(){
        return(
        <Card style={styles.card}>
        <View style={styles.business}>
        <Text style={{color: 'blue', justifyContent: 'center', textAlign:"center", fontSize: 22}}
      onPress={() => Linking.openURL(this.props.business.url)}>
  {this.props.business.name}
</Text>
        <View >
            <View >
            <Text style ={styles.paragraph}>{this.props.business.address}</Text>
            <Text style ={styles.paragraph}>{this.props.business.city} {this.props.business.state}, {this.props.business.zipCode}</Text>
            </View>
            <View stlye={styles.info}>
            <Text style ={styles.paragraph}>{this.props.business.category}</Text>
            < Text style ={styles.paragraph}>Rating: {this.props.business.rating}</Text>
            <Text style ={styles.paragraph}>{this.props.business.reviewCount} Reviews</Text>
            <Image 
        style={styles.image}
        source={{uri: this.props.business.imageSrc}} 
        />
            </View>
        </View>
        </View>
        </Card>
        );
    }
}
export default Business;

const styles = StyleSheet.create({
    card:{
        marginTop: 30,
        width: 370,
        justifyContent: "center",
        alignContent: "center",
        marginLeft: 10
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 0,
      fontSize: 18,
      marginLeft: 20
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
      width: 200,
      height: 100,
      marginTop: 10,
      marginBottom: 30, 
      display: "flex", 
      marginLeft: 100,
      justifyContent: "center"
    },
    business:{
        textAlign: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 20
    },
    info:{
        flexDirection: "row"
    }
  });