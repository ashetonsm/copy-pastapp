import { Button } from "react-bootstrap";

export const TextToCopy = ({ children, notify }) => {

    const copyText = (e) => {

        console.log(e.target.innerText);
        notify()
        var newText = e.target.innerText;

        return (
            navigator.clipboard
                .writeText(newText)
                .then(
                    () => (document.querySelector("#currentText").innerText = newText)
                )
        )
    }

    return (
        <p>
            <Button onClick={(e) => copyText(e)}>
                {children}
            </Button>
        </p>
    )
}