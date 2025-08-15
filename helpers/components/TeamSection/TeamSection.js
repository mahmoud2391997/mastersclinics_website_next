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
import ServiceSidebar from "../../../helpers/main-component/ServiceSinglePage/sidebar"

const V0_PLACEHOLDER_IMAGE = "/download.png";

const TeamSection = ({
  hclass = "",
  urlDepartmentId = null,
  sliceStart = 0,
  sliceEnd = null,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [optimisticWishlist, setOptimisticWishlist] = useState({});
  
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);
  const itemsPerPage = 6;

  // Check mobile view
  const checkMobileView = () => {
    setIsMobile(window.innerWidth < 768);
  };
// State to toggle full team view
const [showAllTeams, setShowAllTeams] = useState(false);

// Determine which teams to display

// Initial load for URL department ID
useEffect(() => {
  if (!initialLoadComplete && urlDepartmentId) {
    const deptId = Number.parseInt(urlDepartmentId, 10);
    if (!isNaN(deptId)) {
      setSelectedDepartment(deptId);
    }
    setInitialLoadComplete(true);
  }
}, [urlDepartmentId, initialLoadComplete]);

// Fetch teams and check auth on mount
useEffect(() => {
  dispatch(fetchTeams({}));
  checkMobileView();
  window.addEventListener("resize", checkMobileView);
  
  // Check authentication
  const authStatus = localStorage.getItem("isAuthenticated") === "true";
  const userData = JSON.parse(localStorage.getItem("user"));
  setIsAuthenticated(authStatus);
  setUser(userData);
  
  if (authStatus && userData) {
    fetchWishlistItems(userData.id);
  }
  
  return () => {
    window.removeEventListener("resize", checkMobileView);
    clearTimeout(timeoutRef.current);
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
  if (isTeamsPage || showAllTeams) {
    return filteredTeams;
  }
  // Show limited number when not on TeamsPage and "show all" not clicked
  return filteredTeams.slice(0, 6); // example: show 6 initially
}, [filteredTeams, isTeamsPage, showAllTeams]);
// Pagination logic
const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeams.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Determine which teams to display
 

  // Fetch wishlist items
  const fetchWishlistItems = async (clientId) => {
    try {
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/wishlist/${clientId}`
      );
      if (!response.ok) throw new Error("Failed to fetch wishlist items");
      const data = await response.json();
      setWishlistItems(data.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      toast.error("فشل في تحميل المفضلة");
      setWishlistItems([]);
    }
  };

  // Check if item is in wishlist
  const isWishlisted = (itemId) => {
    if (optimisticWishlist[itemId] !== undefined) {
      return optimisticWishlist[itemId];
    }
    return wishlistItems.some(
      (item) => item.item_id === itemId && item.item_type === "doctor"
    );
  };

  // Toggle wishlist item
  const toggleWishlist = async (itemId, e) => {
    e.stopPropagation();

    if (!isAuthenticated || !user) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة إلى المفضلة");
      router.push("/auth/login");
      return;
    }

    const currentStatus = isWishlisted(itemId);
    const newStatus = !currentStatus;

    // Optimistic update
    setOptimisticWishlist((prev) => ({ ...prev, [itemId]: newStatus }));

    try {
      const endpoint = "https://www.ss.mastersclinics.com/api/wishlist";
      const method = newStatus ? "POST" : "DELETE";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: user.id,
          item_type: "doctor",
          item_id: itemId,
        }),
      });

      if (!response.ok) {
        throw new Error(`فشل في ${newStatus ? "الإضافة" : "الإزالة"} من المفضلة`);
      }

      // Update actual wishlist items
      if (newStatus) {
        setWishlistItems((prev) => [
          ...prev,
          { item_id: itemId, item_type: "doctor" },
        ]);
      } else {
        setWishlistItems((prev) =>
          prev.filter(
            (item) =>
              !(item.item_id === itemId && item.item_type === "doctor")
          )
        );
      }

      toast.success(
        newStatus ? "تمت إضافة الطبيب إلى المفضلة" : "تمت إزالة الطبيب من المفضلة"
      );
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error(err.message || "حدث خطأ أثناء تحديث المفضلة");
      // Rollback optimistic update
      setOptimisticWishlist((prev) => ({
        ...prev,
        [itemId]: currentStatus,
      }));
    } finally {
      // Clear optimistic update after a delay
      timeoutRef.current = setTimeout(() => {
        setOptimisticWishlist((prev) => {
          const newState = { ...prev };
          delete newState[itemId];
          return newState;
        });
      }, 1000);
    }
  };

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
    className={slider ? "px-2" : "w-full md:w-1/2 lg:w-1/3 px-4 mb-8"}
    key={index}
  >
    <div className="relative flex flex-col h-full bg-white rounded-[30px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      
      {/* Wishlist Button OUTSIDE overflow-hidden */}
      <button
        onClick={(e) => toggleWishlist(team.id, e)}
        className="absolute top-6 left-6 z-20 p-2 bg-white rounded-full shadow-lg border border-[#dec06a]/30 hover:bg-gray-100 transition-colors"
        aria-label={
          isWishlisted(team.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"
        }
      >
        {isWishlisted(team.id) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>

      {/* Image container WITH overflow-hidden */}
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

      {/* Filters & Search */}
{isTeamsPage && (
  <div className="container mx-auto px-4 mb-8">
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* Desktop Department Tabs */}
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

      {/* Search and Filters */}
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


        {/* Main Content */}
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
                <Slider ref={sliderRef} {...sliderSettings}>
                  {displayedTeams.map((team, index) =>
                    renderTeamCard(team, index)
                  )}
                </Slider>
                    {/* View All Button for non-teams page */}
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
              <>
                <div className="flex flex-wrap">
                  {displayedTeams.map((team, index) =>
                    renderTeamCard(team, index)
                  )}
                </div>

                {/* Pagination for Teams Page */}
                {/* {isTeamsPage && totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          paginate(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        السابق
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentPage === number
                                ? "bg-[#dec06a] text-white"
                                : "border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {number}
                          </button>
                        )
                      )}

                      <button
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        التالي
                      </button>
                    </nav>
                  </div>
                )} */}

            
              </>
            )}
          </>
        )}


      </div>
      
    </section>
  );
};

export default TeamSection;