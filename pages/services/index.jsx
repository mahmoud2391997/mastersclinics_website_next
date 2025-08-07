"use client"
import { Fragment, useEffect, useState } from "react"
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

// Spinner
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

const ServicePage = () => {
  const dispatch = useDispatch()
  const { services = [], loading = false, error = null } = useSelector((state) => state.services || {})
  const searchParams = useSearchParams()
  const departmentIdFromUrl = searchParams.get("departmentId")

  const [searchTerm, setSearchTerm] = useState("")
  // Initialize selectedDepartment with the value from URL search params
  const [selectedDepartment, setSelectedDepartment] = useState(
    departmentIdFromUrl ? Number.parseInt(departmentIdFromUrl, 10) : null,
  )

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  // Update selectedDepartment if the URL departmentId changes
  useEffect(() => {
    const newDepartmentId = searchParams.get("departmentId")
    setSelectedDepartment(newDepartmentId ? Number.parseInt(newDepartmentId, 10) : null)
  }, [searchParams])

  console.log(services)

  const parseServiceData = (service) => {
    try {
      // Parse doctors and branches
      const doctors_ids = service.doctors_ids ? JSON.parse(service.doctors_ids) : []
      const branches = service.branches ? JSON.parse(service.branches) : []

      // Get doctor details (assuming you have this data)
      const doctor_details = service.doctor_details || doctors_ids.map((id) => ({ id, name: `طبيب ${id}` }))
      // Get branch details (assuming you have this data)
      const branch_details = service.branch_details || branches.map((id) => ({ id, name: `فرع ${id}` }))

      return {
        id: service.id,
        department_id: service.department_id,
        category_id: service.category_id,
        name_ar: service.name_ar || "",
        name_en: service.name_en || "",
        description: service.description || "خدمة مقدمة من قسم علاجى",
        doctors_ids,
        branches,
        image: service.image || null,
        is_active: service.is_active || 0,
        priority: service.priority || 0,
        created_at: service.created_at,
        updated_at: service.updated_at,
        department_name: service.department_name || `القسم ${service.department_id}`,
        doctor_details,
        branch_details,
      }
    } catch (e) {
      console.error("Error parsing service data:", e)
      return {
        ...service,
        doctors_ids: [],
        branches: [],
        doctor_details: [],
        branch_details: [],
        department_name: service.department_name || `القسم ${service.department_id}`,
      }
    }
  }

  const parsedServices = services.map(parseServiceData)

  return (
    <Fragment>
      <Head>
        <title>خدماتنا | العيادة الطبية</title>
        <meta name="description" content="تصفح خدماتنا الطبية الشاملة" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar hclass={"wpo-site-header wpo-site-header-s2"} />
      <PageTitle pageTitle={"خدماتنا"} pagesub={"الخدمات"} bgImage={"/services.webp"} />
      
      {/* Add the new devices section buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <Link 
            href="/devices?departmentName=أجهزة التغذية" 
            className="bg-gradient-to-r from-[#CBA853] to-[#A58532] text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-2">أجهزة التغذية ونحت القوام</h3>
            <p className="text-sm">أحدث الأجهزة لتحقيق القوام المثالي</p>
          </Link>
          
          <Link 
            href="/devices?departmentName=أجهزة الجلدية" 
            className="bg-gradient-to-r from-[#4a90e2] to-[#2a5a9a] text-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-2">أجهزة الجلدية والليزر</h3>
            <p className="text-sm">أحدث تقنيات العناية بالبشرة وإزالة الشعر</p>
          </Link>
        </div>
      </div>
      
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
        <div className="container mx-auto px-4 py-8 flex flex-col-reverse lg:flex-row gap-8">
          <main className="lg:w-3/4">
            <ServiceSection services={parsedServices} searchTerm={searchTerm} selectedDepartment={selectedDepartment} />
          </main>
          <aside className="lg:w-1/4">
            <ServiceSidebar
              services={parsedServices}
              onSearchChange={setSearchTerm}
              onDepartmentChange={setSelectedDepartment}
              currentSearch={searchTerm}
              currentDepartment={selectedDepartment}
            />
          </aside>
        </div>
      )}
      <Footer hclass={"wpo-site-footer"} />
      <Scrollbar />
    </Fragment>
  )
}

export default ServicePage