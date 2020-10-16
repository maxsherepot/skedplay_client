import React, { useState } from "react";
import PropTypes from "prop-types";
import { FavoriteSvg } from "icons";
import { useMutation } from "@apollo/react-hooks";
import { FAVORITE, UNFAVORITE, DO_EVENT } from "queries";
import Cookies from 'js-cookie';
import favorites from "services/favorites";

const FavoriteButton = ({ variables, favorited, ...rest }) => {
  const [doEvent] = useMutation(DO_EVENT);
  let { data: { favorites_count } = {}, client } = favorites.getFavoritesCount();

  favorites_count = favorites_count || 0;

  const loadFromCookies = true; // !user

  const cookieKey = 'favorite_' + variables.model_type;

  const getFavoritesIds = () => {
    let favoritesIdsJson = Cookies.get(cookieKey) || '[]';

    return JSON.parse(favoritesIdsJson);
  };

  let favoritesIds = getFavoritesIds();
  let favoriteIndex = favoritesIds.findIndex(id => parseInt(variables.model_id) === parseInt(id));

  const [isFavorite, setFavorite] = useState(favorited !== null || favoriteIndex !== -1);

  const [onFavorite] = useMutation(FAVORITE);
  const [onUnfavorite] = useMutation(UNFAVORITE);

  const toggleFavorite = favorite => {
    setFavorite(favorite);

    if (!loadFromCookies) {
      if (favorite) {
        onFavorite({
          variables
        });
      } else {
        onUnfavorite({
          variables
        });
      }

      return;
    }

    let favoritesIds = getFavoritesIds();
    let favoriteIndex = favoritesIds.findIndex(id => parseInt(variables.model_id) === parseInt(id));

    if (favorite) {
      if (favoriteIndex === -1) {
        favoritesIds.push(variables.model_id);
        favorites_count++;

        doEvent({
          variables: {
            model_type: variables.model_type,
            model_id: variables.model_id,
            event: 'favorite',
          }
        });
      }
    } else {
      if (favoriteIndex !== -1) {
        favoritesIds.splice(favoriteIndex, 1);
        favorites_count--;

        doEvent({
          variables: {
            model_type: variables.model_type,
            model_id: variables.model_id,
            event: 'unfavorite',
          }
        });
      }
    }

    Cookies.set(cookieKey, JSON.stringify(favoritesIds), { expires: 365 });
    client.writeData({
      data: {
        favorites_count: favorites_count || 0
      }
    });
  };

  return (
    <div onClick={() => toggleFavorite(!isFavorite)}>
      <FavoriteSvg active={isFavorite} {...rest} />
    </div>
  );
};

FavoriteButton.defaultProps = {
  favorited: null
};

FavoriteButton.propTypes = {
  variables: PropTypes.object.isRequired,
  favorited: PropTypes.object
};

export default FavoriteButton;
