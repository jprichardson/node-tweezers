var tweeze = require('../lib/tweezers')
  , testutil = require('testutil')


describe('tweezers', function(){
  describe('+ tweeze()', function(){
    describe('> when no configuration', function() {
      it('should return the collection tokens', function(){
        var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
        data += "\nI'd really love to talk to you at {{email}}, please?"
        
        var tokens = tweeze(data)
        EQ (tokens['name'], 1)
        EQ (tokens['email'], 2)
      })
    })

    describe('> when global configuration', function() {
      it('should return the collection tokens', function(){
        var data = "Hello @@name@@!\nMay I send you an email to @@email@@?"
        data += "\nI'd really love to talk to you at @@email@@, please?"
        
        tweeze.OPEN = '@@'
        tweeze.CLOSE = '@@'
        var tokens = tweeze(data)
        EQ (tokens['name'], 1)
        EQ (tokens['email'], 2)
      })
    })

    describe('> when global configuration', function() {
      it('should return the collection tokens', function(){
        var data = "Hello ??name??!\nMay I send you an email to ??email???"
        data += "\nI'd really love to talk to you at ??email??, please?"
        
        tweeze.clean = function(key) { return key.substring(2, key.length - 2)}
        var tokens = tweeze(data, '\\?\\?', '\\?\\?') //'?' is a RegEx char, hence the escape
        EQ (tokens['name'], 1)
        EQ (tokens['email'], 2)
      })
    })
  })
})



