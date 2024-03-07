import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image, ImageBackground, ActivityIndicator } from 'react-native';
import NewGameModel from '../../components/NewGameModel/NewGameModel'
import TwoPlayerModal from '../../components/NewGameModel/TwoPlayerModal';
import ThreePlayerModal from '../../components/NewGameModel/ThreePlayerModal';
import FourPlayerModal from '../../components/NewGameModel/FourPlayerModal';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios'
import Socket from '../../../utils/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default Home = ({
  isStartGameModalVisible,
  onNewGameButtonPress,
  onCancel,
  onRedInput,
  onYellowInput,
  onBlueInput,
  onGreenInput,
  red,
  yellow,
  green,
  blue,
  onStart,
  twoPlayer, threePlayer, fourPlayer, mobileNumber,
  setCurrentNextPlayer, setRobotGame, storeRoomId

}) => {

  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [number, setMobileNumber] = useState(mobileNumber)

  const [roomStatus, setRoomStatus] = useState(null);
  const [roomId, setRoomId] = useState(null)
  const [socketId, setSocketId] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [nextPlayer, setNextPlayer] = useState(null)
  const keysToRemove = ['red', 'green', 'blue', 'yellow']
  const [flag, setFlag] = useState('')
  const [randomNumber, setNumber] = useState("8680327678")
  const [findPlayer, setFindPlayer] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [walletValue, setWalletValue] = useState(null)

  var cp = ''
  var np = ''


  const generateNumber = () => {
    var RoboNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    RoboNumber = parseInt('9' + RoboNumber.toString().substring(1));
    return RoboNumber
  }


  const getWalletValue = async () => {

    try {
      const res = await axios.get(`https://ludo-b2qo.onrender.com/getUserData?userId=${mobileNumber}`);

      const data = res.data

      console.log("63", res.data[0].wallet)
      setWalletValue(res.data[0].wallet)
    }
    catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    getWalletValue()
  }, [walletValue])


  const playerList = [

    {
      id: 1,
      image: require("../../../assets/player2.png"),
      number: generateNumber()
    },
    {
      id: 2,
      image: require("../../../assets/player3.png"),
      number: generateNumber()
    },
    {
      id: 3,
      image: require("../../../assets/player4.png"),
      number: generateNumber()
    },
    {
      id: 4,
      image: require("../../../assets/player3.png"),
      number: generateNumber()
    },

    {
      id: 5,
      image: require("../../../assets/player4.png"),
      number: generateNumber()
    },
    {
      id: 6,
      image: require("../../../assets/player3.png"),
      number: generateNumber()
    },
    {
      id: 7,
      image: require("../../../assets/player2.png"),
      number: generateNumber()
    },
    {
      id: 8,
      image: require("../../../assets/player3.png"),
      number: generateNumber()
    },

  ]



  useEffect(() => {
    // console.log(Socket)


    Socket.on('roomId', (roomId) => {
      setRoomId(roomId)
      storeRoomId(roomId);


      // console.log("58",roomId)
    });

    Socket.on('roomStatus', (room) => {
      setRoomStatus(room);

      // console.log("62",room)

    });

    Socket.on('startTwoPlayerGame', (room) => {
      // console.log("home", room)


      if (room.sockets[0] == "ROBOT" || room.sockets[1] == "ROBOT") {

        setRobotGame(false)
      }
      else {
        setRobotGame(true)
      }
      setFlag('')
      setFindPlayer(true)

      onBlueInput(room.users[0])
      onYellowInput(room.users[1])

      if (room.users[0] == mobileNumber) {
        cp = room.sockets[0]
        np = room.sockets[1]
        setCurrentPlayer(room.sockets[0])
        setNextPlayer(room.sockets[1])
        setPlayerTwo(room.users[1])
        setCurrentNextPlayer(cp, np)
      }
      else {
        cp = room.sockets[1]
        np = room.sockets[0]
        setCurrentPlayer(room.sockets[1])
        setNextPlayer(room.sockets[0])
        setPlayerTwo(room.users[0])
        setCurrentNextPlayer(cp, np)
      }



      if (room.sockets[0] == "ROBOT" || room.sockets[1] == "ROBOT") {

        setTimeout(() => {
          onStart()
        }, 6000);


      }

      else {
        onStart()
      }


      // console.log("80", room)


    });

    return () => {
      Socket.off('roomId');
      Socket.off('socketId');
      Socket.off('roomStatus');
      Socket.off('startTwoPlayerGame');
      // Socket.emit('disconnectUser', { user: mobileNumber })

    };
  }, [], [playerTwo]);


  const handleTwo = () => {

    setFlag('Searching for a Player...')
    const playerId = mobileNumber
    Socket.emit('joinRoom', { user: playerId });

  }

  // const handleTwo = () => {
  //   setSelectedPlayers(2);
  //   onBlueInput('Player 1')
  //   onYellowInput('Player 2')


  // onNewGameButtonPress()

  // };

  const handleThree = () => {
    setSelectedPlayers(3);
    onBlueInput('Player 1')
    onRedInput('Player 2')
    onYellowInput('Player 3')

    onNewGameButtonPress()
  };

  const handleFour = () => {
    setSelectedPlayers(4);
    onBlueInput('Player 1')
    onRedInput('Player 2')
    onYellowInput('Player 3')
    onGreenInput('Player 4')

    onNewGameButtonPress()
  };

  useEffect(() => {

  }, [selectedPlayers])



  const { width } = Dimensions.get('screen');
  const translateX = new Animated.Value(width); // Set initial value to width
  const animatedLoop = Animated.loop(
    Animated.timing(translateX, {
      toValue: -width,
      duration: 1000,
      useNativeDriver: false,
    })
  );

  useEffect(() => {
    const resetAnimation = Animated.timing(translateX, {
      toValue: width, // Reset to initial value
      duration: 0,
      useNativeDriver: false,
    });

    const loopAnimation = Animated.sequence([animatedLoop, resetAnimation]);

    loopAnimation.start();

    // Update the image index on each animation iteration
    const eventListener = Animated.event(
      [{ nativeEvent: { translateX: translateX } }],
      { useNativeDriver: false }
    );

    translateX.addListener((value) => {
      if (value.value === 0) {
        // Reset the image index when the animation completes a loop
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % playerList.length);
        loopAnimation.reset(); // Start a new loop
      }
    });

    return () => {
      // Clean up animations when the component unmounts
      translateX.removeAllListeners();
      loopAnimation.stop();
    };
  }, [translateX]);

  useEffect(() => {
    // console.log("Player Two:", playerTwo);
  }, [playerTwo]);
  return (
    <ImageBackground source={require("../../../assets/bg.png")} style={styles.container}>

      <>


       <View style={{width:Dimensions.get('screen').width, height:80, position: "absolute", top:0,flexDirection:"row",justifyContent:"space-around",margin:20}}>

        <View style={{flexDirection:"row"}}>
        <View style={{width:45,height:45,borderRadius:40,borderColor:"#f6ae2d",borderWidth:2,alignItems:"center"}}>
        <Image source={require("../../../assets/player2.png")} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
        </View>
        <Text style={{ color: "white", textAlign: "center", marginTop: 2, fontSize: 15, marginTop: 10 }}>  +91 {number}</Text>
        </View>
         <View style={{alignItems:"center"}}>

           <TouchableOpacity style={{height:40,width:90,backgroundColor:"#008000",borderRadius:10,flexDirection:"row", alignItems:"center",padding:5,justifyContent:"space-around",elevation:5 }}>

           <FontAwesome5 name="wallet" size={24} color="white" />

           {walletValue ? <Text style={{ color: "white", textAlign: "center", marginTop: 5, fontSize: 22 }}> <FontAwesome name="rupee" size={18} color="white" /> {walletValue}</Text>
            : <Text style={{ color: "white", textAlign: "center", marginTop: 5, fontSize: 22 }}> <FontAwesome name="rupee" size={18} color="white" /> 0 </Text>
          }
           </TouchableOpacity>

          </View>
           
       </View>
        {/* <View style={{ position: "absolute", top: 10, right: 20, justifyContent: "center", alignItems: "center" }}>
          <EvilIcons name="user" size={30} color="white" />

          <Text style={{ color: "white", textAlign: "center", marginTop: 5, fontSize: 15 }}>{number}</Text>
          {walletValue ? <Text style={{ color: "white", textAlign: "center", marginTop: 5, fontSize: 15 }}> <FontAwesome name="rupee" size={12} color="white" /> {walletValue}</Text>
            : <Text style={{ color: "white", textAlign: "center", marginTop: 5, fontSize: 15 }}> <FontAwesome name="rupee" size={12} color="white" /> 0 </Text>
          }


        </View> */}


      </>


      {
        !findPlayer ?
          flag != '' ?
            <>
              {/* <Image source={require("../../../assets/applogo.png")} style={{ position: "absolute", top: 20, height: 150, width: 150, resizeMode: "contain" }}></Image> */}

              <TouchableOpacity style={{ width: 120, height: 50, flexDirection: "row", marginBottom: 45, justifyContent: "center", backgroundColor: "#240046", borderWidth: 1, borderRadius: 10, alignItems: "center" }}>
                <View style={{ margin: 8 }}>
                  <MaterialCommunityIcons name="sword-cross" size={24} color="white" />
                </View>
                <View style={{ margin: 8 }}>
                  <Text allowFontScaling={false} style={{ color: "whitesmoke", fontSize: 12 }}>Battle</Text>
                  <Text allowFontScaling={false} style={{ color: "whitesmoke", fontSize: 18, fontWeight: 600 }}><FontAwesome name="rupee" size={12} color="white" /> 0.4</Text>
                </View>
              </TouchableOpacity>


              <View
                style={[
                  styles.box,
                ]}
              >
                <>

                  <Image style={{ position: "absolute", opacity: 0.2, height: 150, width: 150, top: -30 }} source={require("../../../assets/gif1.gif")} ></Image>
                  <Image source={require("../../../assets/player2.png")} style={{ width: 85, height: 88, resizeMode: "contain" }}></Image>
                  <Text style={{ position: "absolute", bottom: -26, color: "white" }} >+91{number}</Text>
                </>

              </View>
              <Text style={{ color: "#ff8800", fontSize: 18, marginBottom: 10, fontWeight: 500 }}> VS </Text>

              <Animated.View
                style={[
                  styles.box1,
                  {
                    transform: [{ translateX: translateX }],
                  },
                ]}
              >
                <>
                  <Image source={playerList[currentImageIndex].image} style={{ width: 55, height: 65, resizeMode: "contain" }}></Image>
                  <Text style={{ position: "absolute", bottom: -26, color: "white" }} >{playerList[currentImageIndex].number}</Text>
                </>

              </Animated.View>


              <Text style={{ position: "absolute", bottom: 35, color: "white", marginBottom: 5 }}>Searching for opponent...</Text>
              <Text style={{ position: "absolute", bottom: 15, color: "white", marginBottom: 5, fontSize: 10, marginTop: 10 }}>you'll lose the game & entry fee if you leave now or close the app.</Text>
            </>

            :

            <>

              <Image source={require("../../../assets/applogo.png")} style={{ height: 180, width: 170, resizeMode: "contain" }}></Image>


              <TouchableOpacity style={styles.newGameButton} onPress={handleTwo}>
                <Text style={{ fontSize: 18, color: "white" }}>2 Players</Text>
              </TouchableOpacity>
            </>

          :

          <>
            <Text style={{ color: "white", marginBottom: 5 }}>Game Start Soon...</Text>

            {
              playerTwo != null &&

              <>
                <View
                  style={[
                    styles.box,


                  ]}
                >
                  <>
                    <Image source={require("../../../assets/player2.png")} style={{ width: 85, height: 88, resizeMode: "contain" }}></Image>
                    <Text style={{ position: "absolute", bottom: -26, color: "white" }} >+91{number}</Text>
                  </>

                </View>

                <Text style={{ color: "#ff8800", fontSize: 18, marginBottom: 30, fontWeight: 500 }}> VS</Text>
                <View
                  style={[
                    styles.box,
                  ]}
                >

                  <>
                    <Image source={require("../../../assets/player4.png")} style={{ width: 85, height: 88, resizeMode: "contain" }}></Image>
                    <Text style={{ position: "absolute", bottom: -26, color: "white" }}>+91{playerTwo}</Text>
                  </>
                </View>


              </>
            }

          </>

      }







      {selectedPlayers === 2 && (
        <TwoPlayerModal
          isStartGameModalVisible={isStartGameModalVisible}
          onCancel={onCancel}
          // onRedInput={onRedInput}
          onYellowInput={onYellowInput}
          onBlueInput={onBlueInput}
          // onGreenInput={onGreenInput}
          red={red}
          yellow={yellow}
          green={green}
          blue={blue}
          onStart={onStart}
          twoPlayer={twoPlayer}
        />
      )}

      {selectedPlayers === 3 && (
        <ThreePlayerModal
          isStartGameModalVisible={isStartGameModalVisible}
          onCancel={onCancel}
          onRedInput={onRedInput}
          onYellowInput={onYellowInput}
          onBlueInput={onBlueInput}
          onGreenInput={onGreenInput}
          red={red}
          yellow={yellow}
          green={green}
          blue={blue}
          onStart={onStart}
          threePlayer={threePlayer}
        />
      )}

      {selectedPlayers === 4 && (
        <FourPlayerModal
          isStartGameModalVisible={isStartGameModalVisible}
          onCancel={onCancel}
          onRedInput={onRedInput}
          onYellowInput={onYellowInput}
          onBlueInput={onBlueInput}
          onGreenInput={onGreenInput}
          red={red}
          yellow={yellow}
          green={green}
          blue={blue}
          onStart={onStart}
          fourPlayer={fourPlayer}
        />
      )}

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: "center",
    justifyContent: "center"

  },
  logoStyle: {
    color: '#f00',
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: 'bold'
  },
  newGameButton: {
    backgroundColor: '#240046',
    width: 200,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    elevation: 4,
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 80,
    // backgroundColor: '#240046',
    backgroundColor: '#7b2cbf',
    alignItems: "center",
    borderColor: '#ddd',
    borderWidth: 2,
    marginBottom: 70
  },
  box1: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#240046',
    // backgroundColor: '#7b2cbf',
    alignItems: "center",
    borderColor: '#ddd',
    borderWidth: 2,

  },
  imageStyle: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})


















