import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDepartments } from '../../store/slices/departments';
import { getImageUrl } from '@/helpers/hooks/imageUrl';

// Accept branchId as a prop
export default function DepartmentsGrid({ branchId }) {
  const dispatch = useDispatch();
  const { items: departments = [], loading, error } = useSelector(state => state.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-8">Loading departments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  // Filter departments based on the branchId
  const filteredDepartments = branchId
    ? departments.filter(dept =>
        Array.isArray(dept.branches) &&
        dept.branches.some(branch => branch.id === parseInt(branchId))
      )
    : departments;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {filteredDepartments.map(department => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </div>
  );
}

function DepartmentCard({ department }) {
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
