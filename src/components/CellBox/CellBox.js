import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid, LogBox } from 'react-native';
import { colors } from '../../util/Colors';
import { BLUE, GREEN, RED, YELLOW } from '../../util/Constants';
import RedGoti from '../Goti/RedGoti';
import YellowGoti from '../Goti/YellowGoti';
import BlueGoti from '../Goti/BlueGoti';
import GreenGoti from '../Goti/GreenGoti';
import ReadyRed from '../../../components/Svg/ReadyRed';
import ReadyGreen from '../../../components/Svg/ReadyGreen';
import ReadyYellow from '../../../components/Svg/ReadyYellow';
import ReadyBlue from '../../../components/Svg/ReadyBlue';




const countGotiAtPosition = (state, position) => {
    const { red, yellow, green, blue } = state;
    const gotiPositions = []
    if (red.playerName !== "") {
        gotiPositions.push(red.pieces)
    }
    if (green.playerName !== "") {
        gotiPositions.push(green.pieces)
    }
    if (yellow.playerName !== "") {
        gotiPositions.push(yellow.pieces)
    }
    if (blue.playerName !== "") {
        gotiPositions.push(blue.pieces)
    }
    // const gotiPositions = [red.pieces, yellow.pieces, green.pieces, blue.pieces];
    let count = 0;


    gotiPositions.forEach((playerPieces) => {
        Object.values(playerPieces).forEach((piece) => {
            if (piece.position === position) {
                count++;

            }
        });
    });

    return { count };
};

