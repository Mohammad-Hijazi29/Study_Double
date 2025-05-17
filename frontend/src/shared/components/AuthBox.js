// import React from "react";
// import { useLocation } from "react-router-dom";

// const AuthBox = ({ children }) => {
//   const location = useLocation();
//   const isLogin = location.pathname === "/login";

//   return (
//     <div className={`box-wrapper ${isLogin ? "login-bg" : "register-bg"}`}>
//       <div className="auth-box-container">
//         <div className="auth-box">
//           {children}
//         </div>
//         <div className="auth-image-box" />
//       </div>
//     </div>
//   );
// };

// export default AuthBox;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginPageHeader from "../../authPages/LoginPage/LoginPageHeader";

const AuthBox = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass(isLogin ? "slide-in-right" : "slide-in-left");

    const timer = setTimeout(() => {
      setAnimationClass("slide-enter");
    }, 20);

    return () => {
      setAnimationClass(isLogin ? "slide-exit-right" : "slide-exit-left");
      clearTimeout(timer);
    };
  }, [isLogin]);

  // const imageClass = isLogin ? "hero-image" : "virtual-image";

  return (
    <div className={`box-wrapper ${isLogin ? "login-bg" : "register-bg"}`}>
      <div className="auth-bg-overlay" />
      <div className="auth-box-container">
        {isLogin ? (
          <>
            <div className="auth-box">{children}</div>
            <div className={`auth-image-box ${animationClass} hero-image`}>
              <LoginPageHeader />
            </div>
          </>
        ) : (
          <>
            <div className={`auth-image-box ${animationClass} virtual-image`}>
            <p className="register-header" style={{ marginTop: '10px', textAlign: 'center' }}>Welcome!</p>
            <p className="register-subtext" style={{ textAlign: 'center' }}>Create an Account and Get Started.</p>
            </div>
            <div className="auth-box">{children}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthBox;
