import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { TextInput, Button, Card, Appbar } from "react-native-paper";
import { useTasks } from "../context/TaskContext";

const TaskDetailsScreen: React.FC<any> = ({ route, navigation }) => {
  const { tasks, updateTask, addTask, deleteTask, loading } = useTasks();
  const { screenType, task } = route.params || {};
  const isNew = screenType === "new";

  const getTaskById = (id: string) => tasks.find((t: any) => t._id === id) || task;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [isEditing, setIsEditing] = useState(isNew);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Error message state

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Title and Description cannot be empty.");
      return;
    }
    if (!isNew) {
      const latestTask = getTaskById(task?._id);
      if (latestTask?.title === title.trim() && latestTask?.description === description.trim()) {
        setErrorMessage("No changes detected.");
        return;
      }
    }
    if (isNew) {
      await addTask(title.trim(), description.trim());
    } else {
      await updateTask(task?._id, title.trim(), description.trim());
    }
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteTask(task?._id);
    navigation.goBack();
  };

  const handleCancel = () => {
    if (!isNew) {
      const latestTask = getTaskById(task?._id);
      setTitle(latestTask?.title || "");
      setDescription(latestTask?.description || "");
    }
    setIsEditing(false);
    setErrorMessage("");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} disabled={loading} />
        <Appbar.Content title={isNew ? "Add Task" : task?.title || "Task Details"} />
        {!isEditing && !isNew && (
          <Appbar.Action icon="delete" onPress={handleDelete} disabled={loading} />
        )}
      </Appbar.Header>

      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            editable={isEditing && !loading}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            editable={isEditing && !loading}
            mode="outlined"
            multiline
            numberOfLines={9}
            style={styles.descriptionInput}
          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <View style={styles.buttonContainer}>
            {isEditing ? (
              <View style={styles.buttonRow}>
                {!isNew && (
                  <Button
                    mode="outlined"
                    onPress={handleCancel}
                    textColor="gray"
                    style={styles.button}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  style={styles.button}
                  disabled={loading}
                >
                  Save
                </Button>
              </View>
            ) : (
              <Button mode="contained" onPress={() => setIsEditing(true)} disabled={loading}>
                Edit
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  card: { margin: 20, padding: 15, elevation: 3, backgroundColor: "white" },
  input: { marginBottom: 10 },
  descriptionInput: { marginBottom: 10, minHeight: 250, textAlignVertical: "top" },
  buttonContainer: { marginTop: 20, gap: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between" },
  button: { width: "45%" },
  errorText: { color: "red", textAlign: "center", marginTop: 5 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskDetailsScreen;
