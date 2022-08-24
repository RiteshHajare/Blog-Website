import React, { useState } from "react";
import { Link } from "react-router-dom";

function BlogCardType(props) {


    return (
        <div className="cardBodyBody">
            <Link to={"/blog/" + props.title} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <div className="cardBodyy">
                    <h3>{props.title}</h3>
                    <em>{props.content}</em>
                </div>
            </Link>

        </div>
    );
}

export default BlogCardType;