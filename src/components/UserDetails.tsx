import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export interface Props {
  item: Object;
  route: {
    params: {
      image: any;
      name: string;
      gender: any;
      species: any;
    };
  };
}

const UserDetails: React.FC<Props> = (item) => {
  const {
    params: {image, name, gender, species},
  } = item.route;

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={{width: 200, height: 200}} />
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
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMargin: {
    marginTop: 10,
  },
});
