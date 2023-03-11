/* eslint-disable */
export default class MoviedbService {
  apiKey = process.env.REACT_APP_USER_TOKEN
  apiBase = 'https://api.themoviedb.org/3/search'

  async getMovies(keyword, pageNumber) {
    const res = await fetch(
      `${this.apiBase}/movie?api_key=${this.apiKey}&language=en-US&query=${keyword}&include_adult=false&page=${pageNumber}`
    )
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
    }
    return res.json();
  }
}
