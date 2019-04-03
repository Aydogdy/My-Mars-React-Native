import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon, Button } from 'native-base';
import Slider from '../scomponents/slider';

const images = [
  { id: 1, uri: require('../assets/images.jpg'), txt: 'Image 1' },
  { id: 2, uri: require('../assets/nasa1.jpeg'), txt: 'Image 2' },
  { id: 3, uri: require('../assets/nasa2.jpg'), txt: 'Image 3' },
  { id: 4, uri: require('../assets/nasa3.jpg'), txt: 'Image 4' }
];

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
      images: images,
      counter: images.length,
      disliked: {},
      liked: []
    };
  }

  goTo = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          images: this.state.images
        }
      }
    });
  };

  handleDislike = () => {
    this.setState({ counter: this.state.counter - 1 });
    this.setState({ disliked: this.state.images[this.state.currentIndex] });
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  handleLike = () => {
    this.setState({ counter: this.state.counter - 1 });
    const liked = [...this.state.liked];
    liked.unshift(this.state.images[this.state.currentIndex]);
    this.setState({ liked });
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  handleUndo() {
    if (this.state.disliked.id && this.state.disliked.id !== undefined) {
      this.setState({ counter: this.state.counter + 1 });
      const images = [...this.state.images];
      images.unshift(this.state.disliked);
      this.setState({ images });
      this.setState({ currentIndex: this.state.currentIndex - 1 });
      this.setState({ disliked: {} });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            transparent
            style={styles.leftBtn}
            onPress={() => this.handleUndo()}
          >
            <Text style={styles.btnText}>Undo</Text>
          </Button>
          <Text style={styles.title}>My Mars</Text>
          <Button transparent onPress={() => this.goTo('Favorites')}>
            <Icon style={{ color: 'red', fontSize: 26 }} name="logo-apple" />
          </Button>
        </View>

        <View style={{ flex: 14 }}>
          <Slider
            currentIndex={this.state.currentIndex}
            onDislike={this.handleDislike}
            onLike={this.handleLike}
            counter={this.state.counter}
          />
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // Header Style
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    height: 10
  },
  title: {
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    fontSize: 18,
    fontWeight: '600'
  },
  leftBtn: {
    fontSize: 20
  },
  btnText: {
    color: 'red',
    marginLeft: 15,
    fontSize: 16
  },
  // Footer Style
  footer: {
    height: 70,
    flexDirection: 'row'
  },
  disslikeBtn: {
    backgroundColor: 'black',
    borderRadius: 50,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 3, width: 3 }
  },
  footBottonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  likeBtn: {
    backgroundColor: 'red',
    borderRadius: 50,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 3, width: 3 }
  }
});
