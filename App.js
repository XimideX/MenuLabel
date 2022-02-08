/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {launchCamera, launchImageLibrary, ImagePicker} from 'react-native-image-picker';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
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

// let url = '';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Take Picture Screen"
        onPress={() => navigation.navigate('TakePicture')}
      />
    </View>
  );
}

function TakePictureScreen() {
  const [imageUri, setimageUri] = useState('');
  const [number, setNumber] = useState(0);
  // let url = '';
  const openCamera = () => {
    let options = {
      storageOptions: {
        // skipBackup: true,
        path: 'images',
        mediaType: 'photo'
      },
      includeBase64: true
    };
    launchCamera(options, response => {
      // console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: 'data:image/jpeg;base64,' + response.assets[0].data };
        const source = { uri: response.assets[0].uri };
        // const source = response.assets[0].uri;
        setimageUri(source);
        setNumber(number + 1);
        const retorno = JSON.stringify(response);
        // let source = response;
        // this.setState({

        //   resourcePath: source,

        // });
        url = source;
        console.log('url = ', url);
        console.log('number = ', number);
        // console.log('response', JSON.stringify(response));
        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
      }
    });
  
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Take a Picture </Text>
      <Button
        title="Take Picture"
        onPress={() => openCamera()}
      />
      <Image source={{imageUri}}
      style={
        {
          height: 100,
          width: 100,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'black'
        }
      }
      /> 
      <Text>Open Library {number}</Text>
      <Button
        title="Open Library"
        onPress={() => openLibrary()}
      />
      <Image source={{imageUri}}
      style={
        {
          height: 100,
          width: 100,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'black'
        }
      }
      /> 
      {
        Images.map((image, index) => {
          <Image source={image.url}/>
        })
      }
      <Image source={{imageUri}}
      style={
        {
          height: 100,
          width: 100,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'black'
        }
      }
      /> 
    </View>
  );
}

function openLibrary ()
{
  const options = {
    storageOptions: {
      // skipBackup: true,
      path: 'images',
      mediaType: 'photo'
    },
    includeBase64: true
  };
  launchImageLibrary(options, response => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      // const source = { uri: 'data:image/jpeg;base64,' + response.assets[0].base64 };
      const source = response.assets[0].uri;
      // imageUri.uri = response;
      const retorno = JSON.stringify(response);

      console.log('Response = ', source);
      this.url = source;
      console.log('url = ', this.url);
    }
  });
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TakePicture" component={TakePictureScreen} />
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
