const fs = require('graceful-fs')
const { kmp } = require('./kmp')

function readAndPerformKmp(fileName, pattern) {
    return new Promise(r => {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, (err, dataBuffer) => {
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
                        (function() {
                            let data = []
                            for(let i of kmp(text, pattern)) {
                                data.push({...i, atFile: fileName})
                            }
                            return data
                        })()
                    )
                } catch (_err) {
                    console.log(_err)
                    reject(_err)
                }
            })
        }).then(e => {
            r(e)
        }).catch(e => {console.log(e)})
    })
}
module.exports.doKmp = readAndPerformKmp