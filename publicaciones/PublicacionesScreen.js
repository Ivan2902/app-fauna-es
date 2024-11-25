import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import PublicacionesList from './PublicacionesList';
import PublicacionForm from './PublicacionesForm';

const Stack = createStackNavigator();

export default function PublicacionesScreen() {
  return (
    <Stack.Navigator initialRouteName="PublicacionesList">
      <Stack.Screen
        name="PublicacionesList"
        component={PublicacionesList}
        options={({ navigation }) => ({
          title: 'Lista de Publicaciones',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PublicacionForm')}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: '#6200ee', fontSize: 16 }}>Añadir</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PublicacionForm"
        component={PublicacionForm}
        options={{ title: 'Formulario de Publicación' }}
      />
    </Stack.Navigator>
  );
}
