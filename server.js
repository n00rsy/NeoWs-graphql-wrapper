const { ApolloServer, gql } = require("apollo-server");
const NeoWs = require("./NeoWs")

const typeDefs = gql`

  type close_approach{
    close_approach_date: String
    close_approach_date_full: String
    epoch_date_close_approach: Float
    relative_velocity(unit: String = kilometers_per_second): Float
    miss_distance(unit: String = kilometers): Float
  }

  type orbital_data {
    orbit_id: String
    orbit_determination_date: String
    first_observation_date: String
    last_observation_date: String
    data_arc_in_days: Float
    observations_used: Float
    orbit_uncertainty: Float
    minimum_orbit_intersection: Float
    jupiter_tisserand_invariant: Float
    epoch_osculation: Float
    eccentricity: Float
    semi_major_axis: Float
    inclination: Float
    ascending_node_longitude: Float
    orbital_period: Float
    perihelion_distance: Float
    perihelion_argument: Float
    aphelion_distance: Float
    perihelion_time: Float
    mean_anomaly: Float
    mean_motion: Float
    equinox: String
    orbit_class_type: String
    orbit_class_range: String
    orbit_class_description: String
  }

  type Asteroid {
    name: String
    nasa_jpl_url: String
    absolute_magnitude_h: Float
    estimated_diameter_min(unit: String = METER): Float
    estimated_diameter_max(unit: String = METER): Float
    is_potentially_hazardous_asteroid: Boolean
    close_approach_data: [close_approach]
    orbital_data: orbital_data

  }

  type Query {
    getAsteroidData(id: String): Asteroid
    getAsteroidsData(ids: [String]): [Asteroid]
  }
`;

const resolvers = {
  Query: {
    getAsteroidData: async (_, { id }, { dataSources }) =>
      dataSources.NeoWs.getAsteroid(id),
    getAsteroidsData: async (_, { ids }, { dataSources }) =>
      dataSources.NeoWs.getAsteroids(ids),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    NeoWs: new NeoWs()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
