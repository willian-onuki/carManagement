import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { NativeBaseProvider, StatusBar} from 'native-base'
import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components'
import { Loading } from './src/components/Loading';
import theme from './src/global/theme';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })

  return (
    <NativeBaseProvider>
      <ThemeProvider theme={theme}>
      < StatusBar barStyle='light-content' />
      {fontsLoaded ? (
        <NavigationContainer>
          <AppRoutes/>
        </NavigationContainer>
      ) : <Loading/>}
      </ThemeProvider>
    </NativeBaseProvider>
  )
}
