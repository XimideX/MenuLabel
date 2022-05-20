/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { AppRegistry } from "react-native";

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
//import Geolocation from '@react-native-community/geolocation';
import GeoLocation from "./GeoLocation.js";


// Inicio das declarações 
const Stack = createNativeStackNavigator();
const image = { uri: "https://reactjs.org/logo-og.png" };


// função HomeScrem aparece depois do Home na tela principal
function HomeScreen({navigation}) {
  const [texto, setTexto] = useState("Pagina Inicial");
  const [text, onChangeText] = React.useState("");

  function onChangeTexto(novoTexto){
    console.log(novoTexto);
    setTexto(novoTexto);
  }

  function onChangeTitle(){
    if (text === 'eu'){
      setTexto('Agora foi');
    }
  }
  return (// inicio da tela Home Inicial
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text >{texto}</Text>
      <Text >Home Screen</Text>
      <TextInput 
        // style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder = 'Escreva um Texto Aqui!'
      />
      <ImageBackground  
        style={styles.teste001} source={{
        uri: "https://saude.abril.com.br/wp-content/uploads/2020/09/reconecte-se-com-a-comida-abre-dossie%CC%82.png?w=680&h=453&crop=1"}} 
      ></ImageBackground>
      <Button
        title="Submit"
        onPress={() => onChangeTitle()}  
      />
      <Button
        title="Take Picture Screen"
        onPress={() => navigation.navigate('TakePicture')}  
      />
      <Button
        title="See Map Screen"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Change text"
        onPress={() => onChangeTexto('TakePicture')}
      />
    </View>
  );
}

// inicio da função do Mapa
function SeeMapScreen() {
  const [region, setRegion] = useState({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 1.000,
          longitudeDelta: 1.000,
  });
  const [marker, setMarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [regionGet, setRegionGet] = useState(true);

  const onGetRegion = (position) => {
    setMarker({ 
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    setRegion({...marker,           
      latitudeDelta: 0.900,
      longitudeDelta: 0.900,
    })
    setRegionGet(false);
    console.log(region);
  }

  const onRegionChange = (region) => {

  };
  if(regionGet)
  {
    GeoLocation.callLocation(onGetRegion);
  }
 
  return ( // Inicio da Visualização do Mapa
    <MapView
      style={{flex:1}}
      initialRegion={region}
      regionLocale={region}
      onRegionChange={onRegionChange}
      >
      <Marker coordinate = {marker}
        Oncre
        pinColor = {"purple"} // any color
        title={"title"}
        description={"description"}
      />
    </MapView>
  );
}

function SeeImageScreen({navigation}) {
  return ( // imagem de fundo pagina inicial
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </View>
  );
}
function TakePictureScreen() { // inicalizando a parte da camera, botão.
  const [imageUri, setimageUri] = useState("");
  const [number, setNumber] = useState(1);
  const [singleFile, setSingleFile] = useState(null);
  const openCamera = () => {
    let options = {
      storageOptions: {
        saveToPhotos  : true,
        path: 'images',
        mediaType: 'photo'
      },
      includeBase64: true
    };
    launchCamera(options, response => { //inicializando a camera
      setNumber(number + 2);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: "data:image/png;base64," + response.assets[0].base64 };
        const source = { uri: response.assets[0].uri };
        console.log('number = ', number);
        setimageUri(source);
        // console.log('imageUriopen ', imageUri);
        let sourceUri = source.uri.toString();
        console.log(sourceUri);
        // console.log('uri ' + sourceUri)
        const file = {
          uri: source.uri,
          name: response.assets[0].fileName,
          type: "image/jpg"
        }
        const config = {
          keyPrefix: 's3/',
          bucket: 'upload-photos-menulabel-bucket',
          region: 'sa-east-1',
          accessKey: 'AKIA3DDKICZFJNM5CRUH',
          secretKey: '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',
          successActionStatus: 201
        }
        
        RNS3.put(file, config).then((response) => {
          if (response != null)
          {
            console.log('rolou');  
          }
          // console.log(response);
        }).catch((error) =>{
          console.log('error ', error);
          // console.log(error);
        })
      }
    });
  
  }
  const openLibrary = () => // para abrir a galeria de fotos
  {
    let options = {
      storageOptions: {
        // skipBackup: true,
        path: 'images',
        mediaType: 'photo'
      },
      includeBase64: true
    };
    launchImageLibrary(options, response => { // inicializando abertura da galeria de fotos
      setNumber(number + 1);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: "data:image/jpeg;base64," + response.assets[0].base64 };
        console.log('url = ', source);
        console.log('number = ', number);
        setimageUri(source);
        console.log('imageUri ', imageUri);
      }
    });
  };

  return (
    
    <View>
    {
      <View style={styles.container}>
        <Button
        title="Take Picture"
        onPress = {
          openCamera
        }
      />
      <Image source={imageUri}
        style={
          {
            height: 200,
            width: 200,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'black'
          }
        }
      /> 
      <Button
        title="Choose Image From Gallery"
        onPress = {
          openLibrary
        }
      />
      <Image source={imageUri}
        style={
          {
            height: 200,
            width: 200,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'black'
          }
        }
      />
      <ImageBackground source={imageUri} resizeMode="cover" style={styles.image}>
        <Text style={styles.te}>Inside</Text>
      </ImageBackground>
      </View>
  }          
  </View>
   
  );
}

