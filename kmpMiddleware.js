const path = require('path')
const fs = require('fs')
const { kmp } = require('./kmp')

function readAndPerformKmp(dirName, pattern) {
    // append '/' to dirName if not already there
    if(!(dirName.charAt(dirName.length-1) === '/' || dirName.charAt(dirName.length-1) === '\\')) {
        dirName+="/"
    }
    return new Promise((resolve, reject) => {

        let kmpIterableArrayofLotsOfPromies = []

        fs.readdir(dirName, function (err, files) {
            if (err) {
                reject("DIR_NOT_FOUND")
                return
            }

            kmpIterableArrayofLotsOfPromies = files.map(e => {
                return new Promise((resolve, reject) => {
                    fs.readFile(dirName+e, (err, dataBuffer) => {
                        try {
                            if (err)
                                throw err

                            let text = dataBuffer.toString('utf-8')
                            resolve(
                                /**
                                 * Creating a wrapper here, to inject
                                 * the name of the file, while not touching 
                                 * the kmp file at all.
                                 * Functional Style.
                                 */
                                (function* () {
                                    for(let i of kmp(text, pattern)) {
                                        i.atFile = e
                                        yield i
                                    }
                                })()
                            )
                        } catch (_err) {
                            reject(e)
                        }
                    })
                })
            })
            resolve(kmpIterableArrayofLotsOfPromies)
        })
    })
}

module.exports.doKmp = readAndPerformKmp