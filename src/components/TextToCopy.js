export const TextToCopy = ({ children }) => {

    const copyText = (e) => {

        console.log(e.target.innerText);
        var newText = e.target.innerText;

        return (
            navigator.clipboard
                .writeText(newText)
                .then(
                    () => (document.querySelector("#sampleText").innerText = newText)
                )
        )
    }

    return (
        <div className="copiable" onClick={(e) => copyText(e)}>
            {children}
        </div>
    )
}