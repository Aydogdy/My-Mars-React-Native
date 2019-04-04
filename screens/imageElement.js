import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

class ImageElement extends Component {
  render() {
    return (
      <Image source={{ uri: this.props.imgsource }} style={styles.image} />
    );
  }
}

export default ImageElement;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch'
  }
});
