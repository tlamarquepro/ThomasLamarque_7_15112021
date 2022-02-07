import React from 'react';

const Commentaire = ({ comment, post }) => {
    return (
        <div>
            {comment.postId == post.id ? (<div className='comment-body'>{comment.commentBody}</div>):(<div></div>)}
        </div>
    );
};

export default Commentaire;