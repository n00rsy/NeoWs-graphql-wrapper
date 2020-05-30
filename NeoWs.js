
const { RESTDataSource } = require("apollo-datasource-rest");

class NeoWs extends RESTDataSource {
  constructor() {
    super();
    this.API_KEY = 'jT7ODyr8IUg8clcAdXmhSXfjmYYe2b6aJMvFDcic'
    this.baseURL = "https://api.nasa.gov/neo/rest/v1";
  }

  async getAsteroid(args) {
      console.log(`${this.baseURL}/neo/${args.id}?api_key=${this.API_KEY}`)
    const asteroid = await this.get(`${this.baseURL}/neo/${args.id}?api_key=${this.API_KEY}`);
    asteroid.orbit_class_type = asteroid.orbit_class.orbit_class_type
    asteroid.orbit_class_range = asteroid.orbit_class.orbit_class_range
    asteroid.orbit_class_description = asteroid.orbit_class.orbit_class_description

    switch (args.unit){
        case "IMPERIAL":
            asteroid.estimated_diameter_min = asteroid.estimated_diameter.feet.estimated_diameter_min
            asteroid.estimated_diameter_max = asteroid.estimated_diameter.feet.estimated_diameter_max
            for(var i=0;i<asteroid.close_approach_data.length;i++){
              asteroid.close_approach_data[i].relative_velocity = asteroid.close_approach_data[i].relative_velocity.miles_per_hour
              asteroid.close_approach_data[i].miss_distance = asteroid.close_approach_data[i].miss_distance.miles
          }
            break;
        default:
            asteroid.estimated_diameter_min = asteroid.estimated_diameter.meters.estimated_diameter_min
            asteroid.estimated_diameter_max = asteroid.estimated_diameter.meters.estimated_diameter_max
            for(var i=0;i<asteroid.close_approach_data.length;i++){
              asteroid.close_approach_data[i].relative_velocity = asteroid.close_approach_data[i].relative_velocity.kilometers_per_second
              asteroid.close_approach_data[i].miss_distance = asteroid.close_approach_data[i].miss_distance.kilometers
          }
            break;
    }
    return asteroid;
  }

  async getAsteroids(ids, unit) {
      const asteroids = []
      for(var i=0;i<ids.length;i++){
        asteroids.push( await this.getAsteroid(id[i], unit));
      }
    return asteroids;
  }
}

module.exports = NeoWs;
