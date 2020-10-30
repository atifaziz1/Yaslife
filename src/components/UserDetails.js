import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View,ActivityIndicator, Text, StyleSheet, Keyboard, FlatList} from 'react-native';
import {Avatar} from 'react-native-elements';
import { Image, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const UserDetails = (item) => {
 console.log('props', JSON.stringify(item.route.params))
  const {route:{
    params: {
      image,
      name,
      gender,
      species
    }
  }} = item;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{`I am ${name}`}</Text>
  <Text>{`Gender: ${gender}`}</Text>
  <Text>{`species: ${species}`}</Text>
      <Button
  title="Go Back"
  type="outline"
  buttonStyle={styles.topMargin}
  onPress={() => navigation.goBack()}
/>
    </View>
)
    
  
}

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  topMargin: {
    marginTop: 10,
  },
});
