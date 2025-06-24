import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import { fetchServices } from "../../store/slices/services";

const ServiceSection = ({
  hclass,
  sliceStart = 0,
  sliceEnd = 3,
  showSectionTitle = true,
  AllServices = true,
}) => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const ClickHandler = () => window.scrollTo(10, 0);

  return (
    <section className={`${hclass} py-16 bg-gray-50`} dir="rtl">
      <div className="container mx-auto px-4">
        {showSectionTitle && (
          <div className="flex justify-center mb-16">
            <div className="w-full lg:w-9/12">
              <SectionTitle
                title="خدمات الأقسام الطبية"
                subtitle="خدماتنا الطبية المتميزة"
                titleStyle="text-3xl md:text-4xl font-bold text-gray-800"
                subtitleStyle="text-gold-600"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-4">
          {loading && (
            <div className="w-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
              <p className="mt-4 text-gray-600">جاري تحميل الخدمات...</p>
            </div>
          )}
          
          {error && (
            <div className="w-full text-center py-8">
              <p className="text-red-500 bg-red-50 p-4 rounded-lg inline-block">
                {error}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            services.slice(sliceStart, sliceEnd).map((service, index) => (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8" key={index}>
                <div className="service-card relative bg-white text-center mt-12 mb-8 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold-200">
                  {/* Gold gradient decoration */}
                  <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-gold-400 to-gold-600 rounded-t-2xl"></div>
                  
                  {/* Icon container with gold gradient */}
                  <div className="icon relative mx-auto -mt-16 w-48 h-48 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 p-1 shadow-lg">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-2">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/medical-icon-placeholder.png';
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="content mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {service.name}
                    </h2>
                    <p className="text-gray-600 text-justify leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link
                      onClick={ClickHandler}
                      to={`/service-single/${service.slug}`}
                      className="inline-flex items-center text-gold-600 hover:text-gold-800 transition-colors duration-300"
                    >
                      <span className="ml-2 font-medium text-yellow-400">المزيد من التفاصيل</span>
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          {AllServices && (
            <div className="w-full text-center mt-8">
              <Link
                onClick={ClickHandler}
                to="/services"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#dec06a] to-[#d4b45c] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-gold-600 hover:to-gold-700"
              >
            
                عرض جميع الخدمات
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;