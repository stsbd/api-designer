'use strict';

describe('RAML Syntax Highlight', function () {
  beforeEach(module('codeMirror'));

  describe('codeMirror', function () {
    describe('token', function () {
      /* globals CodeMirror */
      var token;

      beforeEach(inject(function ($injector) {
        token = $injector.get('token');
      }));

      it('should mark string, almost identical to a RAML tag, as a comment (RT-346)', function () {
        var stream = new CodeMirror.StringStream('#%Raml 0.8');
        token(stream, {}).should.be.equal('comment');
      });

      it('should mark proper string as a RAML tag (RT-346)', function () {
        var stream = new CodeMirror.StringStream('#%RAML 0.8');
        token(stream, {}).should.be.equal('raml-tag');
      });

      it('should properly mark supported HTTP methods', function () {
        ['options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect', 'patch'].forEach(function (httpMethod) {
          token(new CodeMirror.StringStream(httpMethod + ':'), {}).should.be.equal('method-title');
        });
      });

      it('should mark RAML tag with whitespaces around', function () {
        var stream = new CodeMirror.StringStream('#%RAML 0.8  ');
        token(stream, {}).should.be.equal('raml-tag');
      });
    });
  });
});
