const showHiddenPass = () =>{
    const password_input = document.getElementById('pass'),
        pass_eye = document.getElementById('pass-eye');
      // Change password to text
      if(password_input.type === 'password'){
         // Switch to text
         password_input.type = 'text'

         // Icon change
         pass_eye.classList.add('ri-eye-line')
         pass_eye.classList.remove('ri-eye-off-line')
      } else{
         // Change to password
         password_input.type = 'password'

         // Icon change
         pass_eye.classList.remove('ri-eye-line')
         pass_eye.classList.add('ri-eye-off-line')
      }
}

const showconfHiddenPass = () =>{
    const conf_password_input = document.getElementById('conf-pass'),
        conf_pass_eye = document.getElementById('conf-pass-eye')

    // Change password to text
    if(conf_password_input.type === 'password'){
       // Switch to text
       conf_password_input.type = 'text'

       // Icon change
       conf_pass_eye.classList.add('ri-eye-line')
       conf_pass_eye.classList.remove('ri-eye-off-line')
    } else{
       // Change to password
       conf_password_input.type = 'password'

       // Icon change
       conf_pass_eye.classList.remove('ri-eye-line')
       conf_pass_eye.classList.add('ri-eye-off-line')
    }
}

const signup_btn = document.getElementById('signup_btn');

signup_btn.addEventListener('click', function(e){
    apicall();
  });

function apicall(){
    const email_input = document.getElementById('email').value,
    f_name_input = document.getElementById('f_name').value,
    l_name_input = document.getElementById('l_name').value,
    number_input = document.getElementById('number').value,
    password_input = document.getElementById('pass').value;
    
   const api = 'https://9zfkkhv47e.execute-api.ap-south-1.amazonaws.com/chatsupport/signup';
   const data = JSON.stringify({ "email" : email_input, 
                "password":password_input, "f_name":f_name_input, "l_name":l_name_input,
                "mobile":number_input });
   const request_body = JSON.stringify({"body": data, "httpMethod":"POST", "routeKey":"POST /signup"}) 
   console.log("Input data request:"+ request_body);
   axios
      .post(api, request_body)
      .then((response) => {
         console.log(response);
         if(response["data"]["statusCode"]==200){
            window.alert("Signup successful.");
            window.location.href="index.html";
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
const signup_btn = document.getElementById('signup_btn');

// ...and take over its submit event.
signup_btn.addEventListener("submit", function (event) {
    apicall();
    event.preventDefault(); // prevent form submission and reloading the page.
});
});