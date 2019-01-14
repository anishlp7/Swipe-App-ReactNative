import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/Deck';
import {Card, Button} from 'react-native-elements';


const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];



export default class App extends React.Component {

  renderCard(item){
    return(
        <Card
              key={item.id}
              image={{uri: item.uri}} >
              <Text style={{fontSize: 25}}>{item.text}</Text>
              <Text style={{marginBottom: 10}}>
                    I can customize the card further
              </Text>
              <Button
                  icon={{name: 'code'}}
                  backgroundColor='#03A9F4'
                  title='VIEW NOW' 
              />
  </Card>           
      );
  }

  noMoreRenderCard(){
    return(
    <Card title={'All Done!'}>
      <Text style={{marginBottom: 10}}>Sorry! No More Cards are present Right Now!</Text>
      <Button title="View More!" backgroundColor='#03A9F4' />
    </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck 
        data={DATA}
        renderCard={this.renderCard}
        noMoreRenderCard={this.noMoreRenderCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});