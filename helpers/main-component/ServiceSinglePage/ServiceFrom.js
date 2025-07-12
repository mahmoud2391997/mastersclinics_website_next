import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        doctor: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({
        nameError: '',
        emailError: '',
        departmentError: '',
        doctorError: '',
        messageError: ''
    });

    const validateForm = () => {
        let isValid = true;
        const errors = {
            nameError: '',
            emailError: '',
            departmentError: '',
            doctorError: '',
            messageError: ''
        };

        if (formData.name.trim() === '') {
            errors.nameError = 'الرجاء إدخال الاسم';
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            errors.emailError = 'الرجاء إدخال بريد إلكتروني صحيح';
            isValid = false;
        }

        if (formData.department.trim() === '') {
            errors.departmentError = 'الرجاء اختيار القسم';
            isValid = false;
        }

        if (formData.doctor.trim() === '') {
            errors.doctorError = 'الرجاء اختيار الطبيب';
            isValid = false;
        }

        if (formData.message.trim() === '') {
            errors.messageError = 'الرجاء وصف المشكلة';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // Handle form submission logic here
            console.log('تم إرسال النموذج:', formData);
            // Reset form after submission if needed
            setFormData({
                name: '',
                email: '',
                department: '',
                doctor: '',
                message: ''
            });
        }
    };

    return (
        <form id="myForm" onSubmit={handleSubmit} dir="rtl">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12 form_item">
                    <label>الاسم الكامل</label>
                    <input
                        className="input-fild"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="الاسم"
                    />
                    <span className="error">{formErrors.nameError}</span>
                </div>
                <div className="col-lg-6 col-md-6 col-12 form_item">
                    <label>البريد الإلكتروني</label>
                    <input
                        className="input-fild"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="البريد الإلكتروني"
                    />
                    <span className="error">{formErrors.emailError}</span>
                </div>
                <div className="col-lg-6 col-md-6 col-12 form_item">
                    <label>اختر القسم</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="input-fild"
                    >
                        <option value="">القسم</option>
                        <option value="القسم 1">القسم 1</option>
                        <option value="القسم 2">القسم 2</option>
                        <option value="القسم 3">القسم 3</option>
                    </select>
                    <span className="error">{formErrors.departmentError}</span>
                </div>
                <div className="col-lg-6 col-md-6 col-12 form_item">
                    <label>اختر الطبيب</label>
                    <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleInputChange}
                        className="input-fild"
                    >
                        <option value="">اختر الطبيب</option>
                        <option value="الطبيب 1">الطبيب 1</option>
                        <option value="الطبيب 2">الطبيب 2</option>
                        <option value="الطبيب 3">الطبيب 3</option>
                    </select>
                    <span className="error">{formErrors.doctorError}</span>
                </div>
                <div className="col-12 form_item">
                    <label>صف مشكلتك بالتفصيل</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="input-fild"
                        placeholder="الرسالة..."
                    ></textarea>
                    <span className="error s2">{formErrors.messageError}</span>
                </div>
                <div className="col-12">
                    <input type="submit" className="theme-btn" value="إرسال الرسالة" />
                </div>
            </div>
        </form>
    );
};

export default ContactForm;