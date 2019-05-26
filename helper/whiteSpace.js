function whiteSpace(val) {
    for (var i = 0; i < val.length; i++) {
        val[i] = val[i].trim()
    }
    return val
}

module.exports = whiteSpace