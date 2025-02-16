import {useEffect, useState} from 'react'
import competitors from './assets/competitors.json'
import Mode from "./component/mode.jsx";
import Game from "./component/game.jsx";
import End from "./component/end.jsx";

function App() {
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [page, setPage] = useState("mode") // mode / game / end
    const [mode, setMode] = useState("")

    useEffect(() => {
        if (mode !== "") {
            setPage("game")
        }
    }, [mode]);

    useEffect(() => {
        if (lives === 0) {
            setPage("end");
        }
    }, [lives]);

    useEffect(() => {
        if (score === competitors.competiteurs.length) {
            setPage("end");
        }

    }, [score]);

    const replay = () => {
        setScore(0)
        setLives(3)
        setPage("mode");
    }

    return (
        <>
            <div className="flex justify-between py-2 px-3 border-b">
                <p>Score : {score}</p>
                <p>{lives} ❤️</p>
            </div>

            { page === "mode" && <Mode setMode={setMode} />}
            { page === "game" && <Game mode={mode} setScore={setScore} setLives={setLives}/>}
            { page === "end" && <End lives={lives} score={score} replay={replay} />}

        </>
    )
}

export default App
