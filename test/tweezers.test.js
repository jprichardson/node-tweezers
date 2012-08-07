var assert = require('assert')
  , tweezers = require('../lib/tweezers')
  , fs = require('fs-extra')
  , path = require('path-extra');

var TEST_DIR = path.join(path.tempdir(), 'test-tweezers');

describe('tweezers', function(){
    beforeEach(function(done){
        fs.exists(TEST_DIR, function(itDoes) {
            if (itDoes) {
                fs.remove(TEST_DIR, function(err) {
                    fs.mkdir(TEST_DIR, done);
                });
            } else {
                fs.mkdir(TEST_DIR, done);
            }
        });
    });


    describe('+ extract()', function(){
        it('should return an array of tokens', function(){
            var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
            data += "\nI'd really love to talk to you at {{email}}, please?"
            
            var tokens = tweezers.extract(data);
            
            assert(tokens.length === 3);
            assert(tokens[0] === 'name');
            assert(tokens[1] === 'email');
            assert(tokens[2] === 'email');
        });
    });


    describe('+ extractUniq()', function(){
        it('should return an array of sorted unique tokens', function(){
            var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
            data += "\nI'd really love to talk to you at {{email}}, please?"
            
            var tokens = tweezers.extractUniq(data);
            
            assert(tokens.length === 2);
            assert(tokens[0] === 'email');
            assert(tokens[1] === 'name');
        });
    });


    describe('+ readFileAndExtract()', function() {
        it('should read the file and return an object of tokens', function(done){
            var testFile = path.join(TEST_DIR, 'readme.md');
            if (fs.existsSync(testFile)) {
                fs.removeSync(testFile);
            }

            var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
            data += "\nI'd really love to talk to you at {{email}}, please?"

            fs.writeFileSync(testFile, data);

            tweezers.readFileAndExtract(testFile, function(err, tokenObj) {
                assert(tokenObj[testFile]);
                var tokens = tokenObj[testFile];
                assert(tokens.length === tokenObj.tokens.length);

                assert(tokens.length === 3);
                assert(tokens[0] === 'name');
                assert(tokens[1] === 'email');
                assert(tokens[2] === 'email');
                done();
            });
        });
    });

     describe('+ readFileAndExtractUniq()', function() {
        it('should read the file and return an object of sorted unique tokens', function(done){
            var testFile = path.join(TEST_DIR, 'readme.md');
            if (fs.existsSync(testFile)) {
                fs.removeSync(testFile);
            }

            var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
            data += "\nI'd really love to talk to you at {{email}}, please?"

            fs.writeFileSync(testFile, data);

            tweezers.readFileAndExtractUniq(testFile, function(err, tokenObj) {
                assert(tokenObj[testFile]);
                var tokens = tokenObj[testFile];
                assert(tokens.length === tokenObj.tokens.length);

                assert(tokens.length === 2);
                assert(tokens[0] === 'email');
                assert(tokens[1] === 'name');
                done();
            });
        });
    });

    describe('+ readFilesAndExtract()', function() {
        it ('should read all files and return a single token object', function(done) {
            var testFile = path.join(TEST_DIR, 'readme.md');
            if (fs.existsSync(testFile))
                fs.removeSync(testFile);

            var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
            data += "\nI'd really love to talk to you at {{email}}, please?"

            fs.writeFileSync(testFile, data);

            var testFile2 = path.join(TEST_DIR, 'documentation.md');
            if (fs.existsSync(testFile2))
                fs.removeSync(testFile2);

            var data2 = "This {{project}} was made by {{name}}. His {{email}} is"
            data2 += "jprichardson@gmail.com.";

            fs.writeFileSync(testFile2, data2);

            tweezers.readFilesAndExtract([testFile, testFile2], function(err, tokenObj) {
                assert(tokenObj[testFile]);
                assert(tokenObj[testFile2]);

                var tokens1 = tokenObj[testFile];
                assert(tokens1.length === 3);
                assert(tokens1[0] === 'name');
                assert(tokens1[1] === 'email');
                assert(tokens1[2] === 'email');

                var tokens2 = tokenObj[testFile2];
                assert(tokens2.length === 3);
                assert(tokens2[0] === 'project');
                assert(tokens2[1] === 'name');
                assert(tokens2[2] === 'email');

                assert(tokenObj.tokens.length === 6);

                done();
            });            

        });
    });

    describe('+ readFilesAndExtractUniq()', function() {
        it ('should read all files and return a single sorted unique token object', function(done) {
            var testFile = path.join(TEST_DIR, 'readme.md');
            if (fs.existsSync(testFile))
                fs.removeSync(testFile);

            var data = "Hello {{name}}!\nMay I send you an email to {{email}}?"
            data += "\nI'd really love to talk to you at {{email}}, please?"

            fs.writeFileSync(testFile, data);

            var testFile2 = path.join(TEST_DIR, 'documentation.md');
            if (fs.existsSync(testFile2))
                fs.removeSync(testFile2);

            var data2 = "This {{project}} was made by {{name}}. His {{email}} is"
            data2 += "jprichardson@gmail.com.";

            fs.writeFileSync(testFile2, data2);

            tweezers.readFilesAndExtractUniq([testFile, testFile2], function(err, tokenObj) {
                assert(tokenObj[testFile]);
                assert(tokenObj[testFile2]);

                var tokens1 = tokenObj[testFile];
                assert(tokens1.length === 2);
                assert(tokens1[0] === 'email');
                assert(tokens1[1] === 'name');

                var tokens2 = tokenObj[testFile2];
                assert(tokens2.length === 3);
                assert(tokens2[0] === 'email');
                assert(tokens2[1] === 'name');
                assert(tokens2[2] === 'project');

                assert(tokenObj.tokens.length === 3);

                done();
            });            

        });
    })
});



