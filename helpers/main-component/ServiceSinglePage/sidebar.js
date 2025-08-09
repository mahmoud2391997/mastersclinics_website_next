"use client"
import React, { useMemo, useState, useEffect, useCallback } from "react"

const ServiceSidebar = ({
  services = [],
  branches = [],
  onSearchChange,
  onDepartmentChange,
  onBranchChange = () => {}, // Default empty function
  currentSearch = "",
  currentDepartment = null,
  currentBranch = null,
  searchPlaceholder = "ابحث عن الخدمات...",
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(currentSearch)

  // Extract unique departments from services
  const departments = useMemo(() => {
    const deptMap = new Map()
    services.forEach((service) => {
      if (service.department_id && !deptMap.has(service.department_id)) {
        deptMap.set(service.department_id, {
          id: service.department_id,
          name: service.department_name || `القسم ${service.department_id}`,
        })
      }
    })
    return Array.from(deptMap.values())
  }, [services])

  // Process branches data
  const processedBranches = useMemo(() => {
    return branches.map(branch => ({
      id: branch.id,
      name: branch.name.trim()
    }))
  }, [branches])

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearchTerm)
    }, 300)
    return () => clearTimeout(handler)
  }, [localSearchTerm, onSearchChange])

  useEffect(() => {
    setLocalSearchTerm(currentSearch)
  }, [currentSearch])

  const handleSearchChange = useCallback((e) => {
    setLocalSearchTerm(e.target.value)
  }, [])

  const handleDepartmentChange = useCallback((deptId) => {
    onDepartmentChange(deptId)
  }, [onDepartmentChange])

  const handleBranchChange = useCallback((e) => {
    const branchId = e.target.value === "all" ? null : e.target.value
    onBranchChange(branchId)
  }, [onBranchChange])

  return (
    <div className="service_sidebar space-y-6 sticky top-4 rtl">
      {/* Search Widget */}
      <div className="search_widget widget bg-white p-4 rounded-lg shadow-sm">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          <input
            className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={localSearchTerm}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
          />
          <svg
            className="absolute left-3 top-3 h-4 w-4 text-gray-400"
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

      {/* Branches Filter Widget */}
      {processedBranches.length > 0 && (
        <div className="branches_widget widget bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-right text-[#dec06a]">الفروع</h2>
          <select
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#dec06a] focus:border-transparent"
            value={currentBranch || "all"}
            onChange={handleBranchChange}
          >
            <option value="all">جميع الفروع</option>
            {processedBranches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Departments Filter Widget */}
      <div className="departments_widget widget bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-right text-[#dec06a]">الأقسام الطبية</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <button
            onClick={() => handleDepartmentChange(null)}
            className={`w-full text-right py-2 px-3 rounded transition ${!currentDepartment ? "bg-[#dec06a] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            جميع الأقسام
          </button>
          {departments.map((department) => (
            <button
              key={department.id}
              onClick={() => handleDepartmentChange(department.id)}
              className={`w-full text-right py-2 px-3 rounded transition ${currentDepartment === department.id ? "bg-[#dec06a] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {department.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ServiceSidebar)