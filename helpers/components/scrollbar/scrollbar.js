import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FaArrowUp } from 'react-icons/fa'; // مثال على أيقونة سهم للأعلى

const Scrollbar = () => {
  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li >
            <AnchorLink href="#scrool" className="  justify-center items-center" style={{display:"flex !important"}}>
              <FaArrowUp style={{ color: "#fff !important", fontSize: "20px !important" }} />
            </AnchorLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scrollbar;
