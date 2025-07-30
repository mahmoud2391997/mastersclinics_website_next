"use client";
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchServiceById } from '../../store/slices/services';
import { fetchBranches } from '../../store/slices/branches';
import { fetchMultipleTeamsByIds } from '../../store/slices/doctor';
import ServiceForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import defaultImage from '../../helpers/images/service-single/img-1.jpg';
import Image from 'next/image';
import Head from 'next/head';
import getImageUrl from "../../utilies/getImageUrl";
import { DepartmentCard } from '../departments/grid';
import Link from 'next/link';
import { fetchDepartmentById } from '../../store/slices/departments'; // Add this import

const LoadingSpinner = ({ text = 'جاري التحميل...', size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  const colorClasses = {
    primary: 'border-t-primary border-r-primary border-b-transparent border-l-transparent',
    white: 'border-t-white border-r-white border-b-transparent border-l-transparent',
    gray: 'border-t-gray-500 border-r-gray-500 border-b-transparent border-l-transparent'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 rtl">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ animationDuration: '0.75s' }}
      ></div>
      {text && <p className="text-gray-600 text-sm md:text-base">{text}</p>}
    </div>
  );
};

const TeamCard = ({ team }) => {
  console.log(team);
  
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="team_card bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative p-4">
          <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3">
            <div className="relative overflow-hidden rounded-[20px]">
              <img
                src={team.image ? getImageUrl(team.image) : '/download.png'}
                alt={team.name || "Team"}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/download.png';
                }}
              />
            </div>
          </div>
        </div>

        <div className="content p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            {team.name}
          </h3>
          <span className="text-[#dec06a] mb-4 block font-medium">
            {team.specialty || ""}
          </span>

          <Link
            href={`/teams/${team.id}`}
            className="w-full py-3 px-6 pl-16 gradient text-white font-bold rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-between relative"
          >
            <span className="absolute left-3 w-8 h-8 bg-white text-gradient rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="flex-1 text-end text-white">احجز موعد</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BranchCard = ({ branch }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
        <div className="w-full h-48 relative">
          <Image
            src={branch.image_url ? getImageUrl(branch.image_url) : '/images/default-branch.jpg'}
            alt={branch.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
          <p className="text-gray-600 mb-4">{branch.address}</p>
          <Link 
            href={`/branches/${branch.id}`}
            className="text-primary hover:underline"
            prefetch={false}
          >
            عرض التفاصيل →
          </Link>
        </div>
      </div>
    </div>
  );
};

const ServiceSinglePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  
  const [state, setState] = useState({
    notFound: false,
    loading: true,
    error: null,
    serviceData: null,
    relatedTeams: [],
    relatedBranches: []
  });

  const { items: allBranches = [] } = useSelector((state) => state.branches || {});

  const tryParseJSON = (jsonString) => {
    if (!jsonString) return [];
    try {
      let parsed = jsonString;
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed.replace(/^"|"$/g, '').replace(/\\"/g, '"'));
      }
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('JSON parsing error:', error);
      return [];
    }
  };
