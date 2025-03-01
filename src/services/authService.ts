import axios from 'axios';
import { API_BASE_URL } from "./config";

export const LoginAuth = async (email: string, password: string): Promise<{ token: string, status: any }> => {
  const options = {
    method: 'POST',
    url: `${API_BASE_URL}/auth/login`,
    headers: {'content-type': 'application/json'},
    data: {email: email, password: password}
  };

  try {
    const { data, status } = await axios.request(options);
    return { token: data.token, status: status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const SignupAuth = async (username: string, email: string, password: string): Promise<{ message: string, status: any }> => {
  const options = {
    method: 'POST',
    url: `${API_BASE_URL}/auth/signup`,
    headers: {'content-type': 'application/json'},
    data: {username: username, email: email, password: password}
  };

  try {
    const { data, status } = await axios.request(options);
    return { message: data.message, status: status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};