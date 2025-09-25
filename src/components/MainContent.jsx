
import DarkMode from "../components/DarkMode";
import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import Time from "../components/Time";
import Footer from "../components/Footer";


function MainLayout({ children }) {

  return (
    <div className="flex flex-col min-h-screen">
      <DarkMode />
      <Header />
      <NavTabs />
      <Time />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
