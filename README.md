Node.js - tweezers
==========================

[![build status](https://secure.travis-ci.org/jprichardson/node-tweezers.png)](http://travis-ci.org/jprichardson/node-tweezers)

`tweezers` extracts your [mustache][1], [hogan.js][2], [handelbars][3] or any arbitrary tokens. It's colloquially named to stick with the "mustache" theme.



Why?
----

Sometimes you want to know what the mustache tokens are in a file or string before your compile and render.



Installation
------------

   npm install --save tweezers



API
---

### tweeze(string, [open], [close])

Extract the tokens into an array.

```javascript
var tweeze = require('tweezers');

 var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
data += "\nI'd really love to talk to you at {{email}}, please?"

var tokens = tweeze(data);
console.dir(tokens); //{ name: 1, email: 2 }

```


License
-------

(MIT License)

Copyright 2012, JP Richardson





[1]: https://github.com/janl/mustache.js/
[2]: http://twitter.github.com/hogan.js/
[3]: http://handlebarsjs.com/