import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SectionTitle from "../SectionTitle/SectionTitle";
import { fetchTeams } from "../../store/slices/doctor";

const TeamSection = ({ 
  hclass = "", 
  sliceStart = 0, 
  sliceEnd = 3, 
  showSectionTitle = true,
  onDoctorSelect 
}) => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleDoctorSelect = (doctor) => {
    console.log(doctor);
    if (onDoctorSelect) {
      onDoctorSelect(doctor);
    }
  };

  const getBranchName = (branchCode) => {
    const branchMap = {
      alawali: "فرع العوالي",
      alkhalidiyah: "فرع الخالدية",
      alshatee: "فرع الشاطئ",
      albasateen: "فرع البساتين",
      abhur: "ابحر الشمالية",
      altaif: "فرع الطائف",
    };
    return branchMap[branchCode] || branchCode;
  };

  return (
    <section className={hclass}>
      <div className="container mx-auto px-4">
        {showSectionTitle && (
          <div className="flex justify-center">
            <div className="w-full lg:w-9/12">
              <SectionTitle title="فريقنا" subtitle="تعرف على أخصائيينا" />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#dec06a]"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-6">
            <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg inline-block">
              {error}
            </p>
          </div>
        )}

        <div className="flex flex-wrap -mx-4">
          {!loading &&
            !error &&
            teams.slice(sliceStart, sliceEnd).map((team, index) => (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8" key={index}>
                <div className="team_card bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative p-4 flex-grow-0">
                    <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3">
                      <div className="relative overflow-hidden rounded-[20px] h-64">
                        <img
                          src={team.image || "/download.png"}
                          alt={team.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "/download.png";
                          }}
                        />
                      </div>

                      {team.branches && team.branches.length > 0 && (
                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 text-xs font-bold text-gray-800 shadow-lg border border-[#dec06a]/30">
                          {team.branches.length === 1 
                            ? getBranchName(team.branches[0]) 
                            : `${team.branches.length} فروع`}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="content p-6 text-center flex-grow flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        {team.name}
                      </h3>
                      <span className="text-[#dec06a] block font-medium">
                        {team.specialization}
                      </span>
                    </div>

                    {team.branches && team.branches.length > 0 && (
                      <div className="mb-4 flex-grow">
                        <p className="text-xs text-gray-500 mb-2 font-medium">
                          متوفر في:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {team.branches.map((branch, branchIndex) => (
                            <span
                              key={branchIndex}
                              className="inline-block bg-gradient-to-r from-[#dec06a]/15 to-[#d4b45c]/15 text-[#dec06a] text-xs px-3 py-1.5 rounded-full border border-[#dec06a]/30 font-medium"
                            >
                              {getBranchName(branch)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleDoctorSelect(team)}
                      className="mt-auto w-full py-3 bg-gradient-to-r from-[#dec06a] to-[#d4b45c] text-white font-bold rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                    >
                      احجز موعد
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;