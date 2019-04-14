#!/usr/bin/env node

const { doKmp } = require('./kmpMiddleware')
const { view } = require('./viewHandler')
const Rxjs = require('rxjs')
const fs = require('fs')
const path = require('path')
const absolutePathGenerator = new Rxjs.BehaviorSubject(null)
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
        if (processArgs[i + 1].charAt(0) !== '[') {
            console.log('\x1b[31m%s\x1b[0m', 'Unknown argument for --skip-files')
            return
        } else {
            let j = i + 2

            while (processArgs[j].charAt(processArgs[j].length - 1) !== ']') {

                // TODO
                // if()

                ++j
            }
        }
    } else {
        console.log('\x1b[31m%s\x1b[0m', `ERR: UNKNOWN_FLAG_OR_VALUE: '${p.substr(0, 2) === '--' ? p.substring(2) : p}' is an unknown flag or value`)
        return
    }
}

if (location.trim() === "" || text.trim() === "") {
    console.log('\x1b[31m%s\x1b[0m', `ERR: INVALID_INPUT: make sure the location and text entered are valid`)
    return
} else {
    absolutePathGenerator.subscribe(location => {
        if (!location) return
        doKmp(location, text)
            .then((searchDetails) => {
                view(searchDetails)
                    .then(onfulfilled => {
                        if (showDetailed)
                            console.log("Number of Occurances:", onfulfilled)
                    })
            })
            .catch((onrejected) => {
                console.log(onrejected)
            })
    })
}
function getPath(basename) {
    fs.readdir(basename, (err, files) => {
        if (err)
            return
        else {
            files.forEach(file => {
                const fileOrFolderPath = path.join(basename, file)
                if (fs.lstatSync(fileOrFolderPath).isDirectory())
                    getPath(fileOrFolderPath)
                else {
                    absolutePathGenerator.next(fileOrFolderPath)
                }
            })
        }
    })
}
getPath(location)