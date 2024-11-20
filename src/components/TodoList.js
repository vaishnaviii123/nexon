import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const fetchedData = await AsyncStorage.getItem('allTask');
        if (fetchedData) {
          setAllTask(JSON.parse(fetchedData));
        }
      } catch (err) {
        console.error('error', err);
      }
    };
    loadTask();
  },[]);

  const addTask = () => {
    if (task.trim()) {
      const newTask = {
        id: Date?.now()?.toString(),
        text: task,
      };
      const updateTask = [...allTask, newTask];
      setAllTask(updateTask);
      setTask('');
      saveDataLocally(updateTask);
    }
  };

  const removeTask = taskId => {
    const updateTasks = allTask.filter(item => item.id !== taskId);
    setAllTask(updateTasks);
  };

  const saveDataLocally = async allTask => {
    try {
      await AsyncStorage.setItem('allTask', JSON.stringify(allTask));
    } catch (err) {
      console.error('failed', err);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.listItem}>
      <View style={styles.taskContainer}>
        <Text style={styles.taskItem}>{item.text}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          removeTask(item.id);
        }}>
        <Text>Remove task</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title={'add task'} onPress={addTask} />
      <FlatList
        data={allTask}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    height: 40,
    marginVertical: 30,
    marginHorizontal: 10,
  },
  flatList: {
    paddingVertical: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  taskContainer: {
    width: '60%',
  },
  taskItem: {
    textAlign: 'left',
    color: '#ffffff',
  },
});
export default TodoList;
