import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import MainBanner from './components/MainBanner';
import AlertSection from './components/AlertSection';
import InstitutionsSection from './components/InstitutionsSection';
import Footer from './components/Footer';
import HomeScreen from './users/home';
import RegisterScreen from './users/registro';
import PasswordRecovery from './users/PasswordRecovery';
import AboutScreen from './components/AboutScreen';
import DataScreen from './data/DataScreen';
import DetailScreen from './data/DetailScreen';
import PublicacionesScreen from './publicaciones/PublicacionesScreen'; // Ajustado para la ruta correcta
import { AuthProvider } from './components/AuthContext';

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
    <AuthProvider>
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
            component={AboutScreen} 
            options={{ title: 'Acerca de' }}
          />
          <Stack.Screen 
            name="Data" 
            component={DataScreen} 
            options={{ title: 'Datos' }}
          />
          <Stack.Screen 
            name="DetailScreen" 
            component={DetailScreen} 
            options={{ title: 'Detalles de la Especie' }}
          />
          <Stack.Screen 
            name="Publicaciones" 
            component={PublicacionesScreen} 
            options={{ title: 'Publicaciones' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
