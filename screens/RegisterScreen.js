import {
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
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
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
            Create a New Account
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
              <Ionicons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="gray"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: 'gray',
                  marginVertical: 5,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="Enter Your Name"
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
        </View>

        <View style={{ marginTop: 60 }} />

        <Pressable
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
            Register
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '400',
              color: 'gray',
            }}
          >
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
