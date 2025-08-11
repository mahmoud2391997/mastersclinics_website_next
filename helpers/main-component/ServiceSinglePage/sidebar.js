"use client"
import React, { useMemo,  useEffect, useCallback } from "react"

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

 const handleBranchChange = useCallback((branchId) => {
    const finalBranchId = branchId === "all" ? null : branchId;
    onBranchChange(finalBranchId);
  }, [onBranchChange]);

  // Change this to accept direct value instead of event
  const handleDepartmentChange = useCallback((deptId) => {
    const finalDeptId = deptId === "all" ? null : deptId;
    onDepartmentChange(finalDeptId);
  }, [onDepartmentChange]);

  return (
    <div className="service_sidebar w-full bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0 rtl">
        {/* Search Widget */}
        <div className="search_widget flex-1">
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

        {processedBranches.length > 0 && (
          <div className="branches_widget flex-1">
            <CustomSelect
              options={[
                { value: "all", label: "جميع الفروع" },
                ...processedBranches.map(branch => ({
                  value: branch.id,
                  label: branch.name
                }))
              ]}
              value={currentBranch || "all"}
              onChange={handleBranchChange} // Now expects direct value
            />
          </div>
        )}

        {/* Departments Filter Widget */}
        <div className="departments_widget flex-1">
          <CustomSelect
            options={[
              { value: "all", label: "جميع الأقسام" },
              ...departments.map(dept => ({
                value: dept.id,
                label: dept.name
              }))
            ]}
            value={currentDepartment || "all"}
            onChange={handleDepartmentChange} // Now expects direct value
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ServiceSidebar)
import { useState, useRef } from "react";


export  const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleOptionClick = (selectedValue) => {
    onChange(selectedValue); // Pass the value directly, not an event
    setIsOpen(false);
  };
  useEffect(() => {
    if (!isMounted) return;
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted]);

  // Find the selected option's label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex items-center justify-between p-2 border-b-2 ${
          isOpen ? "border-[#dec06a]" : "border-gray-300"
        } cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
 {isMounted && isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-b-0 ${
                value === option.value ? "bg-[#dec06a] text-white" : ""
              }`}
              onClick={() => handleOptionClick(option.value)} // Pass value directly
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};