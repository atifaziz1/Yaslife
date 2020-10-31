import React from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  FlatList,
  LogBox,
} from 'react-native';
import _ from 'lodash';
import {Avatar} from 'react-native-elements';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/react-hooks';
import {filter as filterAtom} from '../atom';

import listingQuery from '../graphQL/listingQuery.js';

const Listing = () => {
  LogBox.ignoreAllLogs();
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
            if (data.characters.info.next !== null) {
              const offset = Number(data.characters.info.next) + 1;

              return fetchMore({
                variables: {
                  page: offset,
                },
                updateQuery: (prev, {fetchMoreResult}) => {
                  if (!fetchMoreResult) {
                    return prev;
                  }
                  return {
                    characters: {
                      info: fetchMoreResult.characters.info,
                      results: _.concat(
                        prev.characters.results,
                        fetchMoreResult.characters.results,
                      ),
                      __typename: fetchMoreResult.characters.__typename,
                    },
                    character: fetchMoreResult.character,
                  };
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
