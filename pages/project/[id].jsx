import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeviceById } from '../../store/slices/devices';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import ContactForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import logo from '../../helpers/images/logo-2.svg';
import Psing1 from '../../helpers/images/project-single/img-1.jpg';
import Psing2 from '../../helpers/images/project-single/img-2.jpg';

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

// Dummy data matching your schema
const dummyDeviceData = {
  _id: '1',
  id: '1',
  name: 'MRI Scanner',
  description: 'High-resolution MRI scanner for detailed diagnostic imaging',
  department_id: [1, 2],
  branches: [1, 3],
  working_time_slots: [
    {
      type: 'dateRange',
      startDay: 'Monday',
      endDay: 'Friday',
      recurringTime: {
        startTime: '08:00',
        endTime: '18:00'
      }
    }
  ],
  sessionPeriod: '45 minutes',
  imageUrl: '/images/mri-scanner.jpg',
  image: '/images/mri-scanner.jpg',
  // Additional fields for UI
  location: 'Main Radiology Department, Floor 2',
  client: 'City General Hospital',
  surgeon: 'Dr. Ahmed Mahmoud',
  category: 'Diagnostic Imaging',
  tags: ['Radiology', 'Non-invasive', 'Diagnostic'],
  date: 'Installed: 15 Jan 2023',
  quote: 'This MRI scanner has revolutionized our diagnostic capabilities',
  quoteSource: 'Chief Radiologist',
  strategies: 'We employ advanced imaging protocols for accurate diagnosis',
  strategiesList: [
    'T1 and T2 weighted imaging',
    'Diffusion-weighted imaging',
    'Functional MRI when needed'
  ],
  approach: 'Patient-centered imaging with minimal discomfort',
  goals: 'Provide accurate diagnostics with 99.5% accuracy',
  goalsList: [
    'Reduce scan time by 20%',
    'Improve image resolution',
    'Enhance patient comfort'
  ],
  result: 'Diagnostic accuracy improved by 35% since installation',
  resultList: [
    'Faster diagnosis',
    'Reduced need for repeat scans',
    'Better treatment planning'
  ]
};

const ProjectSinglePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const {
    selectedDevice: currentService,
    loading,
    error
  } = useSelector(state => state.devices || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchDeviceById(id));
    }
  }, [dispatch, id]);

  // Use dummy data if no data from API
  const displayData = currentService || dummyDeviceData;

  if (loading) {
    return <div className="text-center py-5">Loading device details...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error loading device: {error}</div>;
  }

  return (
    <Fragment>
      <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2 absoulte top-0'} />
      <PageTitle pageTitle={displayData.name} pagesub={'Medical Device'} />
      
      <section className="project_single section-padding">
        <div className="container">
          <img src={displayData.image || Psing1} alt={displayData.name} className="w-full rounded-lg shadow-lg mb-8" />
          
          <div className="row">
            <div className="col-lg-7 col-12">
              <h2 className="text-3xl font-bold mb-4">{displayData.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{displayData.description}</p>
              
              <div className="device-specs mb-8">
                <h3 className="text-2xl font-bold mb-3">Technical Specifications</h3>
                <ul className="space-y-2">
                  <li><strong>Session Period:</strong> {displayData.sessionPeriod}</li>
                  {displayData.working_time_slots?.map((slot, index) => (
                    <li key={index}>
                      <strong>Availability:</strong> {slot.startDay} to {slot.endDay}, {slot.recurringTime?.startTime} - {slot.recurringTime?.endTime}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="col-lg-5 col-12">
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-50">Location:</th>
                    <td className="py-3 px-4">{displayData.location}</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-50">Department:</th>
                    <td className="py-3 px-4">Radiology</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-50">Responsible:</th>
                    <td className="py-3 px-4">{displayData.surgeon}</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-50">Category:</th>
                    <td className="py-3 px-4">{displayData.category}</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-50">Tags:</th>
                    <td className="py-3 px-4">{displayData.tags?.join(', ')}</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 px-4 bg-gray-50">Installed:</th>
                    <td className="py-3 px-4">{displayData.date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="quote bg-gray-50 p-6 rounded-lg my-8">
            <h4 className="text-xl italic mb-2">"{displayData.quote}"</h4>
            <p className="text-right">— {displayData.quoteSource}</p>
          </div>
          
          <div className="row my-8">
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3">Capabilities</h3>
              <p className="text-gray-700 mb-4">{displayData.strategies}</p>
              <ul className="space-y-2">
                {displayData.strategiesList?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3">Usage Protocol</h3>
              <p className="text-gray-700 mb-4">{displayData.approach}</p>
            </div>
          </div>
          
          <div className="row my-8">
            <div className="col-lg-6 col-12 mb-4">
              <img src={Psing1} alt="Device in use" className="w-full rounded-lg" />
            </div>
            <div className="col-lg-6 col-12 mb-4">
              <img src={Psing2} alt="Device close-up" className="w-full rounded-lg" />
            </div>
          </div>
          
          <div className="row my-8">
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3">Performance Metrics</h3>
              <p className="text-gray-700 mb-4">{displayData.goals}</p>
              <ul className="space-y-2">
                {displayData.goalsList?.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3">Outcomes</h3>
              <p className="text-gray-700 mb-4">{displayData.result}</p>
              <ul className="space-y-2">
                {displayData.resultList?.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="AppointmentFrom bg-gray-100 py-12">
          <div className="container">
            <div className="cta_form_s2 bg-white p-8 rounded-lg shadow-md">
              <div className="title s2 text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Schedule This Device</h3>
                <p className="text-gray-600">Contact us to book this medical device for your needs</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer hclass={'wpo-site-footer_s2'} />
      <Scrollbar />
    </Fragment>
  );
};

export default ProjectSinglePage;