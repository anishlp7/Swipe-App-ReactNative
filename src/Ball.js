import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class Ball extends Component {

	componentWillMount(){
		this.position= new Animated.ValueXY(0,0);
		Animated.spring(this.position, {
			toValue: {x:200, y:600 }
		}).start();
	}


	render(){
		return(
			<Animated.View style={this.position.getLayout()}>
				<View style={Styles.Ball} />
			</Animated.View>
			);
	}
}

const Styles = {
	Ball:{
		width:90,
		height:90,
		backgroundColor:"black",
		borderRadius:50
	}
}

export default Ball;