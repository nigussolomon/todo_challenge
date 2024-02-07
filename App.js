import React, { useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import ToDo from "./pages/ToDo";

const Stack = createNativeStackNavigator();

const App = () => {
  const [globalState, setGlobalState] = useState("Name");

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            children={() => (
              <HomeScreen
                globalState={globalState}
                setGlobalState={setGlobalState}
              />
            )}
          />
          <Stack.Screen
            name={"ToDo"}
            children={() => (
              <ToDo globalState={globalState} setGlobalState={setGlobalState} />
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
