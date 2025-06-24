import SectionTitle from "../SectionTitle/SectionTitle";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'أحمد السعيد',
            location: 'الرياض',
            rating: 5,
            comment: 'تجربة رائعة مع العيادات المتخصصة. الأطباء محترفون والخدمة ممتازة. أنصح الجميع بالتعامل معهم.',
            image: 'https://cdn-icons-png.flaticon.com/512/1430/1430402.png',
            treatment: 'علاج أمراض القلب'
        },
        {
            id: 2,
            name: 'فاطمة محمد',
            location: 'جدة',
            rating: 5,
            comment: 'الدكتورة فاطمة العلي رائعة جداً. اهتمت بحالتي بشكل مميز وقدمت لي أفضل رعاية طبية.',
            image: 'https://cdn-icons-png.flaticon.com/512/1430/1430402.png',
            treatment: 'النساء والولادة'
        },
        {
            id: 3,
            name: 'محمد الأحمد',
            location: 'الدمام',
            rating: 5,
            comment: 'عملية جراحة العظام تمت بنجاح تام. الفريق الطبي محترف والمتابعة ممتازة.',
            image: 'https://cdn-icons-png.flaticon.com/512/1430/1430402.png',
            treatment: 'جراحة العظام'
        },
        {
            id: 4,
            name: 'سارة الزهراني',
            location: 'مكة المكرمة',
            rating: 5,
            comment: 'أطفالي يحبون الدكتورة سارة. تتعامل معهم بحب وصبر وتقدم أفضل رعاية طبية.',
            image: 'https://cdn-icons-png.flaticon.com/512/1430/1430402.png',
            treatment: 'طب الأطفال'
        }
    ];

    return (
        <section className="py-16 bg-gray-50" dir="rtl">
            <div className="container mx-auto px-4">
                <SectionTitle title={"آراء المرضى"} subtitle="ماذا يقول مرضانا عنا" />
               
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative pt-16 pb-8 px-6 h-full"
                        >
                     <div className="absolute -top-8 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
  <svg 
    className="w-8 h-8 text-white drop-shadow-sm" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
</div>
                            
                            {/* Rating stars */}
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            
                            {/* Testimonial text */}
                            <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.comment}"</p>
                            
                            {/* Author info */}
                            <div className="flex items-center">
                                <div className="flex-shrink-0 mr-4">
                                    <img 
                                        className="w-12 h-12 rounded-full object-cover border-2 border-gold-200" 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder-user.jpg';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-600">{testimonial.location} - {testimonial.treatment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Optional decorative elements */}
                <div className="hidden lg:block">
                    <div className="absolute left-0 -mt-32 w-32 h-32 bg-yellow-400 unded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                    <div className="absolute right-0 -mt-40 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;