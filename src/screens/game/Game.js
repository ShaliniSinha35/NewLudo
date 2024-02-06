import React, { Component, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ToastAndroid, ImageBackground, TouchableOpacity, Animated, ActivityIndicator, Image, Button, Touchable } from 'react-native';
import { colors } from '../../util/Colors';
import PlayerBox from '../../components/PlayerBox/PlayerBox'
import VerticalCellsContainer from '../../components/VerticalCellsContainer/VerticalCellsContainer';
import HorizontalCellsContainer from '../../components/HorizontalCellsContainer/HorizontalCellsContainer';
import { FINISHED, BLUE, BOTTOM_VERTICAL, FOUR, GREEN, HOME, ONE, RED, THREE, TOP_VERTICAL, TWO, YELLOW, R1, Y1, Y9, G1, G9, B1, B9, R9, R2, R3, R4, R5, Y2, Y3, Y5, G2, G3, G4, G5, B2, B3, B4, B15, R12, R17 } from '../../util/Constants';
import RedGoti from '../../components/Goti/RedGoti';
import YellowGoti from '../../components/Goti/YellowGoti';
import BlueGoti from '../../components/Goti/BlueGoti';
import GreenGoti from '../../components/Goti/GreenGoti';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { FontAwesome5 } from '@expo/vector-icons';
import Arrow1 from '../../../components/Svg/Arrow1';
import Arrow2 from '../../../components/Svg/Arrow2';
import Arrow3 from '../../../components/Svg/Arrow3';
import Arrow4 from '../../../components/Svg/Arrow4';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Rows } from 'react-native-table-component'
import { Alert, VStack, HStack, IconButton, Box } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Haptics } from 'expo-haptics';
import { FontAwesome } from '@expo/vector-icons';
import Socket from '../../../utils/Socket';



export default class Game extends Component {

