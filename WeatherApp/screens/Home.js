import React, { useEffect, useState } from 'react';
import { Card, Title } from 'react-native-paper';
import { View, Image } from 'react-native';
import Header from './Header';

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
    }, [])

    const getWeather = async () => {
        console.log("getWeather function is called")
        let myCity = await AsyncStorage.getItem("savedCity")
        if(!myCity){
            const { city } = props.route.params;
            myCity = city;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myCity}&APPID=86b4ded5d6053e3a5bb7813fb4ed47f3&units=metric`)
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
    
    if(props.route.params.city != 'jakarta'){
        getWeather()
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
               <Title style={{ color: '#00aaff' }}>Temperature: {info.temp}</Title>
               <Title style={{ color: '#00aaff' }}>Humadity: {info.humidity}</Title>
               <Title style={{ color: '#00aaff' }}>Description: {info.desc}</Title>
           </Card>
        </View>
    )
}