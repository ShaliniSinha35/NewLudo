import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet,Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { colors } from '../../util/Colors';
import { BLUE, FINISHED, GREEN, R1, RED, YELLOW, Y1 } from '../../util/Constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import RedGoti from '../Goti/RedGoti';
import YellowGoti from '../Goti/YellowGoti';
import BlueGoti from '../Goti/BlueGoti';
import GreenGoti from '../Goti/GreenGoti';


export default Dice = ({isRolling,turn,onDiceRoll,diceNumber, rollingRotation, redPlayer, yellowPlayer, greenPlayer, bluePlayer}) => {
    // const [diceValue, setDiceValue] = useState(1);

    // console.log("12", redPlayer.pieces)
  
    const rollingSound = useRef(new Audio.Sound());
    const rollingValue = useRef(new Animated.Value(0)).current;
    // const rollingRotation = rollingValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg'],
    //   });


    const {red,yellow,green ,blue} = colors
    
  useEffect(() => {
    loadSound();

    return () => {

      unloadSound();
    };
  }, []);

  const loadSound = async () => {
    try {
      await rollingSound.current.loadAsync(require('../../../assets/diceSound.mp3'));
    } catch (error) {
      console.error('Failed to load the sound', error);
    }
  };

  const unloadSound = async () => {
    try {
      await rollingSound.current.unloadAsync();
    } catch (error) {
      console.error('Failed to unload the sound', error);
    }
  };

  const rollDice = async () => {

    try {
      await rollingSound.current.replayAsync();
    } catch (error) {
      console.error('Failed to play the sound', error);
    }
  

    rollingValue.setValue(0);
    Animated.timing(rollingValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    await new Promise(resolve => setTimeout(resolve, 1500));

    await new Promise(resolve => setTimeout(resolve, 1500));
   

  };

  const renderRed =(redPlayer)=>{
      const {one,two,three,four} = redPlayer.pieces

  }

  
    // const { red,blue,yellow,green } = colors
    // let color = turn === RED?red:turn === YELLOW? yellow:turn === GREEN? green: turn=== BLUE?blue:undefined;
    // const renderSurfaceOne = () =>{
    //     return (
    //         // <View style={styles.diceDot}/>
    //         <FontAwesome5 name="dice-one" size={54} color="#fdfffc" />
    //     )
    // }
    // const renderSurfaceTwo = () =>{
    //     return (
    //         // <View>
    //         // <View style={styles.diceDot}/>
    //         // <View style={styles.diceDot}/>
    //         // </View>
    //         <FontAwesome5 name="dice-two" size={54} color="#fdfffc" />
    //     )
    // }
    // const renderSurfaceThree = () =>{
    //     return (
    //         // <View>
    //         // <View style={styles.diceDot}/>
    //         // <View style={styles.diceDot}/>
    //         // <View style={styles.diceDot}/>
    //         // </View>
    //         <FontAwesome5 name="dice-three" size={54} color="#fdfffc" />
    //     )
    // }
    // const renderSurfaceFour = () =>{
    //     return (
    //         // <View style={{flexDirection:'row',alignSelf:'center'}}>
    //         //     {renderSurfaceTwo()}
    //         //     {renderSurfaceTwo()}
    //         // </View>
    //         <FontAwesome5 name="dice-four" size={54} color="#fdfffc" />
    //     )
    // }
    // const renderSurfaceFive = () =>{
    //     return (
    //         // <View style={{flexDirection:'row',alignSelf:'center'}}>
    //         //     {renderSurfaceTwo()}
    //         //     {renderSurfaceOne()}
    //         //     {renderSurfaceTwo()}
    //         // </View>
    //         <FontAwesome5 name="dice-five" size={54} color="#fdfffc" />
    //     )
    // }
    // const renderSurfaceSix = () =>{
    //     return (
    //         // <View style={{flexDirection:'row',alignSelf:'center'}}>
    //         //     {renderSurfaceThree()}
    //         //     {renderSurfaceThree()}
    //         // </View>
    //         <FontAwesome5 name="dice-six" size={54} color="#fdfffc" />
    //     )
    // }
    // const renderDiceSurface = (diceNumber) =>{
    //     // console.log(diceNumber)
    //     switch(diceNumber){
    //         case 1:
    //         return renderSurfaceOne();
    //         case 2: 
    //         return renderSurfaceTwo();
    //         case 3: 
    //         return renderSurfaceThree();
    //         case 4: 
    //         return renderSurfaceFour();
    //         case 5: 
    //         return renderSurfaceFive();
    //         case 6: 
    //         return renderSurfaceSix();
    //     }
    // }
    return (
   
     
   

<View style={[styles.textStyle, {flex:3,margin:0,padding:0}]}>


<View style={{flex:3,borderWidth:0}}>


<View style={{
  flex:1,
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 38,
  borderRightWidth: 39,
  borderBottomWidth: 38,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor:'#c1121f',
  transform: [{ rotate: "90deg" }],
  top:19,
  left:-19.5,
  flexDirection:"column",
  gap:2,
  flexWrap:"wrap",
  zIndex:100


 }}>


  <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-39,right:-18, justifyContent:"space-between"}}>
  {redPlayer.pieces.one.position == FINISHED && <RedGoti position ={redPlayer.pieces.one.position}></RedGoti>}
  {redPlayer.pieces.two.position == FINISHED && <RedGoti  position ={redPlayer.pieces.two.position}></RedGoti>}
  </View>
  <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-25,right:-16,justifyContent:"space-between"}}>
  {redPlayer.pieces.three.position == FINISHED && <RedGoti  position ={redPlayer.pieces.three.position}></RedGoti>}
  {redPlayer.pieces.four.position == FINISHED && <RedGoti  position ={redPlayer.pieces.four.position}></RedGoti>}
  </View>


