import React, { useState } from "react";
import PropTypes from "prop-types";
import { FavoriteSvg } from "icons";
import { useMutation } from "@apollo/react-hooks";
import { FAVORITE, UNFAVORITE } from "queries";

const Favorite = ({ variables, favorited, ...rest }) => {
  const [isFavorite, setFavorite] = useState(favorited !== null);

  const [onFavorite] = useMutation(FAVORITE);
  const [onUnfavorite] = useMutation(UNFAVORITE);

  const toggleFavorite = favorite => {
    setFavorite(favorite);

    if (favorite) {
      onFavorite({
        variables
      });
    } else {
      onUnfavorite({
        variables
      });
    }
  };

  return (
    <div onClick={() => toggleFavorite(!isFavorite)}>
      <FavoriteSvg active={isFavorite} {...rest} />
    </div>
  );
};

Favorite.defaultProps = {
  favorited: null
};

Favorite.propTypes = {
  variables: PropTypes.object.isRequired,
  favorited: PropTypes.object
};

export default Favorite;
