import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../services/config';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface APIResponse<T = any> {
  status: number;
  data?: T;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<APIResponse>;
  addTask: (title: string, description?: string) => Promise<APIResponse>;
  updateTask: (id: string, title: string, description?: string) => Promise<APIResponse>;
  deleteTask: (id: string) => Promise<APIResponse>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userToken } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch Tasks
  const fetchTasks = async (): Promise<APIResponse> => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        setTasks(response.data);
      }else {
        console.error("Error fetching tasks: Unexpected response status", response.status);
      }
      return { status: response.status, data: response.data };
    } catch (error: any) {
      console.error('Error fetching tasks:', error);
      return { status: error.response?.status || 500, data: error.response?.data || { error: error.message } };
    }finally {
      setLoading(false);
    }
  };

  // Add Task
  const addTask = async (title: string, description?: string): Promise<APIResponse> => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.status == 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      }
      return { status: response.status, data: response.data };
    } catch (error: any) {
      console.error('Error adding task:', error);
      return { status: error.response?.status || 500, data: error.response?.data || { error: error.message } };
    }finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async (id: string, title: string, description?: string): Promise<APIResponse> => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.map((task: any) => (task._id === id ? response.data : task)));
      }
      return { status: response.status, data: response.data };
    } catch (error: any) {
      console.error('Error updating task:', error);
      return { status: error.response?.status || 500, data: error.response?.data || { error: error.message } };
    }finally {
      setLoading(false);
    }
  };

  // Delete Task
  const deleteTask = async (id: string): Promise<APIResponse> => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task: any) => task._id !== id));
      }
      return { status: response.status, data: response.data };
    } catch (error: any) {
      console.error('Error deleting task:', error);
      return { status: error.response?.status || 500, data: error.response?.data || { error: error.message } };
    }finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (userToken) fetchTasks();
  }, [userToken]);

  return (
    <TaskContext.Provider value={{ loading, tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
