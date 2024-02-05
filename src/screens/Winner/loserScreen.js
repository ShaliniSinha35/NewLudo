import { View, Text, BackHandler, Button, Dimensions, StyleSheet, ImageBackground,Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Winner = (props) => {
   
const [playerArr, setPlayerArr] = useState(null)
const [tableHead,setHead] =useState(['Status','PlayerName','Total Score'])
const [bluePlayer,setBlue]= useState(props.blue.name)
const [yellowPlayer,setYellow]= useState(props.yellow.name)
const [redPlayer,setRed]= useState(props.red.name)
const [greenPlayer,setGreen]= useState(props.green.name)
const keysToRemove= ['red', 'green', 'blue', 'yellow']
// console.log(props)

const getPlayerDetails = async()=>{
    try{
        const res = await AsyncStorage.getItem('playerArray' || '0')
        console.log(res)
        setPlayerArr(JSON.parse(res))
    }
    catch(err){
        console.log(err)
    }
     
}

  useEffect(()=>{
    getPlayerDetails()
   },[])

    // useEffect(() => {
    //     const backAction = () => {
    //       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //         {
    //           text: 'Cancel',
    //           onPress: () => null,
    //           style: 'cancel',
    //         },
    //         {text: 'YES', onPress: () => BackHandler.exitApp()},
    //       ]);
    //       return true;

    //     };
    
    //     const backHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       backAction,
    //     );
    
    //     return () => backHandler.remove();
    //   }, []);


    const handlePlay =()=>{


      props.backToHome()
      props.onRedInput('')
      props.onBlueInput('')
      props.onYellowInput('')
      props.onGreenInput('')
      

    }

  return (

    
  playerArr != null ?
  <ImageBackground source={require("../../../assets/bg.png") }style={{flex:1, alignItems:"center",height:Dimensions.get('screen').height, width:Dimensions.get('screen').width }}>
    <View style={{flex:1, alignItems:"center", marginTop:50}} >
   
   <Text allowFontScaling={false} style={{fontSize:25,margin:20,color:"white"}}>GAME OVER</Text>

     <View style={{width:350,marginBottom:20, height:300, marginTop:10}}>
       <View style={{flex:1, borderColor:"#f8f9fa",borderWidth:0.2,flexDirection:"row"}}>
       <View style={styles.box}>
         <Text allowFontScaling={false} style={styles.head}>Status</Text>
       </View>
       <View style={styles.box}>
       <Text allowFontScaling={false} style={styles.head}>Player</Text>
       </View>
       <View style={styles.box}>
       <Text allowFontScaling={false} style={styles.head}>Score</Text>
       </View>
       </View>

       {
     playerArr!= null  && 

       playerArr.map((player,id)=>(
         <View key={id} style={{flex:1, borderColor:"gray",borderWidth:1,flexDirection:"row"}}>
         <View style={[styles.box, {flexDirection:"row", alignItems:"center"}]}>
        { id == 0 ?
         <> 
         <Image source={require("../../../assets/trophy.png")} style={{height:40,width:40}}></Image>
           <Text allowFontScaling={false} style={{color:"white"}}>Winner</Text>
            </>   : 
            <Text allowFontScaling={false} style={{color:"white"}}>{id==1 ? "Second": id == 2? "Third" : "Fourth"}</Text> 


        }   
        
         </View>
         <View style={styles.box}>
         <Text allowFontScaling={false} style={{color:"white"}}>  {player.key == "blue" ? bluePlayer : player.key== "red" ? redPlayer : player.key== "yellow" ? yellowPlayer : player.key== "green" ? greenPlayer :null }</Text>
         </View>
         <View style={styles.box}>
         <Text allowFontScaling={false} style={{color:"white"}}>{player.value}</Text> 
         </View>
         </View>
       ))
   
  }

  
     </View>

 
   <TouchableOpacity style={{width:"auto", padding:20, flexDirection:"row", position:"absolute",bottom:20}} onPress={()=>handlePlay()} title='Play Again'>
   <MaterialIcons name="home" size={24} color="white"/>
     <Text allowFontScaling={false} style={{color:"white",fontSize:18}}> Home</Text>
   </TouchableOpacity>

   {/* <ImageBackground source={require("../../../assets/winner.png")} style={{height:200,width:Dimensions.get('screen').width,  transform: [{ rotate: "-180deg" }]}}>

</ImageBackground> */}
 </View>
  </ImageBackground>

:
<ImageBackground source={require("../../../assets/bg.png") }style={{backgroundColor:"#03045e",flex:1,height:Dimensions.get('screen').height, width:Dimensions.get('screen').width, alignItems:"center", paddingTop:100}}>

<View style={{flex:1, alignItems:"center"}}>
<MaterialCommunityIcons name="heart-broken" size={45} color="white" style={{margin:20}} />
  <Text allowFontScaling={false} style={{color:"white", fontSize:20,margin:20}}>Game Over</Text>
  <Text allowFontScaling={false} style={{color:"gray", fontSize:15}}>You lost because you missed 3 turns.</Text>

  <TouchableOpacity style={{width:"auto", position:"absolute", flexDirection:"row", bottom:20}} onPress={()=>handlePlay()} title='Play Again'>
   <MaterialIcons name="home" size={24} color="white"/>
     <Text allowFontScaling={false} style={{color:"white",fontSize:18}}> Home</Text>
   </TouchableOpacity>
</View>
</ImageBackground>

  )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {textAlign:"center",fontSize:18,fontWeight:"bold",color:"white" },
    text: { margin: 6 },
    box:{
        flex:1, borderColor:"#f8f9fa",borderWidth:0.2,justifyContent:"center" ,alignItems:"center"
    },
    rowBox:{
        flex:1, borderColor:"gray",borderWidth:1,flexDirection:"row" 
    }
});

export default Winner
