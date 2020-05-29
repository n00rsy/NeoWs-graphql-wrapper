
const { RESTDataSource } = require("apollo-datasource-rest");

class NeoWs extends RESTDataSource {
  constructor() {
    super();
    this.API_KEY = 'jT7ODyr8IUg8clcAdXmhSXfjmYYe2b6aJMvFDcic'
    this.baseURL = "https://api.nasa.gov/neo/rest/v1";
  }

  async getAsteroid(id) {
    const asteroid = await this.get(`${this.baseURL}/neo/${id}?api_key=${this.API_KEY}`);
    console.log(asteroid.name)
    return asteroid;
  }

  async getAsteroids(ids) {
      const asteroids = []
      for(var i=0;i<ids.length;i++){
        asteroids.push( await this.get(`${this.baseURL}/neo/${ids[i]}?api_key=${this.API_KEY}`));
      }
    return asteroids;
  }
}

module.exports = NeoWs;
