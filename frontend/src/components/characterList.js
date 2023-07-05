import { useNavigate } from "react-router";


function CharacterList({ characters }) {
    console.log("char",characters,typeof(characters));
    return (
        <div>
            {characters.map(
                (character, index) => {
                    return <div key={(index)} onClick={() => console.log(character.id)}>
                        {character.name}:{character.id}</div>
                }
            )}
        </div>
    )
}

export default CharacterList;