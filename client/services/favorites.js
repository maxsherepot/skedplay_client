import Cookies from "js-cookie";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

export default {
  getModelFavorites(modelType) {
    return JSON.parse(
      Cookies.get('favorite_' + modelType) || '[]'
    )
  },

  getFavoritesCountFromCookies() {
    const entities = ['employee', 'club', 'event'];
    let favoritesIds = [];

    for (let i in entities) {
      favoritesIds.push(
        ...JSON.parse(
          Cookies.get('favorite_' + entities[i]) || '[]'
        )
      );
    }

    return favoritesIds.length;
  },

  getFavoritesCount() {
    return useQuery(gql`
      query {
        favorites_count @client
      }
    `);
  },
};