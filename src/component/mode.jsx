const Mode = ({setMode}) => {
    return <div className="h-[90vh] flex flex-col items-center justify-center px-3">
        <p className="text-xl mb-5">Choisi ton mode :</p>
        <div className="flex flex-col w-full items-center gap-4">
            <button className="border rounded-xl w-full py-2 bg-blue-900 text-blue-50"
                    onClick={() => setMode("easy")}>Facile
            </button>
            <button className="border rounded-xl w-full py-2 bg-blue-900 text-blue-50"
                    onClick={() => setMode("normal")}>Normal
            </button>
            <button className="border rounded-xl w-full py-2 bg-blue-900 text-blue-50"
                    onClick={() => setMode("expert")}>Expert
            </button>
        </div>
    </div>
}

export default Mode;