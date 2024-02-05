import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { B1, B9, G1, G9, R1, R9, Y1, Y9 } from './Constants'
import { Ionicons } from '@expo/vector-icons';

const getSafeArea = (position,red,blue,green,yellow) => {

const [isStarActive, setStarActive]  = useState(true)

{
   // console.log("star",red)
}

const getStar = () =>{

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
       case R1:     
       case R9:
       case Y1:
       case Y9:
       case G1:
       case G9:
       case B1:
       case B9:
        return getStar() ? null :  <Ionicons name="star" size={14} color="white" style={{alignSelf:"center", justifyContent:"center", textAlign:"center"}}/>
       default:
        return null

  }

 
}

export default getSafeArea