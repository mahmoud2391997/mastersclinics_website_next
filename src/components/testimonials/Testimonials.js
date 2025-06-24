const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'أحمد السعيد',
            location: 'الرياض',
            rating: 5,
            comment: 'تجربة رائعة مع العيادات المتخصصة. الأطباء محترفون والخدمة ممتازة. أنصح الجميع بالتعامل معهم.',
            image: '/images/testimonials/patient1.jpg',
            treatment: 'علاج أمراض القلب'
        },
        {
            id: 2,
            name: 'فاطمة محمد',
            location: 'جدة',
            rating: 5,
            comment: 'الدكتورة فاطمة العلي رائعة جداً. اهتمت بحالتي بشكل مميز وقدمت لي أفضل رعاية طبية.',
            image: '/images/testimonials/patient2.jpg',
            treatment: 'النساء والولادة'
        },
        {
            id: 3,
            name: 'محمد الأحمد',
            location: 'الدمام',
            rating: 5,
            comment: 'عملية جراحة العظام تمت بنجاح تام. الفريق الطبي محترف والمتابعة ممتازة.',
            image: '/images/testimonials/patient3.jpg',
            treatment: 'جراحة العظام'
        },
        {
            id: 4,
            name: 'سارة الزهراني',
            location: 'مكة المكرمة',
            rating: 5,
            comment: 'أطفالي يحبون الدكتورة سارة. تتعامل معهم بحب وصبر وتقدم أفضل رعاية طبية.',
            image: '/images/testimonials/patient4.jpg',
            treatment: 'طب الأطفال'
        }
    ];

    return (
        <section className="testimonials-section section-padding" dir="rtl">
            <div className="container">
                <div className="section-title text-center">
                    <span className="subtitle">آراء المرضى</span>
                    <h2>ماذا يقول مرضانا عنا</h2>
                    <p>نفتخر بثقة مرضانا وآرائهم الإيجابية حول خدماتنا الطبية</p>
                </div>
                <div className="testimonials-container">
                    <div className="testimonials-grid">
                        {testimonials.map(testimonial => (
                            <div className="testimonial_card" key={testimonial.id}>
                                <div className="icon">
                                    <i className="fas fa-quote-left"></i>
                                </div>
                                <ul className="rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <li key={i}><i className="fas fa-star"></i></li>
                                    ))}
                                </ul>
                                <p>"{testimonial.comment}"</p>
                                <div className="ath">
                                    <div className="image">
                                        <img src={testimonial.image} alt={testimonial.name} />
                                    </div>
                                    <div className="text">
                                        <h3>{testimonial.name}</h3>
                                        <span>{testimonial.location} - {testimonial.treatment}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .testimonials-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 30px;
                    justify-content: center;
                }
                
                .testimonial_card {
                    text-align: left;
                    position: relative;
                    z-index: 1;
                    background: #fff;
                    padding: 70px 55px;
                    box-shadow: 0px 4px 22px rgba(18, 47, 105, 0.05), 0px 0px 0px rgba(63, 85, 204, 0.05);
                    border-radius: 20px;
                }
                
                .testimonial_card::before {
                    position: absolute;
                    right: 50px;
                    top: 0;
                    width: 190px;
                    height: 60px;
                    content: "";
                    background: url(/images/common-shape.png) no-repeat center;
                }
                
                .testimonial_card .icon {
                    color: #fff;
                    background: linear-gradient(358deg, #A58532 -1077.15%, #CBA853  -690.64%,#B59542  -213.19%, #D7B763 218.79%, #DEBF6C 764.46%, #f0db83 1196.44%);
                    border-radius: 100px;
                    width: 104px;
                    height: 104px;
                    text-align: center;
                    position: absolute;
                    right: 95px;
                    top: -55px;
                }
                
                .testimonial_card .icon i {
                    font-size: 60px;
                    line-height: 120px;
                }
                
                .testimonial_card ul {
                    display: inline-block;
                }
                
                .testimonial_card ul li {
                    display: inline-block;
                }
                
                .testimonial_card ul li i {
                    font-size: 22px;
                    color: #000B47;
                }
                
                .testimonial_card p {
                    color: #767676;
                    font-size: 19px;
                    font-weight: 400;
                    line-height: 35px;
                    margin: 20px 0 40px;
                }
                
                .testimonial_card .ath {
                    display: flex;
                    align-items: center;
                }
                
                .testimonial_card .ath .image {
                    width: 80px;
                    height: 80px;
                }
                
                .testimonial_card .ath .image img {
                    width: 100%;
                    border-radius: 100px;
                }
                
                .testimonial_card .ath .text {
                    margin-right: 20px;
                    margin-top: 0px;
                }
                
                .testimonial_card .ath .text h3 {
                    font-size: 22px;
                    font-weight: 600;
                    line-height: 30px;
                    margin-bottom: 5px;
                }
                
                .testimonial_card .ath .text span {
                    color: #767676;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 26px;
                }
                
                @media (max-width: 1199px) {
                    .testimonial_card {
                        padding: 70px 35px;
                    }
                }
                
                @media (max-width: 991px) {
                    .testimonial_card {
                        padding-bottom: 50px;
                    }
                }
                
                @media (max-width: 767px) {
                    .testimonials-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                @media (max-width: 425px) {
                    .testimonial_card {
                        padding: 60px 15px;
                        padding-bottom: 40px;
                    }
                    
                    .testimonial_card::before {
                        right: 30px;
                        width: 130px;
                    }
                    
                    .testimonial_card .icon {
                        width: 80px;
                        height: 80px;
                        right: 55px;
                        top: -30px;
                    }
                    
                    .testimonial_card .icon i {
                        font-size: 40px;
                        line-height: 90px;
                    }
                    
                    .testimonial_card p {
                        font-size: 18px;
                    }
                    
                    .testimonial_card .ath {
                        display: block;
                    }
                    
                    .testimonial_card .ath .text {
                        margin: 0;
                        margin-top: 20px;
                    }
                    
                    .testimonial_card .ath .text h3 {
                        font-size: 20px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;