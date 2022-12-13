export const ReadTXT = ({file}) => {

    const parseTxt = (txtFile) => {
        if (txtFile !== null && txtFile.type === "text/plain") {
            console.log(file.name + " is a .txt file.")
        }
    }
    
    return (
        parseTxt(file)
        // file.type === "text/pdf" ? console.log("txt file") : null
    )
}