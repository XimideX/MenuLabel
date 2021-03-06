/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
// import { dirPictures } from 'storage/dirStorage';
// import CameraRoll from "@react-native-community/cameraroll";
// import { Camera } from 'expo-camera';
// import AsyncStorage from "@react-native-community/async-storage";

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  PermissionsAndroid, 
  Platform,
  ImageBackground
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import images from './android/app/src/images';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const image = { uri: "https://reactjs.org/logo-og.png" };
// let url = '';

// function savePicture() {
//   // if (Platform.OS === "android" && !(await hasAndroidPermission())) {
//   //   return;
//   // }

//   CameraRoll.save(tag, { type, album })
// };

// const openPicker = () => {
//   let options = {
//     title: "Pick an Image",
//     storageOptions: {
//       skipBackup: true,
//       path: 'images'
//       // mediaType: 'photo'
//     }
//     // includeBase64: true
//   };

//   imagePicker.showImagePicker(options, (response) => 
//   {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } 
//     // else if (response.customButton) {
//     //   console.log('User tapped custom button: ', response.customButton);
//     //   alert(response.customButton);
//     // } 
//     else {
//       const source = { uri: response.uri };
//       console.log(source);
//     }
//   })
// }

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Take Picture Screen"
        onPress={() => navigation.navigate('TakePicture')}
      />
      <Button
        title="See Image Screen"
        onPress={() => navigation.navigate('SeeImage')}
      />
    </View>
  );
}

function SeeImageScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </View>
  );
}

function TakePictureScreen() {
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
    launchCamera(options, response => {
      setNumber(number + 2);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: "data:image/jpeg;base64," + response.assets[0].base64 };
        console.log('number = ', number);
        setimageUri(source);
        console.log('imageUriopen ', imageUri);
      }
    });
  
  }

  const openLibrary = () =>
  {
    let options = {
      storageOptions: {
        // skipBackup: true,
        path: 'images',
        mediaType: 'photo'
      },
      includeBase64: true
    };
    launchImageLibrary(options, response => {
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
        // try {
        //   await AsyncStorage.setItem(
        //     'photo',
        //     imageUri
        //   );
        //   alert("Photo saved sucessfully!");
        // } catch (error) {
        //   alert("Something got wrong! " + error);
        // }
        console.log('imageUri ', imageUri);
      }
    });
  };

  return (
    <View>
      {
        /* <Button
            title="Take Picture"
            onPress={() => openCamera()}
            onPress = {
              openCamera
            }
          />
          <Image source={{imageUri}}
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
            title="Take Picture"
            onPress={() => openCamera()}
            onPress = {
              openLibrary
            }
          />
          <Image source={{imageUri}}
            style={
              {
                height: 200,
                width: 200,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: 'black'
              }
            }
          /> */
          <View style={styles.container}>
            <Button
            title="Take Picture"
            onPress = {
              openCamera
            }
          />
          <Image source={{imageUri}}
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
              <Text style={styles.text}>Inside</Text>
            </ImageBackground>
          </View>
}          
    </View>
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Take a Picture </Text>
    //   <Button
    //     title="Take Picture"
    //     onPress={() => openCamera()}
    //     // onPress = {
    //     //   openPicker
    //     // }
    //   />
    //   <Image source={{imageUri}}
    //   style={
    //     {
    //       height: 100,
    //       width: 100,
    //       borderRadius: 100,
    //       borderWidth: 2,
    //       borderColor: 'black'
    //     }
    //   }
    //   /> 
    //   <Text>Open Library {number}</Text>
    //   <Button
    //     title="Open Library"
    //     onPress={() => openLibrary()}
    //   />
    //   <Image source={{imageUri}}
    //   style={
    //     {
    //       height: 100,
    //       width: 100,
    //       borderRadius: 100,
    //       borderWidth: 2,
    //       borderColor: 'black'
    //     }
    //   }
    //   /> 
    //   <Image source={{imageUri}}
    //   style={
    //     {
    //       height: 100,
    //       width: 100,
    //       borderRadius: 100,
    //       borderWidth: 2,
    //       borderColor: 'black'
    //     }
    //   }
    //   /> 
    // </View>
  );
}



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TakePicture" component={TakePictureScreen} />
        <Stack.Screen name="SeeImage" component={SeeImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//   return (
//       // <MyStack />
//     <NavigationContainer>
//       {
//         // <Stack.Navigator>
//         //   <Stack.Screen
//         //     name="Home"
//         //     component={HomeScreen}
//         //     options={{ title: 'Welcome' }}
//         //   />
//         //   <Stack.Screen name="Profile" component={ProfileScreen} />
//         // </Stack.Navigator>

//         <SafeAreaView style={backgroundStyle}>
//         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={backgroundStyle}>
//           <Header />
//           <View
//             style={{
//               backgroundColor: isDarkMode ? Colors.black : Colors.white,
//             }}>
//             <Section title="Step One">
//               Edit <Text style={styles.highlight}>App.js</Text> to change this
//               screen and then come back to see your edits.
//               abajo
//             </Section>
//             <Section title="See Your Changes">
//               <ReloadInstructions />
//             </Section>
//             <Section title="Debug">
//               <DebugInstructions />
//             </Section>
//             <Section title="Learn More">
//               Read the docs to discover what to do next:
//             </Section>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//       }
//     </NavigationContainer>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//             New me
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
