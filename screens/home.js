import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon, Button } from 'native-base';
import Slider from '../scomponents/slider';

const images = [
  {
    id: 1,
    uri:
      'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG',
    txt: 'Operation IceBridge: Exploring Alaska’s Mountain Glacier'
  },
  {
    id: 2,
    uri: require('../assets/nasa1.jpeg'),
    txt: 'Hubble Shows Star Cluster’s True Identity'
  },
  {
    id: 3,
    uri: require('../assets/nasa2.jpg'),
    txt: 'Hubble Peers into the Vast Distance'
  },
  {
    id: 4,
    uri: require('../assets/nasa3.jpg'),
    txt:
      'In the northern constellation of Coma Berenices lies the impressive Coma Cluster'
  }
];

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
      images: [],
      counter: 0,
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
    this.setState({ counter: this.state.counter - 1 });
    const liked = [...this.state.liked];
    liked.unshift(this.state.images[this.state.currentIndex]);
    this.setState({ liked });
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  handleUndo() {
    if (this.state.disliked.id !== undefined && this.state.disliked.id) {
      const images = [...this.state.images];
      images.unshift(this.state.disliked);

      this.setState({ images });
      this.setState({ counter: this.state.counter + 1 });

      this.setState({ disliked: {} });
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
    // alert(this.state.images.length);
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    fetch(
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=43EvTATZn1TBy3egVg65g2Rjda6s7ijb5VCtcOQU',
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
            title: item.camera.name,
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
