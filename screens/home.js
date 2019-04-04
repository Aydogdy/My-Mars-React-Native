import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon, Button } from 'native-base';
import Slider from '../scomponents/slider';

const images = [
  {
    id: 1,
    uri: require('../assets/images.jpg'),
    txt: 'Operation IceBridge: Exploring Alaska’s Mountain Glacier',
    title: 'Title',
    date: '02/22/2019'
  },
  {
    id: 2,
    uri: require('../assets/nasa1.jpeg'),
    txt: 'Hubble Shows Star Cluster’s True Identity',
    title: 'Title',
    date: '02/22/2019'
  },
  {
    id: 3,
    uri: require('../assets/nasa2.jpg'),
    txt: 'Hubble Peers into the Vast Distance',
    title: 'Title',
    date: '02/22/2019'
  },
  {
    id: 4,
    uri: require('../assets/nasa3.jpg'),
    txt:
      'In the northern constellation of Coma Berenices lies the impressive Coma Cluster',
    title: 'Title',
    date: '02/22/2019'
  }
];

const apiKey = '43EvTATZn1TBy3egVg65g2Rjda6s7ijb5VCtcOQU';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
      images: [],
      counter: images.length,
      disliked: {},
      liked: [],
      loading: true
    };
  }

  goTo = screenName => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName,
        passProps: {
          images: this.state.liked
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
    const likedImage = this.state.images[this.state.currentIndex];
    const likedImages = [...this.state.liked];

    likedImages.unshift(likedImage);
    this.setState({ liked: likedImages });

    this.setState({ counter: this.state.counter - 1 });
    this.setState({ currentIndex: this.state.currentIndex + 1 });

    this.setState({ disliked: {} });
  };

  handleUndo() {
    if (this.state.disliked.id !== undefined && this.state.disliked.id) {
      this.setState({ disliked: {} });

      this.setState({ counter: this.state.counter + 1 });
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    fetch(
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=' +
        apiKey,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loading: false });

        let images = [];
        responseJson.photos.forEach(function(item, key) {
          images.push({
            id: item.id,
            title: item.rover.name,
            txt: item.camera.full_name,
            uri: item.img_src,
            date: item.earth_date
          });
        });

        this.setState({
          images
        });
        this.setState({ counter: images.length });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

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
            <Icon style={{ color: 'red', fontSize: 26 }} name="heart" />
          </Button>
        </View>

        <View style={{ flex: 14 }}>
          {this.getScreenBody()}
          <Slider
            currentIndex={this.state.currentIndex}
            onDislike={this.handleDislike}
            onLike={this.handleLike}
            counter={this.state.counter}
            images={this.state.images}
            isLoading={this.state.loading}
          />
        </View>
      </View>
    );
  }

  getScreenBody() {
    return this.state.loading ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
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
