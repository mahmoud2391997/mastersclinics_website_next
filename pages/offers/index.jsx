"use client"

import  { Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import OffersSection from '../../helpers/components/offersSection';


const OffersPage = () => {
  const searchParams = useSearchParams();
  const urlDepartmentId = searchParams.get('departmentId');

  return (
    <Fragment>
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle 
        pageTitle={'تصفح كافة العروض المتاحة'} 
        pagesub={'العروض'} 
        bgImage={"/offers@0.5x.webp"}
      />
      <OffersSection isOfferPage={true} urlDepartmentId={urlDepartmentId} />
      <Footer hclass={'wpo-site-footer'} />
      <Scrollbar />
    </Fragment>
  );
};
export default OffersPage