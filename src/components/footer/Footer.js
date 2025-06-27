import React from 'react'
import Link from 'next/link'
import logo from '../../images/logo.svg'

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Footer = (props) => {
    return (
        <footer className={"" + props.hclass}>
            <div className="wpo-upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <img src={logo} alt="blog" />
                                </div>
                                <p>Mattis inelit neque quis donec eleifnd amet. Amet sed et cursus eu euismod.
                                    Egestas
                                    in morbi tristique.</p>
                                <div className="social-widget">
                                    <ul>
                                        <li>
                                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-facebook-app-symbol"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-linkedin"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>Quick Links</h3>
                                </div>
                                <ul>
                                    <li><Link href="/home" onClick={ClickHandler}>Home</Link></li>
                                    <li><Link href="/about" onClick={ClickHandler}>About Us</Link></li>
                                    <li><Link href="/services" onClick={ClickHandler}>Services</Link></li>
                                    <li><Link href="/blog" onClick={ClickHandler}>Latest News</Link></li>
                                    <li><Link href="/doctor" onClick={ClickHandler}>Team</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget s2">
                                <div className="widget-title">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><Link href="/project" onClick={ClickHandler}>Projects</Link></li>
                                    <li><Link href="/shop" onClick={ClickHandler}>Shop</Link></li>
                                    <li><Link href="/cart" onClick={ClickHandler}>Cart</Link></li>
                                    <li><Link href="/contact" onClick={ClickHandler}>Contact us</Link></li>
                                    <li><Link href="/faq" onClick={ClickHandler}>Faq</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget contact-widget">
                                <div className="widget-title">
                                    <h3>Contact Us</h3>
                                </div>
                                <ul>
                                    <li><i className="flaticon-email"></i><span>medically@gmail.com</span>
                                    </li>
                                    <li> <i className="flaticon-telephone"></i><span>(704) 555-0127
                                        <br />(208) 555-0112</span></li>
                                    <li><i className="flaticon-location-1"></i><span>4517 Washington Ave. <br />
                                        Manchter, Kentucky 495</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row g-0">
                        <div className="col col-lg-6 col-12">
                            <p className="copyright"> Copyright &copy; 2024 Medically by <Link href="/" onClick={ClickHandler}>wpOceans</Link>.
                                All
                                Rights Reserved.</p>
                        </div>
                        <div className="col col-lg-6 col-12">
                            <ul>
                                <li><Link href="/privace" onClick={ClickHandler}>Privace & Policy</Link></li>
                                <li><Link href="/terms" onClick={ClickHandler}>Terms</Link></li>
                                <li><Link href="/about" onClick={ClickHandler}>About us</Link></li>
                                <li><Link href="/faq" onClick={ClickHandler}>FAQ</Link></li>
                            </ul>
                            </div> </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;