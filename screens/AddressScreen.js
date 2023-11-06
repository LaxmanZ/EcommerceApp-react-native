import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { useState } from 'react';

const AddressScreen = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View style={{ height: 50, backgroundColor: '#00ced1' }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
          Add New Address
        </Text>

        <TextInput
          placeholderTextColor={'black'}
          placeholder="India"
          style={{
            padding: 8,
            borderColor: '#d0d0d0',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Full Name (First and Last Name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Your Name"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Mobile Number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile Number"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Flat,House No, Building,Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Area,Steet,Sector,Village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Eg near appollo hospital"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pincode</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Your Pincode"
          />
        </View>

        <Pressable
          style={{
            backgroundColor: '#ffc72c',
            padding: 15,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
