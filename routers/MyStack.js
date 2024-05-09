import { createStackNavigator } from "@react-navigation/stack"
import Login from "../screens/LoginScreen"
import Home from "../screens/HomeScreen"
import Register from "../screens/RegisterScreen"
const Stack = createStackNavigator();
const MyStack =()=>{
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
      </Stack.Navigator>
    )
}
export default MyStack;