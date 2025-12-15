import { useEffect, useState } from "react";
import "@/components/loading.css";

const LoadingScreen = () => {
  
   const [secAnim, setSecAnim] = useState(false);
  const handleJumpAnimation = () => {
    setSecAnim(true);
  };
 

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000); // Adjust the duration as needed

  //   return () => clearTimeout(timer);
  // }, []);

  // if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 px-4 sm:px-6">
       <div className="dotwrapper text-center  max-w-full">
        <h1 className="relative  text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-snug font-bold">
          <span
            className={`inline-block bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent ${
              secAnim ? "move-left" : " "
            }`}
          >
            Gecian
          </span>
          {"  "}
          <span
            className={`inline-block bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent ${
              secAnim ? "move-right" : " "
            }`}
          >
            H
            <span className={`rect-i  ${secAnim ? "move-right-i" : ""}`}>
              <span
                className="dot-i"
                onAnimationEnd={handleJumpAnimation}
              ></span>
            </span>
            ub
          </span>
          <span className={`dot-2 ${secAnim? "bounce":" "}`}></span>
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
