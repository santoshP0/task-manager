import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Appbar } from 'react-native-paper';
import { useTasks } from '../context/TaskContext';

const TaskDetailsScreen: React.FC<any> = ({ route, navigation }) => {
  const { tasks, updateTask, addTask, deleteTask } = useTasks();
  const { screenType, task } = route.params || {};
  const isNew = screenType === 'new';

  // Get latest task details from tasks list
  const getTaskById = (id: string) => tasks.find((t: any) => t._id === id) || task;

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [isEditing, setIsEditing] = useState(isNew);

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide default header
  }, []);

  const handleSubmit = async () => {
    if (isNew) {
      await addTask(title, description);
    } else {
      await updateTask(task?._id, title, description);
    }
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteTask(task?._id);
    navigation.goBack();
  };

  const handleCancel = () => {
    if (!isNew) {
      // Reset values to latest from tasks list
      const latestTask = getTaskById(task?._id);
      setTitle(latestTask?.title || '');
      setDescription(latestTask?.description || '');
    }
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Back Button */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isNew ? 'Add Task' : task?.title || 'Task Details'} />
      </Appbar.Header>

      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          {/* Title Field */}
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            editable={isEditing}
            mode="outlined"
            style={styles.input}
          />

          {/* Multiline Description Field */}
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            editable={isEditing}
            mode="outlined"
            multiline
            numberOfLines={9}
            style={styles.descriptionInput}
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <Button mode="contained" onPress={handleSubmit}>
                  Save
                </Button>
                <Button mode="outlined" onPress={handleCancel} textColor="gray">
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button mode="contained" onPress={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button mode="contained" onPress={handleDelete} buttonColor="red">
                  Delete
                </Button>
              </>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  card: { margin: 20, padding: 15, elevation: 3, backgroundColor: 'white' },
  input: { marginBottom: 10 },
  descriptionInput: { marginBottom: 10, minHeight: 250, textAlignVertical: 'top' },
  buttonContainer: { marginTop: 20, gap: 10 },
});

export default TaskDetailsScreen;
