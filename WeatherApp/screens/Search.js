import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import Header from './Header';

export default Search = () => {
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([
    {'city': 'Jakarta, Indonesia'}, {'city': 'Bandung, Indonesia'}, {'city': 'Surabaya, Indonesia'},
    {'city': 'Bangkok, Thailand'}, {'city': 'Kuala Lumpur, Malaysia'}, {'city': 'Hanoi, Vietnam'},
    {'city': 'Tokyo, Japan'}, {'city': 'New Delhi, India'}, {'city': 'Doha, Qatar'}
  ])

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
            onPress={() => console.log('Pressed')} 
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
                style={{ margin: 5, padding: 10 }}
              >
              <Button onPress={() => setCity(item.city)} style={{ alignItems: 'flex-start'}}>
                <Text style={{ color: 'black' }}>{item.city}</Text>
              </Button>
              </Card>
            )
          }}
          keyExtractor={item => item.city}
        />
    </View>
  );
};