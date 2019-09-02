import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MyHeader from './MyHeader'
import { TextInput, Card, List, Title } from 'react-native-paper';



// API Key => 70d93a0e2eea07569ca879ff093c21db
//units=matric => weather result in celcious

// api url => api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=matric&APPID={apikey}

export default class HomeScreen extends React.Component{

  state ={
    info:{
      name:"loading",
      temp:"loading",
      humidity:"loading",
      desc:"loading",
      icon:"loading"
    }
  }
  getWeather(){
    Mycity = "Paris"
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=matric&APPID=70d93a0e2eea07569ca879ff093c21db`)
    .then(res => res.json())
    .then(data =>{
      //console.log(data)
      this.setState({
       info:{

          name:data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon
        }
      })
    }).catch(error=>{
       
       Alert.alert("Error"+error.message+"Please connect to internet",
       [{text:"Ok"}])
    })
  }

  componentDidMount(){
    this.getWeather()
  }

  render(){
    console.log(this.state.info)
    return (
      <View style={styles.container}>
        <MyHeader title = 'Current City Weather'/>
        <Card style = {{margin:20}}>
          <LinearGradient 
           colors={['#021B79','#0565B7']}
          >
          <View style = {{padding:20, alignItems:'center'}}> 
           <Title style = {styles.text}>{this.state.info.name}</Title>
           <Image style={{width:120, height:120}}
            source = {{uri:'http://openweathermap.org/img/w/'
            +this.state.info.icon+".png"}}
           />
           <Title style = {styles.text}>TEMPRATURE : {this.state.info.temp}</Title>
           <Title style = {styles.text}>DESCRIPTION : {this.state.info.desc}</Title>
           <Title style = {styles.text}>HUMIDITY : {this.state.info.humidity}</Title>

          </View>
          </LinearGradient>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  text:{

    textAlign:'center',
    marginBottom:20,
    color :'white',
    fontSize: 20
  }
});
