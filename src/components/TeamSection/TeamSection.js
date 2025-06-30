"use client";

import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "@/store/slices/doctor";
import Link from "next/link";

const TeamSection = ({
  hclass = "",
  sliceStart = 0,
  sliceEnd = null, // Changed to null to show all by default
  showSectionTitle = true,
}) => {
  const dispatch = useDispatch();
  const { teams = [], loading = false, error = null } = useSelector(
    (state) => state.teams || {}
  );
  const placeholder = "/download.png"; // or your preferred placeholder path

  // Determine which teams to show based on props
  const displayedTeams = sliceEnd 
    ? teams.slice(sliceStart, sliceEnd)
    : teams.slice(sliceStart);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);



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
          <div className="row justify-center">
            <div className="col-lg-9 col-12">
              <SectionTitle title="فريقنا" subtitle="تعرف على أخصائيينا" />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-10">
            <div className="alert alert-danger" role="alert">
              Error loading team: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-wrap -mx-4">
            {displayedTeams.map((team, index) => (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8" key={index}>
                <div className="team_card bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative p-4">
                    <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3">
                      <div className="relative overflow-hidden rounded-[20px]">
                        <img
                          src={
                            team.image &&
                            typeof team.image === "string" &&
                            team.image.trim() !== ""
                              ? team.image
                              : placeholder
                          }
                          alt={"Team Member"}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = placeholder;
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

                  <div className="content p-6 text-center">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 font-['IBM_Plex_Sans_Arabic_bold']">
                      {team.name}
                    </h3>
                    <span className="text-[#dec06a] mb-4 block font-medium">
                      {team.specialization}
                    </span>

                    {team.branches.length > 0 && (
                      <div className="mb-4">
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

                    <Link
                      href={`/team/${team.id}`}
                      className="theme-btn w-full py-3 gradient text-white font-bold rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      احجز موعد
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;