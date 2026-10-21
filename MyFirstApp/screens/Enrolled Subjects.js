import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const subjects = [
  { id: 'IT301', name: 'React Native Basics' },
  { id: 'IT302', name: 'Mobile App Design' },
  { id: 'IT303', name: 'Web Development' },
  { id: 'IT304', name: 'Database Management' },
];

export default function EnrolledSubjects({
  studentName,
  onLogout,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>WELCOME BACK,</Text>

      <Text style={styles.name}>{studentName}</Text>

      <Text style={styles.heading}>
        Enrolled Subjects
      </Text>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.subjectCard}>
            <View style={styles.codeBox}>
              <Text style={styles.code}>{item.id}</Text>
            </View>

            <Text style={styles.subjectName}>
              {item.name}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onLogout}
      >
        <Text style={styles.logoutText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    padding: 20,
    paddingTop: 60,
  },

  welcome: {
    color: '#526071',
    fontSize: 14,
  },

  name: {
    fontSize: 30,
    fontWeight: '700',
    color: '#172b4d',
    marginBottom: 25,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172b4d',
    marginBottom: 10,
  },

  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  codeBox: {
    backgroundColor: '#eaf6ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 14,
  },

  code: {
    color: '#1688d4',
    fontWeight: '700',
  },

  subjectName: {
    fontSize: 16,
    color: '#344054',
  },

  logoutButton: {
    borderWidth: 1.5,
    borderColor: '#c58a8a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },

  logoutText: {
    color: '#b66b73',
    fontWeight: '600',
    fontSize: 16,
  },
});
