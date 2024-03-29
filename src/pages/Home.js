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
              <div class="container-fluid">
                <h1 class="mt-4">Principal</h1>
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
