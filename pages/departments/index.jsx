import Navbar from "@/helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import DepartmentsGrid from "./grid";
import Footer from "@/helpers/components/footer/Footer";
import Scrollbar from "@/helpers/components/scrollbar/scrollbar";

export default function departments() {
  return (
    <>
    {/* Hero Section */}
<Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
    <PageTitle pageTitle={"اقسامنا"} pagesub="الاقسام" bgImage={"/departments1.png"} />
  <DepartmentsGrid isDepartmentPage={true}/>
  <Scrollbar />
        <Footer hclass={'wpo-site-footer'} />

    </>
  );
}