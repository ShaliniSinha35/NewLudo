import { View, Text, Pressable , Dimensions, TextInput, Button, Alert} from 'react-native'
import React, { useState } from 'react'


const HomeScreen = ({navigation}) => {

    const [p1, setP1]= useState("")
    const [p2, setP2]= useState("")
    const [p3, setP3]= useState("")
    const [p4, setP4]= useState("")

    const handleSubmit =(red,yellow,green,blue)=>{

        let minPlayersCount =0;
      red!=""?minPlayersCount++:undefined;
       yellow!=""?minPlayersCount++:undefined;
       blue!=""?minPlayersCount++:undefined;
       green!=""?minPlayersCount++:undefined;
        if(minPlayersCount>=2){
                   navigation.navigate("Game", {
               redName: p1,
               yellowName: p2,
               greenName: p3,
               blueName: p4
          })
        }else{
            Alert.alert("Minimum 2 Players", "At least 2 players are required to start the game.",
            [
                {text:"Ok"}
            ])
        }
//         if ( p1 !== "" && p2 !== "" || p1 !== "" && p3 !== "" || p1 !== "" && p4 !== "" || p2 !== "" && p3 !== "" || p2 !== "" && p4 !== "" 
//         || p4 !== "" && p3 !== ""){

       
//           navigation.navigate("Game", {
//                redName: p1,
//                yellowName: p2,
//                greenName: p3,
//                blueName: p4
//           })

//         }
//         else{
// Alert.alert("Please Select atleast 2 player")
//         }
    }

  return (
    <View style={{flex:1,marginTop:40, padding:20}}>
      <Text style={{fontSize:18}}>Let's Play</Text>

      <Pressable style={{ width:"15", borderColor:"#ec1d27", borderWidth:2,padding:15, marginTop:20}}>
       <TextInput placeholder='Player 1' value={p1} autoFocus onChangeText={(value) => setP1(value)}></TextInput>
       
      </Pressable>

      <Pressable style={{ width:"15", borderColor:"#ffe01b", borderWidth:2,padding:15, marginTop:20}}>
       <TextInput placeholder='Player 2'value={p2} autoFocus onChangeText={(value) => setP2(value)}></TextInput>
       
      </Pressable>
      <Pressable style={{ width:"15", borderColor:"#01A147", borderWidth:2,padding:15, marginTop:20}}>
       <TextInput placeholder='Player 3' value={p3} autoFocus onChangeText={(value) => setP3(value)}></TextInput>
       
      </Pressable>
      <Pressable style={{ width:"15", borderColor:"#29b6f6", borderWidth:2,padding:15, marginTop:20}}>
       <TextInput placeholder='Player 4'value={p4} autoFocus onChangeText={(value) => setP4(value)}></TextInput>
       
      </Pressable>
<View style={{margin:30, padding:15}}>
<Button title='Start Game' onPress={()=>handleSubmit(p1,p2,p3,p4)}></Button>
</View>
     
    </View>
  )
}

export default HomeScreen
