function view(kmpSearchedObjectArray) {
    // kmpSearchedObjectArray is of pattern [{ atLine: 00, fromColumn: 00, atFile: 'XX.XX' }]

    let fileName = ""
    let numberOfOccurances = 0

    for (let searchObj of kmpSearchedObjectArray) {
        if (searchObj.atFile !== fileName) {
            fileName = searchObj.atFile
            numberOfOccurances += 1
            console.log()
            console.log("File Name:", fileName)
            console.log(`---> (Line Number: ${searchObj.atLine}, Column: ${searchObj.fromColumn})`)
            console.log(`Link: ./${fileName}:${searchObj.atLine}:${searchObj.fromColumn}`)
        } else {
            numberOfOccurances += 1
            console.log(`---> (Line Number: ${searchObj.atLine}, Column: ${searchObj.fromColumn})`)
            console.log(`Link: ./${fileName}:${searchObj.atLine}:${searchObj.fromColumn}`)
        }
    }

    return new Promise((resolve) => {
        if (numberOfOccurances > 0)
            resolve(numberOfOccurances)
    })
}

module.exports.view = view