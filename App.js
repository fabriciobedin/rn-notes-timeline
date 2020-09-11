import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PeoplePage from './src/pages/PeoplePage';

const AppNavigator = createStackNavigator(
  {
    'Main': {
      screen: PeoplePage,
      navigationOptions: {
        title: 'Pessoas',
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
        backgroundColor: '#6542f4',
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