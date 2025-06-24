import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const ContactForm = () => {

    const [forms, setForms] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    });

    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage',
        messages: {
            required: 'هذا الحقل مطلوب',
            email: 'البريد الإلكتروني غير صالح',
            alpha_space: 'الاسم يجب أن يحتوي على حروف ومسافات فقط',
            phone: 'رقم الهاتف غير صالح',
        }
    }));

    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value });
        if (validator.allValid()) {
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    const submitHandler = e => {
        e.preventDefault();
        if (validator.allValid()) {
            validator.hideMessages();
            setForms({
                name: '',
                email: '',
                subject: '',
                phone: '',
                message: ''
            });
        } else {
            validator.showMessages();
        }
    };

    return (
        <form
            onSubmit={(e) => submitHandler(e)}
            className="contact-validation-active"
            style={{ direction: 'rtl', textAlign: 'right' }}
        >
            <div className="row">
                <div className="col col-lg-6 col-12">
                    <div className="form-field">
                        <input
                            value={forms.name}
                            type="text"
                            name="name"
                            onBlur={changeHandler}
                            onChange={changeHandler}
                            placeholder="الاسم الكامل" />
                        {validator.message('name', forms.name, 'required|alpha_space')}
                    </div>
                </div>
                <div className="col col-lg-6 col-12">
                    <div className="form-field">
                        <input
                            value={forms.email}
                            type="email"
                            name="email"
                            onBlur={changeHandler}
                            onChange={changeHandler}
                            placeholder="البريد الإلكتروني" />
                        {validator.message('email', forms.email, 'required|email')}
                    </div>
                </div>
                <div className="col col-lg-6 col-12">
                    <div className="form-field">
                        <input
                            value={forms.phone}
                            type="tel"
                            name="phone"
                            onBlur={changeHandler}
                            onChange={changeHandler}
                            placeholder="رقم الهاتف" />
                        {validator.message('phone', forms.phone, 'required|phone')}
                    </div>
                </div>
                <div className="col col-lg-6 col-12">
                    <div className="form-field">
                        <select
                            onBlur={changeHandler}
                            onChange={changeHandler}
                            value={forms.subject}
                            name="subject">
                            <option value="">اختر الخدمة</option>
                            <option>الخدمات</option>
                            <option>رعاية الأسنان</option>
                            <option>علم الأدوية</option>
                            <option>جراحة العظام</option>
                            <option>أمراض النساء</option>
                            <option>التأهيل</option>
                            <option>جراحة القلب</option>
                        </select>
                        {validator.message('subject', forms.subject, 'required')}
                    </div>
                </div>
                <div className="col col-lg-12 col-12">
                    <textarea
                        onBlur={changeHandler}
                        onChange={changeHandler}
                        value={forms.message}
                        name="message"
                        placeholder="رسالتك">
                    </textarea>
                    {validator.message('message', forms.message, 'required')}
                </div>
            </div>
            <div className="submit-area">
                <button type="submit" className="theme-btn">إرسال</button>
            </div>
        </form>
    );
};

export default ContactForm;