export default CellBox = ({ backgroundColor, position, onPieceSelection, state, arrow, safe, gotiCounter }) => {



    const [highlighColor, setHighlightColor] = React.useState(backgroundColor);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [intervalId, setIntervalId] = React.useState(undefined);
    const [animatePiece, setPiece] = useState(undefined)

    let shouldRenderBackgroundColor = 1;





    const applyAnimationIfNeeded = () => {

        if (shouldAnimateForSelection()) {
            if (!isAnimating) {

                setIsAnimating(true);

                setIntervalId(setInterval(() => {
                    let color = backgroundColor == colors.white ? colors.white : colors.white;
                    shouldRenderBackgroundColor++;
                    shouldRenderBackgroundColor % 2 == 0 ? setHighlightColor(backgroundColor) : setHighlightColor(backgroundColor);
                }, 400));
            }
        }


        else {

            clearInterval(intervalId);
            if (isAnimating) {
                setIsAnimating(false);
                setHighlightColor(backgroundColor);
            }
        }
    }


    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    const shouldAnimateForSelection = () => {
        const { red, blue, yellow, green, turn } = state;
        const playerToCheckFor = turn == RED ? red : turn == YELLOW ? yellow : turn == GREEN ? green : turn == BLUE ? blue : undefined;

        // console.log(playerToCheckFor)
        return positionMatchesPlayerPosition(playerToCheckFor) && isMovePossibleFromCurrentPosition();
    }

    const positionMatchesPlayerPosition = (playerToCheckFor) => {
        const { one, two, three, four } = playerToCheckFor.pieces;
        return one.position == position ||
            two.position == position ||
            three.position == position ||
            four.position == position;
    }

    const shouldRenderPiece = () => {
        const { red, yellow, blue, green } = state;
        return red.pieces.one.position == position ||
            red.pieces.two.position == position ||
            red.pieces.three.position == position ||
            red.pieces.four.position == position ||

            yellow.pieces.one.position == position ||
            yellow.pieces.two.position == position ||
            yellow.pieces.three.position == position ||
            yellow.pieces.four.position == position ||


            green.pieces.one.position == position ||
            green.pieces.two.position == position ||
            green.pieces.three.position == position ||
            green.pieces.four.position == position ||

            blue.pieces.one.position == position ||
            blue.pieces.two.position == position ||
            blue.pieces.three.position == position ||
            blue.pieces.four.position == position


    }


    const getPiecesOnCell = () => {
        const { red, yellow, blue, green } = state;
        const pieces = [];
        const players = [];


        if (red.playerName !== "") {
            players.push(red)
        }
        if (green.playerName !== "") {
            players.push(green)
        }
        if (yellow.playerName !== "") {
            players.push(yellow)
        }
        if (blue.playerName !== "") {
            players.push(blue)
        }



        // const players = [state.red.playerName ? red: null , state.yellow.playerName ? yellow: null, state.blue.playerName? blue:null, state.green.playerName?green:null];
        //    const players = [red,yellow,blue,green]
        players.forEach((player) => {
            const playerPieces = Object.values(player.pieces);
            playerPieces.forEach((piece) => {
                if (piece.position === position) {
                    pieces.push(piece);
                }
            });
        });

        return pieces;
    };




    const getPieceColor = () => {
        const { red, yellow, blue, green } = state;
        let matched = [];
        red.pieces.one.position == position ? matched.push(red.pieces.one) : undefined;
        red.pieces.two.position == position ? matched.push(red.pieces.two) : undefined;
        red.pieces.three.position == position ? matched.push(red.pieces.three) : undefined;
        red.pieces.four.position == position ? matched.push(red.pieces.four) : undefined;

        yellow.pieces.one.position == position ? matched.push(yellow.pieces.one) : undefined;
        yellow.pieces.two.position == position ? matched.push(yellow.pieces.two) : undefined;
        yellow.pieces.three.position == position ? matched.push(yellow.pieces.three) : undefined;
        yellow.pieces.four.position == position ? matched.push(yellow.pieces.four) : undefined;

        blue.pieces.one.position == position ? matched.push(blue.pieces.one) : undefined;
        blue.pieces.two.position == position ? matched.push(blue.pieces.two) : undefined;
        blue.pieces.three.position == position ? matched.push(blue.pieces.three) : undefined;
        blue.pieces.four.position == position ? matched.push(blue.pieces.four) : undefined;

        green.pieces.one.position == position ? matched.push(green.pieces.one) : undefined;
        green.pieces.two.position == position ? matched.push(green.pieces.two) : undefined;
        green.pieces.three.position == position ? matched.push(green.pieces.three) : undefined;
        green.pieces.four.position == position ? matched.push(green.pieces.four) : undefined;

        let colorToReturn = colors.white;
        let id = null
        let updateTime = 0;

        matched.filter((matchedPiece, id) => {
            if (matchedPiece.updateTime > updateTime) {
                updateTime = matchedPiece.updateTime;
                colorToReturn = matchedPiece.color == RED ? red.color : matchedPiece.color == YELLOW ? yellow.color : matchedPiece.color == GREEN ? green.color : matchedPiece.color == BLUE ? blue.color : undefined;
                id = id
            }
        })

        return { colorToReturn, id };

    }

    const getPiece = () => {
        const { red, yellow, green, blue, turn } = state;
        let playerToCheckFor = turn == RED ? red : turn == YELLOW ? yellow : turn == GREEN ? green : turn == BLUE ? blue : undefined;
        const { one, two, three, four } = playerToCheckFor.pieces;
        switch (position) {
            case one.position:
                return one;
            case two.position:
                return two;
            case three.position:
                return three;
            case four.position:
                return four;
            default:
                return undefined;
        }
    }

    const isMovePossibleFromCurrentPosition = () => {
        let isMovePossible = false;
        let positionTocheckFor = parseInt(position.substring(1, position.length))
        const { moves } = state;
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


    applyAnimationIfNeeded();
    let color = state.isWaitingForDiceRoll ? backgroundColor : highlighColor;


    const { turn } = state;
    return (

        <TouchableOpacity style={[styles.container, {
            backgroundColor: color, flex: 2,
            flexDirection: 'row',
            position: 'relative',
            flexWrap: "wrap",

        }]}
            onPress={() => {


                if (isMovePossibleFromCurrentPosition()) {
                    let piece = getPiece();
                    if (piece) {
                        onPieceSelection(piece)
                    }
                }
            }}
        >



            {arrow}
            {safe}



            {

                getPiecesOnCell().map((piece, index) => {

                    const gotiCount = countGotiAtPosition(state, piece.position);
                    //    console.log("number", gotiCount)

                    let height = 14;
                    let width = 14;


                    if (gotiCount.count >= 4) {
                        height = 14;
                        width = 14;
                    }
                    else if (gotiCount.count == 2) {
                        height = 20;
                        width = 15;
                    }
                    else if (gotiCount.count === 1) {
                        height = 22;
                        width = 22;
                    }

                    // else if (gotiCount.count >= 5) {
                    //     height = 10;
                    //     width = 10;
                    // }

                    const styles = { height: height, width: width }

                    switch (piece.color) {
                        case 'red':
                            GotiComponent = state.red.playerName ? isAnimating && turn == RED ? ReadyRed : RedGoti : null;
                            break;
                        case 'green':
                            GotiComponent = state.green.playerName ? isAnimating && turn == GREEN ? ReadyGreen : GreenGoti : null;
                            break;
                        case 'yellow':
                            GotiComponent = state.yellow.playerName ? isAnimating && turn == YELLOW ? ReadyYellow : YellowGoti : null;
                            break;
                        case 'blue':
                            GotiComponent = state.blue.playerName ? isAnimating && turn == BLUE ? ReadyBlue : BlueGoti : null;
                            break;
                        default:
                            GotiComponent = null;
                            break;
                    }



                    return (
                        GotiComponent && (
                            <GotiComponent
                                key={`${piece.color}-${index}`}
                                id={index}
                                positions={piece.position}
                                height={height}
                                width={width}
                                count ={gotiCount.count}
                                style={[{ alignSelf: "center", flexWrap: "wrap", padding: 0, margin: 0 }]}
                             


                            />
                        )
                    );
                })
            }




            {/* 
            {shouldRenderPiece() && 
                        <>

                             { getPieceColor() == "#ec1d27" && state.red.playerName ? isAnimating ? <ReadyRed></ReadyRed> :<RedGoti positions ={state.red.pieces.one.position}></RedGoti>:null}

                             {getPieceColor() == "#01A147" && state.green.playerName ? isAnimating ? <ReadyGreen></ReadyGreen> : <GreenGoti></GreenGoti>:null}
                             {getPieceColor() == "#ffe01b" && state.yellow.playerName ? isAnimating ? <ReadyYellow></ReadyYellow> : <YellowGoti></YellowGoti>:null}
                             {getPieceColor() == "#29b6f6" && state.blue.playerName ? isAnimating ? <ReadyBlue></ReadyBlue> : <BlueGoti></BlueGoti>:null}
                        </>
                  } */}


        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',

    },
    pieceStyle: {
        width: 15,
        height: 15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'center'
    }
})
