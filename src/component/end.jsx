const End = ({lives, score, replay}) => {

    return <>
        {lives > 0 && <div className="h-[90vh] flex flex-col items-center justify-center px-3">
            <p className="text-xl mb-5 text-center">Bravo ! Tu as deviné tout les métiers et prénom de l'équipe !</p>
            <p className="text-xl mb-5">Tu as fais un score de {score}</p>

            <button className="border rounded-xl w-full px-3 py-2 bg-blue-900 text-blue-50"
                    onClick={replay}>Rejouer
            </button>
        </div>
        }

        {lives === 0 && <div className="h-[90vh] flex flex-col items-center justify-center px-5">
            <p className="text-xl mb-5 text-center">Game over !</p>
            <p className="text-xl mb-5">Tu as fais un score de {score}</p>

            <button className="border rounded-xl w-full px-3 py-2 bg-blue-900 text-blue-50"
                    onClick={replay}>Rejouer
            </button>
        </div>}


    </>
}

export default End;