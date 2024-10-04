import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import MainBanner from './components/MainBanner';
import AlertSection from './components/AlertSection';
import InstitutionsSection from './components/InstitutionsSection';
import Footer from './components/Footer';
import HomeScreen from './home';
import RegisterScreen from './registro';
import PasswordRecovery from './PasswordRecovery';
import AboutScreen from './AboutScreen'; // Importar la nueva pantalla "Acerca de"

const Stack = createStackNavigator();

function AppContent() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <MainBanner />
      <AlertSection />
      <InstitutionsSection />
      <Footer />
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppContent">
        <Stack.Screen 
          name="AppContent" 
          component={AppContent} 
          options={{ title: 'Fauna' }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Inicio de Sesión' }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Registro' }} 
        />
        <Stack.Screen 
          name="PasswordRecovery" 
          component={PasswordRecovery} 
          options={{ title: 'Recuperar Contraseña' }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} // Agregar la nueva pantalla "Acerca de"
          options={{ title: 'Acerca de' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Color de fondo principal de la app
  },
});
