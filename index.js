const AWS = require("aws-sdk");
const registerPath = "/register";
const loginPath = "/login";
const verifyPath = "/verify";

const registerService = require("./functions/register");

const loginService = require("./functions/login");

const verifyService = require("./functions/verify");

const util = require("./helpers/utils/util");

const dynamo = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context, callback) => {
	console.log("Going to Condition check");
	console.log("Event Data:::: "+JSON.stringify(event)+ " ROute;;"+ event.routeKey);

    if (event.body !== null && event.body !== undefined) {
        let data = JSON.parse(event.body);
        console.log("Event Data 2: "+data+ " name;;"+ data.name);
        if (typeof data.name === 'undefined') {
			`Unsupported route: "${event.routeKey}"`
			return sendRes(404, `{ error: true, message: "Unsupported route: "${event.routeKey}" and name: "${data.name}"" }`);
            // return sendRes(404, '{ error: true, message: "Unsupported route." }');
        }else if(event.httpMethod == "POST"){
			switch (event.routeKey) {
				case "POST /signup":
					break;
				case "POST /login":
					console.log("Inside POST Method");
					let requestJSON_login = JSON.parse(event.body);
					console.log("Inside POST Method body::::::"+ requestJSON_login);
					
					response = await loginService.login(requestJSON_login);
					console.log("Login Response: "+response);
					break;
				default:
					islogin=false;
					return sendRes(404, '{ error: true, message: "Login failed.. Unsupported route. " }');
    				// throw new Error(`Unsupported route: "${event.routeKey}"`);
					break;
			}
		}else if(event.httpMethod == "GET"){
			console.log("Inside GET Method");
			let requestJSON_login = JSON.parse(event.body);
			console.log("Inside GET Method body::::::"+ requestJSON_login);
			switch (event.routeKey) {
				case "GET /profile/{email}":
					console.log("Inside GET Profile by Email Method");
					body = await dynamo
					.get({
					  TableName: "chatsupport_login",
					  Key: {
					  email: event.pathParameters.email,
					  }
					})
					.promise();
					console.log("GET Profile by email Response: "+body);
					return sendRes(200, body);
					break;
				case "GET /profile":
					console.log("Inside GET Profile Method");
					body = await dynamo.scan({ TableName: "chatsupport_login" }).promise();
					console.log("Login Response: "+body);
					return sendRes(200, body);
					break;
				default:
					islogin=false;
					return sendRes(404, '{ error: true, message: "Get Profile failed.. Unsupported route. " }');
    				// throw new Error(`Unsupported route: "${event.routeKey}"`);
					break;
			}
		}else{
			return sendRes(404, '{ error: true, message: "Unsupported route. " }');
		}
        
        // return sendRes(200, '{ "error": false, "message": "Hello "' + data.name + '" }');
    }    
    
    return sendRes(404, '{ error: true, message: "Hello World!." }');
};
const sendRes = (status, body) => {
    var response = {
        statusCode: status,
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
        body: body
    };
    return response;
};
