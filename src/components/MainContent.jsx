
import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import Footer from "../components/Footer";
import Time from "../components/Time";


function MainLayout({ children }) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavTabs />
      <Time />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
