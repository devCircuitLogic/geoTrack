import React from 'react'
import{
    View,
    Text,
    Image,
    StyleSheet,
    useColorScheme
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken("pk.eyJ1IjoiY2lyY3VpdGxvZ2ljZGV2IiwiYSI6ImNtMGVubWYxajBwMWkyam4zMDJuaXltaWwifQ.sXMg-ZfL5F--pJmbIanNbQ");

const Main = ()=>{
    return(
        <View style={styles.page}>
        <View style={styles.container}>
          <MapView style={styles.map} />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    container: {
      height: 300,
      width: 300,
      backgroundColor: "tomato"
    },
    map: {
      flex: 1
    }
  });

export default Main;