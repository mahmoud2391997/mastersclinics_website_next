import React from "react";
import Header from '../header/Header';

export default function Navbar(props) {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  return (
    <div className={className + " w-full absolute top-0 " +  props.nav ? null : "bg-transparent"} id='scrool'>
      <Header hclass={props.hclass} Logo={props.Logo} topbarClass={props.topbarClass} nav={props.nav}/>
    </div>
  );
}