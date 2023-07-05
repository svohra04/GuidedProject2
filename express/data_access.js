// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "swapi";
const filmsCollection = "films"

// /api/characters              findAllCharacters
// /api/films                   findAllFilms
// /api/planets                 findAllPlanets
// /api/characters/:id          findCharacterById
// /api/films/:id               findFilmById
// /api/planets/:id             findPlanetById
// /api/films/:id/characters    findCharactersByFilm
// /api/films/:id/planets       findPlanetsByFilm
// /api/characters/:id/films    findFilmsByCharacter
// /api/planets/:id/films       findFilmsByPlanet
// /api/planets/:id/characters  FindCharactersByPlanet

// CamelCase for server.js but all lowercase for data_access


module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collection to use
    const collection = db.collection(filmsCollection);

    switch (operation.toLowerCase()) {
        case 'findallfilms':
            const films = await collection.find({}).toArray();
            callback({ films: films });
            break;
        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}

