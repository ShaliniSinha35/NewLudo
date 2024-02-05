import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { B1, B9, G1, G9, R1, R9, Y1, Y9 } from './Constants'
import { Ionicons } from '@expo/vector-icons';



const GotiCount = (position, red, blue, green, yellow) => {
  
  const players = {
    RED: red,
    YELLOW: yellow,
    GREEN: green,
    BLUE: blue,
  };

  const [gotiDetails, setGotiDetails] = useState(null);
  const [colorsAtPosition, setColorsAtPosition] = useState([]);

  function countPlayersAtPosition(players, positionToCheck) {
    let totalPlayersAtPosition = 0;
    const colors = [];

    for (const color in players) {
      if (players.hasOwnProperty(color)) {
        const player = players[color];
        for (const pieceKey in player.pieces) {
          if (player.pieces.hasOwnProperty(pieceKey)) {
            const piece = player.pieces[pieceKey];
            if (piece.position === positionToCheck) {
              totalPlayersAtPosition++;
              colors.push(color);
            }
          }
        }
      }
    }

    return { count: totalPlayersAtPosition, colors };
  }

  const { count, colors } = countPlayersAtPosition(players, position);

  // Update the state with the count and colors
  setGotiDetails({ position: position, count: count });
  setColorsAtPosition(colors);

  // Return the count and colors


  

  return { count, colors };
};




export default GotiCount