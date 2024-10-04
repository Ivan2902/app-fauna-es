import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
              <Text style={styles.footerText}>Número de emergencia: 911 | Contacto: info@faunavalle.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#800000',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: '100%',
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Footer;
