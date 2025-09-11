"use client";

import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

// API call
const makeInquiry = async (data) => {
  const response = await axios.post(
    `https://www.ss.mastersclinics.com/api/inquiries`,
    data
  );
  return response.data;
};

const ContactForm = () => {
  const [forms, setForms] = useState({
    name: "",
    phone: "",
    question: "",
  });

  // We'll use this only when necessary for re-rendering
  const [, forceUpdate] = useState();

  const [validator] = useState(
    new SimpleReactValidator({
      className: "errorMessage",
      messages: {
        required: "هذا الحقل مطلوب",
        numeric: "يجب أن يحتوي على أرقام فقط",
        min: "الحد الأدنى للأحرف هو :min",
        max: "الحد الأقصى للأحرف هو :max",
      },
      validators: {
        arabic_alpha_space: {
          message: "الاسم يجب أن يحتوي على حروف عربية ومسافات فقط",
          rule: (val) => /^[\u0600-\u06FF\s]+$/.test(val),
          required: true,
        },
      },
    })
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForms({ ...forms, [name]: value });
    // Validate on change
    if (validator.fieldValid(name)) {
      validator.hideMessage(name);
    } else {
      validator.showMessageFor(name);
    }
    forceUpdate({});
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      validator.hideMessages();
      setIsSubmitting(true);

      try {
        const submissionData = {
          name: forms.name,
          phone: forms.phone,
          question: forms.question,
          createdAt: new Date().toISOString(),
        };

        await makeInquiry(submissionData);

        toast.success("تم إرسال استفسارك بنجاح! سنتواصل معك قريباً.");

        // Reset form fields
        setForms({ name: "", phone: "", question: "" });

        // Hide any remaining messages
        validator.hideMessages();

        // 🔥 Critical: Purge internal field tracking to prevent reappearance
        validator.purgeFields();

        // Force re-render to ensure UI is clean
        forceUpdate({});
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      validator.showMessages();
      forceUpdate({});
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={submitHandler} className="contact-validation-active" dir="rtl">
        <div className="row">
          {/* Name */}
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <input
                value={forms.name}
                type="text"
                name="name"
                onChange={changeHandler}
                placeholder="اسمك"
                style={{
                  paddingRight: "10px",
                  direction: "rtl",
                  textAlign: "right",
                }}
                disabled={isSubmitting}
              />
              {validator.message("name", forms.name, "required|arabic_alpha_space")}
            </div>
          </div>

          {/* Phone */}
          <div className="col col-lg-6 col-12">
            <div className="form-field">
              <input
                value={forms.phone}
                type="tel"
                name="phone"
                onChange={changeHandler}
                placeholder="رقم هاتفك"
                style={{
                  paddingRight: "10px",
                  direction: "ltr", // Keep LTR for phone numbers
                  textAlign: "right",
                }}
                disabled={isSubmitting}
              />
              {validator.message("phone", forms.phone, "required|numeric|min:6|max:15")}
            </div>
          </div>

          {/* Question */}
          <div className="col col-12 mt-3">
            <div className="form-field">
              <textarea
                value={forms.question}
                name="question"
                onChange={changeHandler}
                placeholder="اكتب سؤالك هنا"
                rows={5}
                style={{
                  paddingRight: "10px",
                  direction: "rtl",
                  textAlign: "right",
                }}
                disabled={isSubmitting}
              />
              {validator.message("question", forms.question, "required|min:10")}
            </div>
          </div>
        </div>

        <div className="submit-area mt-4">
          <button type="submit" className="theme-btn" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال..." : "إرسال الاستفسار"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;