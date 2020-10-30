import React from 'react';
import ApolloClient  from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RecoilRoot } from "recoil";
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

if(__DEV__) {
  import("./ReactotronConfig")
}

import MainStack from './src/StackNavigator/stackNavigator';
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <MainStack />
      </RecoilRoot>
    </ApolloProvider>
  );
};
export default App;

