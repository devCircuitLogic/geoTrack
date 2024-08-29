import React from 'react'
import{
    View,
    Text,
    Image,
    StyleSheet,
    useColorScheme
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const LoadingScreen = ()=>{
    return(
        <View
         style = {styles.container}
         backgroundColor={'#ffffff'}
        >
            <Image source = {require('../images/logo.png')} style={{width:400,height:100}}/>

            <View
             style = {styles.TextBottom}
            >
                <Text 
                 style = {{
                    color:"#c0c0c0"
                 }}
                >Powered by Circuit Logic</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    TextBottom:{
        position:'absolute',
        bottom:20
    }
})

export default LoadingScreen;