    constructor(props) {
        // console.log(props)
        super(props);
        const { red, blue, yellow, green } = colors;
        const { redName, blueName, yellowName, greenName, twoPlayer, threePlayer, fourPlayer, number, currentPlayer, nextPlayer } = props;
        this.intervalId = null
        this.rollingSound = new Audio.Sound();
        this.soundObject = new Audio.Sound();
        this.rollingValue = new Animated.Value(0);
        this.onDiceRoll = this.onDiceRoll.bind(this);

        
        this.state = {
            currentPlayer: currentPlayer,
            nextPlayer: nextPlayer,
            red: this.initPlayer(RED, red, redName),
            yellow: this.initPlayer(YELLOW, yellow, yellowName),
            green: this.initPlayer(GREEN, green, greenName),
            blue: this.initPlayer(BLUE, blue, blueName),
            isRolling: false,
            diceNumber: 1,
            moves: [],
            bonusCount: 0,
            animateForSelection: false,
            isWaitingForDiceRoll: true,
            turn: blueName !== "" ? BLUE : redName !== "" ? RED : yellowName !== "" ? YELLOW : greenName !== "" ? GREEN : undefined,
            diceRollTestData: [1, 2, 3, 4, 5, 6],
            diceRollTestDataIndex: 0,
            extraChance: 0,
            redScore: [],
            blueScore: [],
            greenScore: [],
            yellowScore: [],
            rollingRotation: this.rollingValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],

            }),

            timers: {
                RED: null,
                YELLOW: null,
                GREEN: null,
                BLUE: null,
            },
            redHeart: 3,
            blueHeart: 3,
            greenHeart: 3,
            yellowHeart: 3,
            remainingTime: 180, // 3 minutes in seconds
            winnerArray: [],
            status: "warning",
            title: "You missed a turn!",
            subtitle: "If you miss 3 turns, you will be out of the game",
            showAlert: false,
            timerId: null,
            keysToRemove: ['red', 'green', 'blue', 'yellow'],
            setTurn: false,
            socketId: null,
            setTimer: false,
            setIsTimerActive: false,
            showDice: null,
            playerColor: null
        }



    }



    componentDidMount() {
        this.loadSound();
        this.loadPieceBiteSound()
        // this.displayTimer();


        this.startTimer()

        // Listen for 'getTimer' events from the server
        Socket.on('getTimer', (value) => {
            this.setState({ setIsTimerActive: value });
        });

        Socket.on('color', (color) => {
            //  console.log("118",color)
            this.setState({ playerColor: color })
            this.state.playerColor = color
        })


        //update gamestate
        Socket.on('broadcastGameState', ({ gameState }) => {
            // console.log('Received broadcasted gameState:', gameState);

            // Update the component state with the received gameState
            this.setState({
                red: gameState.red,
                yellow: gameState.yellow,
                green: gameState.green,
                blue: gameState.blue,
                isRolling: gameState.isRolling,
                // diceNumber: gameState.diceNumber,
                isWaitingForDiceRoll: gameState.isWaitingForDiceRoll,
                turn: gameState.turn,
                redScore: gameState.redScore,
                blueScore: gameState.blueScore,
                greenScore: gameState.greenScore,
                yellowScore: gameState.yellowScore,
                redHeart: gameState.redHeart,
                blueHeart: gameState.blueHeart,
                greenHeart: gameState.greenHeart,
                yellowHeart: gameState.yellowHeart,


            })



            // console.log("152", gameState.turn)
        })

        //getTurn
        Socket.on('getTurn', (value) => {
            this.setState({ setTurn: value }
                , () => {
                    if (value) {
                        // Start the turn timer on the client side
                        this.startTurnTimer();
                    } else {
                        // Stop the turn timer on the client side
                        this.stopTurnTimer();
                    }
                }
            );
        });

        Socket.on('dice_roll_result', (number) => {
            this.setState({diceNumber:number})
             });

        Socket.on('endGame', async (value) => {
            if (value) {
                await AsyncStorage.setItem('result', JSON.stringify(value))
                this.props.onEnd()
            }
        })

        this.clearAsyncStorageMultiple(this.state.keysToRemove).then(success => {
            if (success) {
                // console.log('Keys cleared successfully');
            } else {
                // console.log('Failed to clear keys');
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if the 'turn' state has changed
        if (prevState.diceNumber !== this.state.diceNumber) {

            Socket.on('dice_roll_result', (number) => {
                this.setState({diceNumber:number})
                 });
    
        }
    }

    componentWillUnmount() {

        // if (Socket) {
        //     Socket.emit('disconnect')
        // }
        this.unloadSound();
        this.unLoadPieceBiteSound()
        // clearInterval(this.intervalId);
        // this.clearAllTimers();
        // Socket.off('getTimer');
        // Socket.off('updateTimerState');
        // Socket.emit('disconnectSocket', { socket: this.state.currentPlayer })
        // Socket.emit('disconnectSocket', { socket: this.state.nextPlayer })
    }

    startTurnTimer() {
        this.setState({ setIsTimerActive: true });
        this.state.timerId = setTimeout(() => {
            this.decreaseHeart();
            this.moveToNextPlayer();
        }, 15000);

        this.setState(prevState => ({
            timers: {
                ...prevState.timers,
                [this.state.turn]: this.state.timerId
            },
            // timerId: timerId
        }));

    }

    async decreaseHeart() {
        const { turn, blueHeart, yellowHeart, redHeart, greenHeart } = this.state;

        switch (turn) {
            case BLUE:
                if (blueHeart > 1) {
                    this.setState({
                        blueHeart: blueHeart - 1,
                        showAlert: true
                    });
                    setTimeout(() => {
                        this.setState({ showAlert: false });
                    }, 3000);
                } else {
                    // Handle game over or other logic
                    // this.props.onEnd()

                    await AsyncStorage.removeItem('playerArray');

                    Socket.emit('endGame', {
                        loser: this.state.currentPlayer,
                        winner: this.state.nextPlayer
                    })

                    Socket.on('endGame', async (value) => {
                        if (value.value) {
                            await AsyncStorage.setItem('result', JSON.stringify(value))
                            // console.log("171", value)/
                            this.props.onEnd()
                        }
                    })


                }
                break;

            case YELLOW:
                if (yellowHeart > 1) {
                    this.setState({
                        yellowHeart: yellowHeart - 1,
                        showAlert: true
                    });
                    setTimeout(() => {
                        this.setState({ showAlert: false });
                    }, 3000);
                } else {
                    // Handle game over or other logic
                    // this.props.onEnd()

                    await AsyncStorage.removeItem('playerArray');
                    Socket.emit('endGame', {
                        loser: this.state.currentPlayer,
                        winner: this.state.nextPlayer
                    })

                    Socket.on('endGame', async (value) => {
                        if (value) {
                            await AsyncStorage.setItem('result', JSON.stringify(value))
                            // console.log("171", value)
                            this.props.onEnd()
                        }
                    })
                }
                break;

            case RED:
                if (redHeart > 1) {
                    this.setState({
                        redHeart: redHeart - 1,
                        showAlert: true
                    });
                    setTimeout(() => {
                        this.setState({ showAlert: false });
                    }, 3000);
                } else {
                    // Handle game over or other logic
                    this.props.onEnd()
                    //     await AsyncStorage.removeItem('playerArray');
                    //     Socket.emit('endGame',{
                    //         loser: this.state.currentPlayer,
                    //          winner: this.state.nextPlayer 
                    //       })

                    //       Socket.on('endGame',async(value)=>{
                    //         if(value){
                    //             await AsyncStorage.setItem('result', JSON.stringify(value)) 
                    //             console.log("171",value)
                    //            this.props.onEnd()
                    //         }
                    //    })
                }
                break;

            case GREEN:
                if (greenHeart > 1) {
                    this.setState({
                        greenHeart: greenHeart - 1,
                        showAlert: true
                    });
                    setTimeout(() => {
                        this.setState({ showAlert: false });
                    }, 3000);
                } else {
                    // Handle game over or other logic
                    this.props.onEnd()
                    //     await AsyncStorage.removeItem('playerArray');
                    //     Socket.emit('endGame',{
                    //         loser: this.state.currentPlayer,
                    //          winner: this.state.nextPlayer 
                    //       })

                    //       Socket.on('endGame',async(value)=>{
                    //         if(value){
                    //             await AsyncStorage.setItem('result', JSON.stringify(value)) 
                    //             console.log("171",value)
                    //            this.props.onEnd()
                    //         }
                    //    })
                }
                break;

            default:
                break;
        }

    }



    // Stop the turn timer
    stopTurnTimer() {
        clearTimeout(this.state.timerId);
        this.setState({ setIsTimerActive: false, timerId: null });
        this.setState(prevState => ({
            timers: {
                ...prevState.timers,
                [this.state.turn]: null
            }
        }));
    }



    async moveToNextPlayer() {

      
        // Clear the current player's timer
        this.stopTurnTimer()

        // Get the next player
        const nextPlayer = this.getNextTurn();

        // Update the current turn in the state
        if (nextPlayer) {


            this.setState({ animateForSelection: false, moves: [], turn: nextPlayer }, () => {

                Socket.emit('changeTurn', {
                
                    currentPlayer: this.state.currentPlayer, // Your socket ID
                    nextPlayer: this.state.nextPlayer, // Other player's socket ID,
                    diceNumber: this.state.diceNumber,
                    extraChance: this.state.extraChance,
                    bonusCount: this.state.bonusCount

                })
                Socket.emit('updateGameState', this.state);

                if (this.state.setTurn) {
                    // Start the turn timer on the client side
                    this.startTurnTimer();
                } else {
                    // Stop the turn timer on the client side
                    this.stopTurnTimer();
                }

            })
        }

    }


    formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    async clearAsyncStorageMultiple(keysArray) {
        try {
            for (const key of keysArray) {
                await AsyncStorage.removeItem(key);
            }
            return true; // Indicates successful clearance
        } catch (exception) {
            // console.log(exception);
            return false; // Indicates failure
        }
    };


    startTimer() {
        this.intervalId = setInterval(() => {
            this.setState(prevState => {
                //   console.log('Previous remainingTime:', prevState.remainingTime); // Debugging line
                return {
                    remainingTime: prevState.remainingTime - 1
                };
            }, async () => {
                if (this.state.remainingTime <= 0) {

                    // console.log("139 called")

                    await this.retrieveData()
                    // console.log("142 called")
                    this.props.onEnd()
                    this.stopTimer();


                }
            });
            // Socket.emit('updateGameState', this.state);
        }, 1000);
    }

    retrieveData = async () => {
        //    console.log("retrieve data")


        const { yellowName, blueName, greenName, redName } = this.props;

        if (redName != "" && blueName != "" && greenName != "" && yellowName != "") {
            try {
                const redValue = await AsyncStorage.getItem('red');
                const yellowValue = await AsyncStorage.getItem('yellow');
                const greenValue = await AsyncStorage.getItem('green');
                const blueValue = await AsyncStorage.getItem('blue');

                const values = [
                    { key: 'red', value: redValue },
                    { key: 'yellow', value: yellowValue },
                    { key: 'green', value: greenValue },
                    { key: 'blue', value: blueValue },
                ];
                const sortedValues = values.sort((a, b) => b.value - a.value);
                const firstGreatest = sortedValues[0].key;
                const secondGreatest = sortedValues[1].key;
                const thirdGreatest = sortedValues[2].key;
                const fourthGreatest = sortedValues[3].key;



                for (let i = 0; i < sortedValues.length; i++) {
                    this.state.winnerArray.push(sortedValues[i])

                }

                await AsyncStorage.setItem('playerArray', JSON.stringify(this.state.winnerArray))


            }
            catch (error) {
                console.log(error)
            }

        }

        else if (redName != "" && blueName != "" && yellowName != "") {
            try {
                const redValue = await AsyncStorage.getItem('red');
                const yellowValue = await AsyncStorage.getItem('yellow');
                const blueValue = await AsyncStorage.getItem('blue');

                const values = [
                    { key: 'red', value: redValue },
                    { key: 'yellow', value: yellowValue },
                    { key: 'blue', value: blueValue },
                ];
                const sortedValues = values.sort((a, b) => b.value - a.value);
                const firstGreatest = sortedValues[0].key;
                const secondGreatest = sortedValues[1].key;
                const thirdGreatest = sortedValues[2].key;



                for (let i = 0; i < sortedValues.length; i++) {
                    this.state.winnerArray.push(sortedValues[i])

                }

                await AsyncStorage.setItem('playerArray', JSON.stringify(this.state.winnerArray))


            }
            catch (error) {
                console.log(error)
            }
        }
        else {

            try {
                const yellowValue = await AsyncStorage.getItem('yellow');
                const blueValue = await AsyncStorage.getItem('blue');
                const values = [
                    { key: 'yellow', value: yellowValue },
                    { key: 'blue', value: blueValue },
                ];
                const sortedValues = values.sort((a, b) => b.value - a.value);
                const firstGreatest = sortedValues[0].key;
                const secondGreatest = sortedValues[1].key;



                for (let i = 0; i < sortedValues.length; i++) {
                    this.state.winnerArray.push(sortedValues[i])

                }

                await AsyncStorage.setItem('playerArray', JSON.stringify(this.state.winnerArray))
            }
            catch (error) {
                console.log(error)
            }
        }


    };


    stopTimer = () => {
        clearInterval(this.intervalId);
        this.setState({ isActive: false, remainingTime: 180 }); // Reset to 3 minutes


    };



    async loadSound() {
        try {
            await this.rollingSound.loadAsync(require('../../../assets/diceSound.mp3'));

        } catch (error) {
            console.error('Error loading sound:', error);
        }
    }

    async unloadSound() {
        try {
            await this.rollingSound.unloadAsync();
        } catch (error) {
            console.error('Error unloading sound:', error);
        }
    }


    async loadPieceBiteSound() {
        try {
            await this.soundObject.loadAsync(require('../../../assets/biteSound.m4a'));
        } catch (error) {
            console.error('Failed to load sound', error);
        }
    }

    async unLoadPieceBiteSound() {
        try {
            await this.soundObject.unloadAsync();
        } catch (error) {
            console.error('Error unloading sound:', error);
        }
    }

    async playSound() {
        try {
            await this.soundObject.replayAsync();
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    };

    renderDiceIcons() {
        const { diceNumber, isRolling } = this.state;

        if (isRolling) {
            return <Image rollTime={300} source={require("../../../assets/DICE2.png")}></Image>

            //    <FontAwesome5 name="dice-d6" size={54} color="#fdfffc"
            //   numDice={1}  // Set the number of dice as needed
            //   rollTime={1000}
            //   faceColor="#ff5733"
            //   dotColor="#ffffff"
            // />;
        }
        if (diceNumber === 1) {
            return <FontAwesome5 name="dice-one" size={50} color="#fdfffc" />;
        } else if (diceNumber === 2) {
            return <FontAwesome5 name="dice-two" size={50} color="#fdfffc" />;
        } else if (diceNumber === 3) {
            return <FontAwesome5 name="dice-three" size={50} color="#fdfffc" />;
        } else if (diceNumber === 4) {
            return <FontAwesome5 name="dice-four" size={50} color="#fdfffc" />;
        } else if (diceNumber === 5) {
            return <FontAwesome5 name="dice-five" size={50} color="#fdfffc" />;
        } else if (diceNumber === 6) {
            return <FontAwesome5 name="dice-six" size={50} color="#fdfffc" />;
        }

        return null;
    }


    initPlayer(playerType, color, playerName) {

        return {
            // pieces:playerType == RED ? this.initRedPieces(playerType):null || playerType == YELLOW ? this.initYellowPieces(playerType):null || playerType == GREEN ? this.initGreenPieces(playerType):null || playerType == BLUE ? this.initBluePieces(playerType):null  ,
            pieces: this.initPieces(playerType),
            color: color,
            player: playerType,
            playerName: playerName,
            totalScore: null

        }
    }


    initPieces(playerColor) {
        let time = new Date().getTime();
        return {
            one: { position: playerColor == RED ? R1 : playerColor == YELLOW ? Y1 : playerColor == GREEN ? G1 : playerColor == BLUE ? B1 : null, name: ONE, color: playerColor, updateTime: time, oneCount: [], piecePosition: new Animated.Value(0) },
            two: { position: playerColor == RED ? R1 : playerColor == YELLOW ? Y1 : playerColor == GREEN ? G1 : playerColor == BLUE ? B1 : null, name: TWO, color: playerColor, updateTime: time, twoCount: [], piecePosition: new Animated.Value(0) },
            three: { position: playerColor == RED ? R1 : playerColor == YELLOW ? Y1 : playerColor == GREEN ? G1 : playerColor == BLUE ? B1 : null, name: THREE, color: playerColor, updateTime: time, threeCount: [], piecePosition: new Animated.Value(0) },
            four: { position: playerColor == RED ? R1 : playerColor == YELLOW ? Y1 : playerColor == GREEN ? G1 : playerColor == BLUE ? B1 : null, name: FOUR, color: playerColor, updateTime: time, fourCount: [], piecePosition: new Animated.Value(0) }
        }
    }


    restartTurnTimer() {
        // Clear the current player's timer
        this.stopTurnTimer();

        // Start the turn timer for the current player
        this.startTurnTimer();
    }


    render() {
        const { remainingTime, turn } = this.state;
        const { redName, yellowName, greenName, blueName } = this.props;

        // console.log("598", turn)

        // console.log("614", turn,this.state.setTurn)

        return (


            <ImageBackground source={require("../../../assets/new.png")} style={{ flex: 1, alignItems: "center" }} >


                <View style={{ flexDirection: "row", width: Dimensions.get("screen").width, justifyContent: "space-around", alignItems: "center" }}>
                    <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 50, borderColor: "#7b2cbf", borderWidth: 4, alignItems: "center", justifyContent: "center" }}>

                        <Ionicons name="settings-sharp" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={{ width: 140, borderColor: "gray", borderWidth: 1, borderRadius: 20, alignItems: "center", flexDirection: "row", justifyContent: "center", padding: 4, marginTop: 40 }}>
                        <MaterialIcons name="timer" size={28} color="white" />
                        <Text allowFontScaling={false} style={{ fontSize: 20, color: "white", marginLeft: 3, fontWeight: "bold" }}>
                            {this.formatTime(remainingTime)}
                        </Text>
                    </View>


                    <TouchableOpacity style={{ height: 45, width: 70, borderRadius: 30, borderColor: "#7b2cbf", borderWidth: 4, alignItems: "center", justifyContent: "center", padding: 5 }}>
                        <Text allowFontScaling={false} style={{ color: "white", fontSize: 12 }}>Pot</Text>
                        <Text allowFontScaling={false} style={{ color: "white", fontSize: 12 }}><FontAwesome name="rupee" size={12} color="white" /> 0.4</Text>
                    </TouchableOpacity>
                </View>


                {/* {console.log("627", this.state.setIsTimerActive, this.state.currentPlayer)} */}

                {

                    this.state.setTurn &&
                        this.state.timerId ?

                        <TouchableOpacity style={{
                            height: 100, width: 100, borderRadius: 50, borderColor: "#7b2cbf", borderWidth: 7, alignItems: "center", justifyContent: "center", padding: 5, position: "absolute",
                            bottom: "8.5%",
                            left: "38%",
                        }}>
                            <CountdownCircleTimer
                                isPlaying
                                duration={15}
                                colors={['#008000', '#F7B801', '#A30000', '#A30000']}
                                colorsTime={[7, 5, 2, 0]}
                                size={110}
                                strokeWidth={7}
                                strokeLinecap='square'

                            >
                                {({ remainingTime }) =>

                                    <View style={[styles.diceBtn3, {
                                        backgroundColor: "#231942", borderWidth: 8,
                                        borderColor: 'rgba(0,0,0,0.2)',
                                    }]}>

                                        <Animated.View
                                            style={[

                                                {
                                                    transform: [{ rotate: this.state.rollingRotation }],
                                                    // backgroundColor: "#7b2cbf"
                                                },
                                            ]}
                                        >
                                            <TouchableOpacity onPress={this.onDiceRoll}>{this.renderDiceIcons()}</TouchableOpacity>
                                        </Animated.View>


                                    </View>

                                }

                            </CountdownCircleTimer>
                        </TouchableOpacity>
                        :

                        this.state.setTurn && <TouchableOpacity style={{
                            height: 100, width: 100, borderRadius: 50, borderColor: "#7b2cbf", borderWidth: 7, alignItems: "center", justifyContent: "center", padding: 5, position: "absolute",
                            bottom: "8.5%", left: "38%",
                        }}>
                            <View style={[styles.diceBtn3, {
                                backgroundColor: "", borderWidth: 8,
                                borderColor: 'rgba(0,0,0,0.2)',
                            }]}>

                                <Animated.View
                                    style={[

                                        {
                                            transform: [{ rotate: this.state.rollingRotation }],
                                            backgroundColor: ""
                                        },
                                    ]}
                                >
                                    <TouchableOpacity onPress={this.onDiceRoll}>{this.renderDiceIcons()}</TouchableOpacity>
                                </Animated.View>


                            </View>
                        </TouchableOpacity>

                }

                <View style={styles.gameContainer}>

                    <View style={styles.twoPlayersContainer}>

                        {this.renderPlayerBox(redName, this.state.red, this.state.redScore, this.state.redHeart, this.state.diceNumber, this.state.isRolling, this.renderDiceIcons, this.state.showDice = turn == "red" ? true : false, this.state.timers[RED] != null ? true : false, { borderTopLeftRadius: 20 })}
                        <VerticalCellsContainer position={TOP_VERTICAL}
                            state={this.state}
                            onPieceSelection={(selectedPiece) => {
                                this.onPieceSelection(selectedPiece);
                            }}
                        />
                        {this.renderPlayerBox(yellowName, this.state.yellow, this.state.yellowScore, this.state.yellowHeart, this.state.diceNumber, this.state.isRolling, this.renderDiceIcons, this.state.showDice = turn == "yellow" ? true : false, this.state.timers[YELLOW] != null ? true : false, { borderTopRightRadius: 20 })}
                    </View>
                    <HorizontalCellsContainer state={this.state}
                        onDiceRoll={() => { this.onDiceRoll() }}
                        onPieceSelection={(selectedPiece) => {
                            this.onPieceSelection(selectedPiece);
                        }}
                    />
                    <View style={styles.twoPlayersContainer}>
                        {this.renderPlayerBox(blueName, this.state.blue, this.state.blueScore, this.state.blueHeart, this.state.diceNumber, this.state.isRolling, this.renderDiceIcons, this.state.showDice = turn == "blue" ? true : false, this.state.timers[BLUE] != null ? true : false, { borderBottomLeftRadius: 0 })}
                        <VerticalCellsContainer position={BOTTOM_VERTICAL}
                            state={this.state}
                            onPieceSelection={(selectedPiece) => {
                                this.onPieceSelection(selectedPiece);
                            }}
                        />
                        {this.renderPlayerBox(greenName, this.state.green, this.state.greenScore, this.state.greenHeart, this.state.diceNumber, this.state.isRolling, this.renderDiceIcons, this.state.showDice = turn == "green" ? true : false, this.state.timers[GREEN] != null ? true : false, { borderBottomRightRadius: 0 })}
                    </View>
                </View>

                {this.state.showAlert &&
                    <View style={{ flex: 1, position: "absolute", bottom: 150, left: 90 }}>
                        <Alert w="100%" status={this.state.status} style={{ backgroundColor: "#5a189a" }}>
                            <VStack space={1} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} justifyContent="space-between">
                                    <HStack space={1} flexShrink={1}>
                                        <Alert.Icon mt="1" />
                                        <Text allowFontScaling={false} fontSize="md" style={{ color: "white" }}>
                                            {this.state.title}
                                        </Text>
                                    </HStack>

                                </HStack>
                                <Text allowFontScaling={false} pl="6"
                                    style={{ color: "gray", fontSize: 10 }}>
                                    {this.state.subtitle}
                                </Text>
                            </VStack>
                        </Alert>
                    </View>
                }




            </ImageBackground>
        )
    }

    async onDiceRoll() {


        Socket.emit('roll_dice');
       let diceValue =1;
        // Socket.emit('roll_dice');
        const { diceRollTestDataIndex, diceRollTestData, animateForSelection, diceNumber } = this.state;

        if (animateForSelection) {
            return;
        }

        let updatedDiceRollTestDataIndex = diceRollTestDataIndex + 1;
        if (updatedDiceRollTestDataIndex >= diceRollTestData.length) {
            updatedDiceRollTestDataIndex = 0;
        }
        try {
            if (this.rollingSound) {
                await this.rollingSound.replayAsync();

            } else {
                console.error('Sound object is not properly initialized');
            }
        } catch (error) {
            console.error('Failed to play the sound', error);
        }



        this.setState({ isRolling: true });
        Socket.emit('updateGameState', this.state);

        this.rollingValue.setValue(0);
        Animated.timing(this.rollingValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(async () => {
            // Animation completed, update state and perform additional logic

                   Socket.on('dice_roll_result', async(number) => {
                   diceValue = number
                  this.setState({diceNumber:number})

           
                });

                this.setState({ isRolling: false,  diceRollTestDataIndex: updatedDiceRollTestDataIndex });
                Socket.emit('updateGameState', this.state);
                // Delay before additional logic (100ms in your original code)
                await new Promise(resolve => setTimeout(resolve, 100));
    
                const { moves,  turn, extraChance, redScore, yellowScore, greenScore, blueScore } = this.state;
                moves.push(this.state.diceNumber);
                console.log("902",moves)
   
   
   
   
                        this.setState({ isRolling: false, moves: moves, isWaitingForDiceRoll: false, extraChance: 0 }, () => {
                       Socket.emit('updateGameState', this.state);
                       this.updatePlayerPieces(this.state[turn])
   
  
  
              // console.log("dicenumber", diceNumber)
  
               
  
  
              // if (diceNumber === 6) {
  
              //     this.setState({ isRolling: false, moves: moves, extraChance: extraChance + 1, isWaitingForDiceRoll: false }, () => {
              //         Socket.emit('updateGameState', this.state);
              //         this.updatePlayerPieces(this.state[turn])
  
              //     });
  
              // }
              // else {
              //     this.setState({ isRolling: false, moves: moves, isWaitingForDiceRoll: false, extraChance: 0 }, () => {
              //         Socket.emit('updateGameState', this.state);
              //         this.updatePlayerPieces(this.state[turn])
  
              //     });
  
              // }
  
  
  
          });
  

              });
          


           

    }

    isPlayerFinished(player) {
        const { one, two, three, four } = player.pieces;
        return one.position === FINISHED && two.position === FINISHED && three.position === FINISHED && four.position === FINISHED;
    }

    getNextTurn() {

        const { turn, yellow, red, green, blue } = this.state;
        const { yellowName, blueName, greenName, redName } = this.props;
        this.setState({ isWaitingForDiceRoll: true })
        Socket.emit('updateGameState', this.state);

        let isYellowNext = yellowName != "" && !this.isPlayerFinished(yellow);
        let isGreenNext = greenName != "" && !this.isPlayerFinished(green);
        let isBlueNext = blueName != "" && !this.isPlayerFinished(blue);
        let isRedNext = redName != "" && !this.isPlayerFinished(red);


        if (this.state.bonusCount > 0) {
            this.setState({ bonusCount: this.state.bonusCount - 1 });
            Socket.emit('updateGameState', this.state);
            if (this.isPlayerFinished(this.state[turn])) {
                // console.log("879")
                return turn;
            }
            // else{
            //     const { turn } = this.state;
            //     const timerId = setTimeout(() => {
            //         this.moveToNextPlayer();
            //     }, 15000);  // 15 seconds

            //     // Store the timerId in the state
            //     this.setState(prevState => ({
            //         timers: {
            //             ...prevState.timers,
            //             [turn]: timerId
            //         }
            //     }));
            //     return null;
            // }
        }
        switch (turn) {
            case RED:
                return isYellowNext ? YELLOW : isGreenNext ? GREEN : isBlueNext ? BLUE : undefined;
            case YELLOW:
                return isGreenNext ? GREEN : isBlueNext ? BLUE : isRedNext ? RED : undefined;
            case GREEN:
                return isBlueNext ? BLUE : isRedNext ? RED : isYellowNext ? YELLOW : undefined;
            case BLUE:
                return isRedNext ? RED : isYellowNext ? YELLOW : isGreenNext ? GREEN : undefined;
            default:
                return turn;
        }
    }

    playerHasSingleUnfinishedPiece(player) {
        const { one, two, three, four } = player.pieces;
        let countOfUnfinishedPieces = 0;
        one.position != FINISHED ? countOfUnfinishedPieces++ : undefined;
        two.position != FINISHED ? countOfUnfinishedPieces++ : undefined;
        three.position != FINISHED ? countOfUnfinishedPieces++ : undefined;
        four.position != FINISHED ? countOfUnfinishedPieces++ : undefined;
        return countOfUnfinishedPieces == 1;
    }

    playerHasOptionsForMoves(player) {
        let countMoveOptions = this.getCountMoveOptions(player);
        return countMoveOptions > 1;
    }

    playerHasSinglePossibleMove(player) {
        let countMoveOptions = this.getCountMoveOptions(player);
        return countMoveOptions == 1;
    }

   getCountMoveOptions(player) {
        const { one, two, three, four } = player.pieces;
        // console.log(one, two, three, four)
        const { moves } = this.state;
        let hasSix = moves.filter(move => move == 6).length > 0


        const isMovePossibleForPosition = (position) => {
            // console.log("475", position)
            if (position === FINISHED) {
                return false;
            }
            if (position === HOME) {
                if (hasSix) {
                    return true;
                }
                return false;
            }

            let isMovePossible = false;
            let positionTocheckFor = parseInt(position.substring(1, position.length))

            moves.forEach((move) => {
                // console.log("489", move)
                if (!isMovePossible) {
                    let possiblePossition = move == 1 ? 18 : move == 2 ? 17 : move == 3 ? 16 : move == 4 ? 15 : move == 5 ? 14 : undefined;
                    if (possiblePossition) {
                        isMovePossible = positionTocheckFor <= possiblePossition;
                    } else if (move == 6 && positionTocheckFor < 14) {
                        isMovePossible = true;
                    }
                }
            })

            return isMovePossible;
        }


        let countOfOptions = 0;
        isMovePossibleForPosition(one.position) ? countOfOptions++ : undefined;
        isMovePossibleForPosition(two.position) ? countOfOptions++ : undefined;
        isMovePossibleForPosition(three.position) ? countOfOptions++ : undefined;
        isMovePossibleForPosition(four.position) ? countOfOptions++ : undefined;
        return countOfOptions;
 }

    getSinglePossibleMove(player) {
        const { one, two, three, four } = player.pieces;
        const { moves } = this.state;
        let hasSix = moves.filter(move => move == 6).length > 0
        let possibleMove = undefined;

        const isMovePossibleForPosition = (position) => {
            if (position === FINISHED) {
                return false;
            }
            if (position === HOME) {
                if (hasSix) {
                    return true;
                }
                return false;
            }

            let isMovePossible = false;
            let positionTocheckFor = parseInt(position.substring(1, position.length))

            moves.forEach((move) => {
                if (!isMovePossible) {
                    let possiblePossition = move == 1 ? 18 : move == 2 ? 17 : move == 3 ? 16 : move == 4 ? 15 : move == 5 ? 14 : undefined;
                    if (possiblePossition) {
                        isMovePossible = positionTocheckFor <= possiblePossition;
                        isMovePossible ? possibleMove = move : undefined;
                    } else if (move == 6 && positionTocheckFor < 14) {
                        isMovePossible = true;
                        possibleMove = move;
                    }
                }
            })

            return isMovePossible;
        }

        if (isMovePossibleForPosition(one.position)) {
            return {
                move: possibleMove,
                piece: one
            }
        }
        if (isMovePossibleForPosition(two.position)) {
            return {
                move: possibleMove,
                piece: two
            }
        }
        if (isMovePossibleForPosition(three.position)) {
            return {
                move: possibleMove,
                piece: three
            }
        }
        if (isMovePossibleForPosition(four.position)) {
            return {
                move: possibleMove,
                piece: four
            }
        }
        return undefined;
    }

    getPieceWithPossileMove(player) {
        const { one, two, three, four } = player.pieces;
        const { moves } = this.state;
        let hasSix = moves.filter(move => move == 6).length > 0

        const isMovePossibleForPosition = (position) => {
            if (position === FINISHED) {
                return false;
            }
            if (position === HOME) {
                if (hasSix) {
                    return true;
                }
                return false;
            }

            let isMovePossible = false;
            let positionTocheckFor = parseInt(position.substring(1, position.length))
            moves.forEach((move) => {
                if (!isMovePossible) {
                    let possiblePossition = move == 1 ? 18 : move == 2 ? 17 : move == 3 ? 16 : move == 4 ? 15 : move == 5 ? 14 : undefined;
                    if (possiblePossition) {
                        isMovePossible = positionTocheckFor <= possiblePossition;
                    } else if (move == 6 && positionTocheckFor < 14) {
                        isMovePossible = true;
                    }
                }
            })

            return isMovePossible;
        }

        if (isMovePossibleForPosition(one.position)) {
            return one;
        }
        if (isMovePossibleForPosition(two.position)) {
            return two;
        }
        if (isMovePossibleForPosition(three.position)) {
            return three;
        }
        if (isMovePossibleForPosition(four.position)) {
            return four;
        }
        return undefined;
    }


    didGetBonusWithNewPosition(piece) {
        let flag = false


        if (piece.position == FINISHED) {
            this.playSound()
            // this.displayTimer()
            // if (this.state.setTurn) {
            //     // Start the turn timer on the client side
            //     this.startTurnTimer();
            //   } else {
            //     // Stop the turn timer on the client side
            //     this.stopTurnTimer();
            //   }
            return true;
        }


        if (piece.position == R1 || piece.position == R9 || piece.position == Y1 || piece.position == Y9 || piece.position == G1 || piece.position == G9 || piece.position == B1 || piece.position == B9) {
            return false;
        }


        const checkIfPositionMatchesExistingPiece = (piece, player) => {
            const { one, two, three, four } = player.pieces;
            // console.log(piece)
            // console.log("FINAL PLAYER", one)
            let positionMatched = false;
            if (piece.position == one.position) {
                one.position = one.color == "red" ? R1 : one.color == "yellow" ? Y1 : one.color == "green" ? G1 : one.color == "blue" ? B1 : null;
                // console.log("643", one.oneCount)
                one.oneCount.splice(0, one.oneCount.length)
                positionMatched = true;

            }
            if (piece.position == two.position) {
                two.position = two.color == "red" ? R1 : two.color == "yellow" ? Y1 : two.color == "green" ? G1 : two.color == "blue" ? B1 : null;
                two.twoCount.splice(0, two.twoCount.length)
                positionMatched = true;
            }
            if (piece.position == three.position) {
                three.position = three.color == "red" ? R1 : three.color == "yellow" ? Y1 : three.color == "green" ? G1 : three.color == "blue" ? B1 : null;
                three.threeCount.splice(0, three.threeCount.length)
                positionMatched = true;
            }
            if (piece.position == four.position) {
                four.position = four.color == "red" ? R1 : four.color == "yellow" ? Y1 : four.color == "green" ? G1 : four.color == "blue" ? B1 : null;
                four.fourCount.splice(0, four.fourCount.length)
                positionMatched = true;
            }
            return positionMatched;
        }




        const { red, blue, yellow, green } = this.state;
        if (piece.color != red.player && checkIfPositionMatchesExistingPiece(piece, red)) {
            this.playSound()
            // this.displayTimer()
            // if (this.state.setTurn) {
            //     // Start the turn timer on the client side
            //     this.startTurnTimer();
            //   } else {
            //     // Stop the turn timer on the client side
            //     this.stopTurnTimer();
            //   }
            return true;
        }

        if (piece.color != yellow.player && checkIfPositionMatchesExistingPiece(piece, yellow)) {
            this.playSound()
            // this.displayTimer()
            // if (this.state.setTurn) {
            //     // Start the turn timer on the client side
            //     this.startTurnTimer();
            //   } else {
            //     // Stop the turn timer on the client side
            //     this.stopTurnTimer();
            //   }
            return true;
        }

        if (piece.color != green.player && checkIfPositionMatchesExistingPiece(piece, green)) {
            this.playSound()
            // this.displayTimer()
            // if (this.state.setTurn) {
            //     // Start the turn timer on the client side
            //     this.startTurnTimer();
            //   } else {
            //     // Stop the turn timer on the client side
            //     this.stopTurnTimer();
            //   }
            return true;
        }

        if (piece.color != blue.player && checkIfPositionMatchesExistingPiece(piece, blue)) {
            this.playSound()
            // this.displayTimer()
            // if (this.state.setTurn) {
            //     // Start the turn timer on the client side
            //     this.startTurnTimer();
            //   } else {
            //     // Stop the turn timer on the client side
            //     this.stopTurnTimer();
            //   }
            return true;

        }

        if (this.state.extraChance >= 1) {

            return true;
        }

        return false;
    }


    updatePlayerPieces(player) {
        const { moves } = this.state;
        // console.log("685", player)
        // console.log("685", moves)
        if (moves.length >= 1) {
            if (!this.isPlayerFinished(player)) {

                if (this.playerHasOptionsForMoves(player)) {
                    this.setState({ animateForSelection: true });
                    Socket.emit('updateGameState', this.state);
                }
                else if (this.playerHasSinglePossibleMove(player)) {
                    if (this.playerHasSingleUnfinishedPiece(player)) {
                        let singlePossibleMove = this.getSinglePossibleMove(player);
                        // console.log("singlepossiblemove", singlePossibleMove)

                        if (singlePossibleMove) {
                            const indexOf = moves.indexOf(singlePossibleMove.move);
                            // console.log(indexOf)
                            if (indexOf > -1) {
                                moves.splice(indexOf, 1);
                            }
                            this.movePieceByPosition(singlePossibleMove.piece, singlePossibleMove.move);
                        }
                    } else {
                        if (moves.length == 1) {
                            let piece = this.getPieceWithPossileMove(player);
                            this.movePieceByPosition(piece, moves.shift());
                        } else {
                            this.setState({ animateForSelection: true })
                            Socket.emit('updateGameState', this.state);
                        }
                    }
                }

                else {
                    this.setState(
                        (prevState) => {
                            const updatedPlayer = { ...prevState[player.player] };
                            updatedPlayer.diceValues.push(...moves);
                            return { [player.player]: updatedPlayer };
                        }
                    );



                    this.setState({ turn: this.getNextTurn(), moves: [], animateForSelection: false, }, () => {
                        Socket.emit('changeTurn', {
                            currentPlayer: this.state.currentPlayer, // Your socket ID
                            nextPlayer: this.state.nextPlayer, // Other player's socket ID
                            diceNumber: this.state.diceNumber,
                            extraChance: this.state.extraChance,
                            bonusCount: this.state.bonusCount
                        })
                    })

                    // this.getTurnValue()

                    Socket.emit('updateGameState', this.state);
                }



            }

            else {
                this.setState({ turn: this.getNextTurn(), moves: [], animateForSelection: false }, () => {
                    Socket.emit('changeTurn', {
                        currentPlayer: this.state.currentPlayer, // Your socket ID
                        nextPlayer: this.state.nextPlayer,
                        diceNumber: this.state.diceNumber,
                        extraChance: this.state.extraChance,
                        bonusCount: this.state.bonusCount // Other player's socket ID
                    })
                })

                // this.getTurnValue()
                Socket.emit('updateGameState', this.state);
            }
        }
        else {
            this.setState({ turn: this.getNextTurn(), animateForSelection: false }, () => {
                Socket.emit('changeTurn', {
                    currentPlayer: this.state.currentPlayer, // Your socket ID
                    nextPlayer: this.state.nextPlayer,
                    diceNumber: this.state.diceNumber,
                    extraChance: this.state.extraChance,
                    bonusCount: this.state.bonusCount // Other player's socket ID
                })
            })

            // this.getTurnValue()
            Socket.emit('updateGameState', this.state);
        }
    }

    getRandomInt() {
        let randomInt = Math.floor(Math.random() * Math.floor(6));
        return randomInt + 1;
        // const {diceRollTestData,diceRollTestDataIndex} = this.state;
        // return diceRollTestData[diceRollTestDataIndex];
    }
    onPieceSelection = async (selectedPiece) => {



        this.stopTurnTimer()


        if (this.state.isWaitingForDiceRoll) {
            return;
        }

        const { moves } = this.state;
        const player = this.state[selectedPiece.color];
        const { one, two, three, four } = player.pieces;

        if (moves.length == 1) {
            if (selectedPiece.position == HOME && moves[0] != 6) {
                return;
            }
            this.movePieceByPosition(selectedPiece, moves.shift());





        }

        else if (moves.length > 1) {
            if (selectedPiece.position == HOME) {
                moves.shift();
                selectedPiece.position = selectedPiece.color == RED ? R1 : selectedPiece.color == YELLOW ? Y1 : selectedPiece.color == GREEN ? G1 : selectedPiece.color == BLUE ? B1 : undefined;
                selectedPiece.updateTime = new Date().getTime();
                this.setState(this.state, () => {
                    if (moves.length == 1) {
                        if (!this.playerHasOptionsForMoves(player)) {
                            this.movePieceByPosition(selectedPiece, moves.shift());
                        } else {
                            const isActivePiece = (piece) => piece.position != HOME && piece.position != FINISHED;
                            let activePieces = [];
                            isActivePiece(one) ? activePieces.push(one) : undefined;
                            isActivePiece(two) ? activePieces.push(two) : undefined;
                            isActivePiece(three) ? activePieces.push(three) : undefined;
                            isActivePiece(four) ? activePieces.push(four) : undefined;
                            let isSamePositionForAllActivePieces = activePieces.every((activePiece) => activePiece.position == activePieces[0].position);
                            if (isSamePositionForAllActivePieces) {
                                this.movePieceByPosition(selectedPiece, moves.shift());
                            }
                        }
                    }
                })
                Socket.emit('updateGameState', this.state);
            }

            else {

                const onMoveSelected = (selectedMove) => {
                    if (this.isMovePossibleForPosition(selectedPiece.position, selectedMove)) {
                        // console.log("Move possible")
                        const index = moves.indexOf(parseInt(selectedMove));
                        if (index > -1) {
                            moves.splice(index, 1);
                        }
                        this.movePieceByPosition(selectedPiece, parseInt(selectedMove));
                    } else {
                        ToastAndroid.show("Move not possible", ToastAndroid.LONG);
                        // console.log("Move not possible")
                    }
                }

                let moveOptions = [];
                let optionOne = moves[0].toString();
                moveOptions.push({ text: optionOne, onPress: () => { onMoveSelected(optionOne) } });
                let optionTwo = moves.length > 1 ? moves[1].toString() : undefined;
                optionTwo ? moveOptions.push({ text: optionTwo, onPress: () => { onMoveSelected(optionTwo) } }) : undefined;
                let optionThree = moves.length > 2 ? moves[2].toString() : undefined;
                optionThree ? moveOptions.push({ text: optionThree, onPress: () => { onMoveSelected(optionThree) } }) : undefined;
                // console.log(moveOptions)
                Alert.alert("Select your move", "", moveOptions, { cancelable: true });

            }

        }


        // this.isthereAnyPiecePresent(selectedPiece)


    }

    isMovePossibleForPosition = (position, move) => {
        let isMovePossible = false;
        let positionTocheckFor = parseInt(position.substring(1, position.length))

        let possiblePossition = move == 1 ? 18 : move == 2 ? 17 : move == 3 ? 16 : move == 4 ? 15 : move == 5 ? 14 : undefined;
        if (possiblePossition) {
            isMovePossible = positionTocheckFor <= possiblePossition;
        } else if (move == 6 && positionTocheckFor < 14) {
            isMovePossible = true;
        }

        return isMovePossible;
    }

    async movePieceByPosition(piece, move, delay = 200) {

        const { redScore, yellowScore, blueScore, greenScore } = this.state
        let newPosition = "";
        let position = parseInt(piece.position.substring(1, piece.position.length));
        let currentPosition = position;
        let totalMoves = move;
        // console.log("856", position)
        let cellAreaIndicator = piece.position.substring(0, 1);

        if (piece.position == HOME && move == 6) {
            newPosition = piece.color == RED ? R1 : piece.color == YELLOW ? Y1 : piece.color == GREEN ? G1 : piece.color == BLUE ? B1 : undefined;
        }
        else if (position <= 13) {

            if ((cellAreaIndicator == "B" && piece.color == RED) ||
                (cellAreaIndicator == "R" && piece.color == YELLOW) ||
                (cellAreaIndicator == "Y" && piece.color == GREEN) ||
                (cellAreaIndicator == "G" && piece.color == BLUE)
            ) {
                if (position + move <= 12) {
                    newPosition = cellAreaIndicator + (position + move);
                } else {
                    let updatedPosition = (position + move + 1);
                    if (updatedPosition == 19) {
                        newPosition = FINISHED;
                    }
                    else {
                        let updatedCellAreaIndicator = cellAreaIndicator == "R" ? "Y" : cellAreaIndicator == "Y" ? "G" : cellAreaIndicator == "G" ? "B" : cellAreaIndicator == "B" ? "R" : undefined;
                        newPosition = updatedCellAreaIndicator + updatedPosition;
                    }
                }
            } else {
                if (position + move <= 13) {
                    newPosition = cellAreaIndicator + (position + move);
                } else {
                    let nextPosition = (position + move) - 13
                    let updatedCellAreaIndicator = cellAreaIndicator == "R" ? "Y" : cellAreaIndicator == "Y" ? "G" : cellAreaIndicator == "G" ? "B" : cellAreaIndicator == "B" ? "R" : undefined;
                    newPosition = updatedCellAreaIndicator + nextPosition;
                }
            }
        }
        else {
            if (position + move <= 19) {
                if (position + move == 19) {
                    newPosition = FINISHED;
                } else {
                    newPosition = cellAreaIndicator + (position + move);
                }
            }

            else {
                newPosition = cellAreaIndicator + position
                return;
            }
        }
        if (newPosition != "") {

            piece.position = newPosition;
            piece.updateTime = new Date().getTime();

            // {
            //     console.log("move", move)
            // }


            if (move == 6 && this.state.extraChance >= 1) {

                // // this.displayTimer();
                // this.restartTurnTimer();

            }

            if (piece.name == "one") {
                piece.oneCount.push(move)

            }
            if (piece.name == "two") {
                piece.twoCount.push(move)

            }
            if (piece.name == "three") {
                piece.threeCount.push(move)

            }
            if (piece.name == "four") {
                piece.fourCount.push(move)
            }

            if (piece.color == "red") {
                redScore.push(move)
                this.setState({ redScore: redScore })
                Socket.emit('updateGameState', this.state);
                // console.log("redScore", redScore)
            }
            if (piece.color == "yellow") {
                yellowScore.push(move)
                this.setState({ yellowScore: yellowScore })
                Socket.emit('updateGameState', this.state);
                // console.log("yellowScore", yellowScore)
            }
            if (piece.color == "blue") {
                blueScore.push(move)
                this.setState({ blueScore: blueScore })
                Socket.emit('updateGameState', this.state);
                // console.log("blueScore", blueScore)
            }
            if (piece.color == "green") {
                greenScore.push(move)
                this.setState({ greenScore: greenScore })
                Socket.emit('updateGameState', this.state);
                // console.log("greenScore", greenScore)
            }



        }

        if (this.didGetBonusWithNewPosition(piece) && !this.isPlayerFinished(this.state[piece.color])) {
            let count = this.state.bonusCount + 1;
            this.setState({ bonusCount: count }, () => {

                let player = this.state[piece.color]
                // console.log("moves", this.state.moves)
                if (this.state.moves.length == 1) {
                    // this.setState({animateForSelection:false,moves:this.state.moves})

                    this.updatePlayerPieces(player)

                }
                else if (this.state.moves.length == 0 || this.isPlayerFinished(player)) {
                    this.setState({ animateForSelection: false, moves: [] })
                }

            })
            Socket.emit('updateGameState', this.state);
        }
        else {
            this.setState(this.state, () => {
                let player = this.state[piece.color]
                if (this.state.moves.length == 1) {
                    this.updatePlayerPieces(player)


                } else if (this.state.moves.length == 0 || this.isPlayerFinished(player)) {
                    this.setState({ animateForSelection: false, moves: [], turn: this.getNextTurn() }, () => {

                        Socket.emit('changeTurn', {
                            currentPlayer: this.state.currentPlayer, // Your socket ID
                            nextPlayer: this.state.nextPlayer, // Other player's socket ID
                            diceNumber: this.state.diceNumber,
                            extraChance: this.state.extraChance,
                            bonusCount: this.state.bonusCount
                        })
                        Socket.emit('updateGameState', this.state);
                        // this.displayTimer()
                        // this.restartTurnTimer()
                        // if (this.state.setTurn) {
                        //     // Start the turn timer on the client side
                        //     this.startTurnTimer();
                        //   } else {
                        //     // Stop the turn timer on the client side
                        //     this.stopTurnTimer();
                        //   }
                    })

                }
            })
            Socket.emit('updateGameState', this.state);

        }


    }

    renderPlayerBox(playerName, player, playerScore, lifeline, showDice, timer, customStyle) {
        const { one, two, three, four } = player.pieces;
        customStyle.opacity = this.state.turn == player.player ? 1 : 0.6;
        let hasSix = this.state.moves.filter((move) => move == 6).length > 0;
        // console.log(player.color)
        return (
            <PlayerBox

                color={player.color}
                playerName={player.playerName}
                animateForSelection={this.state.animateForSelection && this.state.turn == player.player && hasSix}
                one={one}
                two={two}
                three={three}
                four={four}
                customStyle={customStyle}
                playerScore={playerScore}
                getNextTurn={this.getNextTurn}

                onPieceSelection={(selectedPiece) => {
                    if (this.state.turn == player.player) {
                        this.onPieceSelection(selectedPiece);
                    }
                }}
                timer={timer}
                lifeline={lifeline}
                diceNumber={this.state.diceNumber}
                isRolling={this.state.isRolling}
                renderDiceIcons={this.renderDiceIcons}
                showDice={this.state.turn == player.player ? true : false}

            />
        )
    }
}



const styles = StyleSheet.create({
    container: {
        // width:'100%',
        // height:'100%',
        // // backgroundColor:'#ff0',
        // justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    gameContainer: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width,
        // borderColor:'#999',
        // borderRadius:20,
        elevation: 8,
        backgroundColor: '#fff',
        alignSelf: 'center',
        // 65
        marginTop: 65
    },
    twoPlayersContainer: {
        flex: 4,
        flexDirection: 'row'
    },
    horizontalCellsContainer: {
        flex: 3,
        backgroundColor: '#fff'
    },
    redDice: {
        height: 75,
        width: 75,
        backgroundColor: "#6da6c0",
        position: "absolute",
        top: 100,
        left: 65,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8
    },

    diceBtn1: {
        height: 65,
        width: 65,
        backgroundColor: "#ffc3c3",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    yellowDice: {
        height: 75,
        width: 75,
        backgroundColor: "#6da6c0",
        position: "absolute",
        top: 100,
        right: 65,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8
    },

    diceBtn2: {
        height: 65,
        width: 65,
        backgroundColor: "#ffc3c3",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    blueDice: {
        height: 75,
        width: 75,
        backgroundColor: "#6da6c0",
        position: "absolute",
        bottom: "10%",
        left: "40%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8
    },

    diceBtn3: {
        height: 95,
        width: 95,
        // position: "absolute",
        // bottom: "8.5%",
        // left: "38%",
        // backgroundColor: "#ffc3c3",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },

    greenDice: {
        height: 75,
        width: 75,
        backgroundColor: "#6da6c0",
        position: "absolute",
        bottom: 100,
        right: 65,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8
    },

    diceBtn4: {
        height: 65,
        width: 65,
        backgroundColor: "#ffc3c3",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    redGotiBox: {
        height: 55,
        width: 62,
        backgroundColor: "#6da6c0",
        position: "absolute",
        top: 110,
        left: 15,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8,
        // paddingRight: 25
    },
    yellowGotiBox: {
        height: 55,
        width: 62,
        backgroundColor: "#6da6c0",
        position: "absolute",
        top: 108,
        right: 17,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8,
        // paddingRight: 20
    },


    greenGotiBox: {
        height: 55,
        width: 62,
        backgroundColor: "#6da6c0",
        position: "absolute",
        bottom: 107,
        right: 17,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8,
        // paddingRight: 20
    },

    blueGotiBox: {
        height: 55,
        width: 62,
        backgroundColor: "#6da6c0",
        position: "absolute",
        bottom: 107,
        left: 15,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#f9e7b0",
        borderWidth: 1,
        borderRadius: 8,
        // paddingRight: 20
    },
})