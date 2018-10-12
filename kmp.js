function kmp(text, pattern) {
    function computeTempArray(pattern) {
        let tmpArray = new Array(pattern.length).fill(0)

        let i = 1, j = 0

        while(i < pattern.length) {
            if(pattern[i] === pattern[j]) {
                tmpArray[i] = j + 1
                i += 1
                j += 1
            }else {
                if(j !== 0) {
                    j = tmpArray[j - 1]
                }else {
                    tmpArray[i] = 0
                    i += 1
                }
            }
        }
        return tmpArray
    }

    return (function* kmp(text, pattern) {
        let tmpArray = computeTempArray(pattern)
        let i = 0, j = 0
        while(i < text.length) {
            if(text[i] === pattern[j]) {
                i += 1
                j += 1
            }else {
                if(j !== 0) {
                    j = tmpArray[j - 1]
                }else {
                    i += 1
                }
            }

            if(j === pattern.length) {
                yield i - j
                j = 0
            }
        }
    })(text, pattern)
}

module.exports.kmp = kmp
