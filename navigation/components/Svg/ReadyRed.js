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



const ReadyRed = (props) => {


  

return(



  <Animatable.View style={[{ height: props.count >=5 ? 10: 10, width: props.count >=5 ? 5: 10}]} 
   
  animation="fadeIn"// Specify the animation name
 easing="ease-in-out"
 iterationCount="infinite"
 
 duration={200} 

 
>

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
   cx={334.765}
   cy={791.644}
   r={229.141}
   gradientUnits="userSpaceOnUse"
 >
   <Stop
     offset={0.162}
     style={{
       stopColor: "#f55152",
     }}
   />
   <Stop
     offset={1}
     style={{
       stopColor: "#a00e23",
     }}
   />
 </RadialGradient>
 <Ellipse
   cx={528.81}
   cy={783.82}
   rx={314.51}
   ry={127.94}
   style={{
     fill: "url(#a)",
   }}
 />
 <LinearGradient
   id="b"
   x1={167.915}
   x2={703.679}
   y1={815.833}
   y2={894.186}
   gradientUnits="userSpaceOnUse"
 >
   <Stop
     offset={0.206}
     style={{
       stopColor: "#7f0d1e",
     }}
   />
   <Stop
     offset={0.529}
     style={{
       stopColor: "#f81717",
     }}
   />
   <Stop
     offset={0.904}
     style={{
       stopColor: "#770b11",
     }}
   />
 </LinearGradient>
 <Path
   d="M842.13 783.82v46.49c0 34.15-13.41 66.44-36.33 85.39-97.28 80.41-270.24 80.35-270.24 80.35-159.99-9.26-240.29-45.35-280.34-76.76-24.25-19.01-39.18-51.86-40.43-87.39l-1.57-44.51c4.64 69.02 143.62 124.39 314.39 124.39 173.71-.02 314.52-57.29 314.52-127.96z"
   style={{
     fill: "url(#b)",
   }}
 />
 <RadialGradient
   id="c"
   cx={511.765}
   cy={713.412}
   r={186.858}
   gradientUnits="userSpaceOnUse"
 >
   <Stop
     offset={0.162}
     style={{
       stopColor: "#f55152",
     }}
   />
   <Stop
     offset={1}
     style={{
       stopColor: "#a00e23",
     }}
   />
 </RadialGradient>
 <Path
   d="M750.94 729.74c0 47.08-98.86 85.26-220.84 85.26s-220.84-38.18-220.84-85.26c0-17.25 13.25-33.29 36.04-46.7a92.9 92.9 0 0 0 3.1-1.79c.03 0 .03-.03.03-.03 97.84-59.5 72.65-322.58 72.65-322.58h214.63c-12.83 229.51 43.27 298.99 67.11 317.94 30.14 14.59 48.12 33.06 48.12 53.16z"
   style={{
     fill: "url(#c)",
   }}
 />
 <RadialGradient
   id="d"
   cx={558.164}
   cy={194.311}
   r={211.641}
   gradientUnits="userSpaceOnUse"
 >
   <Stop
     offset={0.162}
     style={{
       stopColor: "#f55152",
     }}
   />
   <Stop
     offset={1}
     style={{
       stopColor: "#a00e23",
     }}
   />
 </RadialGradient>
 <Circle
   cx={528.89}
   cy={250.56}
   r={225.05}
   style={{
     fill: "url(#d)",
   }}
 />
 <LinearGradient
   id="e"
   x1={244.957}
   x2={679.78}
   y1={811.331}
   y2={783.096}
   gradientUnits="userSpaceOnUse"
 >
   <Stop
     offset={0.206}
     style={{
       stopColor: "#7f0d1e",
     }}
   />
   <Stop
     offset={0.529}
     style={{
       stopColor: "#f81717",
     }}
   />
   <Stop
     offset={0.904}
     style={{
       stopColor: "#770b11",
     }}
   />
 </LinearGradient>
 <Path
   d="M749.79 723.65v32.76c0 24.06-9.42 46.81-25.51 60.16-68.31 56.65-189.78 56.61-189.78 56.61-112.36-6.52-168.75-31.95-196.88-54.08-17.03-13.39-27.51-36.54-28.39-61.57l-1.1-31.36c3.26 48.63 100.86 87.64 220.79 87.64 121.98-.02 220.87-40.37 220.87-90.16z"
   style={{
     fill: "url(#e)",
   }}
 />
</Svg>


</Animatable.View>

)

   
 
}
export default ReadyRed