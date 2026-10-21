
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

// Use localhost for Expo Web on the same computer.
// For an Android emulator, use http://10.0.2.2:3000.
// For a physical phone, use your computer's local network IP.
const API_URL = "http://localhost:3000";

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // READ: Load student records from MongoDB through the API
  async function fetchStudents() {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/students`);

      if (!response.ok) {
        throw new Error("Could not retrieve students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      Alert.alert(
        "Connection Error",
        "Could not load students. Check your backend server and API address."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  // CREATE: Send a new student to the backend
  async function addStudent() {
    if (!name.trim() || !course.trim() || !yearLevel.trim()) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          course: course.trim(),
          yearLevel: yearLevel.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add student");
      }

      setName("");
      setCourse("");
      setYearLevel("");

      await fetchStudents();

      Alert.alert("Success", "Student added successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Management</Text>
      <Text style={styles.subtitle}>MongoDB Student Records</Text>

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Course (e.g. BSIT)"
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={styles.input}
        placeholder="Year Level (e.g. 2nd Year)"
        value={yearLevel}
        onChangeText={setYearLevel}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addStudent}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? "Saving..." : "Add Student"}
        </Text>
      </TouchableOpacity>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Student Records</Text>

        <TouchableOpacity onPress={fetchStudents}>
          <Text style={styles.refresh}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={styles.list}
          data={students}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No student records found.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.studentCard}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text>Course: {item.course}</Text>
              <Text>Year Level: {item.yearLevel}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 20,
    paddingTop: 55,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#172554",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#172554",
  },
  refresh: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  studentCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  studentName: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  empty: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 20,
  },
});
