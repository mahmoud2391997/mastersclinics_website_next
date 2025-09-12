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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Custom validation functions
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "هذا الحقل مطلوب";
        } else if (!/^[\u0600-\u06FF\s]+$/.test(value)) {
          error = "الاسم يجب أن يحتوي على حروف عربية ومسافات فقط";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "هذا الحقل مطلوب";
        } else if (!/^\d+$/.test(value)) {
          error = "يجب أن يحتوي على أرقام فقط";
        } else if (value.length < 6) {
          error = "الحد الأدنى للأرقام هو 6";
        } else if (value.length > 15) {
          error = "الحد الأقصى للأرقام هو 15";
        }
        break;
      case "question":
        if (!value.trim()) {
          error = "هذا الحقل مطلوب";
        } else if (value.length < 10) {
          error = "الحد الأدنى للأحرف هو 10";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(forms).forEach(key => {
      const error = validateField(key, forms[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForms({ ...forms, [name]: value });
    
    // Validate field if it's been touched before
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const blurHandler = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, forms[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(forms).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate all fields
    if (validateForm()) {
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

        // Reset form fields and errors
        setForms({ name: "", phone: "", question: "" });
        setErrors({});
        setTouched({});
        
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
        );
      } finally {
        setIsSubmitting(false);
      }
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
                onBlur={blurHandler}
                placeholder="اسمك"
                style={{
                  paddingRight: "10px",
                  direction: "rtl",
                  textAlign: "right",
                }}
                disabled={isSubmitting}
              />
              {errors.name && <div className="errorMessage">{errors.name}</div>}
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
                onBlur={blurHandler}
                placeholder="رقم هاتفك"
                style={{
                  paddingRight: "10px",
                  direction: "ltr",
                  textAlign: "right",
                }}
                disabled={isSubmitting}
              />
              {errors.phone && <div className="errorMessage">{errors.phone}</div>}
            </div>
          </div>

          {/* Question */}
          <div className="col col-12 mt-3">
            <div className="form-field">
              <textarea
                value={forms.question}
                name="question"
                onChange={changeHandler}
                onBlur={blurHandler}
                placeholder="اكتب سؤالك هنا"
                rows={5}
                style={{
                  paddingRight: "10px",
                  direction: "rtl",
                  textAlign: "right",
                }}
                disabled={isSubmitting}
              />
              {errors.question && <div className="errorMessage">{errors.question}</div>}
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