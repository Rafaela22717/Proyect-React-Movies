import React from 'react';
import axios from "axios";
import sweetAlert from '@sweetalert/with-react';//importo libreria de alert
import { useHistory, Redirect } from "react-router-dom";




function Login() {
          
   
  const history = useHistory();


  const submitHandler= e=> {
    e.preventDefault();//evita que la pagina se refresque
    const email= e.target.email.value;//captura los valores de los campos
    const password= e.target.password.value;
  
    const regexEmail = /^\w+([-]?\w+)*@\w+([.-]?\w+)*(\w{2,3})+$/;//expresion regular/valido si el email tiene formato de email
   //testeo si lo que escribo tiene formato de email
    console.log(regexEmail.test(email)); 
    //valido q los campos no esten vacios:
    if(email===""|| password==="") {
        sweetAlert(

            <h2>Los campos no pueden estar vacios</h2>
        )
        return;
    }
    //validacion de formato de email valido
    if(email!=="" && !regexEmail.test(email)) {
        sweetAlert(
            <h2>Escribi una contraseña valida</h2>
        )
       return;
    }
    //validacion de la info q se puso//si es lo q yo estoy esperando
    if(email !== "challenge@alkemy.org" || password !== "react") {
        sweetAlert(
            <h2>Las credenciales son invalidas</h2>
        )
        return;
    }
   
    //envio la informacion(email y password):
    axios.post("http://challenge-react.alkemy.org",{ email, password })//dentro del post va la url del endpoint de la api que me voy a conectar y en formato de objeto los datos q la api espera
   //es una peticion asyncrona basada en promesas//toda promesa, promete devolvernos algo cuando la promesa se resuelve ahi podemos hacer algo con esa informacion
   .then(res=> { //capturo la respuesta (promesa resuelta)con.then,uso axios la info -respuesta viene en data
    sweetAlert(
        <h2>Ingresaste correctamente</h2>
    )
       console.log(res.data);
       const tokenRecibido = res.data.token; 
       //guardo el token en el local storage(almacenam local)
       localStorage.setItem("token", tokenRecibido)
       history.push("/listado");
   })
}
let token= localStorage.getItem("token")

    return (
        <>
        {token && <Redirect to="/listado"/>}
           <h2>Formulario de login</h2>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Correo electronico</span> <br/>
                    <input type="text" name="email" />
                 </label>
               <br/>
               <br/>
                <label>
                    <span>Contraseña</span> <br/>
                    <input type="password" name="password"/>
                 </label>
                <br/>
                <br/>
               <button type="submit">Ingresar</button>
               </form>

          </>

)

}





export default Login;