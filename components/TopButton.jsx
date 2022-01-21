import React, { useState, useEffect} from "react";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const show = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
    window.addEventListener("scroll", show);
    // return (window.removeEventListener("scroll",show))
  }, []);

  const scrollToTop = () => {
    setShowButton(false)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-300 rounded-2xl w-16 h-16 z-10 opacity-60 transition-opacity
            hover:opacity-20">
          Top
        </button>
      )}
    </>
  );
};

export default TopButton;
