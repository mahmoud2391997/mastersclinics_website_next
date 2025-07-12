import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchDepartmentById } from '../../store/slices/departments';
import { fetchBranches } from '../../store/slices/branches';



export default function DepartmentPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const { 
    selectedDepartment: department, 
    loading: deptLoading, 
    error: deptError 
  } = useSelector((state) => state.departments);
  
  console.log("Department:", department);
  const { 
    items: allBranches, 
    loading: branchesLoading,
    error: branchesError
  } = useSelector((state) => state.branches);

  const [branchInfo, setBranchInfo] = useState<[]>([]);

  // Fetch data when component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchDepartmentById(id));
      dispatch(fetchBranches());
    }
  }, [dispatch, id]);

  // Process branch data when department or branches change
  useEffect(() => {
    if (department) {
      try {
        // First try to use the nested branches array if available
        if (department.branches && department.branches.length > 0) {
          setBranchInfo(department.branches);
          return;
        }

        // If no nested branches, use branches_ids or branch_ids
        const branchIds = department.branches_ids 
          ? department.branches_ids.map(id => Number(id))
          : department.branch_ids
            ? JSON.parse(department.branch_ids.replace(/"/g, '')) 
            : [];

        // Filter branches from Redux store
        const filteredBranches = allBranches.filter(b => branchIds.includes(b.id));
        setBranchInfo(filteredBranches);
      } catch (error) {
        console.error('Error parsing branch data:', error);
        setBranchInfo([]);
      }
    }
  }, [department, allBranches]);

  // Loading and error states
  if (deptLoading || branchesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8">Loading department details...</div>
      </div>
    );
  }

  if (deptError || branchesError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8 text-red-500">
          Error: {deptError || branchesError}
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8">Department not found</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{department.name} | Our Department</title>
        <meta name="description" content={department.description} />
      </Head>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" d="m1 9 4-4-4-4"/>
                </svg>
                <Link href="/departments" className="text-gray-700 hover:text-blue-600">
                  Departments
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="text-blue-600">{department.name}</span>
              </div>
            </li>
          </ol>
        </nav>
        
        {/* Department Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {department.image && (
              <div className="md:w-1/3">
                <img 
                  src={department.image} 
                  alt={department.name}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/images/default-department.jpg';
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
            )}
            <div className={department.image ? "md:w-2/3" : "w-full"}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{department.name}</h1>
              <p className="text-gray-700 mb-6">{department.description}</p>
            </div>
          </div>
        </div>
        
        {/* Branches Section */}
        {branchInfo.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Locations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {branchInfo.map(branch => (
                <div key={branch.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900">{branch.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{branch.address}</p>
                  <div className="mt-3 space-y-2">
                    <Link 
                      href={branch.location_link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-block"
                    >
                      View on Map →
                    </Link>
                    <Link 
                      href={`/branches/${branch.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm block"
                    >
                      Branch Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This department is not currently available at any branches.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}