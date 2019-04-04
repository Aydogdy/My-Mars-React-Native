/**
 * @format
 */
import { Navigation } from 'react-native-navigation';

import Home from './screens/home';
import Favorites from './screens/favorites';

Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Favorites', () => Favorites);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AppStack',
        children: [
          {
            component: {
              name: 'Home',
              options: {
                topBar: { visible: false, height: 0 }
              }
            }
          }
        ]
      }
    }
  });
});
