import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDepartments } from '../../store/slices/departments';
import { getImageUrl } from '@/helpers/hooks/imageUrl';

export default function DepartmentsGrid({ branchId, isDepartmentPage = false }) {
  const dispatch = useDispatch();
  const { items: departments = [], loading, error } = useSelector(state => state.departments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  
  // Get branches from all departments
  const allBranches = departments.reduce((acc, dept) => {
    if (Array.isArray(dept.branches)) {
      dept.branches.forEach(branch => {
        if (!acc.some(b => b.id === branch.id)) {
          acc.push(branch);
        }
      });
    }
    return acc;
  }, []);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  // Filter logic
  const filteredDepartments = departments.filter(dept => {
    // Filter by branchId prop if provided
    if (branchId) {
      const hasBranch = Array.isArray(dept.branches) && 
        dept.branches.some(branch => branch.id === parseInt(branchId));
      if (!hasBranch) return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!dept.name.toLowerCase().includes(searchLower) && 
          !dept.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    // Filter by selected branch
    if (selectedBranch !== 'all') {
      const hasSelectedBranch = Array.isArray(dept.branches) && 
        dept.branches.some(branch => branch.id === parseInt(selectedBranch));
      if (!hasSelectedBranch) return false;
    }
    
    return true;
  });

  if (loading) {
    return <div className="text-center py-8">Loading departments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      {/* Search and Filter Section - Only shown if isDepartmentPage is true */}
      {isDepartmentPage && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 px-8 mt-3" dir="rtl">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن قسم أو وصف..."
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
              {allBranches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map(department => (
            <DepartmentCard key={department.id} department={department} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            لا توجد أقسام متطابقة مع معايير البحث
          </div>
        )}
      </div>
    </div>
  );
}

export function DepartmentCard({ department }) {
  const branchInfo = department.branches || [];

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      dir="rtl"
    >
      {department.image && (
        <div className="h-52 overflow-hidden relative group">
          <img
            src={getImageUrl(department.image)}
            alt={department.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/images/default-department.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#000B47] mb-2">{department.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{department.description}</p>

        {branchInfo.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">الفروع المتوفرة:</h4>
            <div className="flex flex-wrap gap-2">
              {branchInfo.slice(0, 3).map((branch) => (
                <span
                  key={branch.id}
                  className="bg-gradient-to-r from-[#dec06a]/10 to-[#d4b45c]/10 text-[#dec06a] text-xs px-3 py-1.5 rounded-full border border-[#dec06a]/30 font-medium"
                >
                  {branch.name}
                </span>
              ))}
              {branchInfo.length > 3 && (
                <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full border border-gray-300">
                  +{branchInfo.length - 3} أخرى
                </span>
              )}
            </div>
          </div>
        )}

        <Link
          href={`/departments/${department.id}`}
          className="block w-full text-center px-6 py-3 border-2 border-[#dec06a] text-lg font-bold rounded-full text-[#dec06a] bg-white hover:bg-[#dec06a] hover:text-white transition-all duration-300"
          style={{ color: "#dec06a" }}
        >
          عرض التفاصيل ←
        </Link>
      </div>
    </div>
  );
}