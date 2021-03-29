import React, { useEffect, useState } from 'react';
import { Card, Title } from 'react-native-paper';
import { View, Image, Text } from 'react-native';
import Header from './Header';
import {API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Home = (props) => {
    const [info, setInfo] = useState({
        name: "loading...",
        temp: "loading...",
        humidity: "loading...",
        desc: "loading...",
        icon: "loading..."
    })

    useEffect(() => {
        getWeather()
    }, [props.route.params.city])

    const getWeather = async () => {
        console.log("getWeather function is called")
        let myCity = await AsyncStorage.getItem("savedCity")
        if(!myCity){
            const { city } = props.route.params;
            myCity = city;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&APPID=${API_KEY}&units=metric`)
        .then(data => data.json())
        .then(res => {
            setInfo({
                name: res.name,
                temp: res.main.temp,
                humidity: res.main.humidity,
                desc: res.weather[0].description,
                icon: res.weather[0].icon
            })
        })
        .catch(err => {
            alert(err.message)
        })

    }

    return (
        <View style={{ flex: 1 }}>
            <Header name="Weather App"/>
           <View style={{ alignItems: 'center'}}>
               <Title style={{
                   color: '#00aaff',
                   fontSize: 30,
                   marginTop: 30
               }}>
                   {info.name}
                </Title>
                <Image 
                    style={{
                        width: 120,
                        height: 120
                    }}
                    source={{uri: `https://openweathermap.org/img/w/${info.icon}.png`}}
                />
           </View>

           <Card style={{
               margin: 5,
               padding: 12
           }}>
               <Title style={{ color: '#00aaff' }}>Detail:</Title>
               <Text style={{ color: '#00aaff' }}>Temperature: {info.temp}</Text>
               <Text style={{ color: '#00aaff' }}>Humadity: {info.humidity}</Text>
               <Text style={{ color: '#00aaff' }}>Description: {info.desc}</Text>
           </Card>
        </View>
    )
}