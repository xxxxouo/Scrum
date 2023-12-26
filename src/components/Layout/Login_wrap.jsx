import React from "react";
import styled from "styled-components";

const ImageBg = styled.div`
  background-image: url("https://img95.699pic.com/photo/40120/8848.gif_wh860.gif");
  background-size: 100% 100%;
  background-position: center;
  height: 100vh;
  object-fit: cover;
  background-repeat: no-repeat;
`;

function Login_wrap({ children }) {
  return (
    <ImageBg>
      <div className="backdrop-blur fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-200 border-solid p-4 py-10 rounded-lg shadow-sm">
        {children}
      </div>
    </ImageBg>
  );
}

export default Login_wrap;
