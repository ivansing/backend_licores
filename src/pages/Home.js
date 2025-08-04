import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


export const Home = () => {
  // Show Main Page
  return (
    <>
      <div>
        <Header />

        <div id="layoutSidenav">
          <Sidebar />

          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid">
                <h1 className="mt-4">Principal</h1>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
