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
    branchId = null // ✅ Accept branchId as prop
}) => {
    const dispatch = useDispatch();

    // ✅ Fetch devices on mount with optional branchId
    useEffect(() => {
        dispatch(fetchDevices(branchId));
    }, [dispatch, branchId]);

    const { items: devices = [], loading = false, error = null } = useSelector(state => state.devices || {});
    console.log("Devices:", devices);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className={hclass}>
            <div className="container">
                {ShowSectionTitle && (
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12">
                            <SectionTitle 
                                title="أجهزتنا الطبية" 
                                subtitle="أحدث التقنيات والأجهزة التي نقدمها لرعايتكم" 
                                dir="rtl"
                                className="medical-devices-title"
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="project_btn">
                                <Link href="/project" className="theme-btn">
                                    See All Cases
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <div className="project_wrapper">
                    <div className="row">
                        {devices.slice(sliceStart, sliceEnd).map((device, pitem) => (
                            <div className="col-lg-4 col-md-6 col-12" key={pitem}>
                                <div className="project_card">
                                    <img 
                                        src={device.image_url ? getImageUrl(device.image_url) : "/download.png"} 
                                        alt={device.name || "Device"} 
                                    />
                                    <div className="text">
                                        {device._id ? (
                                            <h2>
                                                <Link 
                                                    href={`/project/${device._id}`} 
                                                    onClick={ClickHandler}
                                                >
                                                    {device.name}
                                                </Link>
                                            </h2>
                                        ) : (
                                            <h2>{device.name}</h2>
                                        )}
                                        <span>{device.subtitle || device.type}</span>
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
