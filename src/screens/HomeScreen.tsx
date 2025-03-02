import React, { useRef } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Alert } from "react-native";
import { Card, Title, IconButton, FAB } from "react-native-paper";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { tasks, fetchTasks, deleteTask, loading } = useTasks();
  const { logout } = useAuth();
  const navigation: any = useNavigation();
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const confirmDelete = (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel", onPress: () => closeSwipe(id) },
      {
        text: "Delete",
        onPress: async () => {
          await deleteTask(id);
          closeSwipe(id);
        },
        style: "destructive",
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: logout, style: "destructive" },
    ]);
  };

  const closeSwipe = (id: string) => {
    if (swipeableRefs.current[id]) {
      swipeableRefs.current[id]?.close();
    }
  };

  const renderRightActions = (id: string) => (
    <View style={styles.deleteContainer}>
      <IconButton
        icon="trash-can"
        size={30}
        iconColor="white"
        onPress={() => confirmDelete(id)}
      />
    </View>
  );

  const renderSwipeableRow = ({ item }: any) => (
    <GestureHandlerRootView>
      <Swipeable
        ref={(ref) => (swipeableRefs.current[item.id] = ref)}
        renderRightActions={() => renderRightActions(item._id)}
      >
        <Card
          style={styles.card}
          onPress={() => navigation.navigate("TaskDetails", { screenType: "view", task: item })}
        >
          <Card.Content>
            <Title style={styles.taskTitle}>
              <FontAwesome6 name="clipboard-list" size={18} color="black" /> {item.title}
            </Title>
          </Card.Content>
        </Card>
      </Swipeable>
    </GestureHandlerRootView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Tasks</Title>
        <IconButton
          icon={() => <FontAwesome6 name="right-from-bracket" size={22} color="black" />}
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item._id}
        renderItem={renderSwipeableRow}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTasks} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <FAB
        icon="plus"
        color="white"
        onPress={() => navigation.navigate("TaskDetails", { screenType: "new" })}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    marginRight: 5,
  },
  card: {
    marginBottom: 10,
    elevation: 3,
    borderRadius: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  deleteContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "80%",
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#6200EE"
  },
});

export default HomeScreen;
