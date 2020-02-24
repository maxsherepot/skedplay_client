import React, { useState } from "react";
import PropTypes from "prop-types";
import { FavoriteSvg } from "icons";
import { useMutation } from "@apollo/react-hooks";
import { FAVORITE, UNFAVORITE } from "queries";
import Cookies from 'js-cookie'
import checkLoggedIn from "lib/checkLoggedIn";

const FavoriteButton = ({ variables, favorited, ...rest }) => {
  const cookieKey = 'favorite_' + variables.model_type;

  const loadFromCookies = true; // !user

  let favoritesIdsJson = Cookies.get(cookieKey) || '[]';
  let favoritesIds = JSON.parse(favoritesIdsJson);
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
    } else {
      if (favorite) {
        if (favoriteIndex === -1) {
          favoritesIds.push(variables.model_id);
        }
      } else {
        if (favoriteIndex !== -1) {
          favoritesIds.splice(favoriteIndex, 1);
        }
      }

      Cookies.set(cookieKey, JSON.stringify(favoritesIds), { expires: 365 })
    }
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

FavoriteButton.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  console.log('getInitialProps', user);
  if (!user) {
    return {};
  }
  return { user };
};

export default FavoriteButton;
