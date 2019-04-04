import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import ImageElement from './imageElement';

class Favorites extends Component {
  render() {
    let images = this.props.images.map((val, key) => {
      return (
        <TouchableWithoutFeedback key={key}>
          <View style={styles.imageWrap}>
            <ImageElement imgsource={val.uri} />
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return <View style={styles.container}>{this.renderImages(images)}</View>;
  }

  renderImages(images) {
    return this.props.images.length > 0 ? (
      <ScrollView>{images}</ScrollView>
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20
        }}
      >
        <Text style={{ fontSize: 22 }}>There is no image</Text>
      </View>
    );
  }
}

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#eee'
  },
  imageWrap: {
    margin: 2,
    padding: 2,
    height: Dimensions.get('window').height / 2 - 8,
    width: Dimensions.get('window').width - 4,
    backgroundColor: '#fff'
  }
});