// Iniciando o App, metodo principal que indica as nevagaçoes existentes no sistema 
function App() { //Inicio Navegação


  // // inicalizando pegar a latitude da pessoa Demian
  // const [currentLatitude, setCurrenteLatitude] = useState('');
  // const [currenteLongitude, setCurrentLongitude] = useState('');
  // const[watchID, setWathcID] = useState(0);

  // const callLocation = () => {
  //   if(Platform.OS ==='ios'){
  //     getLocation();
  //   }else {
  //     const requestLocationPermission = async () => {
  //       const granted = await  PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: "Permissão de Acesso á Localização",
  //           message: "Este Aplicativo precisa Acessar Sua Localização",
  //           ButtonNeutral : "Pergunte-me depois",
  //           buttonNegative : "Cancelar",
  //           ButtonNegative: "OK"
  //         }
  //       );
  //       if( granted === PermissionsAndroid.RESULTS.GRANTED){
  //         getLocation();
  //       } else {
  //         alert("Permisão de localização negada");
  //       }
  //     };
  //       requestLocationPermission();
  //   }
     
  // }

  // const getLocation = () => {
  //   const setPositionFunc = (position) => {
  //     //  currenteLongitude = JSON.stringify(position.coords.latitude);
  //     //  currenteLongitude = JSON.stringify(position.coords.longitude);
  //     setCurrenteLatitude( JSON.stringify(position.coords.latitude));
  //     setCurrentLongitude(JSON.stringify(position.coords.longitude));
  //   };
  //   Geolocation.getCurrentPosition(
  //     setPositionFunc,
  //     (error) => alert(error.message),
  //     { enableHighAccuracy: true ,timeout: 20000, maximumAge: 1000 }
  //   );
  //   const watchID = Geolocation.watchPosition(setPositionFunc);
  //   setWathcID(watchID);
  // }

  // const clearLocation =() => { // função responsavel por cancelar o mapa
  //   Geolocation.clearWatch(watchID);
  // }

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
  //  fim demian






  return (
    <NavigationContainer >
      <Stack.Navigator  >
        <Stack.Screen   name="Home" component={HomeScreen} options= {{ title: 'Bem Vindo!'}} />
        <Stack.Screen name="TakePicture" component={TakePictureScreen} />
        {/* <Stack.Screen name="SeeImage" component={SeeImageScreen} /> */}
        <Stack.Screen name="Map" component={SeeMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}//Fim Navegação

// Inicio do Css, estilo do App
const styles = StyleSheet.create({// Inicio Css
  teste001:{
    flex:0.8,
    backgroundColor: '#6495ED',
  },
  teste002:{
    flex:0.7,
    backgroundColor: '#DC143C',
  },

  conteiner:{
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16,
    backgroundColor:'white'
  },

  boldText:{
    fontSize: 30,
    color: 'red'
  },
  text:{
    alignItems:'center',
    justifyContent:'center',
    marginTop: 15,
  }

});// fim css

export default App;// exportando o app
