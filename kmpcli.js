#!/usr/bin/env node

const { doKmp } = require("./filereader")

doKmp(process.argv[2], process.argv[3])
.then((kmpIterableArrayofLotsOfPromies) => {
    console.log('In kmpclifile')
    kmpIterableArrayofLotsOfPromies.forEach(e => {
        e.then(onfulfilled => {
            for(let searchObj of onfulfilled)
                console.log(searchObj)
        }, onrejected => {
            console.log('SKIPPING ', onrejected, ' as it is a directory. Recursive searching not available yet.')
        })
    })
}, (onrejected) => {

})
.catch((onrejected) => {

})