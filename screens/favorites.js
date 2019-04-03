import React, { Component } from 'react';
import {
  StyleSheet,
  View,
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

    return <View style={styles.container}>{images}</View>;
  }
}

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },
  imageWrap: {
    margin: 2,
    padding: 2,
    height: Dimensions.get('window').height / 3 - 12,
    width: Dimensions.get('window').width / 2 - 4,
    backgroundColor: '#fff'
  }
});
