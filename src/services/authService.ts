export const fakeAuthAPI = async (username: string, password: string): Promise<{ token: string }> => {
    if (username === 'admin' && password === 'password') {
      return { token: 'fake-jwt-token' };
    } else {
      throw new Error('Invalid credentials');
    }
  };
  