// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Text,
  PanResponder
} from 'react-native';
import { Icon, Button } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slider extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY();

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.props.onLike();
            this.position.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.position.setValue({ x: 0, y: 0 });
            this.props.onDislike();
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  renderUsers = () => {
    return this.props.images
      .map((item, i) => {
        if (i < this.props.currentIndex) {
          return null;
        } else if (i == this.props.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.id}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 130,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute',
                  shadowOpacity: 0.55,
                  shadowRadius: 10,
                  shadowColor: 'black',
                  shadowOffset: { height: 1, width: 1 }
                }
              ]}
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 40,
                  right: 40,
                  zIndex: 1000,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: 10
                }}
              >
                <Text style={{ color: 'white', fontSize: 22 }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'white', fontSize: 18 }}>{item.txt}</Text>
                <Text style={{ color: 'white', fontSize: 18 }}>
                  {item.date}
                </Text>
              </Animated.View>

              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 20
                }}
                source={{ uri: item.uri }}
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }],
                  height: SCREEN_HEIGHT - 130,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute'
                }
              ]}
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 40,
                  right: 40,
                  zIndex: 1000,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: 10
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'white', fontSize: 20 }}>{item.txt}</Text>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {item.date}
                </Text>
              </Animated.View>

              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 20
                }}
                source={{ uri: item.uri }}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1
          }}
        >
          {this.renderUsers()}
        </View>
        <View style={{ height: 60 }}>
          <View style={styles.footer}>
            <Animated.View
              style={[styles.footBottonView, { opacity: this.dislikeOpacity }]}
            >
              <Button transparent large style={styles.disslikeBtn}>
                <Icon
                  style={{ color: 'white', fontSize: 36 }}
                  name="thumbs-down"
                />
              </Button>
            </Animated.View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{ fontWeight: '700', color: 'grey', marginTop: -10 }}
              >
                {this.cardQty()}
              </Text>
            </View>
            <Animated.View
              style={[styles.footBottonView, { opacity: this.likeOpacity }]}
            >
              <Button transparent large style={styles.likeBtn}>
                <Icon
                  style={{ color: 'white', fontSize: 36 }}
                  name="thumbs-up"
                />
              </Button>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }

  cardQty() {
    const word = this.props.counter > 1 ? ' cards' : ' card';
    return this.props.isLoading ? 'Downloading...' : this.props.counter + word;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  footer: {
    height: 70,
    flexDirection: 'row'
  },
  disslikeBtn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 33,
    height: 66,
    width: 66,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 3, width: 3 }
  },
  footBottonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20
  },
  likeBtn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 33,
    height: 66,
    width: 66,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 3, width: 3 }
  }
});
