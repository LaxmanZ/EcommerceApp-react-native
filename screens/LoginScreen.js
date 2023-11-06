import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = { email: email, password: password };

    axios
      .post('http://192.168.0.101:8080/login', user)
      .then((response) => {
        // console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.replace('Home');
      })
      .catch((error) => {
        Alert.alert('Login Error', 'Invalid Email');
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}
    >
      <View style={{ marginTop: 70 }}>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#041e42',
              marginTop: 10,
            }}
          >
            Login To Your Account
          </Text>

          <View style={{ marginTop: 40 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 30,
                backgroundColor: '#d0d0d0',
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: 'gray',
                  marginVertical: 5,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="Enter Your Email"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 35,
                backgroundColor: '#d0d0d0',
                paddingVertical: 5,
                borderRadius: 5,
              }}
            >
              <Entypo
                style={{ marginLeft: 8 }}
                name="key"
                size={24}
                color="gray"
              />
              <TextInput
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={{
                  color: 'gray',
                  marginVertical: 5,
                  width: 300,
                  fontSize: password ? 16 : 16,
                }}
                placeholder="Password"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
              gap: 110,
            }}
          >
            <Text>Keep me Logged In</Text>
            <Text style={{ fontWeight: '500', color: '#007fff' }}>
              Forgot Password
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 60 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 180,
            backgroundColor: '#febe10',
            borderRadius: 8,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 12,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 17,
              fontWeight: 'bold',
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => navigation.navigate('Register')}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '400',
              color: 'gray',
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
