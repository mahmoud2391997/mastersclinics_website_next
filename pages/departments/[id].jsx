import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchDepartmentById } from '../../store/slices/departments';
import { fetchBranches } from '../../store/slices/branches';
import getImageUrl from '@/utilies/getImageUrl';
import Navbar from '@/helpers/components/Navbar/Navbar';
import PageTitle from '@/helpers/components/pagetitle/PageTitle';

export default function DepartmentPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const {
    selectedDepartment: department,
    loading: deptLoading,
    error: deptError,
  } = useSelector((state) => state.departments);

  const {
    items: allBranches,
    loading: branchesLoading,
    error: branchesError,
  } = useSelector((state) => state.branches);

  const [branchInfo, setBranchInfo] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDepartmentById(id));
      dispatch(fetchBranches());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (department) {
      try {
        if (department.branches && Array.isArray(department.branches) && department.branches.length > 0) {
          setBranchInfo(department.branches);
          return;
        }

        let branchIds = [];

        if (department.branches_ids && Array.isArray(department.branches_ids)) {
          branchIds = department.branches_ids.map((id) => Number(id));
        } else if (department.branch_ids && typeof department.branch_ids === 'string') {
          try {
            const parsed = JSON.parse(department.branch_ids);
            if (Array.isArray(parsed)) {
              branchIds = parsed.map((id) => Number(id));
            }
          } catch (error) {
            console.error('Failed to parse branch_ids JSON:', error);
          }
        }

        const filteredBranches = allBranches.filter((b) => branchIds.includes(b.id));
        setBranchInfo(filteredBranches);
      } catch (error) {
        console.error('Error processing branch data:', error);
        setBranchInfo([]);
      }
    }
  }, [department, allBranches]);

  if (deptLoading || branchesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8 text-lg font-medium">جاري تحميل تفاصيل القسم...</div>
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
        <div className="text-center py-8">لم يتم العثور على القسم</div>
      </div>
    );
  }

  return (
    <>
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle
        pageTitle={"فروعنا"}
        pagesub="اكتشف جميع فروعنا ومواعيد العمل"
        bgImage={"https://cdn.salla.sa/dEYvd/LgUfWipbId1zQL4vAXAdXtPnedinmGRFunfGfZzN.jpg"}
      />

      <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
        {/* Department Header */}
        <div className="flex flex-col md:flex-row-reverse gap-8 mb-12 bg-white rounded-xl shadow-md p-6 text-right">
          {department.image && (
            <div className="md:w-1/3">
              <img
                src={getImageUrl(department.image)}
                alt={department.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/images/default-department.jpg';
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
          )}
          <div className={department.image ? 'md:w-2/3' : 'w-full'}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{department.name}</h1>
            <p className="text-gray-600 text-base leading-relaxed">{department.description}</p>
          </div>
        </div>

        {/* Branches Section */}
        {branchInfo.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">الفروع المتاحة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchInfo.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-5 border border-gray-100 flex flex-col justify-between text-right"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{branch.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{branch.address}</p>
                  </div>
                  <div className="mt-auto space-y-2">
                    {branch.location_link && (
                      <Link
                        href={branch.location_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center px-4 py-2 border border-[#dec06a] text-[#dec06a] rounded-lg font-medium transition-colors hover:bg-[#dec06a] hover:text-white"
                      >
                        عرض على الخريطة
                      </Link>
                    )}
                    <Link
                      href={`/branches/${branch.id}`}
                      className="inline-block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium transition-colors hover:bg-blue-600 hover:text-white"
                    >
                      تفاصيل الفرع
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg text-center">
            <p className="text-yellow-700 text-base">هذا القسم غير متاح حاليًا في أي فرع.</p>
          </div>
        )}
      </div>
    </>
  );
}
