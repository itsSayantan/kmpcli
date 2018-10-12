const path = require('path')
const fs = require('fs')
const { kmp } = require('./kmp')

function readAndPerformKmp(dirName, pattern) {
    return new Promise((resolve, reject) => {

        let kmpIterableArrayofLotsOfPromies = []

        fs.readdir(dirName, function (err, files) {
            if (err)
                throw err

            kmpIterableArrayofLotsOfPromies = files.map(e => {
                return new Promise((resolve, reject) => {
                    fs.readFile(e, (err, dataBuffer) => {
                        try {
                            if (err)
                                throw err

                            let text = dataBuffer.toString('utf-8')
                            resolve(kmp(text, pattern))
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