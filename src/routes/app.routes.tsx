import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CarList } from '../screens/CarList';
import { Register } from '../screens/Register';
import { RootStackParamList } from '../global/navigation';
import theme from '../global/theme';
import { Success } from '../screens/Success';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: theme.colors.header,
      },
      headerTintColor: theme.colors.background_primary,
      headerTitleStyle: {
        fontWeight: '500',
      },
    }}>
      <Screen name="CarList" component={CarList} options={{
        title: "Meus carros",
      }} />
      <Screen name="Register" component={Register} options={{
        title: "Cadastrar",
      }} />
      <Screen name="Success" component={Success} options={{
        headerShown: false,
      }} />
    </Navigator>
  )
}
