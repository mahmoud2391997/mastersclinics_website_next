import Navbar from "@/helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import DepartmentsGrid from "./grid";
import Footer from "@/helpers/components/footer/Footer";

export default function departments() {
  return (
    <>
    {/* Hero Section */}
<Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
    <PageTitle pageTitle={"فروعنا"} pagesub="اكتشف جميع فروعنا ومواعيد العمل" bgImage={"https://cdn.salla.sa/dEYvd/LgUfWipbId1zQL4vAXAdXtPnedinmGRFunfGfZzN.jpg"} />
  <DepartmentsGrid />
        <Footer hclass={'wpo-site-footer'} />

    </>
  );
}