const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json()); //Parse JSON body 


const dao = require("./data_access.js")


// Find All Characters
app.get("/api/characters", function(req, res) {
    console.log("Start of find all characters")
    dao.getAllCharacters({}, (result) => {
        if (result.characters !== undefined) {
            res.send(result.characters);
        } else {
            res.statusCode = 404;
            res.end();
        }
    })
    console.log("End of find all char")
})


// Find All Films
app.get("/api/films", function(req, res) {
    dao.call('findAllFilms', {}, (result) => {
        if (result.films !== undefined) {
            res.send(result.films);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find All Planets
app.get("/api/planets", function(req, res) {
    dao.call('findAllPlanets', {}, (result) => {
        if (result.planets !== undefined) {
            res.send(result.planets);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Character By Id
app.get("/api/characters/:id", (req, res) => {
    const characterId = req.params.id;

    if (!characterId) {res.status(400).send('Invalid request')}

    dao.call('findCharacterById', { id: characterId }, (result) => {
        if (result.character !== undefined) {
            res.send(result.character);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Film By Id
app.get("/api/films/:id", (req, res) => {
    const filmId = req.params.id;

    if (!filmId) {res.status(400).send('Invalid request')}

    dao.call('findFilmById', { id: filmId }, (result) => {
        if (result.film !== undefined) {
            res.send(result.film);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Planet By Id
app.get("/api/planets/:id", (req, res) => {
    const planetId = req.params.id;

    if (!planetId) {res.status(400).send('Invalid request')}

    dao.call('findPlanetById', { id: planetId }, (result) => {
        if (result.planet !== undefined) {
            res.send(result.planet);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Characters By Film By Id
app.get("/api/films/:id/characters", (req, res) => {
    const filmId = req.params.id;

    if (!filmId) {res.status(400).send('Invalid request')}

    dao.call('findCharactersByFilm', { id: filmId }, (result) => {
        if (result.characters !== undefined) {
            res.send(result.characters);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Planets By Film By Id
app.get("/api/films/:id/planets", (req, res) => {
    const filmId = req.params.id;

    if (!filmId) {res.status(400).send('Invalid request')}

    dao.call('findPlanetsByFilm', { id: filmId }, (result) => {
        if (result.planets !== undefined) {
            res.send(result.planets);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Films By Character By Id
app.get("/api/characters/:id/films", (req, res) => {
    const characterId = req.params.id;

    if (!characterId) {res.status(400).send('Invalid request')}

    dao.call('findFilmsByCharacter', { id: characterId }, (result) => {
        if (result.films !== undefined) {
            res.send(result.films);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Films By Planets By Id
app.get("/api/planets/:id/films", (req, res) => {
    const planetId = req.params.id;

    if (!planetId) {res.status(400).send('Invalid request')}

    dao.call('findFilmsByPlanet', { id: planetId }, (result) => {
        if (result.films !== undefined) {
            res.send(result.films);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


// Find Characters By Planets By Id
app.get("/api/planets/:id/characters", (req, res) => {
    const planetId = req.params.id;

    if (!planetId) {res.status(400).send('Invalid request')}

    dao.call('findCharactersByPlanet', { id: planetId }, (result) => {
        if (result.characters !== undefined) {
            res.send(result.characters);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});


const port = 3000;
console.log("server starting on port: " + port );
app.listen(port);