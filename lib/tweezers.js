var fs = require('fs')
  , _ = require('underscore');


var REGEX_MUSTACHE = /\{\{[\w|\-]*\}\}/g;

function extract (dataString, transform) {
    var results = [];
    var matches = dataString.match(REGEX_MUSTACHE);

    if (matches) {
        for (var i = 0; i < matches.length; ++i) {
            //remove {{ and }}
            results.push(matches[i].substring(2, matches[i].length - 2));
        }
    }

    if (transform) {
        return transform(results);
    }

    return results;
}

function readFileAndExtract (file, callback, transform) {
    fs.readFile(file, function(err, data){
        if (err) {
            callback(err);
        } else {
            var tokens = extract(data.toString(), transform);
            var retObj = {}
            retObj[file] = tokens;
            retObj.tokens = tokens;
            callback(null, retObj);
        }
    });
}

function readFilesAndExtract (files, callback, transform) {
    var retObjs = [];
    var tokens = [];

    function again() {
        if (files.length > 0) {
            var file = files.shift();
            readFileAndExtract(file, function(err, obj) {
                tokens.push(obj.tokens);
                delete obj.tokens;
                retObjs.push(obj);
                again();
            }, transform);
        } else { 
            done(); 
        }
    }
    again();

    function done() {
        var newObj = {};
        for (var i = 0; i < retObjs.length; ++i) {
            var file = _(retObjs[i]).keys()[0];
            newObj[file] = retObjs[i][file];
        }
       
        newObj.tokens = _([].concat(tokens)).flatten();

        if (transform) {
            newObj.tokens = transform(newObj.tokens);
        }

        callback(null, newObj);
    }
}

function sortAndUniq(items) {
    items.sort();
    return _(items).uniq(true);
}

/********************
 * PUBLIC INTERFACE
 ********************/

module.exports.REGEX_MUSTACHE = REGEX_MUSTACHE;

module.exports.extract = extract;
module.exports.extractUniq = function(dataString){ return extract(dataString, sortAndUniq); };

module.exports.readFileAndExtract = readFileAndExtract;
module.exports.readFileAndExtractUniq = function(files, callback) {
    readFileAndExtract(files, callback, sortAndUniq);
}

module.exports.readFilesAndExtract = readFilesAndExtract;
module.exports.readFilesAndExtractUniq = function(files, callback) {
    readFilesAndExtract(files, callback, sortAndUniq);
}


