import { View, Text, BackHandler, Button, Dimensions, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import socket from '../../../utils/Socket';
import { FontAwesome } from '@expo/vector-icons';
const WinnerRobot = (props) => {

  const [playerArr, setPlayerArr] = useState(null)
  const [tableHead, setHead] = useState(['Status', 'PlayerName', 'Total Score'])
  const [bluePlayer, setBlue] = useState(props.blue.name)
  const [yellowPlayer, setYellow] = useState(props.yellow.name)
  const [redPlayer, setRed] = useState(props.red.name)
  const [greenPlayer, setGreen] = useState(props.green.name)
  const [result, setResult] = useState(null)
  const [playerNumber, setPlayerNumber] = useState(props.number)
  const [playerDetail, setPlayerDetail] = useState([])
  const [playerRank, setPlayerRank] = useState('')

  const [wallet,setWallet]= useState(0)


  console.log("winner", bluePlayer, playerNumber)


  const getPlayerDetails = async () => {

    try {
      const res = await AsyncStorage.getItem('playerArray' || '0')
      console.log(res)
      setPlayerArr(JSON.parse(res))

      const data = JSON.parse(res)
      let pid = data.findIndex((player) => player.name === playerNumber);

      if (pid !== -1) {
        console.log("Player found at index:", pid);
      } 
      else {
        console.log("Player not found");
      }
      let player = data.filter((player, id) => {
        console.log(player.name, playerNumber, id)
        return player.name == playerNumber
      }
      )

      console.log("34", player, pid)

      setPlayerDetail(player)
      setPlayerRank(pid)




      socket.on('endGame', async (value) => {

        console.log(value, value)
        if (value.value) {
          console.log("26", value)
          setResult(value)
        }
      })


    }
    catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getPlayerDetails()
  }, [])




  const handlePlay = async () => {
    props.backToHome()
    props.onRedInput('')
    props.onBlueInput('')
    props.onYellowInput('')
    props.onGreenInput('')

    await AsyncStorage.removeItem('playerArray');

  }

  return (

    <>
      {playerArr != null ?
        <ImageBackground source={require("../../../assets/bg.png")} style={{ flex: 1, alignItems: "center", height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
          
          <Text allowFontScaling={false} style={{ fontSize: 18, marginTop: 20, color: "white" }}>Match Results</Text>
          {playerDetail != null && <View style={{ width: 330, height: 85, backgroundColor: "whitesmoke", padding:5, marginTop: 40, borderRadius: 30, flexDirection: "row", alignItems: "center",justifyContent:"space-around" }}>
            <View><Text style={{ color:"#240046",fontSize:12 }}>Rank</Text><Text style={{ textAlign:"center",color:"#240046",fontWeight:600,fontSize:20 }}>{playerRank + 1}</Text></View>
            <View style={{width:55,height:55,borderRadius:50,borderColor:"green",borderWidth:2,alignItems:"center"}}><Image source={require("../../../assets/player2.png")} style={{ width: 50, height: 50, borderRadius: 50 }}></Image></View>
            {
              playerRank === 0 ? (
                <View style={{margin:10}}>
                  <Text style={{color:"green",fontSize:15}}>Congratulations</Text>
                  <Text style={{color:"#240046",fontWeight:600,fontSize:20}}>You Won  <FontAwesome name="rupee" size={15} color="#240046" /> 0.40</Text>
                </View>
              ) : 
              (
                <View style={{margin:10}}> 
                  <Text style={{color:"#240046",fontSize:15}}>You Lost</Text>
                  <Text style={{color:"#240046",fontWeight:600,fontSize:20}}>Let's try again</Text>
                </View>
              )
              
            }

            <View style={{margin:5}}>
              <Text style={{color:"#240046",fontSize:12}}>Score</Text>
              {/* {console.log(playerDetail[0].value)} */}
              {playerDetail[0] && <Text style={{textAlign:"center",color:"#240046",fontWeight:600,fontSize:20}}>{playerDetail[0].value}</Text>}
              
              </View>

          </View>}

          <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>


            <View style={{ width: 350, marginBottom: 20, height: 300, marginTop: 10,borderRadius:50 }}>
              <View style={{ flex: 1, borderColor: "#f8f9fa",  flexDirection: "row" }}>
                <View style={styles.box}>
                  <Text allowFontScaling={false} style={styles.head}>Rank</Text>
                </View>
                <View style={styles.box}>
                  <Text allowFontScaling={false} style={styles.head}>Score</Text>
                </View>
                <View style={styles.box}>
                  <Text allowFontScaling={false} style={styles.head}>Winnings</Text>
                </View>
              </View>

              {
                playerArr != null &&

                playerArr.map((player, id) => (

                  <View key={id} style={{ flex: 1, borderColor: "gray", borderWidth: 0.5, flexDirection: "row",borderRadius:15}}>

                    <View style={[styles.box, { flexDirection: "row", alignItems: "center",flex:1.5 }]}>
                  
                    
                           <Text style={{color:"white",marginRight:5}}>{id + 1}</Text>
                       
                           {
                            player.name == playerNumber ?
                            <>
                                       <View style={{width:35,height:35,borderRadius:35,borderColor:"green",borderWidth:2,alignItems:"center"}}><Image source={require("../../../assets/player2.png")} style={{ width: 30, height: 30, borderRadius: 30,resizeMode:"contain" }}></Image></View>
                                  <Text allowFontScaling={false} style={{ color: "white",marginLeft:5,fontSize:10 }}>{player.name}</Text>
                            </>  

                      
                          :

                          <>
                              <View style={{width:35,height:35,borderRadius:35,alignItems:"center",borderColor:"gray",borderWidth:2}}><Image source={require("../../../assets/player4.png")} style={{ width: 30, height: 30, borderRadius: 30,resizeMode:"contain" }}></Image></View>
                              <Text allowFontScaling={false} style={{ color: "white",marginLeft:5,fontSize:10 }}>{player.name}</Text>

                         </>  
                           }



                  

                    </View>

                    <View style={[styles.box,{flexDirection:"row"}]}>
                    <Text allowFontScaling={false} style={{ color: "white",marginLeft:5 }}>{player.value}</Text>
                    {/* {
                            player.name == playerNumber ?
                            <>
                                       <View style={{width:35,height:35,borderRadius:35,borderColor:"green",borderWidth:2,alignItems:"center"}}><Image source={require("../../../assets/player2.png")} style={{ width: 30, height: 30, borderRadius: 30,resizeMode:"contain" }}></Image></View>
                                  <Text allowFontScaling={false} style={{ color: "white",marginLeft:5 }}>{player.name}</Text>
                            </>  

                      
                          :

                          <>
                              <View style={{width:35,height:35,borderRadius:35,alignItems:"center",borderColor:"gray",borderWidth:2}}><Image source={require("../../../assets/player4.png")} style={{ width: 30, height: 30, borderRadius: 30,resizeMode:"contain" }}></Image></View>
                          <Text allowFontScaling={false} style={{ color: "white",marginLeft:5 }}>{player.name}</Text>

                         </>  
                           } */}
                    </View>
                    <View style={styles.box}>
                      {
                        id ==0 ? <Text allowFontScaling={false} style={{ color: "white" }}><FontAwesome name="rupee" size={12} color="white" /> 0.4</Text>:
                        <Text allowFontScaling={false} style={{ color: "white" }}><FontAwesome name="rupee" size={12} color="white" />  0</Text>
                      }
                      
                    </View>

                  </View>
                ))

              }


            </View>


            <TouchableOpacity style={{ width: "auto", padding: 20, flexDirection: "row", position: "absolute", bottom: 20 }} onPress={() => handlePlay()} title='Play Again'>
              <MaterialIcons name="home" size={24} color="white" />
              <Text allowFontScaling={false} style={{ color: "white", fontSize: 18 }}> Home</Text>
            </TouchableOpacity>

            {/* <ImageBackground source={require("../../../assets/winner.png")} style={{height:200,width:Dimensions.get('screen').width,  transform: [{ rotate: "-180deg" }]}}>

</ImageBackground> */}
          </View>
        </ImageBackground>
         :
        !props.isplayWithRobot && 
        <ImageBackground source={require("../../../assets/bg.png")} style={{ backgroundColor: "#03045e", flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, alignItems: "center", paddingTop: 100 }}>

          <View style={{ flex: 1, alignItems: "center" }}>
            <MaterialCommunityIcons name="heart-broken" size={45} color="white" style={{ margin: 20 }} />
            <Text allowFontScaling={false} style={{ color: "white", fontSize: 20, margin: 20 }}>Game Over</Text>
            <Text allowFontScaling={false} style={{ color: "gray", fontSize: 15 }}>You lost because you missed 3 turns.</Text>


            <TouchableOpacity style={{ width: "auto", position: "absolute", flexDirection: "row", bottom: 20 }} onPress={() => handlePlay()} title='Play Again'>
              <MaterialIcons name="home" size={24} color="white" />
              <Text allowFontScaling={false} style={{ color: "white", fontSize: 18 }}> Home</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>}

 



      {result != null && result.lost == props.currentPlayer &&
        <ImageBackground source={require("../../../assets/bg.png")} style={{ backgroundColor: "#03045e", flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, alignItems: "center", paddingTop: 100 }}>

          <View style={{ flex: 1, alignItems: "center" }}>
            <MaterialCommunityIcons name="heart-broken" size={45} color="white" style={{ margin: 20 }} />
            <Text allowFontScaling={false} style={{ color: "white", fontSize: 20, margin: 20 }}>Game Over</Text>
            <Text allowFontScaling={false} style={{ color: "gray", fontSize: 15 }}>You lost because you missed 3 turns.</Text>

            <TouchableOpacity style={{ width: "auto", position: "absolute", flexDirection: "row", bottom: 20 }} onPress={() => handlePlay()} title='Play Again'>
              <MaterialIcons name="home" size={24} color="white" />
              <Text allowFontScaling={false} style={{ color: "white", fontSize: 18 }}> Home</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>}


      {result != null && result.winner == props.currentPlayer &&
        <ImageBackground source={require("../../../assets/bg.png")} style={{ backgroundColor: "#03045e", flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, alignItems: "center", paddingTop: 100 }}>

          <View style={{ flex: 1, alignItems: "center" }}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={45} color="white" style={{ margin: 20 }} />
            <Text allowFontScaling={false} style={{ color: "white", fontSize: 20, margin: 20 }}>You Won</Text>
            {/* <Text allowFontScaling={false} style={{color:"gray", fontSize:15}}>You lost because you missed 3 turns.</Text> */}

            <TouchableOpacity style={{ width: "auto", position: "absolute", flexDirection: "row", bottom: 20 }} onPress={() => handlePlay()} title='Play Again'>
              <MaterialIcons name="home" size={24} color="white" />
              <Text allowFontScaling={false} style={{ color: "white", fontSize: 18 }}> Home</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>}

        </>

  )


}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" },
  text: { margin: 6 },
  box: {
    flex: 1.5, borderColor: "#f8f9fa", justifyContent: "center", alignItems: "center"
  },
  rowBox: {
    flex: 1, borderColor: "gray", borderWidth: 1, flexDirection: "row"
  }
});

export default WinnerRobot
