/*=============== SHOW HIDDEN - PASSWORD ===============*/
// import dynamic from 'next/dynamic'

// const DynamicComponentWithNoSSR = dynamic(() => import('../components/List'), {
//   ssr: false
// })

// export default () => DynamicComponentWithNoSSR

// if(typeof window == 'object'){
//    console.log('Code is running in Browser')
// }else{
//    console.log('Code is NOT running in Browser')
//    window.addEventListener('load', showHiddenPass('login-pass','login-eye'), false);
// }

// "start": "node D:/Applications/animated-login-form-main/animated-login-form-main/assets/js/main.js"

const showHiddenPass = () =>{//(loginPass, loginEye) =>{
   const input = document.getElementById('login-pass'),//loginPass),
         iconEye = document.getElementById('login-eye')//loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
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
   })
}

// showHiddenPass('login-pass','login-eye')