import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDepartments } from '../../store/slices/departments';
import { getImageUrl } from '@/helpers/hooks/imageUrl';

export default function DepartmentsGrid() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map(department => (
        <DepartmentCard 
          key={department.id}
          department={department}
        />
      ))}
    </div>
  );
}

function DepartmentCard({ department }) {
  const branchInfo = department.branches || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {department.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={getImageUrl(department.image)} 
            alt={department.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/default-department.jpg'; // fallback image
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{department.name}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{department.description}</p>
        
        {branchInfo.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">الفروع المتوفرة:</h4>
            <div className="flex flex-wrap gap-1">
              {branchInfo.slice(0, 3).map(branch => (
                <span key={branch.id} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {branch.name}
                </span>
              ))}
              {branchInfo.length > 3 && (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  +{branchInfo.length - 3} أخرى
                </span>
              )}
            </div>
          </div>
        )}
        
        <Link href={`/departments/${department.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
          عرض التفاصيل →
        </Link>
      </div>
    </div>
  );
}
