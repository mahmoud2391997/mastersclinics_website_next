"use client"

import { Fragment, useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Components
import Navbar from "../../helpers/components/Navbar/Navbar"
import PageTitle from "../../helpers/components/pagetitle/PageTitle"
import CtafromSection from "../../helpers/components/CtafromSection/CtafromSection"
import Footer from "../../helpers/components/footer/Footer"
import Scrollbar from "../../helpers/components/scrollbar/scrollbar"
import SectionTitle from "../../helpers/components/SectionTitle/SectionTitle"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { fetchTeams } from "@/store/slices/doctor"
import { getImageUrl } from "@/helpers/hooks/imageUrl"

const V0_PLACEHOLDER_IMAGE = "/download.png"

const TeamPage = () => {
  const searchParams = useSearchParams()
  const urlDepartmentId = searchParams.get("departmentId")

  return (
    <Fragment>
      <Navbar hclass={"wpo-site-header wpo-site-header-s2"} />
            <PageTitle pageTitle={'اطبائنا'} pagesub={'الاطباء'} bgImage={'/doctors.png'} />
      <section className="section-padding">
        <div >
          <TeamSection
            hclass="team_section_s2"
            isTeamsPage={true}
            showSectionTitle={false}
            urlDepartmentId={urlDepartmentId}
          />
        </div>
      </section>
      <Footer hclass={"wpo-site-footer"} />
      <Scrollbar />
    </Fragment>
  )
}

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
}) => {
  const dispatch = useDispatch()
  const { teams = [], loading = false, error = null } = useSelector((state) => state.teams || {})

  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState(departmentId || null)
  const [selectedBranch, setSelectedBranch] = useState(branchId || "all")
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const sliderRef = useRef(null)

  // Initialize state from URL params on first load
  useEffect(() => {
    if (!initialLoadComplete && urlDepartmentId) {
      const deptId = Number.parseInt(urlDepartmentId, 10)
      if (!isNaN(deptId)) {
        setSelectedDepartment(deptId)
      }
      setInitialLoadComplete(true)
    }
  }, [urlDepartmentId, initialLoadComplete])

  // Fetch teams based on filters
useEffect(() => {
  // Only fetch once on mount (fetch all teams)
  dispatch(fetchTeams({}))
}, [dispatch])


  // Extract all possible departments (memoized)
  const departments = useMemo(() => {
    const deptMap = new Map()
    teams.forEach((doctor) => {
      if (doctor.department_id) {
        if (!deptMap.has(doctor.department_id)) {
          deptMap.set(doctor.department_id, {
            id: doctor.department_id,
            name: doctor.department_name || `القسم ${doctor.department_id}`,
          })
        }
      }
    })
    return Array.from(deptMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [teams])

  // Extract all possible branches (memoized)
  const branches = useMemo(() => {
    const branchMap = new Map()
    teams.forEach((doctor) => {
      if (doctor.branch_id && doctor.branch_name) {
        if (!branchMap.has(doctor.branch_id)) {
          branchMap.set(doctor.branch_id, {
            id: doctor.branch_id,
            name: doctor.branch_name,
          })
        }
      }
    })
    return Array.from(branchMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [teams])

  // Filter teams based on current state (memoized)
  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesSearch =
        searchTerm === "" ||
        team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.department_name?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBranch = selectedBranch === "all" || team.branch_id?.toString() === selectedBranch?.toString()
      const matchesDepartment = !selectedDepartment || team.department_id?.toString() === selectedDepartment?.toString()

      return matchesSearch && matchesBranch && matchesDepartment
    })
  }, [teams, searchTerm, selectedBranch, selectedDepartment])

  const displayedTeams = sliceEnd ? filteredTeams.slice(sliceStart, sliceEnd) : filteredTeams.slice(sliceStart)

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
  }

  // Event handlers (memoized)
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleDepartmentChange = useCallback((deptId) => {
    setSelectedDepartment(deptId === selectedDepartment ? null : deptId)
  }, [selectedDepartment])

  const handleBranchChange = useCallback((e) => {
    setSelectedBranch(e.target.value)
  }, [])

  // Render individual team card
  const renderTeamCard = (team, index) => (
    <div className={slider ? "px-2" : "w-full md:w-1/2 lg:w-1/3 px-4 mb-8"} key={index}>
      <div className="team_card bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
        <div className="relative p-4">
          <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3">
            <div className="relative overflow-hidden rounded-[20px]">
              <img
                src={team.image ? getImageUrl(team.image) : V0_PLACEHOLDER_IMAGE}
                alt={team.name || "Team Member"}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = V0_PLACEHOLDER_IMAGE
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
          <h3 className="text-xl font-bold mb-2 text-gray-900 font-['IBM_Plex_Sans_Arabic_bold']">{team.name}</h3>
          <span className="text-[#dec06a] mb-4 block font-medium">
            {team.specialty || ""}
            {team.department_name && ` - ${team.department_name}`}
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
            <span className="flex-1 text-end text-white">{isTeamsPage ? "حجز موعد" : "عرض الملف"}</span>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <section className={hclass}>
      <div >
        {showSectionTitle && (
          <div className="row justify-center">
            <div className="col-lg-9 col-12">
              <SectionTitle
                title={branchId ? "اطباء الفرع" : "فريقنا"}
                subtitle={
                  isTeamsPage ? "أطباؤنا المتخصصون" : branchId ? "متاح بالفرع أطباؤنا المتخصصون" : "تعرف على أخصائيينا"
                }
              />
            </div>
          </div>
        )}

        {isTeamsPage ? (
  <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-8 rtl">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="service_sidebar space-y-6 sticky top-4 rtl">
            {/* Search Widget */}
            <div className="search_widget widget bg-white p-4 rounded-lg shadow-sm">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="ابحث عن طبيب أو تخصص..."
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
              </form>
            </div>

            {/* Departments Widget */}
            <div className="departments_widget widget bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-right text-amber-600">الأقسام الطبية</h2>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => handleDepartmentChange(null)}
                  className={`w-full text-right py-2 px-3 rounded transition ${
                    !selectedDepartment ? "bg-amber-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  جميع الأقسام
                </button>
                {departments.map((department) => (
                  <button
                    key={department.id}
                    onClick={() => handleDepartmentChange(department.id)}
                    className={`w-full text-right py-2 px-3 rounded transition ${
                      selectedDepartment === department.id
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {department.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Branches Widget */}
            <div className="branches_widget widget bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-right text-amber-600">الفروع</h2>
              <select
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={selectedBranch}
                onChange={handleBranchChange}
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
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
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
                  <p className="text-gray-500 text-lg">لا توجد نتائج مطابقة للبحث</p>
                </div>
              ) : (
                <>
                  {isMobile ? (
                    <div className="team-slider-container py-4">
                      <Slider ref={sliderRef} {...sliderSettings}>
                        {displayedTeams.map((team, index) => renderTeamCard(team, index))}
                      </Slider>
                    </div>
                  ) : (
                    <div className="flex flex-wrap">
                      {displayedTeams.map((team, index) => renderTeamCard(team, index))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
        ) : (
          <>
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
                    <p className="text-gray-500 text-lg">لا يوجد أطباء متاحون حالياً</p>
                  </div>
                ) : (
                  <>
                    {slider ? (
                      <div className="team-slider-container py-4">
                        <Slider ref={sliderRef} {...sliderSettings}>
                          {displayedTeams.map((team, index) => renderTeamCard(team, index))}
                        </Slider>
                      </div>
                    ) : (
                      <div className="flex flex-wrap ">
                        {displayedTeams.map((team, index) => renderTeamCard(team, index))}
                      </div>
                    )}
                    {!branchId && (
                      <div className="flex justify-center mt-12">
                        <Link
                          href="/teams"
                          className="relative pl-16 inline-flex items-center justify-between bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83] text-white font-bold rounded-full py-3 px-8 hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4"
                        >
                          <span className="absolute left-3 w-8 h-8 bg-white text-gradient rounded-full flex items-center justify-center flex-shrink-0">
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
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default TeamPage