import { useEffect, useState } from "react";

const { useParams } = require("react-router");


function Planet() {
    const {id} = useParams();
    const [planet, setPlanet] = useState();

    const BASE_URL = 'http://localhost:3000/api/'
    const CHARACTER_URL = BASE_URL+'characters'
    const PLANET_URL = `${BASE_URL}planets`

    async function getPlanet() {
        let myHeaders = new Headers({ "Content-Type": "application/json" });
        var myInit = { method: 'GET', headers: myHeaders, mode: 'cors' };
        let promise = fetch(`${PLANET_URL}/${id}`, myInit);
        return promise.then((response) => {
            return response.text();
        });
    }

    useEffect(() => {     
        let promise = getPlanet();
        promise.then(
            (data) => {
                console.log("Char DATA",JSON.parse(data))
                setPlanet(JSON.parse(data));
            }
        ) 
},[])

    return (
        <div>
            <h1 id="planetName">{planet && planet.name}</h1>
            <section id="generalInfo">
                <p>Population: {planet && planet.population}</p>
                <p>Climate: {planet && planet.climate}</p>
                <p>Gravity: {planet && planet.gravity}</p>
            </section>
            <h2 id="characterTitle">Characters</h2>
            <section id="charactersList">
            
            </section>
            <section id="films">
            <h2>Films appeared in</h2>
            <ul></ul>
            </section>
        </div>
    )
}

export default Planet;