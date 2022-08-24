import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { Link } from "react-router-dom";


function CreateText(props) {
    const location = useLocation()
    const { data } = location.state;

    useEffect(() => {
        props.urlName(data[0].username)
        console.log(data);

    }, []);


    const [blog, setBlog] = useState({
        title: "",
        content: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setBlog((prevBlog) => {
            return {
                ...prevBlog, [name]: value
            }
        })

    }
    function submitBtn(event) {
        props.onAdd(blog);
        axios.post(`http://localhost:3500/blog/ ${data[0].username}`, blog);
        axios.post("http://localhost:3500/blog", blog);

        setBlog({
            title: "",
            content: ""
        })
        event.preventDefault();
    }


    return (
        <div className="createTextDiv">
            <div className="createTextDivv">
                <h5 className="dynName">Hello {data[0].name} </h5>
            </div>
            <form >
                <div className="form-group ">

                    <input type="text"
                        name="title"
                        onChange={handleChange}
                        value={blog.title}
                        className="form-control titleText"
                        id="titleText"
                        aria-describedby="emailHelp"
                        placeholder="Title..." />
                </div>
                <div className="form-group">

                    <textarea type="text"
                        name="content"
                        onChange={handleChange}
                        value={blog.content}
                        className="form-control contentText"
                        id="contentText"
                        placeholder="Content..."
                        cols="13"
                        rows="4" />
                </div>

                <button onClick={submitBtn} className="btn btn-primary contentbtn">Submit</button>
            </form>
            <Link to="/bloglist" type="button" class="btn btn-info btn-lg bloglistBtn">All Blogs</Link>
            <h4 className="Userblogs">Your Blogs</h4>
        </div>
    );
}



export default CreateText;