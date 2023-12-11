export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a8bd3684f88d5cf715f867326985d99f&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };