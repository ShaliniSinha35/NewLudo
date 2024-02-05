import * as React from "react"
// import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Path,
  Ellipse,
  Circle
} from "react-native-svg"
import { View } from "react-native"
import * as Animatable from 'react-native-animatable';
import { FINISHED } from "../../util/Constants";

const YellowGoti = (props) => {


  return(
  props.position == FINISHED ?  
   <View style={{height:15,width:12, flex:1}}>

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
      cx={346.765}
      cy={820.644}
      r={229.141}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.162}
        style={{
          stopColor: "#f8d936",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#e1a114",
        }}
      />
    </RadialGradient>
    <Ellipse
      cx={540.81}
      cy={812.82}
      rx={314.51}
      ry={127.94}
      style={{
        fill: "url(#a)",
      }}
    />
    <LinearGradient
      id="b"
      x1={241.546}
      x2={684.046}
      y1={803.572}
      y2={924.822}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.182}
        style={{
          stopColor: "#c68411",
        }}
      />
      <Stop
        offset={0.529}
        style={{
          stopColor: "#f8cb51",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#ba7708",
        }}
      />
    </LinearGradient>
    <Path
      d="M854.13 812.82v46.49c0 34.15-13.41 66.44-36.33 85.39-97.28 80.41-270.24 80.35-270.24 80.35-159.99-9.26-240.29-45.35-280.34-76.76-24.25-19.01-39.18-51.86-40.43-87.39l-1.57-44.51c4.64 69.02 143.62 124.39 314.39 124.39 173.71-.02 314.52-57.29 314.52-127.96z"
      style={{
        fill: "url(#b)",
      }}
    />
    <RadialGradient
      id="c"
      cx={510.5}
      cy={747.75}
      r={196.977}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.162}
        style={{
          stopColor: "#f8d936",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#e1a114",
        }}
      />
    </RadialGradient>
    <Path
      d="M762.94 758.74c0 47.08-98.86 85.26-220.84 85.26s-220.84-38.18-220.84-85.26c0-17.25 13.25-33.29 36.04-46.7a92.9 92.9 0 0 0 3.1-1.79c.03 0 .03-.03.03-.03 97.84-59.5 72.65-322.58 72.65-322.58h214.63c-12.83 229.51 43.27 298.99 67.11 317.94 30.14 14.59 48.12 33.06 48.12 53.16z"
      style={{
        fill: "url(#c)",
      }}
    />
    <RadialGradient
      id="d"
      cx={580.5}
      cy={200.25}
      r={207.368}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.162}
        style={{
          stopColor: "#f8d936",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#e1a114",
        }}
      />
    </RadialGradient>
    <Circle
      cx={540.89}
      cy={279.56}
      r={225.05}
      style={{
        fill: "url(#d)",
      }}
    />
    <LinearGradient
      id="e"
      x1={256.957}
      x2={691.78}
      y1={840.331}
      y2={812.096}
      gradientUnits="userSpaceOnUse"
    >
      <Stop
        offset={0.182}
        style={{
          stopColor: "#c68411",
        }}
      />
      <Stop
        offset={0.529}
        style={{
          stopColor: "#f8cb51",
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: "#ba7708",
        }}
      />
    </LinearGradient>
    <Path
      d="M761.79 752.65v32.76c0 24.06-9.42 46.81-25.51 60.16-68.31 56.65-189.78 56.61-189.78 56.61-112.36-6.52-168.75-31.95-196.88-54.08-17.03-13.39-27.51-36.54-28.39-61.57l-1.1-31.36c3.26 48.63 100.86 87.64 220.79 87.64 121.98-.02 220.87-40.37 220.87-90.16z"
      style={{
        fill: "url(#e)",
      }}
    />
  </Svg>

   </View>
:





<View style={{ height: props.count >=5 ? 10: 10, width: props.count >=5 ? 5: 10,margin:0,padding:0 }}>


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
    cx={346.765}
    cy={820.644}
    r={229.141}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.162}
      style={{
        stopColor: "#f8d936",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#e1a114",
      }}
    />
  </RadialGradient>
  <Ellipse
    cx={540.81}
    cy={812.82}
    rx={314.51}
    ry={127.94}
    style={{
      fill: "url(#a)",
    }}
  />
  <LinearGradient
    id="b"
    x1={241.546}
    x2={684.046}
    y1={803.572}
    y2={924.822}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.182}
      style={{
        stopColor: "#c68411",
      }}
    />
    <Stop
      offset={0.529}
      style={{
        stopColor: "#f8cb51",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#ba7708",
      }}
    />
  </LinearGradient>
  <Path
    d="M854.13 812.82v46.49c0 34.15-13.41 66.44-36.33 85.39-97.28 80.41-270.24 80.35-270.24 80.35-159.99-9.26-240.29-45.35-280.34-76.76-24.25-19.01-39.18-51.86-40.43-87.39l-1.57-44.51c4.64 69.02 143.62 124.39 314.39 124.39 173.71-.02 314.52-57.29 314.52-127.96z"
    style={{
      fill: "url(#b)",
    }}
  />
  <RadialGradient
    id="c"
    cx={510.5}
    cy={747.75}
    r={196.977}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.162}
      style={{
        stopColor: "#f8d936",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#e1a114",
      }}
    />
  </RadialGradient>
  <Path
    d="M762.94 758.74c0 47.08-98.86 85.26-220.84 85.26s-220.84-38.18-220.84-85.26c0-17.25 13.25-33.29 36.04-46.7a92.9 92.9 0 0 0 3.1-1.79c.03 0 .03-.03.03-.03 97.84-59.5 72.65-322.58 72.65-322.58h214.63c-12.83 229.51 43.27 298.99 67.11 317.94 30.14 14.59 48.12 33.06 48.12 53.16z"
    style={{
      fill: "url(#c)",
    }}
  />
  <RadialGradient
    id="d"
    cx={580.5}
    cy={200.25}
    r={207.368}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.162}
      style={{
        stopColor: "#f8d936",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#e1a114",
      }}
    />
  </RadialGradient>
  <Circle
    cx={540.89}
    cy={279.56}
    r={225.05}
    style={{
      fill: "url(#d)",
    }}
  />
  <LinearGradient
    id="e"
    x1={256.957}
    x2={691.78}
    y1={840.331}
    y2={812.096}
    gradientUnits="userSpaceOnUse"
  >
    <Stop
      offset={0.182}
      style={{
        stopColor: "#c68411",
      }}
    />
    <Stop
      offset={0.529}
      style={{
        stopColor: "#f8cb51",
      }}
    />
    <Stop
      offset={1}
      style={{
        stopColor: "#ba7708",
      }}
    />
  </LinearGradient>
  <Path
    d="M761.79 752.65v32.76c0 24.06-9.42 46.81-25.51 60.16-68.31 56.65-189.78 56.61-189.78 56.61-112.36-6.52-168.75-31.95-196.88-54.08-17.03-13.39-27.51-36.54-28.39-61.57l-1.1-31.36c3.26 48.63 100.86 87.64 220.79 87.64 121.98-.02 220.87-40.37 220.87-90.16z"
    style={{
      fill: "url(#e)",
    }}
  />
</Svg>



</View>
  )
}
export default YellowGoti
