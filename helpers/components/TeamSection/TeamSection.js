"use client";
import React, { useEffect, useState, useRef } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "@/store/slices/doctor";
import Link from "next/link";
import { getImageUrl } from "@/helpers/hooks/imageUrl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TeamSection = ({
  hclass = "",
  sliceStart = 0,
  sliceEnd = null,
  showSectionTitle = true,
  branchId = null,
  departmentId = null,
  isTeamsPage = false,
  slider = false, // New prop to enable/disable slider
}) => {
  const dispatch = useDispatch();
  const { teams = [], loading = false, error = null } = useSelector(
    (state) => state.teams || {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(branchId || "all");
  const [branches, setBranches] = useState([]);
  const placeholder = "/download.png";
  const sliderRef = useRef(null);

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
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Extract unique branches with names from teams data
  useEffect(() => {
    if (teams.length > 0) {
      const branchMap = new Map();
      
      teams.forEach(doctor => {
        if (doctor.branch_id && doctor.branch_name) {
          if (!branchMap.has(doctor.branch_id)) {
            branchMap.set(doctor.branch_id, {
              id: doctor.branch_id,
              name: doctor.branch_name
            });
          }
        }
      });

      setBranches(Array.from(branchMap.values()));
    }
  }, [teams]);

  // Filter teams based on search term and selected branch
  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = 
      selectedBranch === "all" || 
      team.branch_id?.toString() === selectedBranch;
    
    return matchesSearch && matchesBranch;
  });

  const displayedTeams = sliceEnd
    ? filteredTeams.slice(sliceStart, sliceEnd)
    : filteredTeams.slice(sliceStart);

  useEffect(() => {
    dispatch(fetchTeams({ branchId, departmentId }));
  }, [dispatch, branchId, departmentId]);

  // Render team card component
  const renderTeamCard = (team, index) => (
    <div className={slider ? "px-2" : "w-full md:w-1/2 lg:w-1/3 px-4 mb-8"} key={index}>
      <div className="team_card bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
        <div className="relative p-4">
          <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3">
            <div className="relative overflow-hidden rounded-[20px]">
              <img
                src={team.image ? getImageUrl(team.image) : placeholder}
                alt={team.name || "Team Member"}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.src = placeholder;
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

        <div className="content p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-gray-900 font-['IBM_Plex_Sans_Arabic_bold']">
            {team.name}
          </h3>
          <span className="text-[#dec06a] mb-4 block font-medium">
            {team.specialty || ""}
          </span>

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

          <Link
            href={`/doctors/${team.id}`}
            className="w-full py-3 px-6 pl-16 gradient text-white font-bold rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-between relative"
          >
            <span className="absolute left-3 w-8 h-8 bg-white text-gradient rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
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
  );

  return (
    <section className={hclass}>
      <div className="container mx-auto px-4">
        {showSectionTitle && (
          <div className="row justify-center">
            <div className="col-lg-9 col-12">
              <SectionTitle 
                title={ branchId ? "اطباء الفرع" :"فريقنا" }
                subtitle={isTeamsPage ? "أطباؤنا المتخصصون" : branchId ? "متاح بالفرع أطباؤنا المتخصصون":"تعرف على أخصائيينا"} 
              />
            </div>
          </div>
        )}

        {/* Conditionally render search and filter only on teams page */}
        {isTeamsPage && (
          <div className="flex flex-col md:flex-row gap-4 mb-8" dir="rtl">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن طبيب أو تخصص..."
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
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-10">
            <div className="alert alert-danger" role="alert">
              Error loading team: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredTeams.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">
                  {isTeamsPage ? "لا توجد نتائج مطابقة للبحث" : "لا يوجد أطباء متاحون حالياً"}
                </p>
              </div>
            ) : (
              <>
                {slider ? (
                  <div className="team-slider-container py-4">
                    <Slider ref={sliderRef} {...sliderSettings} className={"overflow-hidden"}>
                      {displayedTeams.map((team, index) => renderTeamCard(team, index))}
                    </Slider>
                  </div>
                ) : (
                  <div className="flex flex-wrap -mx-4">
                    {displayedTeams.map((team, index) => renderTeamCard(team, index))}
                  </div>
                )}

                {/* Add View All Teams button when not on teams page */}
                {!isTeamsPage & !branchId ? (
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
                ) : null}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TeamSection;