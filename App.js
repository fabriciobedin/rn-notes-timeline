import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PeoplePage from './src/pages/PeoplePage';
import LoginPage from './src/pages/LoginPage';

const AppNavigator = createStackNavigator(
  {
    'Login': {
      screen: LoginPage,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    'People': {
      screen: PeoplePage,
      navigationOptions: {
        title: 'People',
        headerTitleStyle: {
          textAlign: 'left',
          fontSize: 20
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      title: 'NotesTimeline',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#0a0',
        borderBottomColor: '#f4f2ff',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center'
      }
    }
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;