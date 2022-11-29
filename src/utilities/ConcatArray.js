export const ConcatArray = (inputList) => {
    console.log(inputList)
    var concatList = ""

    inputList.forEach(item => {
        concatList = concatList.concat(item.text + "\n")
    })

    return concatList
}