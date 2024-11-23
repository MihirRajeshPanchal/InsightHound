import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setToken(token: string, callback?: () => void) {
  try {
    console.log('setting token to: ', token, callback);
    await AsyncStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
}

export async function getToken() {
  console.log('getting token');
  return await AsyncStorage.getItem('token');
}

export async function removeToken() {
  console.log('removing token');
  await AsyncStorage.removeItem('token');
}
