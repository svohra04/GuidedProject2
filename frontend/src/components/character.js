import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"


function Character() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [character, setCharacter] = useState([]);
    const [homeworld, setHomeworld] = useState([]);

    const BASE_URL = 'http://localhost:3000/api/'
    const CHARACTER_URL = BASE_URL+'characters'
    const PLANET_URL = `${BASE_URL}planets`

    async function getCharacter() {
        let myHeaders = new Headers({ "Content-Type": "application/json" });
        var myInit = { method: 'GET', headers: myHeaders, mode: 'cors' };
        let promise = fetch(`${CHARACTER_URL}/${id}`, myInit);
        return promise.then((response) => {
            return response.text();
        });
    }

    async function getCharacterHomeworld() {
        let myHeaders = new Headers({ "Content-Type": "application/json" });
        var myInit = { method: 'GET', headers: myHeaders, mode: 'cors' };
        let promise = fetch(`${PLANET_URL}/${character.homeworld}`, myInit);
        return promise.then((response) => {
            return response.text();
        });
    }

    useEffect(() => {     
            let promise = getCharacter();
            promise.then(
                (data) => {
                    // console.log("Char DATA",JSON.parse(data))
                    setCharacter(JSON.parse(data));
                }
            ) 
    },[])

    // useEffect(() => {
    //     let promise = getCharacterHomeworld();
    //         promise.then(
    //             (data) => {
    //                 console.log("HomeDATA",data)
    //                 setHomeworld(JSON.parse(data));
    //             }
    //         )
    // }, [character])

    return (
        <div>
            <h1 id="name">{character.name}</h1>
            <section id="generalInfo">
            <p>Height: <span id="height"></span>{character.height} cm</p>
            <p>Mass: <span id="mass"></span>{character.mass} kg</p>
            <p>Born: <span id="birth_year">{character.birth_year}</span></p>
            </section>
            <section id="planets">
            <h2>Homeworld</h2>
            <p><span id="homeworld" onClick={() => navigate(`/planet/${character.homeworld}`)}>{character.homeworld}</span></p>
            </section>
            <section id="films">
            <h2>Films appeared in</h2>
                <ul></ul>
            </section>
        </div>
    )
}

export default Character