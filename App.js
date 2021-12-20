import 'react-native-gesture-handler';
import * as React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Todos from './src/screens/Todos';
import Add from './src/screens/Add';
import DetailTodo from './src/screens/DetailTodo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Todos" component={Todos} />
          <Stack.Screen options={{headerShown: false}} name="Add" component={Add} />
          <Stack.Screen options={{headerShown: false}} name="DetailTodo" component={DetailTodo} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
