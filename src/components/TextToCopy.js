export const TextToCopy = ({ children }) => {

    const CopyText = (e) => {

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
        <div className="copiable" onClick={(e) => CopyText(e)}>
            {children}
        </div>
    )
}