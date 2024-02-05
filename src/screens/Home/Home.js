import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native';
import NewGameModel from '../../components/NewGameModel/NewGameModel'
import TwoPlayerModal from '../../components/NewGameModel/TwoPlayerModal';
import ThreePlayerModal from '../../components/NewGameModel/ThreePlayerModal';
import FourPlayerModal from '../../components/NewGameModel/FourPlayerModal';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios'
import Socket from '../../../utils/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  setCurrentNextPlayer,setRobotGame

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




  // useEffect(() => {


  //      onBlueInput(foundObject.p1.p1name)
  //      onYellowInput(foundObject.p2.p2name)
  //      onStart()

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     socket.off('find');
  // };
  // }, []);

  let cp = ''
  let np = ''


  useEffect(() => {
    // console.log(Socket)


    Socket.on('roomId', (roomId) => {
      setRoomId(roomId);

      // console.log("58",roomId)
    });
    // Socket.on('socketId', (socketId) => {
    //   // console.log("77", socketId)
    //    id= socketId
    //    setSocketId(id)

    // });



    Socket.on('roomStatus', (room) => {
      setRoomStatus(room);

      // console.log("62",room)

    });

    Socket.on('startTwoPlayerGame', (room) => {
      console.log("home", room)


      if(room.sockets[0] == "ROBOT" || room.sockets[1] == "ROBOT"){
       
         setRobotGame(false)
      }
      else{
        setRobotGame(true)
      }
      setFlag('')
      onBlueInput(room.users[0])
      onYellowInput(room.users[1])

      if (room.users[0] == mobileNumber) {
        cp = room.sockets[0]
        np = room.sockets[1]
        setCurrentPlayer(room.sockets[0])
        setNextPlayer(room.sockets[1])
        setCurrentNextPlayer(cp, np)
      }
      else {
        cp = room.sockets[1]
        np = room.sockets[0]
        setCurrentPlayer(room.sockets[1])
        setNextPlayer(room.sockets[0])
        setCurrentNextPlayer(cp, np)
      }



      //  console.log("100",currentPlayer,cp)
      //  console.log("101",nextPlayer,np)


      console.log("80", room)




      //  console.log('room user 1', room.users[0], mobileNumber)
      //  console.log('room user 2', room.users[1], mobileNumber)

      onStart()

    });

    return () => {
      Socket.off('roomId');
      Socket.off('socketId');
      Socket.off('roomStatus');
      Socket.off('startTwoPlayerGame');
      Socket.emit('disconnectUser', { user: mobileNumber })

    };
  }, []);


  const handleTwo = () => {

    setFlag('Searching for a Player...')
    const playerId = mobileNumber
    Socket.emit('joinRoom', { user: playerId });
    // if (roomStatus && roomStatus.isFull() && roomStatus.users.includes(playerId)) {

    // } 
    // else {
    //   // console.log('Room is not ready for a game yet');
    //   setFlag('Searching for a Player...')
    // }

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

  return (
    <ImageBackground source={require("../../../assets/bg.png")} style={styles.container}>
      <View style={{ position: "absolute", top: 10, right: 20, justifyContent: "center", alignItems: "center" }}>
        <EvilIcons name="user" size={30} color="white" />

        <Text style={{ color: "white", textAlign: "center", marginTop: 5, fontSize: 15 }}>{number}</Text>

      </View>

      {

        flag != '' && <>
          <Text style={{ color: "white", fontSize: 18 }}>{flag}</Text>
          <ActivityIndicator></ActivityIndicator>
        </>



      }

      <Image source={require("../../../assets/applogo.png")} style={{ height: 180, width: 170, resizeMode: "contain" }}></Image>


      <TouchableOpacity style={styles.newGameButton} onPress={handleTwo}>
        <Text style={{ fontSize: 18, color: "white" }}>2 Players</Text>
      </TouchableOpacity>


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
  imageStyle: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})


















