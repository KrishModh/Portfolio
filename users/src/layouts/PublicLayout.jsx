import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import MouseFollower from "../components/common/MouseFollower.jsx";
import PageLoader from "../components/common/PageLoader.jsx";
import ScrollProgress from "../components/common/ScrollProgress.jsx";

export default function PublicLayout({ children }) {
  return (
    <div className="public-app">
      <PageLoader />
      <ScrollProgress />
      <MouseFollower />
      <div className="spotlight-bg" />
      <div className="ambient-particles" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
