import Cookies from "js-cookie";

export default ({user, loadFavoriteFromCookies = true}) => {
  let favoriteCount = 0;

  if (!loadFavoriteFromCookies && user) {
    favoriteCount = user.favorites_count;
  } else {
    const entities = ['employee', 'club', 'event'];

    let favoritesIds = [];

    for (let i in entities) {
      favoritesIds.push(
        ...JSON.parse(
          Cookies.get('favorite_' + entities[i]) || '[]'
        )
      );
    }

    favoriteCount = favoritesIds.length;
  }

  return (
    <>
      {favoriteCount}
    </>
  );
};