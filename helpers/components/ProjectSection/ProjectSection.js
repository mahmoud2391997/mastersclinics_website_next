import React, { useEffect, useState, useMemo } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDevices } from '../../../store/slices/devices';
import { fetchBranches } from '../../../store/slices/branches';
import SectionTitle from "../SectionTitle/SectionTitle";
import { getImageUrl } from "@/helpers/hooks/imageUrl";
import ServiceSidebar from "../../main-component/ServiceSinglePage/sidebar"

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

// Department mapping based on device types
const DEPARTMENT_MAPPING = {
    "أجهزة التغذية ونحت القوام": "أجهزة التغذية",
    "ليزر إزالة الشعر": "أجهزة الجلدية",
    "أجهزة معالجة البشرة": "أجهزة الجلدية"
    // Add more mappings as needed
};

const ProjectSection = ({
    hclass,
    ShowSectionTitle = true,
    sliceStart = 0,
    sliceEnd = 3,
    branchId = null,
    showFilters = false,
    slider = true,
    showSidebar = false
}) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("all");
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [swiperInitialized, setSwiperInitialized] = useState(false);
    
    useEffect(() => {
        dispatch(fetchDevices(branchId));
        if (showFilters || showSidebar) {
            dispatch(fetchBranches());
        }
    }, [dispatch, branchId, showFilters, showSidebar]);

    const { 
        items: devices = [], 
        loading: devicesLoading = false, 
        error: devicesError = null 
    } = useSelector(state => state.devices || {});

    const { items: allBranches = [] } = useSelector(state => state.branches || {});

    // Normalize and get unique branch names
    const normalizeBranchName = (name) => name.trim().toLowerCase().replace(/\s+/g, ' ');
    const uniqueBranchNames = [...new Set(
        devices.flatMap(device => 
            device.branch_names 
                ? device.branch_names.map(b => normalizeBranchName(b))
                : []
        )
    )].filter(name => name).sort();

    // Prepare branches data for sidebar
    const processedBranches = useMemo(() => {
        return allBranches.map(branch => ({
            id: branch.id,
            name: branch.name.trim()
        }));
    }, [allBranches]);

    // Prepare departments data for sidebar
    const departmentsData = useMemo(() => {
        const deptMap = new Map();
        
        // Add all devices with their types mapped to departments
        devices.forEach(device => {
            if (device.type) {
                const departmentName = DEPARTMENT_MAPPING[device.type] || device.type;
                if (!deptMap.has(departmentName)) {
                    deptMap.set(departmentName, {
                        id: departmentName,
                        name: departmentName
                    });
                }
            }
        });
        
        return Array.from(deptMap.values());
    }, [devices]);

    // Filter devices with robust matching
    const filteredDevices = devices.filter(device => {
        // Search filter
        const searchNorm = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === "" || 
                            device.name?.toLowerCase().includes(searchNorm) || 
                            device.type?.toLowerCase().includes(searchNorm);
        
        // Branch filter with normalized comparison
        const branchNorm = normalizeBranchName(selectedBranch);
        const matchesBranch = selectedBranch === "all" || 
                            (device.branch_names && 
                             device.branch_names.some(branch => 
                                normalizeBranchName(branch) === branchNorm
                             ));
        
        // Department filter
        const matchesDepartment = !selectedDepartment || 
                                (device.type && 
                                 DEPARTMENT_MAPPING[device.type] === selectedDepartment);
        
        return matchesSearch && matchesBranch && matchesDepartment;
    });

    const handleBranchChange = (branchId) => {
        if (branchId === null) {
            setSelectedBranch("all");
        } else {
            const branch = allBranches.find(b => b.id === branchId);
            if (branch) {
                setSelectedBranch(normalizeBranchName(branch.name));
            }
        }
    };

    if (devicesLoading) return <div className="text-center py-5">جاري تحميل الأجهزة...</div>;
    if (devicesError) return <div className="text-center py-5 text-danger">خطأ في تحميل الأجهزة: {devicesError}</div>;
    if (filteredDevices.length === 0) return (
        <div className="text-center py-5">
            <p>لا توجد أجهزة متاحة</p>
            {(searchTerm || selectedBranch !== "all" || selectedDepartment) && (
                <button 
                    onClick={() => {
                        setSearchTerm("");
                        setSelectedBranch("all");
                        setSelectedDepartment(null);
                    }}
                    className="text-[#CBA853] mt-2"
                >
                    إعادة تعيين الفلاتر
                </button>
            )}
        </div>
    );

    const renderDeviceCard = (device, index) => (
        <div key={index} className="project_card text-right h-full mx-2 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <div className="relative min-h-72 bg-gray-100 flex justify-center items-center">
                <img 
                    src={device.image_url ? getImageUrl(device.image_url) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s"} 
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
                    {/* {device.type && (
                        <span className="bg-[#f0db83] text-white text-xs px-2 py-1 rounded">
                            {DEPARTMENT_MAPPING[device.type] || device.type}
                        </span>
                    )} */}
                </div>
                
                <span className="text-[#777] block mt-2">{device.subtitle || device.type}</span>
                
                {device.branch_names && device.branch_names.length > 0 && (
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

    return (
        <section className={hclass} dir="rtl">
            <div className="container">
                {showSidebar ? (
                    <div className="row">
                        <div className="col-lg-3">
                            <ServiceSidebar 
                                services={departmentsData.map(dept => ({
                                    department_id: dept.id,
                                    department_name: dept.name
                                }))}
                                branches={processedBranches}
                                onSearchChange={setSearchTerm}
                                onDepartmentChange={setSelectedDepartment}
                                onBranchChange={handleBranchChange}
                                currentSearch={searchTerm}
                                currentDepartment={selectedDepartment}
                                currentBranch={allBranches.find(b => 
                                    normalizeBranchName(b.name) === selectedBranch
                                )?.id || null}
                            />
                        </div>
                        <div className="col-lg-9">
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
                                title="أجهزتنا الطبية" 
                                subtitle="أحدث التقنيات والأجهزة التي نقدمها لرعايتكم" 
                                dir="rtl"
                                className="medical-devices-title"
                            />
                        </div>
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
                    </div>
                )}

         

                <div className="project_wrapper relative">
                    {slider ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination',
                                type: 'bullets',
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            onInit={() => setSwiperInitialized(true)}
                            className="pb-12"
                        >
                            {filteredDevices.slice(sliceStart, sliceEnd).map((device, pitem) => (
                                <SwiperSlide key={pitem}>
                                    {renderDeviceCard(device, pitem)}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDevices.slice(sliceStart, sliceEnd).map((device, index) => (
                                renderDeviceCard(device, index)
                            ))}
                        </div>
                    )}

                    {/* Navigation buttons - only for slider */}
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