import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CarList } from '../screens/CarList';
import { Register } from '../screens/Register';
import { RootStackParamList } from '../global/navigation';
import { Success } from '../components/Success';
import theme from '../global/theme';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="CarList" component={CarList} options={{
        title: "Meus carros",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.header,
        },
        headerTintColor: theme.colors.background_primary,
        headerTitleStyle: {
          fontWeight: '500',
        },
      }} />
      <Screen name="Register" component={Register} options={{
        title: "Cadastrar",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.header,
        },
        headerTintColor: theme.colors.background_primary,
        headerTitleStyle: {
          fontWeight: '500',
        },
      }} />
      <Screen name="Success" component={Success} options={{
        headerShown: false,
      }} />
    </Navigator>
  )
}
