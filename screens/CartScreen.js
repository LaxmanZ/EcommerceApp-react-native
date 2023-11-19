import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);
  const dispath = useDispatch();
  const navigation = useNavigation();

  const increaseQuantity = (item) => {
    dispath(incementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispath(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    dispath(removeFromCart(item));
  };

  return (
    <ScrollView style={{ marginTop: 40, backgroundColor: 'white', flex: 1 }}>
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

      <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, fontWeight: '400' }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>₹{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10, fontSize: 15 }}>
        EMI Details Available
      </Text>

      <Pressable
        onPress={() => navigation.navigate('Confirm')}
        style={{
          backgroundColor: '#ffc72c',
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '400' }}>
          Proceed To Buy({cart.length}) Items
        </Text>
      </Pressable>

      <Text
        style={{
          height: 1,
          borderWidth: 1,
          marginTop: 15,
          borderColor: '#d0d0d0',
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              borderBottomColor: '#f0f0f0',
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: 'contain' }}
                  source={{ uri: item?.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item?.title}
                </Text>

                <Text
                  style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}
                >
                  ₹{item?.price}
                </Text>

                <Image
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  source={{
                    uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                  }}
                />
                <Text style={{ color: 'green' }}>In Stock</Text>
                {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 7,
                }}
              >
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      backgroundColor: '#d0d0d0',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Entypo name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: '#d0d0d0',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text> {item?.quantity} </Text>
                </Pressable>

                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: '#d0d0d0',
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Entypo name="plus" size={24} color="black" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                  borderWidth: 0.6,
                }}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>

            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginBottom: 15,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                  borderWidth: 0.6,
                }}
              >
                <Text>Save For Late</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                  borderWidth: 0.6,
                }}
              >
                <Text>See More Like This</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
