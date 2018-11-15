#!/usr/bin/env node

const { doKmp } = require('./kmpMiddleware')
const { view } = require('./viewHandler')

let showDetailed = false
const processArgs = process.argv

let location = ""
let text = ""

// kmpcli --(location|l) ./ --(text|t) someText --show-detailed

for (let i = 2; i < processArgs.length; i++) {
    const p = processArgs[i];

    if (p === "--location" || p === "--l") {
        location = processArgs[i + 1]
        i += 1
    } else if (p === "--text" || p === "--t") {
        text = processArgs[i + 1]
        i += 1
    } else if (p === "--show-details") {
        showDetailed = true
    } else if (p === "--skip-files") {
        if(processArgs[i+1].charAt(0) !== '[') {
            console.log('\x1b[31m%s\x1b[0m', 'Unknown argument for --skip-files')
            return
        } else {
            let j = i+2

            while(processArgs[j].charAt(processArgs[j].length-1) !== ']') {
                
                // TODO
                // if()
                
                ++j
            }
        }
    } else {
        console.log('\x1b[31m%s\x1b[0m',`ERR: UNKNOWN_FLAG_OR_VALUE: '${p.substr(0,2) === '--' ? p.substring(2) : p}' is an unknown flag or value`)
        return
    }
}

if (location.trim() === "" || text.trim() === "") {
    console.log('\x1b[31m%s\x1b[0m',`ERR: INVALID_INPUT: make sure the location and text entered are valid`)
    return
} else {
    doKmp(location, text)
        .then((kmpIterableArrayofLotsOfPromies) => {
            kmpIterableArrayofLotsOfPromies.forEach(e => {
                e.then(onfulfilled => {
                    view(onfulfilled)
                        .then(onfulfilled => {
                            if (showDetailed)
                                console.log("Number of Occurances:", onfulfilled)
                        })
                }, onrejected => {
                    if (showDetailed) {
                        console.log()
                        console.log('\x1b[34m%s\x1b[0m',`SKIPPING ${onrejected} as it is a directory. Recursive searching not available yet.`)
                    }
                })
            })
        }, (onrejected) => {
            console.log('\x1b[31m%s\x1b[0m',`ERR: ${onrejected} - ${location} is not a directory`)
            return
        })
        .catch((onrejected) => {
            console.log(onrejected)
        })
}