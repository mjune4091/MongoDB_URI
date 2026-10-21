import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function StudentPortal({ onLogin }) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Student Portal</Text>
        <Text style={styles.subtitle}>
          Sign in to view your subjects
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your full name..."
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => onLogin(name)}
        >
          <Text style={styles.buttonText}>
            Continue to Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#172b4d',
  },

  subtitle: {
    textAlign: 'center',
    color: '#667085',
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#1688d4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});