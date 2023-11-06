import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';
import { useState } from 'react';

const ProductInfoScreen = () => {
  const route = useRoute();
  // console.log(route.params);
  const [addedToCart, setAddedToCart] = useState(false);
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const height = (width * 100) / 100;

  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <ScrollView
      style={{ marginTop: 40 }}
      showsHorizontalScrollIndicator={false}
    >
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: 'contain' }}
            key={index}
            source={{ uri: item }}
          >
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#c60c30',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '600',
                  }}
                >
                  {route.params.offer} off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#e0e0e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <AntDesign name="sharealt" size={24} color="black" />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#e0e0e0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 6 }}>
          ₹{route?.params?.price}
        </Text>
      </View>

      <Text style={{ height: 1, borderWidth: 1, borderColor: '#d0d0d0' }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {route.params.color}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {route.params.size}
        </Text>
      </View>

      <Text style={{ height: 1, borderWidth: 1, borderColor: '#d0d0d0' }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>
          Total: ₹{route.params.price}
        </Text>
        <Text style={{ color: '#c60c30' }}>
          FREE Delivery Tomorrow By 3 PM. Order Within 10hr 30 mins
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 5,
          }}
        >
          <Ionicons name="location" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Deliver To Laxman - Bangalore 560035
          </Text>
        </View>
      </View>
      <Text style={{ color: 'green', marginHorizontal: 10, fontWeight: '500' }}>
        IN Stock
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: '#ffc72c',
          padding: 12,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
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

      <Pressable
        style={{
          backgroundColor: '#ffac1c',
          padding: 12,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: '500' }}>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
