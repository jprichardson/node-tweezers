Node.js - tweezers
==========================

`tweezers` extracts your [mustache][1], [hogan.js][2], or [handelbars][3] tokens. It's colloquially named to stick with the "mustache" theme.



Why?
----

Sometimes you want to know what the mustache tokens are in a file or string before your compile and render.



Installation
------------

   npm install tweezers



API
-----

### extract(string)

Extract the tokens into an array.

```javascript
var tweezers = require('tweezers');

 var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
data += "\nI'd really love to talk to you at {{email}}, please?"

var tokens = tweezers.extract(data);
console.log(tokens); //['name', 'email', 'email']

```


### extractUniq(string)

Extact the tokens into an array. Sort and removed duplicates.

```javascript
var tweezers = require('tweezers');

 var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
data += "\nI'd really love to talk to you at {{email}}, please?"

var tokens = tweezers.extract(data);
console.log(tokens); //['email', 'name']
```


### readFileAndExtract(filePath, callback)

Read a file and return the token *object*.

```javascript
var tweezers = require('tweezers');

var testFile = path.join('/tmp', 'readme.md');

var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
data += "\nI'd really love to talk to you at {{email}}, please?"

fs.writeFileSync(testFile, data);

tweezers.readFileAndExtract(testFile, function(err, tokenObj) {
    console.log(tokenObj);
});
```

Output:

```json
{
    "/tmp/readme.md": ["name", "email", "email"]
    "tokens": ["name", "email", "email"]
}
```


### readFileAndExtractUniq(filePath, callback)

Read a file and return the token *object* with each key having sorted and deduplicated tokens.

```javascript
var tweezers = require('tweezers');

var testFile = path.join('/tmp', 'readme.md');

var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
data += "\nI'd really love to talk to you at {{email}}, please?"

fs.writeFileSync(testFile, data);

tweezers.readFileAndExtractUniq(testFile, function(err, tokenObj) {
    console.log(tokenObj);
});
```

Output:

```json
{
    "/tmp/readme.md": ["email", "name"]
    "tokens": ["email", "name"]
}
```


### readFilesAndExtract(files, callback)

Read files in the array and return the token *object*.

```javascript
var tweezers = require('tweezers');

var testFile = path.join('/tmp', 'readme.md');
var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
data += "\nI'd really love to talk to you at {{email}}, please?"
fs.writeFileSync(testFile, data);

var testFile2 = path.join('/tmp', 'documentation.md');
var data2 = "This {{project}} was made by {{name}}. His {{email}} is"
data2 += "jprichardson@gmail.com.";
fs.writeFileSync(testFile2, data2);

tweezers.readFilesAndExtract([testFile, testFile2], function(err, tokenObj) {
    console.log(tokenObj);
});
```

Output:

```json
    "/tmp/readme.md": ["name", "email", "email"]
    "/tmp/documenation.md": ["project", "name", "email"]
    "tokens": ["name", "email", "email", "project", "name", "email"]
}
```


### readFilesAndExtractUniq(files, callback)

Read files in the array and return the token *object* with each key having sorted and deduplicated tokens.

```javascript
var tweezers = require('tweezers');

var testFile = path.join('/tmp', 'readme.md');
var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
data += "\nI'd really love to talk to you at {{email}}, please?"
fs.writeFileSync(testFile, data);

var testFile2 = path.join('/tmp', 'documentation.md');
var data2 = "This {{project}} was made by {{name}}. His {{email}} is"
data2 += "jprichardson@gmail.com.";
fs.writeFileSync(testFile2, data2);

tweezers.readFilesAndExtractUniq([testFile, testFile2], function(err, tokenObj) {
    console.log(tokenObj);
});
```

Output:

```json
{
    "/tmp/readme.md": ["email", "name"]
    "/tmp/documenation.md": ["email", "name", "project"]
    "tokens": ["email", "name", "project"]
}
```



License
-------

(MIT License)

Copyright 2012, JP Richardson





[1]: https://github.com/janl/mustache.js/
[2]: http://twitter.github.com/hogan.js/
[3]: http://handlebarsjs.com/