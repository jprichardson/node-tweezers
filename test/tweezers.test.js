var assert = require('assert')
  , tweezers = require('../lib/tweezers')
  , fs = require('fs-extra')
  , path = require('path-extra')
  , testutil = require('testutil')

var TEST_DIR;

describe('tweezers', function(){
  beforeEach(function(){
    TEST_DIR = testutil.createTestDir('tweezers')
  })


  describe('+ extract()', function(){
    it('should return an array of tokens', function(){
      var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
      data += "\nI'd really love to talk to you at {{email}}, please?"
      
      var tokens = tweezers.extract(data)
      
      T (tokens.length === 3)
      T (tokens[0] === 'name')
      T (tokens[1] === 'email')
      T (tokens[2] === 'email')
    })
  })


  describe('+ extractUniq()', function(){
    it('should return an array of sorted unique tokens', function(){
      var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
      data += "\nI'd really love to talk to you at {{email}}, please?"
      
      var tokens = tweezers.extractUniq(data)
      
      T (tokens.length === 2)
      T (tokens[0] === 'email')
      T (tokens[1] === 'name')
    })
  })


  describe('+ readFileAndExtract()', function() {
    it('should read the file and return an object of tokens', function(done){
      var testFile = path.join(TEST_DIR, 'readme.md')
      if (fs.existsSync(testFile)) {
          fs.removeSync(testFile)
      }

      var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
      data += "\nI'd really love to talk to you at {{email}}, please?"

      fs.writeFileSync(testFile, data)

      tweezers.readFileAndExtract(testFile, function(err, tokenObj) {
        T (tokenObj[testFile])
        var tokens = tokenObj[testFile]
        T (tokens.length === tokenObj.tokens.length)

        T (tokens.length === 3)
        T (tokens[0] === 'name')
        T (tokens[1] === 'email')
        T (tokens[2] === 'email')
        done()
      })
    })
  })

   describe('+ readFileAndExtractUniq()', function() {
    it('should read the file and return an object of sorted unique tokens', function(done){
      var testFile = path.join(TEST_DIR, 'readme.md')
      if (fs.existsSync(testFile)) {
          fs.removeSync(testFile)
      }

      var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
      data += "\nI'd really love to talk to you at {{email}}, please?"

      fs.writeFileSync(testFile, data)

      tweezers.readFileAndExtractUniq(testFile, function(err, tokenObj) {
        T (tokenObj[testFile])
        var tokens = tokenObj[testFile]
        T (tokens.length === tokenObj.tokens.length)

        T (tokens.length === 2)
        T (tokens[0] === 'email')
        T (tokens[1] === 'name')
        done()
      })
    })
  })

  describe('+ readFilesAndExtract()', function() {
    it ('should read all files and return a single token object', function(done) {
      var testFile = path.join(TEST_DIR, 'readme.md')
      if (fs.existsSync(testFile))
          fs.removeSync(testFile)

      var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
      data += "\nI'd really love to talk to you at {{email}}, please?"

      fs.writeFileSync(testFile, data)

      var testFile2 = path.join(TEST_DIR, 'documentation.md')
      if (fs.existsSync(testFile2))
          fs.removeSync(testFile2)

      var data2 = "This {{project}} was made by {{name}}. His {{email}} is"
      data2 += "jprichardson@gmail.com."

      fs.writeFileSync(testFile2, data2)

      tweezers.readFilesAndExtract([testFile, testFile2], function(err, tokenObj) {
          T (tokenObj[testFile])
          T (tokenObj[testFile2])

          var tokens1 = tokenObj[testFile]
          T (tokens1.length === 3)
          T (tokens1[0] === 'name')
          T (tokens1[1] === 'email')
          T (tokens1[2] === 'email')

          var tokens2 = tokenObj[testFile2]
          T (tokens2.length === 3)
          T (tokens2[0] === 'project')
          T (tokens2[1] === 'name')
          T (tokens2[2] === 'email')

          T (tokenObj.tokens.length === 6)

          done()
      })            
    })
  })

  describe('+ readFilesAndExtractUniq()', function() {
    it ('should read all files and return a single sorted unique token object', function(done) {
      var testFile = path.join(TEST_DIR, 'readme.md')
      if (fs.existsSync(testFile))
          fs.removeSync(testFile)

      var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
      data += "\nI'd really love to talk to you at {{email}}, please?"

      fs.writeFileSync(testFile, data)

      var testFile2 = path.join(TEST_DIR, 'documentation.md')
      if (fs.existsSync(testFile2))
          fs.removeSync(testFile2)

      var data2 = "This {{project}} was made by {{name}}. His {{email}} is"
      data2 += "jprichardson@gmail.com."

      fs.writeFileSync(testFile2, data2)

      tweezers.readFilesAndExtractUniq([testFile, testFile2], function(err, tokenObj) {
        T (tokenObj[testFile])
        T (tokenObj[testFile2])

        var tokens1 = tokenObj[testFile]
        T (tokens1.length === 2)
        T (tokens1[0] === 'email')
        T (tokens1[1] === 'name')

        var tokens2 = tokenObj[testFile2]
        T (tokens2.length === 3)
        T (tokens2[0] === 'email')
        T (tokens2[1] === 'name')
        T (tokens2[2] === 'project')

        T (tokenObj.tokens.length === 3)

        done()
      })            
    })
  })
})



