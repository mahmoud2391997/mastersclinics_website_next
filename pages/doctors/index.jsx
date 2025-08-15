"use client"

import { Fragment, useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ServiceSidebar from "../../helpers/main-component/ServiceSinglePage/sidebar"
import Navbar from "../../helpers/components/Navbar/Navbar"
import PageTitle from "../../helpers/components/pagetitle/PageTitle"
import CtafromSection from "../../helpers/components/CtafromSection/CtafromSection"
import Footer from "../../helpers/components/footer/Footer"
import Scrollbar from "../../helpers/components/scrollbar/scrollbar"
import SectionTitle from "../../helpers/components/SectionTitle/SectionTitle"
import TeamSection from "../../helpers/components/TeamSection/TeamSection"
import { useSelector, useDispatch } from "react-redux"
import { fetchTeams } from "@/store/slices/doctor"
import { getImageUrl } from "@/helpers/hooks/imageUrl"

const V0_PLACEHOLDER_IMAGE = "/download.png"

const TeamPage = () => {
  const searchParams = useSearchParams()
  const urlDepartmentId = searchParams.get("departmentId")

  return (
    <Fragment>
      <Navbar hclass={"wpo-site-header wpo-site-header-s2"} />
      <PageTitle pageTitle={'اطباؤنا'} pagesub={'الاطباء'} bgImage={'/doctors.png'} />
      <section className="">
        <div>
          <TeamSection
            hclass="team_section_s2"
            isTeamsPage={true}
            showSectionTitle={false}
            urlDepartmentId={urlDepartmentId}
          />
        </div>
      </section>
      <Footer hclass={"wpo-site-footer"} />
      <Scrollbar />
    </Fragment>
  )
}



export default TeamPage
