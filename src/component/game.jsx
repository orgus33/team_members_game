import competitors from './../assets/competitors.json'
import {useEffect, useState} from "react";


const Game = ({mode, setScore, setLives}) => {
    const [imageUrl, setImageUrl] = useState("")
    const [choices, setChoices] = useState([])
    const [answer, setAnswer] = useState("")
    const [questionType, setQuestionType] = useState("")
    const [selectCompetitor, setSelectCompetitor] = useState([])

    const getRandomInteger = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)

        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const getRandomNumberWithoutSomeNumbers = (min, max, excludes) => {
        let randomNumber = getRandomInteger(min, max)

        while (excludes.includes(randomNumber)) {
            randomNumber = getRandomInteger(min, max)
        }

        return randomNumber;
    }

    const selectQuestionType = () => {
        const number = Math.random()
        if (number > 0.5) {
            return "name"
        }

        return "skills"

    }


    const selectPeople = () => {
        document.querySelectorAll("button").forEach(btn => {
            btn.classList.remove("bg-red-900")
            btn.classList.remove("bg-green-900")
            btn.classList.add("bg-blue-900")
        })

        const numero = getRandomInteger(1, competitors.competiteurs.length)

        const competitor = competitors.competiteurs.find(competitor => competitor.numero === numero)

        setImageUrl( `/competitor/${numero}.jpg`);

        const maxChoice = mode === "easy" ? 2 : mode === "normal" ? 4 : 6

        const randomPlaceChoice = getRandomInteger(0, maxChoice - 1)
        const choicesArray = []
        const excludesChoicesArray = [numero, ...selectCompetitor]
        setSelectCompetitor(selectCompetitor => [...selectCompetitor, numero])

        const questionTypeValue = selectQuestionType()
        setQuestionType(questionTypeValue)

        if (questionTypeValue === "name") {
            const filterCompetitors = competitors.competiteurs.filter(competitorFilter => competitorFilter.civilite !== competitor.civilite)
            filterCompetitors.forEach(filterCompetitor => {
                excludesChoicesArray.push(filterCompetitor.numero)
            })
        }

        for (let i = 0; i < maxChoice; i++) {
            if (randomPlaceChoice === i) {
                if (questionTypeValue === "name") {
                    choicesArray.push(`${competitor.prenom} ${competitor.nom}`)
                    setAnswer(`${competitor.prenom} ${competitor.nom}`)
                } else {
                    choicesArray.push(`${competitor.metier}`)
                    setAnswer(`${competitor.metier}`)
                }
            } else {
                const randomNumber = getRandomNumberWithoutSomeNumbers(1, competitors.competiteurs.length, excludesChoicesArray)
                excludesChoicesArray.push(randomNumber)
                const randomCompetitor = competitors.competiteurs.find(randomCompetitor => randomCompetitor.numero === randomNumber)

                if (questionTypeValue === "name") {
                    choicesArray.push(`${randomCompetitor.prenom} ${randomCompetitor.nom}`)
                } else {
                    choicesArray.push(`${randomCompetitor.metier}`)
                }
            }
        }

        setChoices(choicesArray)

    }

    useEffect(() => {
        selectPeople()
    }, []);

    const checkAnswer = (answerChoose, e) => {

        e.currentTarget.classList.remove("bg-blue-900")
        if (answerChoose === answer) {
            setScore(score => score + 1)
            e.currentTarget.classList.add("bg-green-900")
        } else {
            setLives(lives => lives - 1)
            e.currentTarget.classList.add("bg-red-900")

            const otherBtns = e.currentTarget.parentNode.querySelectorAll("button")

            otherBtns.forEach(btn => {
                if (btn.innerText === answer) {
                    btn.classList.remove("bg-blue-900")
                    btn.classList.add("bg-green-900")
                }
            })

        }



        setTimeout(() => {
            selectPeople()
        }, 1500)

    }


    return <div className="h-[90vh] flex flex-col items-center justify-center mt-5 px-3">
        {questionType === "name" && <p className="text-xl mb-5">Qui est ce ?</p>}
        {questionType === "skills" && <p className="text-xl mb-5">Quels est son métier ?</p>}


        {imageUrl !== "" && <img src={imageUrl} alt="Competitor picture" className="h-1/2 pb-3"/>}

        <div className="flex flex-col w-full items-center gap-4">
            {choices.map((choice) => {

                return <button key={choice.numero} className={`transition-all border rounded-xl w-full py-2 text-blue-50 bg-blue-900`}
                               onClick={(e) => checkAnswer(choice, e)}>{choice}
                </button>
            })}
        </div>
    </div>
}

export default Game;