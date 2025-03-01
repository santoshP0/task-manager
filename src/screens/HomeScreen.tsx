import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import { useTasks } from '../context/TaskContext';

const HomeScreen = ({ navigation }: any) => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTasks();
      console.log(JSON.stringify(response));
    };
  
    fetchData();
  }, []);
  

  const handleRefresh = () => {
    const fetchData = async () => {
        const response = await fetchTasks();
        console.log(JSON.stringify(response));
      };
    
      fetchData();
  };

  return (
      <View style={styles.container}>
          <Title style={styles.title}>Tasks</Title>
          <Button mode="contained" onPress={() => {
            // navigation.navigate('AddTask')
            console.log("add clicked")
          }}>
              Add Task
          </Button>
          <FlatList
              data={tasks}
              keyExtractor={(item: any) => item._id}
              renderItem={({ item }) => (
                  <Card style={styles.card} onPress={() => {
                    // navigation.navigate('TaskDetails', { task: item })
                    console.log("task clicked");
                  }}>
                      <Card.Content>
                          <Title>{item.title}</Title>
                      </Card.Content>
                  </Card>
              )}
              refreshControl={
                  <RefreshControl refreshing={false} onRefresh={handleRefresh} />
              }
          />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});

export default HomeScreen;