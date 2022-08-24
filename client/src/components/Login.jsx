import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";


function Login() {

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const [regData, setRegData] = useState("")
    const [returnedObj, setReturnedObj] = useState("")



    function handleChange(event) {

        const returnedObjj = regData.filter(function (oneData) {
            return (oneData.username === loginForm.username);
        })

        setReturnedObj(returnedObjj)

        const { name, value } = event.target;
        setLoginForm((prevForm) => {
            return {
                ...prevForm, [name]: value
            }
        })


    }

    useEffect(() => {
        axios
            .get("http://localhost:3500/", {
                responseType: "json",
            })
            .then(function (response) {
                setRegData(response.data)

            });


    })


    function handleClick() {


        axios.post("http://localhost:3500/", loginForm)
            .then(res => {
                console.log(res.data);

            })
        setLoginForm({
            username: "",
            password: ""
        })
    }

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div className="form-outline mb-4">
                                <input type="email" onChange={handleChange} name="username" value={loginForm.username} id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter Email address" />

                            </div>


                            <div className="form-outline mb-3">
                                <input type="password" onChange={handleChange} name="password" value={loginForm.password} id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" />

                            </div>



                            <div className="text-center text-lg-start mt-4 pt-2">
                                <Link to={returnedObj.length != 0 ? "/blog" : "/"} state={returnedObj.length === 1 && { data: returnedObj }} type="button" onClick={handleClick} className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: " 2.5rem", paddingRight: "2.5rem" }}>Login</Link>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                                    className="link-danger">Register</Link></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div
                className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
            </div>
        </section>
    );
}


export default Login;