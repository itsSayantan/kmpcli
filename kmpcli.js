#!/usr/bin/env node

const { doKmp } = require("./kmpMiddleware")
const { view } = require("./viewHandler")

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
    } else {
        console.log(`ERR: UNKNOWN_FLAG_OR_VALUE - ${p} -- is an unknown flag or value`)
    }
}

if (location.trim() === "" || text.trim() === "") {
    console.log(`ERR: INVALID_INPUT - make sure the location and text entered are valid`)
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
                    if (showDetailed)
                        console.log('SKIPPING ', onrejected, ' as it is a directory. Recursive searching not available yet.')
                })
            })
        }, (onrejected) => {
            console.log(`ERR: ${onrejected} - ${location} is not a directory`)

        })
        .catch((onrejected) => {
            console.log(onrejected)
        })
}