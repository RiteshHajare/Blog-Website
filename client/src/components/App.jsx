import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import CreateText from "./CreateText";
import BlogCardType from "./BlogCardType";
import BlogPage from "./BlogPage"
import ErrorPg from "./ErrorPg"
import Register from "./Register"
import Login from "./Login"
import BlogList from "./BlogList"



function App() {
  const [blogArray, setBlogArray] = useState([])
  const [name, setName] = useState("")
  const [userBlogArray, setUserBlogArray] = useState([])



  function addBlog(blog) {
    setBlogArray((prevArray) => {
      return [
        ...prevArray, blog
      ]
    })
  }

  useEffect(() => {

    axios
      .get("http://localhost:3500/blog", {
        responseType: "json",
      })
      .then(function (response) {
        setBlogArray(response.data)

      });

  });
  useEffect(() => {

    axios
      .get(`http://localhost:3500/blog/${name}`, {
        responseType: "json",
      })
      .then(function (response) {
        setUserBlogArray(response.data)

      });

  });

  function urlname(name) {
    setName(name)
  }


  function blogCard(blogArrayItem) {
    const contentSubStr = blogArrayItem.content.substring(0, 100);
    return <BlogCardType
      title={blogArrayItem.title}
      content={
        contentSubStr.length === 100 ?
          contentSubStr + " ..." :
          contentSubStr}

    />
  }
  function userBlogCard(userBlogArrayItem) {
    const contentSubStrr = userBlogArrayItem.content.substring(0, 100);
    if (typeof userBlogArray.title === 'undefined') {

    } else {
      if (userBlogArray.title.includes(userBlogArrayItem.title)) {

        return <BlogCardType
          title={userBlogArrayItem.title}
          content={contentSubStrr.length === 100 ?
            contentSubStrr + " ..." :
            contentSubStrr}

        />
      }

    }

  }




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<Header />, <Login />]} />
        <Route path="/blog" element={[<Header />, <CreateText urlName={urlname} onAdd={addBlog} />, blogArray.map(userBlogCard)]} />
        <Route path="/blog/:title" element={[<Header />, <BlogPage arrayOfBlog={blogArray} />]} />
        <Route path="/register" element={[<Header />, <Register />]} />
        <Route path="/bloglist" element={[<Header />, <BlogList allblogs={blogArray.map(blogCard)} />]} />
        <Route path="*" element={<ErrorPg />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;