import React, { useState } from 'react';
// import type {Node} from 'react';
import MapView, { Marker }  from 'react-native-maps';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { aws } from './keys.js';
import { Button, SafeAreaView, ScrollView, StatusBar,  StyleSheet, TextInput, Text, useColorScheme, View,Image, PermissionsAndroid,  Platform, ImageBackground } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import images from './android/app/src/images';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RNS3 } from 'react-native-aws3';
import Geolocation from '@react-native-community/geolocation';

  // inicalizando pegar a latitude da pessoa Demian

  const callLocation = (setPositionFunc) => {
    if(Platform.OS ==='ios'){
      getLocation(setPositionFunc);
    }else {
      const requestLocationPermission = async () => {
        const granted = await  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permissão de Acesso á Localização",
            message: "Este Aplicativo precisa Acessar Sua Localização",
            ButtonNeutral : "Pergunte-me depois",
            buttonNegative : "Cancelar",
            ButtonNegative: "OK"
          }
        );
        if( granted === PermissionsAndroid.RESULTS.GRANTED){
          getLocation(setPositionFunc);
        } else {
          alert("Permisão de localização negada");
        }
      };
        requestLocationPermission();
    }
     
  }

  const getLocation = (setPositionFunc) => {
    // const setPositionFunc = (position) => {
    //   //  currenteLongitude = JSON.stringify(position.coords.latitude);
    //   //  currenteLongitude = JSON.stringify(position.coords.longitude);
    //   setCurrenteLatitude( JSON.stringify(position.coords.latitude));
    //   setCurrentLongitude(JSON.stringify(position.coords.longitude));
    // };
    Geolocation.getCurrentPosition(
      setPositionFunc,
      (error) => alert(error.message),
      { enableHighAccuracy: true ,timeout: 20000, maximumAge: 10000 }
    );
    const watchID = Geolocation.watchPosition(setPositionFunc);
    setWathcID(watchID);
  }

  const clearLocation =() => { // função responsavel por cancelar o mapa
    Geolocation.clearWatch(watchID);
  }

  export default {
    callLocation,
    clearLocation,
  }

  // return(
  //   <View style={styles.conteiner}>
  //     <Text style={styles.boldText}> Aqui vai ser o Mapa!</Text>
  //     <Text style={styles.text} > Latitude: {currentLatitude}</Text>
  //     <Text style={styles.text} >longitude: {currenteLongitude}</Text>
  //     <View>
  //       <Button title="Obter Localização " onPress={callLocation}></Button>
  //     </View>
  //     <View>
  //       <Button title="Cancelar Monitoramento" onPress={clearLocation}></Button>
  //     </View>
  //   </View>
    
  // )
