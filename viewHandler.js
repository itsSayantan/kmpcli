function view(kmpSearchedObjectArray) {
    // kmpSearchedObjectArray is of pattern [{ atLine: 00, fromColumn: 00, atFile: 'XX.XX' }]
    for (let searchObj of kmpSearchedObjectArray) {
        console.log()
        console.log("File Name:", searchObj.atFile)
        console.log(`---> (Line Number: ${searchObj.atLine}, Column: ${searchObj.fromColumn + 1})`)
        console.log(`Link: ${searchObj.atFile}:${searchObj.atLine}:${searchObj.fromColumn + 1}`)
    }
    return new Promise((resolve) => {
        resolve(kmpSearchedObjectArray.length)
    })
}
module.exports.view = view