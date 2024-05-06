import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

const Post = () => {
  const complete = (data) => {
    window.opener.getAddr(data);
    window.close();
  }
  return (
    <div>
      <DaumPostcodeEmbed
        className='postpage'
        autoClose
        onComplete={complete}
      />
    </div>
  );
};

export default Post;
