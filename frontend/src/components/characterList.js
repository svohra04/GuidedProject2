import { useNavigate } from "react-router";


function CharacterList({ characters }) {
    const navigate = useNavigate();


    return (
        <div>
            {characters.map(
                (character, index) => {
                    return <div key={(index)} onClick={() => navigate(`/character/${character.id}`)}>
                        {character.name}:{character.id}</div>
                }
            )}
        </div>
    )
}

export default CharacterList;