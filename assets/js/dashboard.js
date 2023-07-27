var url_string = window.location;
var url = new URL(url_string);
var email_ = url.searchParams.get("user");

const api = 'https://9zfkkhv47e.execute-api.ap-south-1.amazonaws.com/chatsupport/profile';
const data = JSON.stringify({ "email" : email_ });
const request_body = JSON.stringify({"body": data, "httpMethod":"GET", "routeKey":"GET /profile"}) 
console.log("Input data request:"+ request_body);
axios.post(api, request_body)
.then((response) => {
    console.log(response);
    if(response["data"]["statusCode"]==200){
        var body = response["data"]["body"];
        var item = JSON.parse(JSON.stringify(body))["Item"]
        var f_name = item['first_name'], l_name = item['last_name'], mobile=item['mobile']
        document.getElementById('name').innerText ="Hi! "+f_name+" "+l_name;//+". Welcome to Chat support platform, ChatGPT is coming soon...";
    }else{
        window.alert("Something went wrong...\n Please try again later.");
        console.log(error);
    }

})
.catch((error) => {
    window.alert("Something went wrong...\n Please try again later.");
    console.log(error);
});
 