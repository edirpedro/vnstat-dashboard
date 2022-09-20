import React from "react";
import { AppContext } from "../../AppContext";
import "./About.css";

const About = ({ modalAbout }) => {
  const { __ } = React.useContext(AppContext);
  const [update, setUpdate] = React.useState();

  // Press ESC to close

  React.useEffect(() => {
    function escape(e) {
      if (e.key === "Escape") modalAbout(false);
    }
    document.addEventListener("keydown", escape, false);
    return () => document.removeEventListener("keydown", escape, false);
  });

  // Check for updates

  React.useEffect(() => {
    async function request() {
      try {
        const url =
          "https://raw.githubusercontent.com/edirpedro/vnstat-dashboard/main/package.json";
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) throw new Error();
        if (json.version !== process.env.REACT_APP_VERSION)
          setUpdate(json.version);
      } catch (e) {}
    }
    request();
  });

  return (
    <div className="about" onClick={() => modalAbout(false)}>
      <div className="about__overlap"></div>
      <div className="about__modal">
        <h1>vnStat Dashboard</h1>
        <dl>
          <dt>{__("Version")}:</dt>
          <dd>
            {process.env.REACT_APP_VERSION}
            {update && (
              <>
                <span> &mdash; {__("available")} </span>
                <a href="https://github.com/edirpedro/vnstat-dashboard/releases">
                  {update}
                </a>
              </>
            )}
          </dd>
          <dt>{__("Author")}:</dt>
          <dd>Edir Pedro</dd>
          <dt>Github:</dt>
          <dd>
            <a href="https://github.com/edirpedro/vnstat-dashboard">
              https://github.com/edirpedro/vnstat-dashboard
            </a>
          </dd>
          <dt>vnStat:</dt>
          <dd>
            <a href="https://humdi.net/vnstat/">https://humdi.net/vnstat/</a>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default About;
