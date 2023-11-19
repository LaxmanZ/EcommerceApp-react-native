import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserType } from '../UserContext';
import { Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const ConfirmationScreen = () => {
  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summery' },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [option, setOption] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.102:8080/addresses/${userId}`
      );

      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(addresses);
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}
        >
          {steps?.map((step, index) => (
            <View
              key={index}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: 'green' },
                    index <= currentStep && { backgroundColor: 'green' },
                  ]}
                />
              )}

              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  index < currentStep && { backgroundColor: 'green' },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ marginTop: 8, textAlign: 'center' }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Select Delivery Address
          </Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: '#d0d0d0',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  paddingBottom: 17,
                  padding: 10,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
                key={index}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <AntDesign name="checkcircle" size={20} color="green" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}

                <View style={{ marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    #{item?.houseNo}, {item?.landmark}
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    {item?.street}
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    India, Bangalore
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    Phone No: {item?.mobileNo}
                  </Text>

                  <Text style={{ fontSize: 15, color: '#181818' }}>
                    Pin code : {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: '#f5f5f5',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: '#d0d0d0',
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: '#f5f5f5',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: '#d0d0d0',
                      }}
                    >
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: '#f5f5f5',
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: '#d0d0d0',
                      }}
                    >
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: 'green',
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                          Deleiver To This Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Choose Your Delivery Options
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 8,
              gap: 7,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option == true ? (
              <AntDesign name="checkcircle" size={20} color="green" />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: 'green', fontWeight: '500' }}>
                Tomorrow By 10PM
              </Text>
              - FREE Delivery with Your Prime Membership
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: '#ffc72c',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginTop: 10,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Select Your Payment Method
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 10,
            }}
          >
            {paymentMethod === 'cash' ? (
              <AntDesign name="checkcircle" size={20} color="green" />
            ) : (
              <Entypo
                onPress={() => setPaymentMethod('cash')}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Cash On Delivery</Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 10,
            }}
          >
            {paymentMethod === 'card' ? (
              <AntDesign name="checkcircle" size={20} color="green" />
            ) : (
              <Entypo
                onPress={() => setPaymentMethod('card')}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>UPI / Credit Or Debit Card</Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: '#ffc72c',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginTop: 10,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && paymentMethod === 'cash' && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Now</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: 'gray', marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Shipping to {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>
                Items
              </Text>

              <Text style={{ color: 'gray', fontSize: 16 }}>₹{total}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>
                Delivery
              </Text>

              <Text style={{ color: 'gray', fontSize: 16 }}>₹0</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Order Total
              </Text>

              <Text
                style={{ color: '#C60C30', fontSize: 17, fontWeight: 'bold' }}
              >
                ₹{total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: 'gray' }}>Pay With</Text>

            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 7 }}>
              Pay on delivery (Cash)
            </Text>
          </View>

          <Pressable
            // onPress={handlePlaceOrder}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
