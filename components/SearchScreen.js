import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MyHeader from './MyHeader'
import { TextInput, Card, List } from 'react-native-paper';

export default class SearchScreen extends React.Component{

  state = {
    text: '',
    cities: []
  };

  fetchCities(text){

    this.setState({text})

    //fetch("http://autocomplete.wunderground.com/aq?query="+text) // Both lines are working
    fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)// It is backticks
    .then(data => data.json())
    .then(citiesdata =>{
        this.setState({
          cities:citiesdata.RESULTS.slice(0,9)
        })

    })

    console.log(this.state.cities)
  }

  render(){

    renderCity = <Card><List.Item title = "No Item Found"/></Card>
    if(this.state.cities.length > 0){
      renderCity = this.state.cities.map(city =>{

        return <Card style = {{margin:10}} key = {city.lat}>
                <List.Item title = {city.name}/>
                </Card>
      })
    }

    return (
      <View style={styles.container}>
        <MyHeader title='Select City'/>
          <TextInput
          label='Email'
          value={this.state.text}
          onChangeText={text => this.fetchCities(text)}
        />

        <ScrollView>
          {renderCity}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});
