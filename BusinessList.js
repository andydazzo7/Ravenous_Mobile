import React from 'react';
import Business from "./Business";
import { Text, View, StyleSheet, Button, ImageBackground, Image } from 'react-native';

 export class BusinessList extends React.Component{
    render(){
        return(
        <View >
            {
                this.props.businesses.map(business =>{
                    console.log(business.imageSrc)
                   return <Business business={business}/>;
                })
            }
            
    </View>);
    }
}