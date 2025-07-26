import Head from 'next/head';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchDepartmentById } from '../../store/slices/departments';
import { fetchBranches } from '../../store/slices/branches';
import getImageUrl from '@/utilies/getImageUrl';
import Navbar from '@/helpers/components/Navbar/Navbar';
import PageTitle from '@/helpers/components/pagetitle/PageTitle';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import TeamSection from '@/helpers/components/TeamSection/TeamSection';

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

  useEffect(() => {
    if (id) {
      dispatch(fetchDepartmentById(id));
      dispatch(fetchBranches());
    }
  }, [id, dispatch]);

  const departmentImage = getImageUrl(department?.image) || '/placeholder.png';

  return (
    <>
      <Head>
        <title>{department?.name || 'Department'} | Clinic</title>
      </Head>

      <Navbar />
      <PageTitle title={department?.name || 'Department'} />

      <section className="py-12">
        <div className="container mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">{department?.name}</h2>
            <p className="mt-4 text-gray-600">{department?.description}</p>
          </div>

          <div className="flex justify-center mb-10">
            <img
              src={departmentImage}
              alt={department?.name}
              className="max-w-md rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* ✅ Use TeamSection for doctors */}
      <TeamSection
        departmentId={id}
        showSectionTitle={true}
        hclass="py-12 bg-gray-50"
      />

      {/* ✅ Render branches like BranchesPage */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4" dir="rtl">
          <h3 className="text-2xl font-bold mb-8 text-center border-b-2 border-[#dec06a] inline-block pb-2">
            فروعنا
          </h3>

          {branchesLoading && <p className="text-center">جاري التحميل...</p>}
          {branchesError && (
            <p className="text-center text-red-500">حدث خطأ: {branchesError}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBranches?.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                {/* Branch Image */}
                <div className="w-full h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={getImageUrl(branch.image_url) || "/placeholder.png"}
                    alt={branch.name}
                  />
                </div>

                <div className="p-6 flex-grow">
                  <h4 className="text-xl font-bold mb-3">{branch.name}</h4>

                  <div className="flex items-start mt-4">
                    <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-2" />
                    <p className="text-gray-600">{branch.address}</p>
                  </div>

                  <div className="flex items-start mt-4">
                    <FaClock className="text-[#dec06a] mt-1 ml-2" />
                    <div>
                      <h5 className="font-medium text-gray-700">مواعيد العمل:</h5>
                      {branch.working_hours ? (
                        <ul className="mt-1 space-y-1">
                          {branch.working_hours.map((hours, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              <strong>{hours.days}:</strong> {hours.time}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 text-sm">غير متاح</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex flex-col gap-3">
                    <a
                      href={`/branches/${branch.id}`}
                      className="px-4 py-2 border border-[#dec06a] text-[#dec06a] font-medium rounded-lg text-sm text-center"
                    >
                      المزيد من التفاصيل
                    </a>
                    {branch.location_link && (
                      <a
                        href={branch.location_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#dec06a] text-white font-medium rounded-lg text-sm text-center"
                      >
                        عرض على الخريطة
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
