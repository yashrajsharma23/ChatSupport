const showHiddenPass = () =>{
   const input = document.getElementById('login_pass'),
         iconEye = document.getElementById('login-eye')

      if(input.type === 'password'){
         // Switch to text
         input.type = 'text'

         // Icon change
         iconEye.classList.add('ri-eye-line')
         iconEye.classList.remove('ri-eye-off-line')
      } else{
         // Change to password
         input.type = 'password'

         // Icon change
         iconEye.classList.remove('ri-eye-line')
         iconEye.classList.add('ri-eye-off-line')
      }
   // })
}

const login_btn = document.getElementById('login_btn');

login_btn.addEventListener('click', function(e){
   apicall();
  
 });

 function apicall(){
   const email_input = document.getElementById('email').value,
   password_input = document.getElementById('login_pass').value;
   
   const api = 'https://9zfkkhv47e.execute-api.ap-south-1.amazonaws.com/chatsupport/login';
   const data = JSON.stringify({ "email" : email_input, "password":password_input });
   const request_body = JSON.stringify({"body": data, "httpMethod":"POST", "routeKey":"POST /login"}) 
   console.log("Input data request:"+ request_body);
   axios
      .post(api, request_body)
      .then((response) => {
         console.log(response);
         // parsed = JSON.parse(response)
         if(response["data"]["statusCode"]==200){
            window.alert("Login successful.");
            msg = JSON.parse(response["data"]["body"])
            msg = JSON.parse(JSON.stringify(msg['user']));
            window.location.href="dashboard.html?user="+msg['email'];
         }else if(response["data"]["statusCode"]==401){
            var msg = response["data"]["body"];
            msg = JSON.parse(msg)
            window.alert(msg['message']);
         }else{
            window.alert("Something went wrong...\n Please try again later.");
            console.log(error);
         }

      })
      .catch((error) => {
         window.alert("Something went wrong...\n Please try again later.");
         console.log(error);
      });
 }

 window.addEventListener("load", function () {
   //not jquery!
   // Access the form element...
   const login_btn = document.getElementById('login_btn');
   
   // ...and take over its submit event.
   login_btn.addEventListener("submit", function (event) {
      apicall();

       event.preventDefault(); // prevent form submission and reloading the page.
       //your code to validate or do what you need with the form.
   });
});
