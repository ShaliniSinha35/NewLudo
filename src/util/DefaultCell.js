import { View, Text } from 'react-native'
import React from 'react'
import { B1, B9, G1, G9, R1, R9, Y1, Y9 } from './Constants'
import GotiCount from './GotiCount'
const DefaultCell = (position,red,blue,green,yellow) => {

    switch(position){
        case R1: 

        case Y1:
    
        case G1:
        case B1:
           return true
        default:
         return false
 
   }

//     switch(position){
//         case R1: 
//           return GotiCount(R1,red,blue,green,yellow) 
          
//         case R9:
//             return GotiCount(R9,red,blue,green,yellow) 
//         case Y1:
//             return GotiCount(Y1,red,blue,green,yellow) 
//         case Y9:
//             return GotiCount(Y9,red,blue,green,yellow) 
//         case G1:
//             return GotiCount(G1,red,blue,green,yellow) 
//         case G9:
//             return GotiCount(G9,red,blue,green,yellow) 
//         case B1:
//             return GotiCount(B1,red,blue,green,yellow) 
//         case B9:
//             return GotiCount(B9,red,blue,green,yellow) 
      
//         default:
//          return 0
 
//    }
}

export default DefaultCell