import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamBySlug } from '../../store/slices/doctor';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import ContactForm from '../ServiceSinglePage/ServiceFrom';
import logo from '../../images/logo-2.svg';
import Arrow from '../../images/team-single/arrow.svg'
const TeamSinglePage = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();
    console.log(slug);
    
    // SINGLE useSelector call to get all state at once
    const teamsState = useSelector((state) => state.teams || {});
    const { 
        selectedTeam: currentMember = null, 
        loading = false, 
        error = null 
    } = teamsState;

    useEffect(() => {
        dispatch(fetchTeamBySlug(slug));
    }, [dispatch, slug]);

    // Debug logs using the already selected state
    console.log('Teams state:', teamsState);
    console.log('Current team member:', currentMember);

    if (loading) return <div className="text-center py-5">Loading doctor profile...</div>;
    if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;
    if (!currentMember) {
        console.warn('No team member found:', teamsState);
        return <div className="text-center py-5">Doctor data not available</div>;
       }   // Rest of your component...
    return (
        <Fragment>
            <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={currentMember.name} pagesub={'Doctor Single'} />
            
            <section className="team_single_page section-padding">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6 col-12">
                            <div className="doctor_profile">
                                <img 
                                    src={currentMember.image} 
                                    alt={currentMember.title} 
                                    loading="lazy"
                                />
                                <div className="content">
                                    <h3>{currentMember.name}</h3>
                                    <span>{currentMember.specialty || 'Professional Surgeon & Expert Doctor'}</span>
                                    <ul className="social-links">
                                        {currentMember.socialLinks?.map((link, index) => (
                                            <li key={index}>
                                                <Link to={link.url} target="_blank" rel="noopener noreferrer">
                                                    <i className={link.iconClass}></i>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 col-12">
                            <div className="doctor_info">
                                <h2>Personal Info</h2>
                                <p>
                                    {currentMember.bio}
                                </p>
                            </div>
                            
                            <div className="doctor_info s2">
                                <h2>Education</h2>
                                <ul className="education-list">
                                    {currentMember.education?.map((item, index) => (
                                        <li key={index}>
                                            <img src={Arrow} alt="" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="experience_wrap">
                        <div className="top_content">
                            <h2>Personal Experience</h2>
                            {currentMember.experience?.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        
                        <div className="skill_wrap">
                            {/* <div className="skill">
                                <h2>Professional Skills</h2>
                                {progressData.map((item, index) => (
                                    <div className="progress_item" key={index}>
                                        <span>{item.label}</span>
                                        <div className="progres">
                                            <div 
                                                className="progress-value" 
                                                style={{ width: `${item.value}%` }}
                                                aria-valuenow={item.value}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <span>{item.value}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                            
                            <div className="achievements">
                                <h2>Achievements</h2>
                                <ul>
                                    {currentMember.achievements?.map((achievement, index) => (
                                        <li key={index}>
                                            <span>{achievement.year}: </span>
                                            {achievement.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                            <ContactForm doctorId={currentMember.id} />
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer hclass={'wpo-site-footer_s2'} />
            <Scrollbar />
        </Fragment>
    );
};

export default TeamSinglePage;