"use client"
import React, { useEffect, useState, useMemo } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDevices } from '../../../store/slices/devices';
import { fetchBranches } from '../../../store/slices/branches';
import SectionTitle from "../SectionTitle/SectionTitle";
import { getImageUrl } from "@/helpers/hooks/imageUrl";
import ServiceSidebar from "../../main-component/ServiceSinglePage/sidebar"
import { useSearchParams } from 'next/navigation';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const DEPARTMENT_MAPPING = {
    "أجهزة التغذية ونحت القوام": "أجهزة التغذية",
    "ليزر إزالة الشعر": "أجهزة الجلدية",
    "أجهزة معالجة البشرة": "أجهزة الجلدية"
};

const ProjectSection = ({
    hclass,
    ShowSectionTitle = true,
    sliceStart = 0,
    sliceEnd ,
    branchId = null,
    showFilters = false,
    slider = true,
    showSidebar = false
}) => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [swiperInitialized, setSwiperInitialized] = useState(false);

    const departmentNameFromParams = searchParams?.get('departmentName');

    useEffect(() => {
        dispatch(fetchDevices());
        if (showFilters || showSidebar) {
            dispatch(fetchBranches());
        }
    }, [dispatch, showFilters, showSidebar]);

    useEffect(() => {
        if (departmentNameFromParams) {
            setSelectedDepartment(departmentNameFromParams);
        }
        // If branchId is provided as prop, set it as the selected branch
        if (branchId) {
            setSelectedBranch(branchId);
        }
    }, [departmentNameFromParams, branchId]);

    const { 
        items: devices = [], 
        loading: devicesLoading = false, 
        error: devicesError = null 
    } = useSelector(state => state.devices || {});

    const { items: allBranches = [], loading: branchesLoading } = useSelector(state => state.branches || {});

    const filteredDevices = useMemo(() => {
        return devices.filter(device => {
            const searchNorm = searchTerm.toLowerCase();
            const matchesSearch = searchTerm === "" || 
                device.name?.toLowerCase().includes(searchNorm) || 
                device.type?.toLowerCase().includes(searchNorm);

            // If branchId prop is provided, only show devices from that branch
            const matchesBranch = branchId 
                ? (device.branches_ids && device.branches_ids.some(id => String(id) === String(branchId)))
                : (!selectedBranch || (device.branches_ids && device.branches_ids.some(id => String(id) === String(selectedBranch))));

            const matchesDepartment = !selectedDepartment || 
                (device.type && 
                 (DEPARTMENT_MAPPING[device.type] === selectedDepartment || 
                  device.type === selectedDepartment));

            return matchesSearch && matchesBranch && matchesDepartment;
        });
    }, [devices, searchTerm, selectedDepartment, selectedBranch, branchId]);

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedDepartment(null);
        // Don't reset branch filter if branchId is provided as prop
        if (!branchId) {
            setSelectedBranch(null);
        }
    };

    const getSectionTitle = () => {
        if (branchId && allBranches.length > 0) {
            const branch = allBranches.find(b => String(b.id) === String(branchId));
            return branch ? `أجهزة فرع ${branch.name}` : "أجهزة الفرع";
        }
        if (selectedDepartment === "أجهزة التغذية") {
            return "أجهزة التغذية ونحت القوام";
        } else if (selectedDepartment === "أجهزة الجلدية") {
            return "أجهزة الجلدية والليزر";
        }
        return "أجهزتنا الطبية";
    };

    const getSectionSubtitle = () => {
        if (branchId) {
            return "الأجهزة المتاحة في هذا الفرع";
        }
        if (selectedDepartment === "أجهزة التغذية") {
            return "أحدث الأجهزة لتحقيق القوام المثالي والصحة الغذائية";
        } else if (selectedDepartment === "أجهزة الجلدية") {
            return "أحدث تقنيات العناية بالبشرة وإزالة الشعر بالليزر";
        }
        return "أحدث التقنيات والأجهزة التي نقدمها لرعايتكم";
    };

    const renderSidebar = () => (
        <ServiceSidebar 
            services={Object.entries(DEPARTMENT_MAPPING).map(([type, department]) => ({
                department_id: department,
                department_name: department
            }))}
            branches={allBranches}
            onSearchChange={setSearchTerm}
            onDepartmentChange={setSelectedDepartment}
            onBranchChange={setSelectedBranch}
            currentSearch={searchTerm}
            currentDepartment={selectedDepartment}
            currentBranch={selectedBranch}
            searchPlaceholder="ابحث عن الأجهزة..."
            disableBranchFilter={!!branchId} // Disable branch filter if branchId is provided
        />
    );

    const renderDeviceCard = (device, index) => (
        <div key={index} className="project_card text-right h-full mx-2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <div className="relative min-h-72 bg-gray-100 flex justify-center items-center">
                <img 
                    src={device.image_url ? getImageUrl(device.image_url) : "/download.png"} 
                    alt={device.name || "Device"} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "/download.png";
                    }}
                />
            </div>
            <div className="text p-4">
                <div className="flex justify-between items-start">
                    {device._id ? (
                        <h2 className="text-lg font-bold flex-1">
                            <Link 
                                href={`/devices/${device._id}`} 
                                onClick={ClickHandler}
                                className="text-[#333] hover:text-[#CBA853] transition-colors"
                            >
                                {device.name}
                            </Link>
                        </h2>
                    ) : (
                        <h2 className="text-lg font-bold flex-1">{device.name}</h2>
                    )}
                </div>
                
                <span className="text-[#777] block mt-2">{device.type}</span>
                
                {!branchId && device.branch_names && device.branch_names.length > 0 && (
                    <div className="mt-2">
                        <div className="text-sm text-gray-500 mb-1">الفروع المتاحة:</div>
                        <div className="flex flex-wrap gap-1">
                            {device.branch_names.map((branch, i) => (
                                <span 
                                    key={i} 
                                    className="bg-gray-100 text-black text-xs px-2 py-1 rounded"
                                >
                                    {branch.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {device.available_times && (
                    <div className="mt-2 text-xs text-gray-500">
                        <span>مواعيد العمل: </span>
                        <span>{device.available_times}</span>
                    </div>
                )}
            </div>
        </div>
    );

    if (devicesLoading) return <div className="text-center py-5">جاري تحميل الأجهزة...</div>;
    if (devicesError) return <div className="text-center py-5 text-danger">خطأ في تحميل الأجهزة: {devicesError}</div>;
    if (filteredDevices.length === 0) return (
        <div className="text-center py-5">
            <p>لا توجد أجهزة متاحة</p>
            {(searchTerm || selectedDepartment || (selectedBranch && !branchId)) && (
                <button 
                    onClick={resetFilters}
                    className="text-[#CBA853] mt-2"
                >
                    إعادة تعيين الفلاتر
                </button>
            )}
        </div>
    );

    return (
        <section className={hclass} dir="rtl">
            <div className="container">
                {showSidebar ? (
                    <div className="col">
                        <div className="w-full">
                            {renderSidebar()}
                        </div>
                        <div className="w-full">
                            {renderContent()}
                        </div>
                    </div>
                ) : (
                    renderContent()
                )}
            </div>
        </section>
    );

    function renderContent() {
        return (
            <>
                {ShowSectionTitle && (
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12 order-lg-1">
                            <SectionTitle 
                                title={getSectionTitle()} 
                                subtitle={getSectionSubtitle()} 
                                dir="rtl"
                                className="medical-devices-title"
                            />
                        </div>
                        {!branchId && (
                            <div className="col-lg-6 col-12 order-lg-2 text-left">
                                <div className="project_btn">
                                    <Link 
                                        href="/devices" 
                                        className="relative pl-16 inline-flex items-center justify-between
                                                   bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83]
                                                   text-white font-bold rounded-full py-3 px-6
                                                   hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4"
                                    >
                                        <span className="absolute left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#CBA853"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="transform rotate-0"
                                            >
                                                <path d="M19 12H5M12 19l-7-7 7-7" />
                                            </svg>
                                        </span>
                                        <span className="flex-1 text-end">عرض جميع الأجهزة</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="project_wrapper relative">
                    {slider ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination',
                                type: 'bullets',
                                renderBullet: (index, className) => {
                                    return `<span class="${className}" 
                                        style="background-color: #e0e0e0; width: 10px; height: 10px; display: inline-block; border-radius: 50%;">
                                    </span>`;
                                }
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            onInit={() => {
                                setSwiperInitialized(true);
                                setTimeout(() => {
                                    document.querySelectorAll('.swiper-pagination-bullet-active')
                                        .forEach(el => el.style.backgroundColor = '#CBA853');
                                }, 0);
                            }}
                            onSlideChange={() => {
                                setTimeout(() => {
                                    document.querySelectorAll('.swiper-pagination-bullet')
                                        .forEach(el => el.style.backgroundColor = '#e0e0e0');
                                    document.querySelectorAll('.swiper-pagination-bullet-active')
                                        .forEach(el => el.style.backgroundColor = '#CBA853');
                                }, 0);
                            }}
                            className="pb-12 "
                        >
                            {filteredDevices.slice(sliceStart, sliceEnd  ? sliceEnd : filteredDevices.length ).map((device, pitem) => (
                                <SwiperSlide key={pitem}>
                                    {renderDeviceCard(device, pitem)}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDevices.slice(sliceStart,  sliceEnd  ? sliceEnd : filteredDevices.length).map((device, index) => (
                                renderDeviceCard(device, index)
                            ))}
                        </div>
                    )}

                    {slider && swiperInitialized && (
                        <>
                            <div className="swiper-button-prev !text-[#CBA853] !left-0 after:!text-xl"></div>
                            <div className="swiper-button-next !text-[#CBA853] !right-0 after:!text-xl"></div>
                            <div className="swiper-pagination !relative !bottom-0 !mt-6"></div>
                        </>
                    )}
                </div>
            </>
        );
    }
};

export default ProjectSection;