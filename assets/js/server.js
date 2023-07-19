var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic('D:/Applications/animated-login-form-main/animated-login-form-main/')).listen(8000);