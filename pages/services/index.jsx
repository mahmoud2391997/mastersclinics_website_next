"use client"
import { Fragment, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { fetchServices } from "../../store/slices/services"
import Navbar from "../../helpers/components/Navbar/Navbar"
import PageTitle from "../../helpers/components/pagetitle/PageTitle"
import ServiceSection from "../../helpers/main-component/servicesSection/index"
import ServiceSidebar from "../../helpers/main-component/ServiceSinglePage/sidebar"
import Footer from "../../helpers/components/footer/Footer"
import Scrollbar from "../../helpers/components/scrollbar/scrollbar"
import Head from "next/head"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const LoadingSpinner = ({ text = "جاري التحميل...", size = "medium", color = "primary" }) => {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  }
  const colorClasses = {
    primary: "border-t-primary border-r-primary border-b-transparent border-l-transparent",
    white: "border-t-white border-r-white border-b-transparent border-l-transparent",
    gray: "border-t-gray-500 border-r-gray-500 border-b-transparent border-l-transparent",
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-3 rtl">
      <div
        className={`animate-spin rounded-full border border-solid ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ animationDuration: "0.75s" }}
      ></div>
      {text && <p className="text-gray-600 text-sm md:text-base">{text}</p>}
    </div>
  )
}

LoadingSpinner.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "white", "gray"]),
}

const parseServiceData = (service) => {
  try {
    const doctors_ids = service.doctors_ids ? JSON.parse(service.doctors_ids) : []
    const branches = service.branches ? JSON.parse(service.branches) : []

    return {
      ...service,
      doctors_ids,
      branches,
      doctor_details: service.doctor_details || doctors_ids.map((id) => ({ id, name: `طبيب ${id}` })),
      branch_details: service.branch_details || branches.map((id) => ({ id, name: `فرع ${id}` })),
      branch_names: service.branch_names || []
    }
  } catch (e) {
    console.error("Error parsing service data:", e)
    return {
      ...service,
      doctors_ids: [],
      branches: [],
      doctor_details: [],
      branch_details: [],
      branch_names: []
    }
  }
}

const extractBranches = (services) => {
  const branchMap = new Map()
  
  services.forEach(service => {
    if (service.branch_names && service.branch_names.length > 0) {
      service.branch_names.forEach((branchName, index) => {
        const branchId = service.branches[index] || branchName
        const normalizedName = branchName.trim()
        if (!branchMap.has(branchId)) {
          branchMap.set(branchId, {
            id: branchId,
            name: normalizedName
          })
        }
      })
    }
  })
  
  return Array.from(branchMap.values())
}

const extractDepartments = (services) => {
  const departmentMap = new Map()
  
  services.forEach(service => {
    if (service.department_id && service.department_name) {
      if (!departmentMap.has(service.department_id)) {
        departmentMap.set(service.department_id, {
          id: service.department_id,
          name: service.department_name.trim()
        })
      }
    }
  })
  
  return Array.from(departmentMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

const ServicePage = () => {
  const dispatch = useDispatch()
  const { services = [], loading = false, error = null } = useSelector((state) => state.services || {})
  const searchParams = useSearchParams()
  const departmentIdFromUrl = searchParams.get("departmentId")
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState(
    departmentIdFromUrl ? Number.parseInt(departmentIdFromUrl, 10) : null,
  )
  const [selectedBranch, setSelectedBranch] = useState(null)

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  useEffect(() => {
    const newDepartmentId = searchParams.get("departmentId")
    setSelectedDepartment(newDepartmentId ? Number.parseInt(newDepartmentId, 10) : null)
  }, [searchParams])

  const parsedServices = useMemo(() => services.map(parseServiceData), [services])
  const branches = useMemo(() => extractBranches(parsedServices), [parsedServices])
  const departments = useMemo(() => extractDepartments(parsedServices), [parsedServices])

  const filteredServices = useMemo(() => {
    return parsedServices.filter(service => {
      const departmentMatch = !selectedDepartment || service.department_id === selectedDepartment
      let branchMatch = true
      
      if (selectedBranch && selectedBranch !== "all") {
        branchMatch = service.branches.some(branch => branch.toString() === selectedBranch.toString()) || 
                     service.branch_names.some(name => {
                       const branchId = branches.find(b => b.name.trim() === name.trim())?.id
                       return branchId?.toString() === selectedBranch.toString()
                     })
      }
      
      return departmentMatch && branchMatch
    })
  }, [parsedServices, selectedDepartment, selectedBranch, branches])

  return (
    <Fragment>
      <Head>
        <title>خدماتنا | العيادة الطبية</title>
        <meta name="description" content="تصفح خدماتنا الطبية الشاملة" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar hclass={"wpo-site-header wpo-site-header-s2"} />
      <PageTitle pageTitle={"خدماتنا"} pagesub={"الخدمات"} bgImage={"/services.webp"} />
      
      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <LoadingSpinner text="جارٍ تحميل الخدمات..." />
        </div>
      ) : error ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-2xl font-bold text-red-500 mb-4">حدث خطأ أثناء تحميل الخدمات</h1>
          <button
            onClick={() => dispatch(fetchServices())}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Desktop Department Tabs - Hidden on mobile */}
          <div className="hidden md:block mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
  <button
    onClick={() => setSelectedDepartment(null)}
    className={`flex-1 px-6 py-3 text-sm font-medium text-center ${
      !selectedDepartment
        ? 'text-[#dec06a] border-b-2 border-[#dec06a]'
        : 'text-gray-500 hover:text-gray-700'
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
          ? 'text-[#dec06a] border-b-2 border-[#dec06a]'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {department.name}
    </button>
  ))}
</div>

          </div>

          <ServiceSidebar
            services={parsedServices}
            branches={branches}
            onSearchChange={setSearchTerm}
            onDepartmentChange={setSelectedDepartment}
            onBranchChange={setSelectedBranch}
            currentSearch={searchTerm}
            currentDepartment={selectedDepartment}
            currentBranch={selectedBranch}
            departments={departments}
            showDepartmentDropdown={false}
          />
          
          <main className="w-full">
            <ServiceSection 
              services={filteredServices}
              searchTerm={searchTerm}
              selectedDepartment={selectedDepartment}
              selectedBranch={selectedBranch}
              showTitle={false}
            />
          </main>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          {selectedDepartment === 15 && (
            <Link 
              href="/devices?departmentName=أجهزة التغذية" 
              className="bg-gradient-to-r from-[#CBA853] to-[#A58532] text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-2">أجهزة التغذية ونحت القوام</h3>
              <p className="text-sm">أحدث الأجهزة لتحقيق القوام المثالي</p>
            </Link>
          )}
          {selectedDepartment === 6 && (
            <Link 
              href="/devices?departmentName=أجهزة الجلدية" 
              className="bg-gradient-to-r from-[#4a90e2] to-[#2a5a9a] text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-2">أجهزة الجلدية والليزر</h3>
              <p className="text-sm">أحدث تقنيات العناية بالبشرة وإزالة الشعر</p>
            </Link>
          )}
        </div>
      </div>
      <Footer hclass={"wpo-site-footer"} />
      <Scrollbar />
    </Fragment>
  )
}

export default ServicePage