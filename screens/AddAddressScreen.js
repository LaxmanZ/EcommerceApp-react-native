import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ marginTop: 40 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#00ced1',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate('Add')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: '#d0d0d0',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add New Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* All the Added Addresses  */}
          <Text></Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
