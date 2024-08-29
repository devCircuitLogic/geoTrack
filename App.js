import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  YellowBox,
  LogBox,
  AsyncStorage,
  Platform,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';

import BackgroundService from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';


/* 
 */

/* 

import Entry from './Views/Entry';
import TaskService from './Views/TaskService';
import LoadingScreen from './Views/LoadingScreen';
import RecoveryPassword from './Views/RecoveryPassword'; */

import LoadingScreen from './views/LoadingScreen';
import Login from './views/Login'
import Register from './views/Register';
import Main from './views/Main';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import EventEmitter from 'react-native-eventemitter';


LogBox.ignoreAllLogs(true)


const d = Dimensions.get("window")
const isX = Platform.OS === "ios" && (d.height > 1000) ? true : false

const is7 = Platform.OS === "ios" && (d.height > 600) ? true : false

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).




const App = () => {

  const [permission, setPermission] = useState(false);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };


  
  
  
  const veryIntensivleTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        requestPermission();
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (error) => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        DeviceInfo.getBatteryLevel().then((batteryLevel) => {
          console.log(batteryLevel*100);
        });

        //notifiactions
        await BackgroundService.updateNotification({
          taskDesc: 'My counter is running' + i,
        });
        await sleep(delay);
      }
    });
  };
  
  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 10000,
    },
  };


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };



  const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensivleTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'My counter is running'
    }); // Only Android, iOS will ignore this call
  }




  let [mainService, setMainService] = useState()
  let [viewLogin, setViewLogin] = useState()
  let [viewRegister, setViewRegister] = useState()
  let [viewRecovery, setViewRecovery] = useState()
  let [viewEntry,setViewEntry] = useState(<LoadingScreen/>)
  useEffect(()=>{


    setTimeout(()=>{
      //const userCredentials = await AsyncStorage.getItem('credentialsAPPfront')
      /* if( userCredentials === null ){
        setViewEntry(<Entry/>)
      } *//* else{
        setViewEntry()
        setTaskService(<TaskService/>)
      } */
      setViewEntry()
      //setViewLogin(<Login/>)
      setMainService(<Main/>)

      startBackgroundService();
    },2500)
    //setViewEntry()
    //setViewLogin(<Login/>)

    EventEmitter.on('onCloseRegister',()=>{
      setViewRegister()
      setViewEntry()
      setViewLogin(<Login/>)  
    })

    EventEmitter.on('onOpenRegister',()=>{
      setViewLogin()
      setViewEntry()
      setViewRegister(<Register/>)
    })

    /* 

    
    EventEmitter.on('openService',()=>{
      setViewLogin()
      setTaskService(<TaskService/>)
    })
    EventEmitter.on('closeService',()=>{
      setTaskService()
      setViewLogin(<Login/>)
    })

    EventEmitter.on('onOpenRecovery',(email)=>{
     
      setViewRecovery(<RecoveryPassword
       email = {email}
      />)

    })

    EventEmitter.on('onCloseRecovery',()=>{
      setViewRecovery()
    }) */
   
 
  },[])
  return (
    <>
      <SafeAreaView
        style={[{ width: '100%', height: '100%' }, isX ? { position: 'absolute', top: 40 } : { position: 'absolute', top: 0 }, is7 ? { position: 'absolute', top: 15 } : { position: 'absolute', top: 0 }]}
      >
        <StatusBar
          backgroundColor={'#0564B3'}
          
        />
        <ScrollView
          
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            {viewLogin}
            {viewRegister}
            {viewRecovery}
        </ScrollView>
        
        {viewEntry}
        {mainService}
        {/* <TouchableOpacity
          onPress={()=>{
            
          }}
        >
          <Text>Start Foreing</Text>
        </TouchableOpacity> */}
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
   width:'100%',
   height:'100%'
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: '#ffffff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
      },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;