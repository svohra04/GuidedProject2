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


module.exports.getAllCharacters = async function getAllCharacters(parameters, callback) {
    await client.connect();

    // set the database to use
    const db = client.db(dbName);

    const characters = await db.collection(charactersCollection).find({}).toArray();
    callback({ characters: characters });

    console.log("Success getAllCharacters");
    // client.close();
}

module.exports.getCharacterById = async function getCharacterById(parameters, callback) {
    await client.connect();

    // set the database to use
    const db = client.db(dbName);

    const character = await db.collection(charactersCollection).findOne({ id: Number(parameters.id) });
    callback({ character: character });

    console.log("Success getCharacterById");
    // client.close();
}

module.exports.getPlanetById = async function getPlanetById(parameters, callback) {
    await client.connect();

    // set the database to use
    const db = client.db(dbName);

    const planet = await db.collection(planetsCollection).findOne({ id: Number(parameters.id) });
    callback({ planet: planet });

    console.log("Success getPlanetById");
    // client.close();
}


module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collection to use
    const filmsCol = db.collection(filmsCollection);
    const planetsCol = db.collection(planetsCollection);
    const charactersCol = db.collection(charactersCollection);
    const filmsPlanetsCol = db.collection(films_planets);
    const filmsCharactersCol = db.collection(films_characters);

    switch (operation.toLowerCase()) {
        case 'findallcharacters':
            const characters = await db.collection(charactersCollection).find({}).toArray();
            callback({ characters: characters });
            break;
        case 'findallfilms':
            const films = await filmsCol.find({}).toArray();
            callback({ films: films });
            break;
        case 'findallplanets':
            const planets = await planetsCol.find({}).toArray();
            callback({ planets: planets });
            break;
        case 'findcharacterbyid':
            const character = await charactersCol.findOne({ id: Number(parameters.id) });
            callback({ character: character });
            break;
        case 'findfilmbyid':
            const film = await filmsCol.findOne({ id: Number(parameters.id) });
            callback({ film: film });
            break;
        case 'findplanetbyid':
            const planet = await planetsCol.findOne({ id: Number(parameters.id) });
            callback({ planet: planet });
            break;
        case 'findcharactersbyfilm':
            const characterIdsData = await filmsCharactersCol.find({ film_id: Number(parameters.id) }).project({character_id: 1}).toArray();
            const characterIds = characterIdsData.map(doc => doc.character_id)

            const charactersByFilm = await charactersCol.find({ id: {$in: characterIds} }).toArray();
            callback({ characters: charactersByFilm });
            break;
        case 'findplanetsbyfilm':
            const planetIdsData = await filmsPlanetsCol.find({ film_id: Number(parameters.id) }).project({planet_id: 1}).toArray();
            const planetIds = planetIdsData.map(doc => doc.planet_id)

            const planetsByFilm = await planetsCol.find({ id: {$in: planetIds} }).toArray();
            callback({ planets: planetsByFilm });
            break;
        case 'findfilmsbycharacter':
            const filmIdsByCharData = await filmsCharactersCol.find({ character_id: Number(parameters.id) }).project({film_id: 1}).toArray();
            const filmIdsByChar = filmIdsByCharData.map(doc => doc.film_id)

            const filmsByChar = await filmsCol.find({ id: {$in: filmIdsByChar} }).toArray();
            callback({ films: filmsByChar });
            break;
        case 'findfilmsbyplanet':
            const filmIdsByPlanetData = await filmsPlanetsCol.find({ planet_id: Number(parameters.id) }).project({film_id: 1}).toArray();
            const filmIdsByPlanet = filmIdsByPlanetData.map(doc => doc.film_id)

            const filmsByPlanet = await filmsCol.find({ id: {$in: filmIdsByPlanet} }).toArray();
            callback({ films: filmsByPlanet });
            break;
        case 'findcharactersbyplanet':
            const charactersByPlanet = await charactersCol.find({ homeworld: Number(parameters.id) }).toArray();
            callback({ characters: charactersByPlanet });
            break;
        default:
            break;
    }
    console.log( 'call complete: ' + operation );
    // client.close();
    return 'call complete';
}

