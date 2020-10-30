import React, {useEffect} from 'react';

import {useQuery} from '@apollo/react-hooks';
import { useLazyQuery } from "@apollo/client";
import listingQuery from '../graphQL/listingQuery.js';

const getUserList = (page) => {
    const [getUsers , {loading, data, error}] = useLazyQuery(listingQuery, {
        variables: {
            page: page
        }
    });

    useEffect(() => {
        if(data){
            console.log('getUserList', JSON.stringify(data));
        }
        if (error) {
            console.log('error',{ error });
          }

    }, [data, error])

    return {getUsers};
};

export default getUserList;


