export const ConcatArray = (inputList) => {
    var concatList = ""
    inputList.forEach(item => {
        concatList = concatList.concat(item.text + "\n")
    })
    return concatList
}