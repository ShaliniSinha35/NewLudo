import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import { View } from "react-native";
import * as Animatable from 'react-native-animatable';

const Arrow2 = (props) => (
   <Animatable.View 
    style={{height: 30, width: 38, position: "absolute", top: 120, left: 210,transform: [{ rotate: "-90deg" }]}}
     animation="fadeIn"
    easing="ease-in-out"
    iterationCount="infinite"
    duration={1000} 
  >
   <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    x="0%"
    y="0%"
    style={{
      display: "block",
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <Defs>
      <LinearGradient id="a" x1="49.661%" x2="50.01%" y1="12.877%" y2="98.83%">
        <Stop
          offset="0%"
          style={{
            stopColor: "#efff0b",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="49.859%"
          style={{
            stopColor: "#ff9500",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "red",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
    </Defs>
    <Path
      fill="url(#a)"
      stroke="#000"
      strokeLinecap="square"
      strokeWidth={0.306}
      d="M12.75 19.93 23.31 9.27c.54-.65.39-1.27-.31-1.37h-2.71V4.94q-.16-.73-1.14-.73L4.93 4.17q-1.18-.01-1.39.94v2.9H1.08c-.66.25-.45.78.19 1.61l9.88 10.31q.85.65 1.6 0z"
    />
   </Svg>

   </Animatable.View>
);

export default Arrow2;
