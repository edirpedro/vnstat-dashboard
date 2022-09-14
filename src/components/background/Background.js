import React from "react";
import { AppContext } from "../../AppContext";
import "./Background.css";

const Background = () => {
  const { theme } = React.useContext(AppContext);

  if (theme.video) {
    const extension = theme.video.split(".").pop();
    return (
      <video className="background video" autoPlay muted loop>
        <source
          src={process.env.PUBLIC_URL + theme.video}
          type={"video/" + extension}
        />
      </video>
    );
  }

  return <div className="background wallpaper"></div>;
};

export default Background;
