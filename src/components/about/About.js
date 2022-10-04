import React from "react";
import useLanguages from "../../hooks/useLanguages";
import "./About.scss";

const About = () => {
	const { __ } = useLanguages();
  const [update, setUpdate] = React.useState();

  // Check for updates

  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/edirpedro/vnstat-dashboard/main/package.json"
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.length && json.version !== process.env.REACT_APP_VERSION)
          setUpdate(json.version);
      })
      .catch(console.error);
  });

  return (
    <>
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
    </>
  );
};

export default About;
