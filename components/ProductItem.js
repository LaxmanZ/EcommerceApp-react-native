import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({ item }) => {
  // console.log(item);
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable
      style={{
        // marginHorizontal: 10,
        marginVertical: 25,
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
        onPress={() => addItemToCart(item)}
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
        {addedToCart ? (
          <View>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Added To Cart
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>Add To Cart</Text>
          </View>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
