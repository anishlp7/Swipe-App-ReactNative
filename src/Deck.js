import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRES = 0.25 * SCREEN_WIDTH;

class Deck extends Component {
	static defaultProps={
		onSwipeRight: () => {},
		onSwipeLeft: () => {}
	}

	constructor(props){
		super(props);

		const position = new Animated.ValueXY();

		const panResponder = PanResponder.create({
			 	onStartShouldSetPanResponder: () => true,
			 	onPanResponderMove: (event, gesture) => {
			 		position.setValue({x: gesture.dx, y: gesture.dy})
			 	},
			 	onPanResponderRelease:(event, gesture) => {

			 	if(gesture.dx > SWIPE_THRES){
			 		this.forceSwipe('right');
			 	}else if(gesture.dx < -SWIPE_THRES){
			 		this.forceSwipe('left');
			 	}else{
			 		this.resetPosition();	
			 	}
			 	
			 	}

		});

		this.state = { panResponder, position, index:0 };
	}


	componentWillReceiveProps(nextProps){
		if(nextProps.data != this.props.data){
			this.setState({index: 0})
		}
	}
	forceSwipe(direction){
		const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
		return Animated.timing(this.state.position, {
			toValue:{x, y:0},
			duration:250
		}).start( () => this.onSwipeCompletion(direction));
	}

	onSwipeCompletion(direction){
		const {onSwipeLeft, onSwipeRight, data} = this.props;

		const item = data[this.state.index];
		this.state.position.setValue({x:0, y:0});
		this.setState({index: this.state.index + 1});
		direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

	}
	
	resetPosition(){
		return Animated.spring(this.state.position, {
			toValue:{x:0,y:0}
		}).start();
	}

	getCardStyle(){
			const { position } = this.state;
			rotate = position.x.interpolate({
				inputRange:[-SCREEN_WIDTH,'0',SCREEN_WIDTH],
				outputRange:['-120deg','0deg','120deg']
			});


			 return {
			  ...position.getLayout(),
			transform:[{rotate}]
		};
	}

	renderCards(){

		if(this.state.index >= this.props.data.length){
			return this.props.noMoreRenderCard();
		}

				return this.props.data.map((item, i) => {
					if(i < this.state.index){ return  null };
				if(i === this.state.index){
					return(
					<Animated.View
					key={item.id}
					style={[this.getCardStyle(), styles.cardStyle]}
					 {...this.state.panResponder.panHandlers}>
						{this.props.renderCard(item)}
					</Animated.View>
				);} 
					<Animated.View style={styles.cardStyle}>
						{this.props.renderCard(item)}
					</Animated.View>
					
				});
					
			
	}

	render(){
		return(
			<View >
				{this.renderCards()}
			</View>
			);
	}
}

const styles = {
	cardStyle: {
		position: 'absolute',
		width:SCREEN_WIDTH
	}
}

export default Deck;