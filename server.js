var connect = require('connect');
var serveStatic = require('serve-static');
var cors = require('cors');
// connect().use(serveStatic('D:/Applications/animated-login-form-main/animated-login-form-main/')).listen(8000);
connect().use(serveStatic('D:/Applications/animated-login-form-main/animated-login-form-main/')).listen(8000);
// this.serveStatic.use(cors({origin:"http://localhost:8000/"}));