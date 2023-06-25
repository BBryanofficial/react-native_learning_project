import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTask, deleteTask } from './api';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noTaskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#888888',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#2196f3',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#ff0000',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    justifyContent:'center',
    bottom: 20,
  },
  addButton: {
    justifyContent:'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    center: 25,
    backgroundColor: '#2196f3',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    marginRight: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#2196f3',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ff0000',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await AsyncStorage.getItem('tasks');
      if (tasksData !== null) {
        setTasks(JSON.parse(tasksData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    const response = await deleteTask(taskId);

    if (response.success) {
      setTasks(response.data);
    } else {
      console.log(response.message);
    }
  };

  const handleAddTask = async () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert('Validation Error', 'Please enter a task title.');
      return;
    }

    const newTask = {
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
    };

    const response = await addTask(newTask);

    if (response.success) {
      setTasks(response.data);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsModalVisible(false);
    } else {
      console.log(response.message);
    }
  };

  const handleCancelAddTask = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ paddingRight: 30 }}>
          <Text style={styles.title}>Todo App</Text>
        </View>
        <View style={{ paddingLeft: 30 }}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => console.log('Logout')}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {tasks.length === 0 ? (
        <View style={styles.noTaskContainer}>
          <Text style={styles.emptyText}>No tasks found</Text>
        </View>
      ) : (
        <ScrollView>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <TouchableOpacity
                style={[
                  styles.taskCheckbox,
                  { backgroundColor: task.completed ? '#28a745' : '#2196f3' },
                ]}
                onPress={() => handleToggleTask(task.id)}
              >
                {task.completed && (
                  <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>✓</Text>
                )}
              </TouchableOpacity>
              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    {
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {task.title}
                </Text>
                <Text
                  style={[
                    styles.taskDescription,
                    {
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {task.description}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditTask(task.id)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTask(task.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Add a task</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Title:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter task title"
            value={newTaskTitle}
            onChangeText={(text) => setNewTaskTitle(text)}
          />
          <Text style={styles.inputLabel}>Description:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter task description"
            value={newTaskDescription}
            onChangeText={(text) => setNewTaskDescription(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddTask}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelAddTask}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodoApp;

