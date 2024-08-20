import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisScreen from  '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

export default MyStack