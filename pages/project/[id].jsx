import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeviceById } from '../../store/slices/devices'; // Adjust the import path as needed
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle';
import ContactForm from '../../src/main-component/ServiceSinglePage/ServiceFrom';
import Footer from '../../src/components/footer/Footer';
import Scrollbar from '../../src/components/scrollbar/scrollbar';
import logo from '../../src/images/logo-2.svg';
import Psing1 from '../../src/images/project-single/img-1.jpg';
import Psing2 from '../../src/images/project-single/img-2.jpg';

const ClickHandler = () => {
  window.scrollTo(10, 0);
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

  if (loading) {
    return <div className="text-center py-5">Loading project details...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error loading project: {error}</div>;
  }

  if (!currentService) {
    return <div className="text-center py-5">Project not found</div>;
  }

  return (
    <Fragment>
      <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2 absoulte top-0'} />
      <PageTitle pageTitle={currentService?.name || 'Project Details'} pagesub={'Portfolio'} />
      <section className="project_single section-padding">
        <div className="container">
          <img src={currentService?.image || Psing1} alt={currentService?.name || 'Project Image'} />
          <div className="row">
            <div className="col-lg-7 col-12">
              <h2>{currentService?.name || 'Project Name'}</h2>
              <p>{currentService?.description || 'No description available.'}</p>
            </div>
            <div className="col-lg-5 col-12">
              <table>
                <tbody>
                  <tr>
                    <th>Location:</th>
                    <td>{currentService?.location || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Client:</th>
                    <td>{currentService?.client || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Surgeon:</th>
                    <td>{currentService?.surgeon || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Category:</th>
                    <td>{currentService?.category || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Tag:</th>
                    <td>{currentService?.tags?.join(', ') || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Date:</th>
                    <td>{currentService?.date || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Share:</th>
                    <td>
                      <ul>
                        <li>
                          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="flaticon-facebook-app-symbol"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="flaticon-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="flaticon-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="flaticon-instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="quote">
            <h4>"{currentService?.quote || 'Amazing looking theme and instantly turns your application into a great looking one. Very happy with the way the theme looks.'}"</h4>
            <p>{currentService?.client || 'Robert'} - <span>{currentService?.quoteSource || 'Yellow Theme'}</span></p>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12 strategies s2">
              <h2>Our Strategies</h2>
              <p>{currentService?.strategies || 'No strategies provided.'}</p>
              <ul>
                {currentService?.strategiesList?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || <li>No strategies available.</li>}
              </ul>
            </div>
            <div className="col-lg-6 col-12 strategies">
              <h2>Our Approach</h2>
              <p>{currentService?.approach || 'No approach provided.'}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <img src={Psing1} alt={currentService?.title || 'Image 1'} />
            </div>
            <div className="col-lg-6 col-12">
              <img src={Psing2} alt={currentService?.title || 'Image 2'} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12 strategies s3">
              <h2>Received Goals</h2>
              <p>{currentService?.goals || 'No goals provided.'}</p>
              <ul>
                {currentService?.goalsList?.map((goal, index) => (
                  <li key={index}>{goal}</li>
                )) || <li>No goals available.</li>}
              </ul>
            </div>
            <div className="col-lg-6 col-12 strategies s3">
              <h2>Result</h2>
              <p>{currentService?.result || 'No results provided.'}</p>
              <ul>
                {currentService?.resultList?.map((result, index) => (
                  <li key={index}>{result}</li>
                )) || <li>No results available.</li>}
              </ul>
            </div>
          </div>
        </div>
        <div className="AppointmentFrom">
          <div className="container">
            <div className="cta_form_s2">
              <div className="title s2">
                <h3>Make An Appointment</h3>
                <p>Get in touch with us to see how we can help you with your Problems.</p>
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
