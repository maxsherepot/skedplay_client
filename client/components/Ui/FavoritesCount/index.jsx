import Cookies from "js-cookie";
import favorites from "services/favorites";

export default ({user, loadFavoriteFromCookies = true}) => {
  let favoriteCount = 0;

  const { data: { favorites_count } = {}, client } = favorites.getFavoritesCount();

  if (!loadFavoriteFromCookies && user) {
    favoriteCount = user.favorites_count;
  } else {
    favoriteCount = favorites_count;
  }

  return (
    <>
      {favoriteCount || 0}
    </>
  );
};