import React, {Component} from 'react'
import {View,ScrollView,Modal, StyleSheet, Text, TextInput, TouchableOpacity,Alert, Dimensions} from 'react-native'


export default class FourPlayerModal extends Component{
    constructor(props){
        super(props)
    //  console.log(props)

    }

    render(){
        return(

            <ScrollView>
                      <Modal
            
            transparent={true}
            onRequestClose={()=>{}}
            visible={this.props.isStartGameModalVisible}
       
              
        >
           
            <ScrollView>
                {/* {
                    this.props.playerCount
                } */}
                <View style={styles.modalStyle}>
                    <View style={styles.modalContainer}>

                    <Text style={{color:'#00f',marginBottom:10}}>Blue Player Name</Text>
                    <TextInput  style={[styles.nameInputStyle,styles.blueInputStyle]}
                        onChangeText={this.props.onBlueInput} placeholder='Player 1'
                    />
                    <Text style={{color:'#9d0208',marginBottom:10}}>Red Player Name</Text>
                    <TextInput  style={[styles.nameInputStyle,styles.redInputStyle]}
                        onChangeText={this.props.onRedInput} placeholder='Player 2'
                    />
                    <Text style={{color:'#faa307',marginBottom:10}}>Yellow Player Name</Text>
                    <TextInput  style={[styles.nameInputStyle,styles.yellowInputStyle]}
                        onChangeText={this.props.onYellowInput} placeholder='Player 3'
                    />
                    <Text style={{color:'#0F0',marginBottom:10}}>Green Player Name</Text>
                    <TextInput  style={[styles.nameInputStyle,styles.greenInputStyle]}
                        onChangeText={this.props.onGreenInput} placeholder='Player 4'
                    />
               
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onCancel}>
                    <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{

                        
                        let minPlayersCount =0;
                        this.props.red.name!=""?minPlayersCount++:undefined;
                        this.props.yellow.name!=""?minPlayersCount++:undefined;
                        this.props.blue.name!=""?minPlayersCount++:undefined;
                        this.props.green.name!=""?minPlayersCount++:undefined;
                        if(minPlayersCount==4){
                            this.props.onStart();
                        }else{
                            Alert.alert("Minimum 4 Players", "At least 4 players are required to start the game.",
                            [
                                {text:"Ok"}
                            ]
                            );
                        }
                    }}>
                    <Text>New Game</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
            </ScrollView>
        
    
        )
    }
}

const styles = StyleSheet.create({
    modalStyle:{
        width:"100%",
        height:"100%",
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    modalContainer:{
        marginTop:60,
        backgroundColor:'#fff',
        width:'90%',
        height:"auto",
        padding:20,
        elevation:5,
        zIndex:5,
        borderRadius:10
    },
    nameInputStyle:{
        marginBottom:20,
        borderWidth:1,
        padding:10
    },
    redInputStyle:{
        borderColor:'#ffcccc'
    },
    yellowInputStyle:{     
        borderColor:'#faa307'
    },
    blueInputStyle:{
       
        borderColor:'#00f'
    },
    greenInputStyle:{
       
        borderColor:'#0f0'
    },
    buttonStyle:{
        backgroundColor:'#fff',
        width:200,
        padding:10,
        borderColor:'#ddd',
        borderWidth:2,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20,
        alignItems:'center',
        elevation:4,
    },
  
})























//<Text style={{color:"#f00",marginBottom:10}}>{"Red Player Name"}</Text>
//<TextInput style={[styles.nameInputStyle,styles.redInputStyle]} 
    // onChangeText={onInput}
///>
// nameInputStyle:{
//     marginBottom:20,
//     borderWidth:1
// },
// redInputStyle:{
//     backgroundColor:'#ffefef',
//     borderColor:'#ffcccc',
//   },
//   yellowInputStyle:{
//     backgroundColor:'#ffffef',
//     borderColor:"#ff0",
//   },
//   greenInputStyle:{
//     backgroundColor:'#efffef',
//     borderColor:'#ccffcc',
//   },
//   blueInputStyle:{
//     backgroundColor:'#efefff',
//     borderColor:'#ccccff',
//   },