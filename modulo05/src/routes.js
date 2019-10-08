import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WebView from './pages/WebView';
import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      WebView,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false, // No iOS não mostrar o escrito no voltar, aparaecer apenas a flexa
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF', // Fonte do header
      },
    }
  )
);

export default Routes;
