import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisScreen from  '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import VideoScreen from '../screens/VideoScreen'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={RegisScreen} />
      <Stack.Screen name="Notifications" component={LoginScreen} />
      <Stack.Screen name="Profile" component={DashboardScreen} />
      <Stack.Screen name="Videos" component={VideoScreen} />
    </Stack.Navigator>
  );
}

export default MyStack