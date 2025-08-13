"use client"
import React, { useMemo, useState, useEffect, useCallback } from "react"
import { useRef } from "react";

export const CustomSelect = ({ 
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
    onChange(selectedValue);
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
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ServiceSidebar = ({
  services = [],
  branches = [],
  onSearchChange,
  onDepartmentChange,
  onBranchChange = () => {},
  currentSearch = "",
  currentDepartment = null,
  currentBranch = null,
  searchPlaceholder = "ابحث عن الخدمات...",
  departments = [],
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(currentSearch);

  // Process branches data consistently
  const processedBranches = useMemo(() => {
    return branches.map(branch => ({
      id: branch.id.toString(), // Ensure string type for consistency
      name: branch.name.trim()
    }));
  }, [branches]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearchTerm, onSearchChange]);

  useEffect(() => {
    setLocalSearchTerm(currentSearch);
  }, [currentSearch]);

  const handleSearchChange = useCallback((e) => {
    setLocalSearchTerm(e.target.value);
  }, []);

  const handleDepartmentChange = useCallback((deptId) => {
    onDepartmentChange(deptId);
  }, [onDepartmentChange]);

  const handleBranchChange = useCallback((branchId) => {
    onBranchChange(branchId === "all" ? null : branchId);
  }, [onBranchChange]);

  return (
    <div className="service_sidebar md:flex gap-5 items-center justify-around space-y-6 rtl">
      {/* Search Widget */}
      <div className="search_widget md:!w-1/2 w-full widget bg-white p-4 rounded-lg shadow-sm">
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
        <div className="branches_widget flex-1">
          <CustomSelect
            options={[
              { value: "all", label: "جميع الفروع" },
              ...processedBranches.map(branch => ({
                value: branch.id,
                label: branch.name
              }))
            ]}
            value={currentBranch ? currentBranch.toString() : "all"}
            onChange={handleBranchChange}
            placeholder="اختر فرع..."
          />
        </div>
      )}

      {/* Departments Filter Widget - Mobile Only */}
      <div className="md:hidden block departments_widget widget bg-white p-4 rounded-lg shadow-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-right text-[#dec06a]">الأقسام الطبية</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <button
            onClick={() => handleDepartmentChange(null)}
            className={`w-full text-right py-2 px-3 rounded transition ${
              !currentDepartment ? "bg-[#dec06a] text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            جميع الأقسام
          </button>
          {departments.map((department) => (
            <button
              key={department.id}
              onClick={() => handleDepartmentChange(department.id)}
              className={`w-full text-right py-2 px-3 rounded transition ${
                currentDepartment === department.id ? "bg-[#dec06a] text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {department.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceSidebar);