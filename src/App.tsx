import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import FrameLibraryPage from "./pages/FrameLibraryPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DisclaimerModal from "./components/common/DisclaimerModal";
import Background3D from "./components/layout/Background3D";

// Admin CMS
import { AdminProvider } from "./features/admin/context/AdminContext";
import { AdminLayout } from "./features/admin/components/AdminLayout";
import { AdminRouteGuard } from "./features/admin/components/AdminRouteGuard";
import { AdminLoginPage } from "./features/admin/pages/AdminLoginPage";
import { AdminDashboardPage } from "./features/admin/pages/AdminDashboardPage";
import { AdminFramesPage } from "./features/admin/pages/AdminFramesPage";
import { AdminBranchesPage } from "./features/admin/pages/AdminBranchesPage";
import { AdminBookingsPage } from "./features/admin/pages/AdminBookingsPage";
import { AdminSettingsPage } from "./features/admin/pages/AdminSettingsPage";

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans flex flex-col transition-all duration-300 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0 md:pl-20 relative">
      <Background3D />
      <Navbar />
      <DisclaimerModal />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* Public User Pages */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/frames" element={<FrameLibraryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Route>

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected CMS Routes */}
          <Route
            path="/admin"
            element={
              <AdminRouteGuard>
                <AdminLayout />
              </AdminRouteGuard>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="frames" element={<AdminFramesPage />} />
            <Route path="branches" element={<AdminBranchesPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
};

export default App;
