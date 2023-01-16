import Main from "./screens/Main";
import { ADD, DEFAULT, DETAIL } from "./screens/ScreenNames";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import CustomStore from "./Store";
import Detail from "./screens/Detail";
import Add from "./screens/Add";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={CustomStore.getShared()}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={DEFAULT} component={Main} />
          <Stack.Screen name={DETAIL} component={Detail} />
          <Stack.Screen name={ADD} component={Add} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
