import React, { useEffect } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDevices } from '../../../store/slices/devices';
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
    branchId = null
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDevices(branchId));
    }, [dispatch, branchId]);

    const { items: devices = [], loading = false, error = null } = useSelector(state => state.devices || {});

    if (loading) return <div className="text-center py-5">جاري التحميل...</div>;
    if (error) return <div className="text-center py-5 text-danger">خطأ: {error}</div>;

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
  {/* Arrow on the left */}
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
      className="transform rotate-0"  // No rotation needed for left
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  </span>

  {/* Text on the right */}
  <span className="flex-1 text-end">عرض جميع الأجهزة</span>
</Link>

                            </div>
                        </div>
                    </div>
                )}
                <div className="project_wrapper">
                    <div className="row">
                        {devices.slice(sliceStart, sliceEnd).map((device, pitem) => (
                            <div className="col-lg-4 col-md-6 col-12" key={pitem}>
                                <div className="project_card text-right">
                                    <img 
                                        src={device.image_url ? getImageUrl(device.image_url) : "/download.png"} 
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
                                                    href={`/project/${device._id}`} 
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