useEffect(() => {
    if (!router.isReady || !id) return;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // 1. Fetch service data
        const serviceAction = await dispatch(fetchServiceById(id));
        const serviceData = serviceAction.payload || serviceAction;

        const parsedService = {
          ...serviceData,
          teams_ids: tryParseJSON(serviceData.doctors_ids).map(id => parseInt(id)),
          branches: tryParseJSON(serviceData.branches).map(id => parseInt(id)),
          team_details: serviceData.team_details || [],
          branch_details: serviceData.branch_details || [],
          capabilities: serviceData.capabilities || []
        };

        if (!allBranches.length) {
          await dispatch(fetchBranches());
        }

        let teamsToShow = [];
        
        if (parsedService.team_details?.length > 0) {
          teamsToShow = parsedService.team_details;
        }
        else if (parsedService.teams_ids?.length > 0) {
          const teamsAction = await dispatch(fetchMultipleTeamsByIds(parsedService.teams_ids));
          teamsToShow = teamsAction?.payload || teamsAction || [];
        }

        const serviceBranches = allBranches.filter(branch => 
          parsedService.branches.includes(branch.id)
        );

        // 2. Fetch department data if department_id exists
        let departmentData = null;
        if (parsedService.department_id) {
          const departmentAction = await dispatch(fetchDepartmentById(parsedService.department_id));
          departmentData = departmentAction?.payload || departmentAction;
        }

        setState({
          loading: false,
          notFound: false,
          error: null,
          serviceData: parsedService,
          relatedTeams: teamsToShow,
          relatedBranches: serviceBranches,
          departmentData // Add department data to state
        });

      } catch (error) {
        console.error("Error loading service data:", error);
        setState({
          loading: false,
          notFound: error.message.includes('not found') || error.message.includes('404'),
          error: error.message,
          serviceData: null,
          relatedTeams: [],
          relatedBranches: [],
          departmentData: null
        });
      }
    };

    loadData();
  }, [dispatch, id, router.isReady, allBranches.length]);

  const { loading, notFound, error, serviceData, relatedTeams, relatedBranches, departmentData } = state;
  const imageSrc = serviceData?.image ? getImageUrl(serviceData.image) : defaultImage;

  // Prepare department data for the DepartmentCard using the fetched department data
  const relatedDepartment = departmentData ? {
    id: departmentData.id,
    name: departmentData.name || 'القسم الطبي',
    description: departmentData.description || `قسم متخصص في ${serviceData?.name_ar || 'الخدمة الحالية'}`,
    image: departmentData.image || null,
    branches: relatedBranches.map(branch => ({
      id: branch.id,
      name: branch.name
    }))
  } : null;

  if (!router.isReady || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="جاري تحميل تفاصيل الخدمة..." />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">الخدمة غير موجودة</h1>
        <button 
          onClick={() => router.push('/services')}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          العودة إلى قائمة الخدمات
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">حدث خطأ أثناء جلب البيانات</h1>
        <p className="text-gray-600 mb-4">
          {error.includes('Service data not available') 
            ? 'تعذر تحميل بيانات الخدمة في الوقت الحالي. يرجى المحاولة لاحقًا.'
            : error}
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => router.reload()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            إعادة المحاولة
          </button>
          <button 
            onClick={() => router.push('/services')}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            العودة إلى الخدمات
          </button>
        </div>
      </div>
    );
  }

  if (!serviceData) {
    return null;
  }

  return (
    <Fragment>
      <Head>
        <title>{serviceData?.name_ar?.trim() || 'الخدمة'} | خدماتنا</title>
        <meta name="description" content={serviceData?.description || 'خدمة طبية متخصصة'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={serviceData?.name_ar || 'الخدمة'} pagesub={'تفاصيل الخدمة'} bgImage={"/service.png"}/>

      <section dir="rtl" className="service_single section-padding">
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            {/* Service Header */}
            <div className="mb-12">
              <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
                <Image
                  src={imageSrc}
                  alt={serviceData?.name_ar || 'الخدمة'}
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {serviceData?.name_ar}
                  </h1>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-right">
                <p className="text-gray-700 leading-relaxed">
                  {serviceData?.description}
                </p>
              </div>
            </div>

            {/* Service Capabilities */}
            {serviceData?.capabilities?.length > 0 && (
              <div className="mb-12 bg-gray-50 p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-right mb-6">مميزات الخدمة</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                  {serviceData.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-start bg-white p-4 rounded-lg shadow-xs">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span className="flex-1">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Department - Using the imported DepartmentCard */}
        {relatedDepartment && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-right mb-6">القسم المسؤول</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DepartmentCard department={relatedDepartment} />
          </div>
        </div>
      )}

            {/* Available Branches */}
     {/* Branches Section */}
{relatedBranches.length > 0 && (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-right mb-6">الفروع المتاحة</h2>
    <div className="flex flex-wrap -mx-4">
      {relatedBranches.map(branch => (
        <BranchCard key={branch.id} branch={branch} />
      ))}
    </div>
  </div>
)}

{/* Teams Section */}
{relatedTeams.length > 0 ? (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-right mb-6">الفريق المتخصص</h2>
    <div className="flex flex-wrap -mx-4">
      {relatedTeams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  </div>
) : serviceData?.teams_ids?.length > 0 ? (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-right mb-6">الفريق المتخصص</h2>
    <div className="text-center py-8">
      <LoadingSpinner text="جاري تحميل بيانات الفريق..." />
    </div>
  </div>
) : null}


            {/* Appointment Form */}
            {/* <div className="cta_form_s2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="title text-right mb-8">
                <h3 className="text-2xl font-bold mb-2">احجز موعد الآن</h3>
                <p className="text-gray-600">تواصل معنا لمعرفة كيف يمكننا مساعدتك في مشاكلك.</p>
              </div>
              <ServiceForm 
                serviceId={serviceData?.id} 
                departmentId={serviceData?.department_id}
                serviceName={serviceData?.name_ar}
              />
            </div> */}
          </div>
        </div>
      </section>

      <Footer hclass={'wpo-site-footer_s2'} />
      <Scrollbar />
    </Fragment>
  );
};


export default ServiceSinglePage;