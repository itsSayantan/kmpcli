#!/usr/bin/env node

const { doKmp } = require("./kmpMiddleware")
const { view } = require("./viewHandler")

doKmp(process.argv[2], process.argv[3])
.then((kmpIterableArrayofLotsOfPromies) => {
    kmpIterableArrayofLotsOfPromies.forEach(e => {
        e.then(onfulfilled => {
            for(let searchObj of onfulfilled)
                view(searchObj)
        }, onrejected => {
            console.log('SKIPPING ', onrejected, ' as it is a directory. Recursive searching not available yet.')
        })
    })
}, (onrejected) => {
    console.log(`ERR: ${onrejected} - ${process.argv[2]} is not a directory`)
    
})
.catch((onrejected) => {
    console.log(onrejected)
})