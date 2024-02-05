import * as React from "react"

import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Path,
  Ellipse,
  Image,
   Circle
} from "react-native-svg"
import { View } from "react-native"
import * as Animatable from 'react-native-animatable';
import {FINISHED } from "../../util/Constants";

const BlueGoti = (props) => {


return(
  props.position == FINISHED ?  
   <View style={{height:12,width:12, flex:1}}>

<Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 1080 1080",
    }}
    viewBox="0 0 1080 1080"
    {...props}
  >
    <RadialGradient
      id="a"
      cx={297.235}
      cy={838.642}
      r={229.141}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.162}
        style={{
          stopColor: "#68adbc",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#185699",
        }}
      />
    </RadialGradient>
    <Ellipse
      cx={491.29}
      cy={830.82}
      rx={314.51}
      ry={127.94}
      style={{
        fill: "url(#a)",
      }}
    />
    <LinearGradient
      id="b"
      x1={175.69}
      x2={804.605}
      y1={936.933}
      y2={936.933}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.217}
        style={{
          stopColor: "#153787",
        }}
      />
      <Stop
        offset={0.529}
        style={{
          stopColor: "#1963a0",
        }}
      />
      <Stop
        offset={0.904}
        style={{
          stopColor: "#153787",
        }}
      />
    </LinearGradient>
    <Path
      d="M804.6 830.82v46.49c0 34.15-13.41 66.44-36.33 85.39-97.28 80.41-270.24 80.35-270.24 80.35-159.99-9.26-240.29-45.35-280.34-76.76-24.25-19.01-39.18-51.86-40.43-87.39l-1.57-44.51c4.64 69.02 143.62 124.39 314.39 124.39 173.71-.02 314.52-57.3 314.52-127.96z"
      style={{
        fill: "url(#b)",
      }}
    />
    <RadialGradient
      id="c"
      cx={452.176}
      cy={813.059}
      r={228.706}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.162}
        style={{
          stopColor: "#68adbc",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#185699",
        }}
      />
    </RadialGradient>
    <Path
      d="M713.41 776.74c0 47.08-98.86 85.26-220.84 85.26s-220.84-38.18-220.84-85.26c0-17.25 13.25-33.29 36.04-46.7a92.9 92.9 0 0 0 3.1-1.79c.03 0 .03-.03.03-.03 97.84-59.5 72.65-322.58 72.65-322.58h214.63c-12.83 229.51 43.27 298.99 67.11 317.94 30.14 14.59 48.12 33.06 48.12 53.16z"
      style={{
        fill: "url(#c)",
      }}
    />
    <RadialGradient
      id="d"
      cx={520.635}
      cy={241.31}
      r={211.641}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.162}
        style={{
          stopColor: "#68adbc",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#185699",
        }}
      />
    </RadialGradient>
    <Circle
      cx={491.36}
      cy={297.56}
      r={225.05}
      style={{
        fill: "url(#d)",
      }}
    />
    <LinearGradient
      id="e"
      x1={207.427}
      x2={642.251}
      y1={858.33}
      y2={830.094}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.217}
        style={{
          stopColor: "#153787",
        }}
      />
      <Stop
        offset={0.529}
        style={{
          stopColor: "#1963a0",
        }}
      />
      <Stop
        offset={0.904}
        style={{
          stopColor: "#153787",
        }}
      />
    </LinearGradient>
    <Path
      d="M712.26 770.65v32.76c0 24.06-9.42 46.81-25.51 60.16-68.31 56.65-189.78 56.61-189.78 56.61-112.36-6.52-168.75-31.95-196.88-54.08-17.03-13.39-27.51-36.54-28.39-61.57l-1.1-31.36c3.26 48.63 100.86 87.64 220.79 87.64 121.98-.02 220.87-40.37 220.87-90.16z"
      style={{
        fill: "url(#e)",
      }}
    />
  </Svg>

    
   </View>
:




<View  style={{ height: props.count >=5 ? 10: 10, width: props.count >=5 ? 5: 10}}>


<Svg
  xmlns="http://www.w3.org/2000/svg"
  xmlSpace="preserve"
  style={{
    enableBackground: "new 0 0 1080 1080",
  }}
  viewBox="0 0 1080 1080"
  {...props}
>
  <RadialGradient
    id="a"
    cx={297.235}
    cy={838.642}
    r={229.141}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.162}
      style={{
        stopColor: "#68adbc",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#185699",
      }}
    />
  </RadialGradient>
  <Ellipse
    cx={491.29}
    cy={830.82}
    rx={314.51}
    ry={127.94}
    style={{
      fill: "url(#a)",
    }}
  />
  <LinearGradient
    id="b"
    x1={175.69}
    x2={804.605}
    y1={936.933}
    y2={936.933}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.217}
      style={{
        stopColor: "#153787",
      }}
    />
    <Stop
      offset={0.529}
      style={{
        stopColor: "#1963a0",
      }}
    />
    <Stop
      offset={0.904}
      style={{
        stopColor: "#153787",
      }}
    />
  </LinearGradient>
  <Path
    d="M804.6 830.82v46.49c0 34.15-13.41 66.44-36.33 85.39-97.28 80.41-270.24 80.35-270.24 80.35-159.99-9.26-240.29-45.35-280.34-76.76-24.25-19.01-39.18-51.86-40.43-87.39l-1.57-44.51c4.64 69.02 143.62 124.39 314.39 124.39 173.71-.02 314.52-57.3 314.52-127.96z"
    style={{
      fill: "url(#b)",
    }}
  />
  <RadialGradient
    id="c"
    cx={452.176}
    cy={813.059}
    r={228.706}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.162}
      style={{
        stopColor: "#68adbc",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#185699",
      }}
    />
  </RadialGradient>
  <Path
    d="M713.41 776.74c0 47.08-98.86 85.26-220.84 85.26s-220.84-38.18-220.84-85.26c0-17.25 13.25-33.29 36.04-46.7a92.9 92.9 0 0 0 3.1-1.79c.03 0 .03-.03.03-.03 97.84-59.5 72.65-322.58 72.65-322.58h214.63c-12.83 229.51 43.27 298.99 67.11 317.94 30.14 14.59 48.12 33.06 48.12 53.16z"
    style={{
      fill: "url(#c)",
    }}
  />
  <RadialGradient
    id="d"
    cx={520.635}
    cy={241.31}
    r={211.641}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.162}
      style={{
        stopColor: "#68adbc",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#185699",
      }}
    />
  </RadialGradient>
  <Circle
    cx={491.36}
    cy={297.56}
    r={225.05}
    style={{
      fill: "url(#d)",
    }}
  />
  <LinearGradient
    id="e"
    x1={207.427}
    x2={642.251}
    y1={858.33}
    y2={830.094}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.217}
      style={{
        stopColor: "#153787",
      }}
    />
    <Stop
      offset={0.529}
      style={{
        stopColor: "#1963a0",
      }}
    />
    <Stop
      offset={0.904}
      style={{
        stopColor: "#153787",
      }}
    />
  </LinearGradient>
  <Path
    d="M712.26 770.65v32.76c0 24.06-9.42 46.81-25.51 60.16-68.31 56.65-189.78 56.61-189.78 56.61-112.36-6.52-168.75-31.95-196.88-54.08-17.03-13.39-27.51-36.54-28.39-61.57l-1.1-31.36c3.26 48.63 100.86 87.64 220.79 87.64 121.98-.02 220.87-40.37 220.87-90.16z"
    style={{
      fill: "url(#e)",
    }}
  />
</Svg>



</View>
    )
}
export default BlueGoti
