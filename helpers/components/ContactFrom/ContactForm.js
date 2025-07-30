"use client";

import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useRouter } from 'next/router';
import axios from 'axios';

const makeAppointment = async (data) => {
  const response = await axios.post(`https://www.ss.mastersclinics.com/appointments`, data);
  return response.data;
};

const ContactForm = () => {
    const router = useRouter();
    const [forms, setForms] = useState({
        name: '',
        phone: '',
    });

    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage',
    }));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const changeHandler = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value });
        validator.showMessageFor(e.target.name);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (validator.allValid()) {
            validator.hideMessages();
            setIsSubmitting(true);
            setSubmitStatus("idle");
            setErrorMessage("");

            try {
                const submissionData = {
                    name: forms.name,
                    phone: forms.phone,
                    createdAt: new Date().toISOString(),
                };

                await makeAppointment(submissionData);
                setSubmitStatus("success");

                setTimeout(() => {
                    router.push("/thankyou");
                }, 1500);

                setForms({ name: '', phone: '' });
            } catch (error) {
                setSubmitStatus("error");
                setErrorMessage(error?.response?.data?.message || "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            validator.showMessages();
        }
    };

    return (
        <form onSubmit={submitHandler} className="contact-validation-active" dir="rtl">
            <div className="row">
                <div className="col col-lg-6 col-12">
                    <div className="form-field">
                        <input
                            value={forms.name}
                            type="text"
                            name="name"
                            onBlur={changeHandler}
                            onChange={changeHandler}
                            placeholder="اسمك"
                            style={{ paddingRight: '10px' }}
                            disabled={isSubmitting}
                        />
                        {validator.message('name', forms.name, 'required|alpha_space')}
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
                            placeholder="رقم هاتفك"
                            style={{ paddingRight: '10px' }}
                            disabled={isSubmitting}
                        />
                        {validator.message('phone', forms.phone, 'required|numeric|min:6|max:15')}
                    </div>
                </div>
            </div>

            <div className="submit-area mt-4">
                <button 
                    type="submit" 
                    className="theme-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                            جاري الإرسال...
                        </div>
                    ) : submitStatus === "success" ? (
                        <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            تم الإرسال بنجاح!
                        </div>
                    ) : submitStatus === "error" ? (
                        <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            حدث خطأ، حاول مرة أخرى
                        </div>
                    ) : (
                        "تواصل معنا"
                    )}
                </button>
            </div>

            {submitStatus === "success" && (
                <div className="mt-4 p-3 md:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center text-sm md:text-base">
                    تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
                </div>
            )}

            {submitStatus === "error" && (
                <div className="mt-4 p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm md:text-base">
                    {errorMessage}
                </div>
            )}
        </form>
    );
};

export default ContactForm;