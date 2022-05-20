import React from 'react';
import axios from "axios";
import sweetAlert from '@sweetalert/with-react';//importo libreria de alert
import { useHistory, Redirect } from "react-router-dom";




function Login() {


    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();//evita que la pagina se refresque
        const email = e.target.email.value;//captura los valores de los campos
        const password = e.target.password.value;

        const regexEmail = /^\w+([-]?\w+)*@\w+([.-]?\w+)*(\w{2,3})+$/;//expresion regular/valido si el email tiene formato de email
        //testeo si lo que escribo tiene formato de email
        console.log(regexEmail.test(email));
        //valido q los campos no esten vacios:
        if (email === "" || password === "") {
            sweetAlert({
                title: "Fill in the fields",
                icon: "error",
                button: false,
                className: "sweet",
                timer: 2500,
            });
            return;
        }
        //validacion de formato de email valido
        if (email !== "" && !regexEmail.test(email)) {
            sweetAlert({
                title: "Write valid email",
                icon: "error",
                button: false,
                className: "sweet",
                timer: 2500,
            });
            return;
        }
        //validacion de la info q se puso//si es lo q yo estoy esperando
        if (email !== "challenge@alkemy.org" || password !== "react") {
            sweetAlert({
                title: "Invalid credentials",
                icon: "error",
                button: false,
                className: "sweet",
                timer: 2500
            });
            return;
        }

        //envio la informacion(email y password):
        axios.post("http://challenge-react.alkemy.org", { email, password })//dentro del post va la url del endpoint de la api que me voy a conectar y en formato de objeto los datos q la api espera
            //es una peticion asyncrona basada en promesas//toda promesa, promete devolvernos algo cuando la promesa se resuelve ahi podemos hacer algo con esa informacion
            .then(res => { //capturo la respuesta (promesa resuelta)con.then,uso axios la info -respuesta viene en data
                sweetAlert({
                    title: "Correct data",
                    icon: "success",
                    button: false,
                    className: "sweet",
                    timer: 2500
                });
                console.log(res.data);
                const tokenRecibido = res.data.token;
                //guardo el token en el local storage(almacenam local)
                sessionStorage.setItem("token", tokenRecibido)
                history.push("/listado");
            })
    }
    let token = sessionStorage.getItem("token")

    return (
        <>
            {token && <Redirect to="/listado" />}
            <div className='col-6 offset-3'>

                <form onSubmit={submitHandler}>
                    <label className='form-label d-block mt-2 labelOne labelOne'>
                        <span className="colorDetalle">Email</span> <br />
                        <input className='form-control' type="text" name="email" />
                    </label>
                    <label className='form-label d-block mt-2 labelOne'>
                        <span className="colorDetalle">Password</span> <br />
                        <input type="password" name="password" className='form-control' />
                    </label>
                    <button className='button' type="submit">Enter</button>
                </form>
            </div>
        </>
    )
}





export default Login;