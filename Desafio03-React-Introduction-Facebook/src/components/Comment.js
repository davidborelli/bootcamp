import React from "react";

function Comment(comment) {
  return (
    <div className="comment">
      <img src={comment.author.avatar} alt="" />
      <div className="comment-body">
        <p>
          <strong>{comment.author.name}</strong> {comment.content}
        </p>
      </div>
    </div>
  );
}

export default Comment;
