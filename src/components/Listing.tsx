import React from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/react-hooks';
import {filter as filterAtom} from '../atom';

import listingQuery from '../graphQL/listingQuery.js';

const Listing = () => {
  const filter = useRecoilValue(filterAtom);

  const {loading, error, data, fetchMore} = useQuery(listingQuery, {
    variables: {
      page: 1,
      name: filter,
    },
  });

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#000" />
    );
  }
  if (error) {
    return <Text>{'Error'}</Text>;
  }

  const navigation = useNavigation();

  const renderSeparator = () => {
    return <View style={styles.lineSeprator} />;
  };

  const _keyExtractor = (item: any) => item.id;

  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserDetails', {...item});
        }}>
        <View style={styles.avatarContainer}>
          <View>
            <Avatar
              rounded
              source={{
                uri: item.image,
              }}
            />
          </View>
          <View style={styles.textStyle}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {data && (
        <FlatList
          data={data.characters.results}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          ItemSeparatorComponent={renderSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            const offset =
              Number(JSON.stringify(data.characters.info.next)) + 1;
            if (data.characters.info.next !== null) {
              return fetchMore({
                variables: {
                  page: offset,
                },
                updateQuery: (prev, {fetchMoreResult}) => {
                  if (!fetchMoreResult) {
                    return prev;
                  }
                  const obj = Object.assign({}, prev, {
                    data: {
                      ...prev.characters.results,
                      ...fetchMoreResult.characters.results,
                    },
                  });

                  return obj;
                },
              });
            }
          }}
        />
      )}
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    justifyContent: 'center',
    paddingLeft: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  lineSeprator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
});
