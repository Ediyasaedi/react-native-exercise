import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import Header from './Header';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default Search = ({ navigation }) => {
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([
    {'city': 'Jakarta, Indonesia'}, {'city': 'Bandung, Indonesia'}, {'city': 'Surabaya, Indonesia'},
    {'city': 'Bangkok, Thailand'}, {'city': 'Kuala Lumpur, Malaysia'}, {'city': 'Hanoi, Vietnam'},
    {'city': 'Tokyo, Japan'}, {'city': 'New Delhi, India'}, {'city': 'Doha, Qatar'}
  ])

  const btnOnClick = async () => {
    try {
      await AsyncStorage.setItem('savedCity', city)
      navigation.navigate("Home", {city: city})
    } catch (e) {
      // saving error
    }
  }

  return (
    <View style={{ flex: 1 }}>
        <Header name="Search Screen" />
        <TextInput
          label="City Name"
          theme={{ colors:{primary: '#00aaff'} }}
          value={city}
          onChangeText= {(text) => setCity(text)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <Button 
            icon="content-save" 
            mode="contained" 
            onPress={() => btnOnClick()} 
            theme={{ colors:{primary: '#00aaff'}}}
            style={{ width: 175, margin: 10}}>
            <Text style={{ color: 'white'}}>Save Changes</Text>
          </Button>
        </View>
        <FlatList 
          data={cities}
          renderItem={({ item }) => {
            return(
              <Card 
                onPress={() => setCity(item.city)} style={{ alignItems: 'flex-start', margin: 5, padding: 15}}
              >
                <Text style={{ color: 'black' }}>{item.city}</Text>
              </Card>
            )
          }}
          keyExtractor={item => item.city}
        />
    </View>
  );
};