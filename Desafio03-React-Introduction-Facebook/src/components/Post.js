import React from "react";

import Comment from "./Comment";

function Post({ author, date, content, comments }) {
  return (
    <div className="post">
      <div className="post-header">
        <img className="avatar" src={author.avatar} alt="" />
        <ul className="details">
          <li>
            <strong>{author.name}</strong>
          </li>
          <li>
            <span>{date}</span>
          </li>
        </ul>
      </div>
      <div className="post-body">
        <p>{content}</p>
      </div>
      <div className="divisor"></div>

      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}

export default Post;
