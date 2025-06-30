import React, { Fragment, useState } from "react";
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import CalculateShipping from "./CalculateShipping";
import Footer from '../../components/footer/Footer';
import Link from 'next/link';
import { connect } from "react-redux";
import { totalPrice } from "../../utils";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/actions/action";
import logo from '../../images/logo-2.svg';

const CartPage = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { carts } = props;

  const [shippingMethod, setShippingMethod] = useState('Free');


  const handleShippingChange = (e) => {
    setShippingMethod(e.target.id);
  };

  return (
    <Fragment>
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} Logo={logo} />
      <PageTitle pageTitle={"Cart"} pagesub={"Cart"} />
      <div className="cart-area-s2 section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="single-page-title">
                <h2>Your Cart</h2>
                <p>There are {carts.length} products in this list</p>
              </div>
            </div>
          </div>
          <div className="cart-wrapper">
            <div className="row">
              <div className="col-lg-8 col-12">
                <form action="#">
                  <div className="cart-item">
                    <table className="table-responsive cart-wrap">
                      <thead>
                        <tr>
                          <th className="images images-b">Product</th>
                          <th className="ptice">Price</th>
                          <th className="stock">Quantity</th>
                          <th className="ptice total">Subtotal</th>
                          <th className="remove remove-b">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts.map((catItem, index) => (
                          <tr className="wishlist-item" key={index}>
                            <td className="product-item-wish">
                              <div className="check-box"><input type="checkbox"
                                className="myproject-checkbox" />
                              </div>
                              <div className="images">
                                <span>
                                  <img src={catItem.proImg} alt="" />
                                </span>
                              </div>
                              <div className="product">
                                <ul>
                                  <li className="first-cart">{catItem.title}</li>
                                  <li>
                                    <div className="rating-product">
                                      <i className="fi flaticon-star"></i>
                                      <i className="fi flaticon-star"></i>
                                      <i className="fi flaticon-star"></i>
                                      <i className="fi flaticon-star"></i>
                                      <i className="fi flaticon-star"></i>
                                      <span>130</span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </td>
                            <td className="ptice">${catItem.price}</td>
                            <td className="td-quantity">
                              <div className="quantity cart-plus-minus">
                                <input className="text-value" type="text" value={catItem.qty} onChange={(e) => handleQuantityChange(e, catItem.id)} />
                                <div className="dec qtybutton" onClick={() => props.decrementQuantity(catItem.id)}>-</div>
                                <div className="inc qtybutton" onClick={() => props.incrementQuantity(catItem.id)}>+</div>
                              </div>
                            </td>
                            <td className="ptice">${catItem.qty * catItem.price}</td>
                            <td className="action">
                              <ul>
                                <li className="w-btn" onClick={() => props.removeFromCart(catItem.id)}><i
                                  className="fi ti-trash"></i></li>
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-action">
                    <div className="apply-area">
                      <input type="text" className="form-control" placeholder="Enter your coupon" />
                      <button className="theme-btn-s2" type="submit">Apply</button>
                    </div>
                   <button className="theme-btn-s2" type="button" onClick={ClickHandler}>
  Update Cart
</button>
                  </div>
                </form>
              </div>
              <div className="col-lg-4 col-12">
                <div className="cart-total-wrap">
                  <h3>Cart Totals</h3>
                  <div className="sub-total">
                    <h4>Subtotal</h4>
                    <span>${totalPrice(carts)}</span>
                  </div>
                  <div className="shipping-option">
                    <span>Shipping</span>
                    <ul>
                      <li className="free">
                        <input id="Free" type="radio" name="shipping" value="0" checked={shippingMethod === 'Free'} onChange={handleShippingChange} />
                        <label htmlFor="Free">Free Shipping</label>
                      </li>
                      <li className="free">
                        <input id="Local" type="radio" name="shipping" value="10" checked={shippingMethod === 'Local'} onChange={handleShippingChange} />
                        <label htmlFor="Local">Local Pickup: <span>$10.00</span></label>
                      </li>
                      <li className="free">
                        <span>Shipping options will be updated during checkout.</span>
                      </li>
                    </ul>
                  </div>
                  <CalculateShipping />
                  <div className="total">
                    <h4>Total</h4>
                    <span>${totalPrice(carts) + (shippingMethod === 'Local' ? 10 : 0)}</span>
                  </div>
                  <Link className="theme-btn-s2" href="/checkout">Proceed To Checkout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer hclass={'wpo-site-footer_s2'} />
      <Scrollbar />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};
export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartPage);
