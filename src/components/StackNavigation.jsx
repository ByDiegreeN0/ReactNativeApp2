import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisScreen from  '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import VideoScreen from '../screens/VideoScreen';
import ImagesScreen from '../screens/ImagesScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisScreen} />
      <Stack.Screen name="Profile" component={DashboardScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="Videos" component={VideoScreen} />
      <Stack.Screen name="Images" component={ImagesScreen} />
    </Stack.Navigator>
  );
}

export default MyStack