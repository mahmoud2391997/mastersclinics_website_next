import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDevices } from '../../../store/slices/devices';
import { fetchBranches } from '../../../store/slices/branches';
import SectionTitle from "../SectionTitle/SectionTitle";
import { getImageUrl } from "@/helpers/hooks/imageUrl";

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const ProjectSection = ({
    hclass,
    ShowSectionTitle = true,
    sliceStart = 0,
    sliceEnd = 3,
    branchId = null,
    showFilters = false
}) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("all");
    
    useEffect(() => {
        dispatch(fetchDevices(branchId));
        if (showFilters) {
            dispatch(fetchBranches());
        }
    }, [dispatch, branchId, showFilters]);

    const { 
        items: devices = [], 
        loading: devicesLoading = false, 
        error: devicesError = null 
    } = useSelector(state => state.devices || {});

    const { 
        items: branches = [], 
        loading: branchesLoading = false, 
        error: branchesError = null 
    } = useSelector(state => state.branches || {});

    // Get unique branch names from devices for filtering
    const uniqueBranchNames = [...new Set(devices.map(device => device.branch_name))].filter(name => name);

    // Filter devices based on search term and selected branch
    const filteredDevices = devices.filter(device => {
        const matchesSearch = device.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            device.type?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesBranch = selectedBranch === "all" || 
                            device.branch_name === selectedBranch;
        
        return matchesSearch && matchesBranch;
    });

    if (devicesLoading) return <div className="text-center py-5">جاري تحميل الأجهزة...</div>;
    if (devicesError) return <div className="text-center py-5 text-danger">خطأ في تحميل الأجهزة: {devicesError}</div>;

    return (
        <section className={hclass} dir="rtl">
            <div className="container">
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
                                    href="/project" 
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

                {showFilters && (
                    <div className="flex flex-col md:flex-row gap-4 mb-8" dir="rtl">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ابحث عن جهاز أو نوع..."
                                    className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#dec06a] focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg
                                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-64">
                            <select
                                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#dec06a] focus:border-transparent"
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                            >
                                <option value="all">جميع الفروع</option>
                                {uniqueBranchNames.map((branchName) => (
                                    <option key={branchName} value={branchName}>
                                        {branchName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                <div className="project_wrapper">
                    <div className="row">
                        {filteredDevices.slice(sliceStart, sliceEnd).map((device, pitem) => (
                            <div className="col-lg-4 col-md-6 col-12" key={pitem}>
                                <div className="project_card text-right">
                                    <img 
                                        src={device.image_url ? getImageUrl(device.image_url) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s"} 
                                        alt={device.name || "Device"} 
                                        className="w-full"
                                        onError={(e) => {
                                            e.target.src = "/download.png";
                                        }}
                                    />
                                    <div className="text">
                                        {device._id ? (
                                            <h2>
                                                <Link 
                                                    href={`/devices/${device._id}`} 
                                                    onClick={ClickHandler}
                                                    className="text-[#333] hover:text-[#CBA853]"
                                                >
                                                    {device.name}
                                                </Link>
                                            </h2>
                                        ) : (
                                            <h2>{device.name}</h2>
                                        )}
                                        <span className="text-[#777]">{device.subtitle || device.type}</span>
                                        {device.branch_name && (
                                            <div className="mt-2 text-sm text-gray-500">
                                                <span>الفرع: </span>
                                                <span>{device.branch_name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;