"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const ServiceSidebar = ({ 
  services = [], 
  onSearchChange, 
  onDepartmentChange,
  currentSearch = '',
  currentDepartment = null
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(currentSearch);

  // Extract unique departments from services with proper names
  const departments = useMemo(() => {
    const deptMap = new Map();
    services.forEach(service => {
      if (service.department_id) {
        // Use the department_name from the first service with this department_id
        if (!deptMap.has(service.department_id)) {
          deptMap.set(service.department_id, {
            id: service.department_id,
            name: service.department_name || `القسم ${service.department_id}`
          });
        }
      }
    });
    return Array.from(deptMap.values());
  }, [services]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearchTerm, onSearchChange]);

  const handleSearchChange = useCallback((e) => {
    setLocalSearchTerm(e.target.value);
  }, []);

  const handleDepartmentChange = useCallback((deptId) => {
    onDepartmentChange(deptId);
  }, [onDepartmentChange]);

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
            placeholder="ابحث عن الخدمات..."
          />
      
        </form>
      </div>

      {/* Departments Filter Widget */}
      <div className="departments_widget widget bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-right text-[#dec06a] ">الأقسام الطبية</h2>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <button
            onClick={() => handleDepartmentChange(null)}
            className={`w-full text-right py-2 px-3 rounded transition ${!currentDepartment ? 'bg-[#dec06a] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            جميع الأقسام
          </button>
          {departments.map(department => (
            <button
              key={department.id}
              onClick={() => handleDepartmentChange(department.id)}
              className={`w-full text-right py-2 px-3 rounded transition ${currentDepartment === department.id ? 'bg-[#dec06a] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
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