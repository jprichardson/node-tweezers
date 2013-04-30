

module.exports = function tweeze (dataString, open, close) {
  var results = {}
    , opening = open || module.exports.OPEN
    , closing = close || module.exports.CLOSE
    , REGEX = new RegExp(opening + '(.+?)' + closing, 'g')

  var matches = dataString.match(REGEX) || []
  matches.forEach(function(match) {
    var m = module.exports.clean(match, opening, closing)
    if (results[m])
      results[m] += 1
    else
      results[m] = 1
  })

  return results
}

module.exports.clean = function(key, open, close) {
  return key.substring(open.length, key.length - close.length)
}

module.exports.OPEN = '{{'
module.exports.CLOSE = '}}'

