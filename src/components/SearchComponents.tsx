import React from 'react';
import {SearchBar} from 'react-native-elements';

import {useRecoilState} from 'recoil';
import {filter as filterAtom} from '../atom';

const SearchComponent = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={(text) => setFilter(text)}
      value={filter}
    />
  );
};

export default SearchComponent;
