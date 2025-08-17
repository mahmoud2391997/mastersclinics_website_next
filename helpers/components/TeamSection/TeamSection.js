"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "@/store/slices/doctor";
import Link from "next/link";
import { getImageUrl } from "@/helpers/hooks/imageUrl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ServiceSidebar from "../../../helpers/main-component/ServiceSinglePage/sidebar";
import WishlistButton from "../../../helpers/hooks/WishlistButton";

const V0_PLACEHOLDER_IMAGE = "/download.png";

const TeamSection = ({
  hclass = "",
  urlDepartmentId = null,
  showSectionTitle = true,
  branchId = null,
  departmentId = null,
  isTeamsPage = false,
  slider = false,
  sectionTitle = null,
  sectionSubtitle = null,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { teams = [], loading = false, error = null } = useSelector(
    (state) => state.teams || {}
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(departmentId || null);
  const [selectedBranch, setSelectedBranch] = useState(branchId || "all");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  // Check mobile view
  const checkMobileView = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    if (!initialLoadComplete && urlDepartmentId) {
      const deptId = Number.parseInt(urlDepartmentId, 10);
      if (!isNaN(deptId)) {
        setSelectedDepartment(deptId);
      }
      setInitialLoadComplete(true);
    }
  }, [urlDepartmentId, initialLoadComplete]);

  useEffect(() => {
    dispatch(fetchTeams({}));
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, [dispatch]);

  // Extract departments from teams
  const departments = useMemo(() => {
    const deptMap = new Map();
    teams.forEach((doctor) => {
      if (doctor.department_id) {
        if (!deptMap.has(doctor.department_id)) {
          deptMap.set(doctor.department_id, {
            id: doctor.department_id,
            name: doctor.department_name || `القسم ${doctor.department_id}`,
          });
        }
      }
    });
    return Array.from(deptMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [teams]);

  // Extract branches from teams
  const branches = useMemo(() => {
    const branchMap = new Map();
    teams.forEach((doctor) => {
      if (doctor.branch_id && doctor.branch_name) {
        if (!branchMap.has(doctor.branch_id)) {
          branchMap.set(doctor.branch_id, {
            id: doctor.branch_id,
            name: doctor.branch_name,
          });
        }
      }
    });
    return Array.from(branchMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [teams]);

  // Filter teams based on search, branch and department
  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesSearch =
        searchTerm === "" ||
        team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.department_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBranch =
        selectedBranch === "all" ||
        team.branch_id?.toString() === selectedBranch?.toString();
      const matchesDepartment =
        !selectedDepartment ||
        team.department_id?.toString() === selectedDepartment?.toString();
      
      return matchesSearch && matchesBranch && matchesDepartment;
    });
  }, [teams, searchTerm, selectedBranch, selectedDepartment]);

  const displayedTeams = useMemo(() => {
    if (isTeamsPage) {
      return filteredTeams;
    }
    return filteredTeams.slice(0, 6);
  }, [filteredTeams, isTeamsPage]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Render team card
  const renderTeamCard = (team, index) => (
    <div
      className={slider ? "px-2 mb-2" : "w-full md:w-1/2 lg:w-1/3 px-4 mb-8"}
      key={index}
    >
      <div className="relative flex flex-col h-full bg-white rounded-[30px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Wishlist Button */}
        <WishlistButton
          itemId={team.id}
          itemType="doctor"
          setShowAuthPopup={setShowAuthPopup}
          className="absolute top-6 left-6 z-20 p-2"
        />

        {/* Image container */}
        <div className="relative p-4 flex-shrink-0 overflow-hidden rounded-t-[30px]">
          <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3">
            <div className="relative overflow-hidden rounded-[20px] aspect-w-3 aspect-h-2">
              <img
                src={team.image ? getImageUrl(team.image) : V0_PLACEHOLDER_IMAGE}
                alt={team.name || "Team Member"}
                className="w-full h-full object-cover transform transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = V0_PLACEHOLDER_IMAGE;
                }}
              />
            </div>
            {team.branch_name && (
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 text-xs font-bold text-gray-800 shadow-lg border border-[#dec06a]/30">
                {team.branch_name}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="content p-6 text-center flex-grow flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-gray-900 font-['IBM_Plex_Sans_Arabic_bold']">
              {team.name}
            </h3>
            <span className="text-[#dec06a] block font-medium">
              {team.specialty || ""}
              {team.department_name && ` - ${team.department_name}`}
            </span>
          </div>

          {team.branch_name && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">الفرع:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="inline-block bg-gradient-to-r from-[#dec06a]/15 to-[#d4b45c]/15 text-[#dec06a] text-xs px-3 py-1.5 rounded-full border border-[#dec06a]/30 font-medium">
                  {team.branch_name}
                </span>
              </div>
            </div>
          )}

          <div className="mt-auto">
            <Link
              href={`/doctors/${team.id}`}
              className="w-full py-3 px-6 pl-16 gradient text-white font-bold rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-between relative"
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
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              <span className="flex-1 text-end text-white">
                {isTeamsPage ? "حجز موعد" : "عرض الملف"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className={hclass}>
      <div>
        {showSectionTitle && (
          <div className="row justify-center">
            <div className="col-lg-9 col-12">
              <SectionTitle
                title={branchId ? "اطباء الفرع" : sectionTitle || "فريقنا"}
                subtitle={
                  isTeamsPage
                    ? "أطباؤنا المتخصصون"
                    : branchId
                    ? "متاح بالفرع أطباؤنا المتخصصون"
                    : sectionSubtitle || "تعرف على أخصائيينا"
                }
              />
            </div>
          </div>
        )}

        {isTeamsPage && (
          <div className="container mx-auto px-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="hidden md:block mb-4">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setSelectedDepartment(null)}
                    className={`flex-1 px-6 py-3 text-sm font-medium text-center ${
                      !selectedDepartment
                        ? "text-[#dec06a] border-b-2 border-[#dec06a]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    الكل
                  </button>
                  {departments.map((department) => (
                    <button
                      key={department.id}
                      onClick={() => setSelectedDepartment(department.id)}
                      className={`flex-1 px-6 py-3 text-sm font-medium text-center ${
                        selectedDepartment === department.id
                          ? "text-[#dec06a] border-b-2 border-[#dec06a]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {department.name}
                    </button>
                  ))}
                </div>
              </div>

              <ServiceSidebar
                services={teams}
                branches={branches}
                onSearchChange={setSearchTerm}
                onDepartmentChange={setSelectedDepartment}
                onBranchChange={setSelectedBranch}
                currentSearch={searchTerm}
                currentDepartment={selectedDepartment}
                currentBranch={selectedBranch}
                departments={departments}
                showDepartmentDropdown={isMobile}
                searchPlaceholder={"ابحث عن الطبيب"}
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#dec06a]"></div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-10">
            <div className="text-red-500">Error loading team: {error}</div>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredTeams.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">
                  {isTeamsPage
                    ? "لا توجد نتائج مطابقة للبحث"
                    : "لا يوجد أطباء متاحون حالياً"}
                </p>
              </div>
            ) : slider ? (
              <div className="team-slider-container py-4">
                <Slider {...sliderSettings}>
                  {displayedTeams.map((team, index) =>
                    renderTeamCard(team, index)
                  )}
                </Slider>
                {!isTeamsPage && !branchId && (
                  <div className="flex justify-center mt-12">
                    <Link
                      href="/doctors"
                      className="relative pl-16 inline-flex items-center justify-between
                                 bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83]
                                 text-white font-bold rounded-full py-3 px-8
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
                        >
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                      </span>
                      <span className="flex-1 text-end">عرض جميع الأطباء</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap">
                {displayedTeams.map((team, index) =>
                  renderTeamCard(team, index)
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TeamSection;