const express = require('express');

const app = express();

app.use(express.json()); //Parse JSON body 

const dao = require("./data_access.js")

app.get("/api/planet", function(req, res) {
    dao.call('findAllFilms', {}, (result) => {
        if (result.films !== undefined) {
            res.send(result.films);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
  });

const port = 3000;
console.log("server starting on port: " + port );
app.listen(port);