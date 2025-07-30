import Navbar from "@/helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import DepartmentsGrid from "./grid";
import Footer from "@/helpers/components/footer/Footer";

export default function departments() {
  return (
    <>
    {/* Hero Section */}
<Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
    <PageTitle pageTitle={"اقسامنا"} pagesub="الاقسام" bgImage={"/departments.png"} />
  <DepartmentsGrid />
        <Footer hclass={'wpo-site-footer'} />

    </>
  );
}