</View>

<View style={{width: 0,
  height: 0,
  flex:1,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 38,
  borderRightWidth: 39,
  borderBottomWidth: 38,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor:green,
  transform: [{ rotate: "-90deg" }],
  top:-19,
  right:-20,
  flexDirection:"column",
  gap:2,
  flexWrap:"wrap"
 }}>
 <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-39,right:-18}}>
{greenPlayer.pieces.one.position == FINISHED && <GreenGoti position ={greenPlayer.pieces.one.position}></GreenGoti>}
{greenPlayer.pieces.two.position == FINISHED && <GreenGoti position ={greenPlayer.pieces.two.position}></GreenGoti>}
</View>
<View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-25,right:-16}}>
{greenPlayer.pieces.three.position == FINISHED && <GreenGoti position ={greenPlayer.pieces.three.position}></GreenGoti>}
{greenPlayer.pieces.four.position == FINISHED && <GreenGoti position ={greenPlayer.pieces.four.position}></GreenGoti>}
</View>
</View>

<View style={{width: 0,
 flex:1,
  height: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 38,
  borderRightWidth:39.5 ,
  borderBottomWidth: 39.5,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor:blue,
  // transform: [{ rotate: "0deg" }],
  top:-39,
  left:0,
  flexDirection:"column",
  gap:2,
  flexWrap:"wrap"
 }}>
 <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-39,right:-15}}>
{bluePlayer.pieces.one.position == FINISHED && <BlueGoti position ={bluePlayer.pieces.one.position}></BlueGoti>}
{bluePlayer.pieces.two.position == FINISHED && <BlueGoti position ={bluePlayer.pieces.two.position}></BlueGoti>}
</View>
<View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-25,right:-15}}>
{bluePlayer.pieces.three.position == FINISHED && <BlueGoti position ={bluePlayer.pieces.three.position}></BlueGoti>}
{bluePlayer.pieces.four.position == FINISHED && <BlueGoti position ={bluePlayer.pieces.four.position}></BlueGoti>}
</View>
</View>

<View style={{width: 0,
 flex:1,
  height: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 38.5,
  borderRightWidth: 39.5,
  borderBottomWidth: 39,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor: '#ffd500',
  transform: [{ rotate: "-180deg" }],
  top:-115.5,
  left:-1,
  flexDirection:"column",
  gap:2,
  flexWrap:"wrap"
 }}>
   <View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-39,right:-13}}>
{yellowPlayer.pieces.one.position == FINISHED && <YellowGoti position ={yellowPlayer.pieces.one.position}></YellowGoti>}
{yellowPlayer.pieces.two.position == FINISHED && <YellowGoti position ={yellowPlayer.pieces.two.position}></YellowGoti>}
</View>
<View style={{flex:1, flexDirection:"row", position:"absolute", bottom:-25,right:-13}}>
{yellowPlayer.pieces.three.position == FINISHED && <YellowGoti position ={yellowPlayer.pieces.three.position}></YellowGoti>}
{yellowPlayer.pieces.four.position == FINISHED && <YellowGoti position ={yellowPlayer.pieces.four.position}></YellowGoti>}
</View>
</View>
</View>

</View>

 )
}

const styles = StyleSheet.create({
    textStyle:{
        position:'absolute',
      
        alignSelf:'center',
        
        // marginTop: 0,
    },
    diceDot:{
        backgroundColor:colors.white,
        alignSelf:'center',
        width: 6,
        height: 6,
        borderRadius: 3,
        margin:2
    },
 
})
