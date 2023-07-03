const express = require('express');

const app = express();

app.use(express.json()); //Parse JSON body 

app.get("/api/planet", function(req, res) {
    const fakeObject = {"Here":"yes"}
    res.send(fakeObject)
  });

const port = 3000;
console.log("server starting on port: " + port );
app.listen(port);