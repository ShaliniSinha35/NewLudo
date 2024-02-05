import { View, Text } from 'react-native'
import React from 'react'
import { B12, R12, Y12, G12 } from './Constants'
import { Entypo } from '@expo/vector-icons';
export const getCellArrow = (position,red,blue,green,yellow) => {
    const getArrow = () =>{

        if (red.pieces.one.position == position ||
            red.pieces.two.position == position ||
            red.pieces.three.position == position ||
            red.pieces.four.position == position ||

            blue.pieces.one.position == position ||
            blue.pieces.two.position == position ||
            blue.pieces.three.position == position ||
            blue.pieces.four.position == position ||


            green.pieces.one.position == position ||
            green.pieces.two.position == position ||
            green.pieces.three.position == position ||
            green.pieces.four.position == position ||

            yellow.pieces.one.position == position ||
            yellow.pieces.two.position == position ||
            yellow.pieces.three.position == position ||
            yellow.pieces.four.position == position )
          {
             return true
          }


        

}


        switch(position){
        case B12 :
             return getArrow() ? null :  <Entypo name="arrow-long-right" size={20} color="red" style={{ marginTop: -1  }} />
        case R12 :
            return getArrow() ? null : <Entypo name="arrow-long-down" size={20} color="#ffe01b" style={{ marginTop: -1 }} />  
            
        case Y12 :
           return getArrow() ? null : <Entypo name="arrow-long-left" size={20} color="green" style={{ marginTop: -1 }} />  
            
        case G12 :
             return getArrow() ? null :  <Entypo name="arrow-long-up" size={20} color="#29b6f6" style={{ marginTop: -1 }} />
         default:
            return null;    
    }
  
}

