import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Search from './screens/Search';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon:({color}) => {
            let iconName;
            if(route.name === 'Home'){
              iconName = 'home-city-outline'
            } else {
              iconName = 'city'
            }

            return <MaterialCommunityIcons name={iconName} size={25} color={color}/>
          }
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          activeBackgroundColor: '#00aaff'
        }}
      >
        <Tab.Screen name="Home" component={Home} initialParams={{ city: "jakarta" }}/>
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
