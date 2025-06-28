import React, { useEffect } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDevices } from '../../../store/slices/devices'; // Adjust the path as needed
import SectionTitle from "../SectionTitle/SectionTitle";

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const ProjectSection = (props) => {
    const { hclass, ShowSectionTitle = true, sliceStart = 0, sliceEnd = 3 } = props;

    const dispatch = useDispatch();

    // Fetch devices on mount
    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);
    
    // Get devices from Redux store
    const { items : devices = [], loading = false, error = null } = useSelector(state => state.devices || {});
    console.log(devices);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
console.log("Devices:", devices);
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
                                    <img src={device.image} alt={device.name} />
                                    <div className="text">
                                        {device._id ? (
                                            <h2>
                                                <Link 
                                                    href={`/project/${device._id}`} // Navigate to the new URL
                                                    onClick={ClickHandler}
                                                >
                                                    {device.name}
                                                </Link>
                                            </h2>
                                        ) : (
                                            <h2>{device.name}</h2>
                                        )}
                                        <span>{device.subtitle}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProjectSection;
