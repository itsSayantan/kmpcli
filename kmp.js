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

    return (function* (text, pattern) {
        let tmpArray = computeTempArray(pattern)
        /**
         * Introducing _i which will keep
         * track of the column number 
         * from which pattern is matching
         */
        let i = 0, j = 0, _i = 0
        let lineNumber = 1
        while(i < text.length) {
            if(text.charCodeAt(i) === 10) {
                lineNumber += 1
                /**
                 * Initializing _i = 0, because 
                 * a new line character has been encountered
                 */
                _i = 0
                i += 1
                continue
            }
            if(text[i] === pattern[j]) {
                i += 1
                _i += 1
                j += 1
            }else {
                if(j !== 0) {
                    j = tmpArray[j - 1]
                }else {
                    i += 1
                    _i += 1
                }
            }

            if(j === pattern.length) {
                yield {
                    atLine: lineNumber,
                    fromColumn: _i - j
                }
                j = tmpArray[j - 1]
            }
        }
    })(text, pattern)
}

module.exports.kmp = kmp
