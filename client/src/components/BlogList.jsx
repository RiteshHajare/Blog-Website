import React from 'react'

function BlogList(props) {
    return (
        <div>
            <h2 className='Allblogs'>All Blogs </h2>
            {props.allblogs}
        </div>
    )
}

export default BlogList;