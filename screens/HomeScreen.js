import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AntDesign,
  Feather,
  EvilIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';
import list from '../data/list';
import deals from '../data/deals';
import offers from '../data/offers';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const images = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];

  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [items, setItems] = useState([
    { label: "men's clothing", value: "men's clothing" },
    { label: 'jewelery', value: 'jewelery' },
    { label: 'electronics', value: 'electronics' },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.log('Error Message', error);
      }
    };
    fetchData();
  }, []);
  // console.log('Products', products);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            gap: 5,
            backgroundColor: '#AFEEEE',
          }}
        >
          <EvilIcons name="location" size={24} color="black" />
          <Pressable>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>
              Deliver To Laxman - Bangalore 560035{' '}
            </Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={index}
            >
              <Image
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 50,
                  marginTop: 5,
                }}
                source={{ uri: item.image }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '400',
                  marginTop: 5,
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={'#13274F'}
          inactiveDotColor="#90a4ae"
          ImageComponentStyle={{ width: '100%' }}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            padding: 10,
            marginTop: 5,
          }}
        >
          Trending Deals Of The Week
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginLeft: 12,
          }}
        >
          {deals.map((item, i) => (
            <Pressable
              key={i}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 180, height: 180, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />
              {/* <Text>{item.title}</Text> */}
            </Pressable>
          ))}
        </View>

        <Text
          style={{
            height: 1,
            borderColor: '#d0d0d0',
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            padding: 10,
            marginTop: 5,
          }}
        >
          Today's Deals
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item, i) => (
            <Pressable
              onPress={() =>
                navigation.navigate('ProductInfo', {
                  id: item.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  offer: item.offer,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                  item: item,
                })
              }
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={i}
            >
              <Image
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />

              <View
                style={{
                  backgroundColor: '#e31837',
                  paddingVertical: 5,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  Upto {item.offer} off
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderColor: '#d0d0d0',
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: '45%',
            marginBottom: open ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={{
              borderColor: '#B7B7B7',
              height: 30,
              marginBottom: open ? 120 : 15,
            }}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {products
            ?.filter((item) => item.category === category)
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
