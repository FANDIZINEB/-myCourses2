import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CoursesScreen from './components/CoursesScreen';
import CartScreen from './components/CartScreen';
import PaymentScreen from './components/PaymentScreen';
import CourseInfos from './components/CourseInfos';
import CourseForm from './components/CourseForm';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CoursesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Formations" component={CoursesScreen} />
      <Stack.Screen name="Panier" component={CartScreen} />
      <Stack.Screen name="CourseInfos" component={CourseInfos} options={({ route }) => ({ title: route.params.course.title })} />
      <Stack.Screen name="CourseForm" component={CourseForm} options={({ route }) => ({ title: route.params?.course ? 'Modifier' : 'Créer' })} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Catalogue" component={CoursesStack} />
          <Drawer.Screen name="Historique" component={PaymentScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}