import { useState, useEffect } from "react";


function Home() {

    const [characters, setCharacters] = useState([]);

    const BASE_URL = 'http://localhost:3000/api/'
    const CHARACTER_URL = BASE_URL+'characters'

    function getCharacters() {
        try {
            fetch(CHARACTER_URL)
            .then(response => response.json())
            .then(data => setCharacters(data.message))
        } catch {

        }
    }

    useEffect(() => {getCharacters()},[])

    return (
        <>
        <div>
        <h1>Star Wars Universe Lookup</h1>
            <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
                here)</span></label>
        <input id="searchString" oninput="filterCharacters()" autocomplete="off" />
        </div>
        <section id="charactersList">
                {characters}
        </section>
  </>
    )
}

export default Home;