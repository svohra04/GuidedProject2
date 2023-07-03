// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "swapi";
const filmsCollection = "films"

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

