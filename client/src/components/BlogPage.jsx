import React, { useState } from "react";
import { useParams } from "react-router-dom";

function BlogPage(props) {

    const params = useParams();
    const { title } = params;

    const content = props.arrayOfBlog.map((blog) => {
        if (blog.title === title) {
            return blog.content;
        }

    })


    return (
        <div className="cardBodyBody">
            <div className="cardBodyy">
                <h3>{title}</h3>
                <em>{content}</em>
            </div>
        </div>
    );
}

export default BlogPage;