/* eslint-disable eqeqeq */
import React from 'react';

const Commentaire = ({ comment, post }) => {
    return (
        <div>
            {comment.postId == post.id ? (<div className='post-comment'>{comment.commentBody}</div>):(<div></div>)}
        </div>
    );
};

export default Commentaire;