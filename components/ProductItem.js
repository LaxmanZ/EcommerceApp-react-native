import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';

const ProductItem = ({ item }) => {
  // console.log(item);
  return (
    <Pressable
      style={{
        marginHorizontal: 20,
        marginVertical: 25,
        padding: 5,
        marginLeft: 25,
      }}
    >
      <Image
        style={{ width: 150, height: 150, resizeMode: 'contain' }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          $ {item?.price}
        </Text>
        <Text style={{ color: '#ffc72c', fontWeight: 'bold', marginRight: 7 }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: '#ffc72c',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 13,
        }}
      >
        <Text>Add To Cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
