// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "swapi";
const filmsCollection = "films"
const planetsCollection = "planets"
const charactersCollection = "characters"
const films_planets = "films_planets"
const films_characters = "films_characters"


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
    const collection2 = db.collection(planetsCollection);
    const collection3 = db.collection(charactersCollection);
    const collection4 = db.collection(films_planets);
    const collection5 = db.collection(films_characters);

    switch (operation.toLowerCase()) {
        case 'findallcharacters':
            const characters = await collection.find({}).toArray();
            callback({ characters: characters });
            break;
        case 'findallfilms':
            const films = await collection.find({}).toArray();
            callback({ films: films });
            break;
        case 'findallplanets':
            const planets = await collection.find({}).toArray();
            callback({ planets: planets });
            break;
        case 'findcharacterbyid':
            const characterById = await collection.find({}).toArray();
            callback({ characterById: characterById });
            break;
        case 'findfilmbyid':
            const filmById = await collection.find({}).toArray();
            callback({ filmById: filmById });
            break;
        case 'findplanetbyid':
            const planetById = await collection.find({}).toArray();
            callback({ planetById: planetById });
            break;
        case 'findcharactersbyfilm':
            const charactersByFilm = await collection.find({}).toArray();
            callback({ charactersByFilm: charactersByFilm });
            break;
        case 'findplanetsbyfilm':
            const planetsByFilm = await collection.find({}).toArray();
            callback({ planetsByFilm: planetsByFilm });
            break;
        case 'findfilmsbycharacter':
            const filmsByCharacter = await collection.find({}).toArray();
            callback({ filmsByCharacter: filmsByCharacter });
            break;
        case 'findfilmsbyplanet':
            const filmsByPlanet = await collection.find({}).toArray();
            callback({ filmsByPlanet: filmsByPlanet });
            break;
        case 'findcharactersbyplanet':
            const charactersByPlanet = await collection.find({}).toArray();
            callback({ charactersByPlanet: charactersByPlanet });
            break;
        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    client.close();
    return 'call complete';
}

