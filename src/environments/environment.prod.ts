export const environment = {
  production: true,
  news: {
    url: 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines',
    apiKey: 'ded4231aea544dfda756a8cc5be82bf3'
  },
  weather: {
    url: 'https://api.openweathermap.org/data/2.5/forecast',
    appid: '529396d15a83b43823f798b1a920c677',
    lat: 49.206826,
    lon: 28.388829,
    units: 'metric'
  }
};
