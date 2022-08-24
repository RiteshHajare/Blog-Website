import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



function Register(props) {

    const [passwordSame, setPasswordSame] = useState(true);

    const [regisform, setRegisform] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    function handleChange(event) {
        const { name, value } = event.target;
        setRegisform(function (prevform) {
            return {
                ...prevform, [name]: value
            }
        })
    }

    function submitbtnn(event) {

        if (regisform.password !== null) {
            if (regisform.password === regisform.confirmPassword) {
                axios.post("http://localhost:3500/register", regisform);
                setRegisform({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            } else {
                setPasswordSame(false)
            }
        }



    }
    return (
        <div className="registerBody">
            <section className="vh-100" style={{ backgroundColor: "#eee;" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name="name" onChange={handleChange} value={regisform.name} id="form3Example1c" className="form-control" placeholder="Your Name" />

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" name="email" onChange={handleChange} value={regisform.email} id="form3Example3c" className="form-control" placeholder="Your Email" />

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name="password" onChange={handleChange} value={regisform.password} id="form3Example4c" className="form-control" placeholder="Password" />

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name="confirmPassword" onChange={handleChange} value={regisform.confirmPassword} id="form3Example4cd" className="form-control" placeholder="Repeat your password" />

                                                    </div>
                                                </div>
                                                {!passwordSame ? <h6 className="recheckPass">please recheck password</h6> : null}
                                                <div className="removeSpace form-check d-flex justify-content-center mb-5">

                                                    <label className="form-check-label" for="form2Example3">
                                                        Already have account? <Link style={{ textDecoration: "none" }} to="/">Login here</Link>
                                                    </label>
                                                </div>


                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <Link to={(regisform.password !== "" && regisform.password === regisform.confirmPassword) ? "/" : "/register"} type="button" onClick={submitbtnn} className="btn btn-primary btn-lg">Register</Link>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default Register;