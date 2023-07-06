import { useState, useEffect } from "react";
import CharacterList from "./characterList";


function Home() {

    const [characters, setCharacters] = useState([]);

    const BASE_URL = 'http://localhost:3000/api/'
    const CHARACTER_URL = BASE_URL+'characters'

    async function getCharacters() {
        let myHeaders = new Headers({ "Content-Type": "application/json" });
        var myInit = { method: 'GET', headers: myHeaders, mode: 'cors' };
        let promise = fetch(CHARACTER_URL, myInit);
        return promise.then((response) => {
            return response.text();
        });
    }

    useEffect(() => {     
            let promise = getCharacters();
            promise.then(
                (data) => {
                    setCharacters(JSON.parse(data));
                }
            )
    },[])

    return (
        <>
        <div>
        <h1>Star Wars Universe Lookup</h1>
            <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
                here)</span></label>
        <input id="searchString" oninput="filterCharacters()" autocomplete="off" />
        </div>
        <section id="charactersList">
                <CharacterList characters={characters}/>
        </section>
  </>
    )
}

export default Home;