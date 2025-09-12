import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavTabs />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
