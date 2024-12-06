// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Pages
// import Dashboard from './Components/Pages/Dashboard';
// import Sidebar from "./Components/Pages/Sidebar";
// import Navbar from "./Components/Pages/Navbar";
// import AddNewProduct from './Components/Pages/Products/AddNewProduct';
// import Breadcrumb from './Components/Pages/Breadcrumb';
// import MainCategories from './Components/Pages/Manage Categories/MainCategories';
// import SubCategories from './Components/Pages/Manage Categories/SubCategories';
// import ChildCategories from './Components/Pages/Manage Categories/ChildCategories';
// import Categories from './Components/Pages/Blog/Categories';
// import Posts from './Components/Pages/Blog/Posts';
// import ManageStaffs from './Components/Pages/Manage Staffs/ManageStaffs'
// import PhysicalCreateProduct from './Components/Pages/Products/PhysicalCreateProduct';
// import DigitalProductCreate from './Components/Pages/Products/DigitalProductCreate';
// import LicenseProductCreate from './Components/Pages/Products/LicenseProductCreate';
// import ListingProductCreate from './Components/Pages/Products/ListingProductCreate';
// import ProductList from './Components/Pages/Products/ProductList';
// import DeactivatedProducts from './Components/Pages/Products/DeactivatedProducts';
// import SetCoupans from './Components/Pages/Set Coupans/SetCoupans';
// import SocialLinks from './Components/Pages/Social Settings/SocialLinks';
// import AddAffiliateProduct from './Components/Pages/Affiliate Product/AddAffiliateProduct';
// import AffiliateProducts from './Components/Pages/Affiliate Product/AllAffiliateProducts';
// import ProductBulkUpload from './Components/Pages/Bulk Product Upload/ProductBulkUpload';
// import LogoUpload from './Components/Pages/General Settings/LogoUpload';
// import FaviconUpload from './Components/Pages/General Settings/FaviconUpload';
// import ShippingMethods from './Components/Pages/General Settings/ShippingMethods';
// import Packagings from './Components/Pages/General Settings/Packagings';
// import PickupLocations from './Components/Pages/General Settings/PickupLocations';
// import SliderComponent from './Components/Pages/Home Page Settings/SliderComponent';
// import ServiceComponent from './Components/Pages/Home Page Settings/ServiceComponent';
// import PartnersComponent from './Components/Pages/Home Page Settings/PartnersComponent';
// import FaqComponent from './Components/Pages/Menu Page Settings/FaqComponent';
// import PageComponent from './Components/Pages/Menu Page Settings/PageComponent';
// import PaymentGatewayComponent from './Components/Pages/Payment Settings/PaymentGatewayComponent';
// import ProductUserDetail from './Components/Pages/Orders/ProductUserDetail';
// import Currencies from './Components/Pages/Payment Settings/Currencies';
// import Fonts from './Components/Pages/Fonts Options/Fonts';
// import VendorSubscriptionPlans from './Components/Pages/Vendor Subscription Plans/VendorSubscriptionPlans';
// import Roles from './Components/Pages/Manage Roles/Roles';
// import Cities from './Components/Pages/Manage Country/Cities';
// import States from './Components/Pages/Manage Country/States';
// import TaxManagementForm from './Components/Pages/Manage Country/TaxManagementForm';
// import ManageTax from './Components/Pages/Manage Country/ManageTax';
// import Countries from './Components/Pages/Manage Country/Countries';
// import CustomersList from './Components/Pages/Customers/CustomersList';
// import CustomerDetails from './Components/Pages/Customers/CustomerDetails';


// const App = () => {
//   const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!isSidebarCollapsed);
//   };

//   return (
//     <Router className="bg-black">
//       <div className={`flex h-full w-full border border-gray-100 ${isSidebarCollapsed ? 'pl-16' : 'pl-60'}`}>
//         <Sidebar collapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
//         <div className="flex flex-col flex-1">
//           <div className="h-12">
//             <Navbar />
//           </div>
//           <div className='mt-10  ml-5'><Breadcrumb /></div>
//           <div className="flex-1 ">
//             <Routes >
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/admin/products/types" element={<AddNewProduct />} />
//               <Route path="/admin/category" element={<MainCategories />} />
//               <Route path="/admin/subcategory" element={<SubCategories />} />
//               <Route path="/admin/childcategory" element={<ChildCategories />} />
//               <Route path="/admin/products/types" element={<AddNewProduct />} />
//               <Route path="/admin/blog/categories" element={<Categories />} />
//               <Route path="/admin/blog/posts" element={<Posts />} />
//               <Route path="/admin/blog/manage-staffs" element={<ManageStaffs />} />
//               <Route path="/admin/products/physical/create" element={<PhysicalCreateProduct />} />
//               <Route path="/admin/products/digital/create" element={<DigitalProductCreate />} />
//               <Route path="/admin/products/license/create" element={<LicenseProductCreate />} />
//               <Route path="/admin/products/listing/create" element={<ListingProductCreate />} />
//               <Route path="/admin/products" element={<ProductList />} />
//               <Route path="/admin/products/deactive" element={<DeactivatedProducts />} />
//               <Route path="/admin/coupon" element={<SetCoupans />} />
//               <Route path="/admin/social-link" element={<SocialLinks />} />
//               <Route path="/admin/products/add-affiliate/AddAffiliateProduct" element={<AddAffiliateProduct />} />
//               <Route path="/admin/products/AllAffiliateProducts" element={<AffiliateProducts />} />
//               <Route path="/admin/ProductBulkUpload" element={<ProductBulkUpload />} />
//               <Route path="/admin/general-settings/logo" element={<LogoUpload />} />
//               <Route path="/admin/general-settings/favicon" element={<FaviconUpload />} />
//               <Route path="/admin/shipping" element={<ShippingMethods />} />
//               <Route path="/admin/package" element={<Packagings />} />
//               <Route path="/admin/pickup" element={<PickupLocations />} />
//               <Route path="/admin/slider" element={<SliderComponent />} />
//               <Route path="/admin/service" element={<ServiceComponent />} />
//               <Route path="/admin/partner" element={<PartnersComponent />} />
//               <Route path="/admin/faq" element={<FaqComponent />} />
//               <Route path="/admin/page" element={<PageComponent />} />
//               <Route path="/admin/paymentgateway" element={<PaymentGatewayComponent />} />
//               <Route path="/admin/orders" element={<ProductUserDetail />} />
//               <Route path="/admin/currency" element={<Currencies />} />
//               <Route path="/admin/fonts" element={<Fonts />} />
//               <Route path="/admin/role" element={<Roles />} />
              // <Route path="/admin/cities" element={<Cities />} />
              // <Route path="/admin/states" element={<States />} />
              // <Route path="/admin/TaxManagementForm" element={<TaxManagementForm />} />
              // <Route path="/admin/manage/country/tax" element={<ManageTax />} />
              // <Route path="/admin/manage/country" element={<Countries />} />
              // <Route path="/admin/users" element={<CustomersList />} />
              // <Route path="/admin/subscription" element={<VendorSubscriptionPlans />} />
              // {/* <Route path="/admin/customerdetails" element={<CustomerDetails />} /> */}
              
              
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;







import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Sidebar from "./Components/Pages/Sidebar";
import Navbar from "./Components/Pages/Navbar";
import Breadcrumb from './Components/Pages/Breadcrumb';

// Pages
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import AddNewProduct from './Components/Pages/Products/AddNewProduct';
import MainCategories from './Components/Pages/Manage Categories/MainCategories';
import SubCategories from './Components/Pages/Manage Categories/SubCategories';
import ChildCategories from './Components/Pages/Manage Categories/ChildCategories';
import Categories from './Components/Pages/Blog/Categories';
import Posts from './Components/Pages/Blog/Posts';
import ManageStaffs from './Components/Pages/Manage Staffs/ManageStaffs';
import PhysicalCreateProduct from './Components/Pages/Products/PhysicalCreateProduct';
import DigitalProductCreate from './Components/Pages/Products/DigitalProductCreate';
import LicenseProductCreate from './Components/Pages/Products/LicenseProductCreate';
import ListingProductCreate from './Components/Pages/Products/ListingProductCreate';
import ProductList from './Components/Pages/Products/ProductList';
import DeactivatedProducts from './Components/Pages/Products/DeactivatedProducts';
import SetCoupans from './Components/Pages/Set Coupans/SetCoupans';
import SocialLinks from './Components/Pages/Social Settings/SocialLinks';
import AddAffiliateProduct from './Components/Pages/Affiliate Product/AddAffiliateProduct';
import AffiliateProducts from './Components/Pages/Affiliate Product/AllAffiliateProducts';
import ProductBulkUpload from './Components/Pages/Bulk Product Upload/ProductBulkUpload';
import LogoUpload from './Components/Pages/General Settings/LogoUpload';
import FaviconUpload from './Components/Pages/General Settings/FaviconUpload';
import ShippingMethods from './Components/Pages/General Settings/ShippingMethods';
import Packagings from './Components/Pages/General Settings/Packagings';
import PickupLocations from './Components/Pages/General Settings/PickupLocations';
import SliderComponent from './Components/Pages/Home Page Settings/SliderComponent';
import ServiceComponent from './Components/Pages/Home Page Settings/ServiceComponent';
import PartnersComponent from './Components/Pages/Home Page Settings/PartnersComponent';
import FaqComponent from './Components/Pages/Menu Page Settings/FaqComponent';
import PageComponent from './Components/Pages/Menu Page Settings/PageComponent';
import PaymentGatewayComponent from './Components/Pages/Payment Settings/PaymentGatewayComponent';
import ProductUserDetail from './Components/Pages/Orders/ProductUserDetail';
import Currencies from './Components/Pages/Payment Settings/Currencies';
import Fonts from './Components/Pages/Fonts Options/Fonts';
import Roles from './Components/Pages/Manage Roles/Roles';
import Login from "./Components/Pages/Login/login";
import Cities from './Components/Pages/Manage Country/Cities';
import States from './Components/Pages/Manage Country/States';
import TaxManagementForm from './Components/Pages/Manage Country/TaxManagementForm';
import ManageTax from './Components/Pages/Manage Country/ManageTax';
import Countries from './Components/Pages/Manage Country/Countries';
import CustomersList from './Components/Pages/Customers/CustomersList';
import CustomerDetails from './Components/Pages/Customers/CustomerDetails';
import AllOrders from './Components/Pages/Orders/AllOrders';
import PendingOrders from './Components/Pages/Orders/PendingOrders';
import ProcessingOrders from './Components/Pages/Orders/ProcessingOrders';
import CompletedOrders from './Components/Pages/Orders/CompletedOrders';
import DeclinedOrders from './Components/Pages/Orders/DeclinedOrders';
import TaxCalculate from './Components/Pages/Total Earning/TaxCalculate';
import SubscriptionEarnings from './Components/Pages/Total Earning/SubscriptionEarnings';
import WithdrawEarnings from './Components/Pages/Total Earning/WithdrawEarnings';
import CommissionEarningDashboard from './Components/Pages/Total Earning/CommissionEarningDashboard';
import ProductReviews from './Components/Pages/Product Discussion/ProductReviews';
import ProductDiscussionReports from './Components/Pages/Product Discussion/ProductDiscussionReports';
import RidersList from './Components/Pages/Riders/RidersList';
import Withdraws from './Components/Pages/Riders/Withdraws';
import CompletedDeposits from './Components/Pages/Customer Deposits/CompletedDeposits';
import PendingDeposits from './Components/Pages/Customer Deposits/PendingDeposits';
import Transactions from './Components/Pages/Customer Deposits/Transactions';
import VendorsList from './Components/Pages/Vendors/VendorsList';
import VendorsWithdraws from './Components/Pages/Vendors/VendorsWithdraws';
import CompletedVendorSubscriptions from './Components/Pages/Vendor Subscription Plans/CompletedVendorSubscriptions';
import PendingVendorSubscriptions from './Components/Pages/Vendor Subscription Plans/PendingVendorSubscriptions';
import PendingVerifications from './Components/Pages/Vendor Verifications/PendingVerifications';
import VendorVerifications from './Components/Pages/Vendor Verifications/VendorVerifications';
import VendorSubscriptionPlans from './Components/Pages/Vendor Subscriptions/VendorSubscriptionPlans';




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [permissions, setPermissions] = useState(null); // Store permissions
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle login
  const handleLogin = (staff, token) => {
    setIsAuthenticated(true);
    setLoggedInUser(staff);
    setPermissions(staff.role.permissions); // Set permissions on login
    localStorage.setItem('token', token);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUser(null);
    setPermissions(null);
    localStorage.removeItem('token');
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className={`flex h-full w-full border border-gray-100 ${isSidebarCollapsed ? 'pl-16' : 'pl-60'}`}>
        {isAuthenticated && loggedInUser && (
          <>
            <Sidebar
              collapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
              permissions={permissions} // Pass permissions to Sidebar
            />
            <div className="flex flex-col flex-1">
              <Navbar user={loggedInUser} onLogout={handleLogout} />
              <div className="mt-10 ml-5"><Breadcrumb /></div>
              <div className="flex-1 p-5 bg-white">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin/products/types" element={<AddNewProduct />} />
                  <Route path="/admin/category" element={<MainCategories />} />
                  <Route path="/admin/subcategory" element={<SubCategories />} />
                  <Route path="/admin/childcategory" element={<ChildCategories />} />
                  <Route path="/admin/blog/categories" element={<Categories />} />
                  <Route path="/admin/blog/posts" element={<Posts />} />
                  <Route path="/admin/blog/manage-staffs" element={<ManageStaffs />} />
                  <Route path="/admin/products/physical/create" element={<PhysicalCreateProduct />} />
                  <Route path="/admin/products/digital/create" element={<DigitalProductCreate />} />
                  <Route path="/admin/products/license/create" element={<LicenseProductCreate />} />
                  <Route path="/admin/products/listing/create" element={<ListingProductCreate />} />
                  <Route path="/admin/products" element={<ProductList />} />
                  <Route path="/admin/products/deactive" element={<DeactivatedProducts />} />
                  <Route path="/admin/coupon" element={<SetCoupans />} />
                  <Route path="/admin/social-link" element={<SocialLinks />} />
                  <Route path="/admin/products/add-affiliate/AddAffiliateProduct" element={<AddAffiliateProduct />} />
                  <Route path="/admin/products/AllAffiliateProducts" element={<AffiliateProducts />} />
                  <Route path="/admin/ProductBulkUpload" element={<ProductBulkUpload />} />
                  <Route path="/admin/general-settings/logo" element={<LogoUpload />} />
                  <Route path="/admin/general-settings/favicon" element={<FaviconUpload />} />
                  <Route path="/admin/shipping" element={<ShippingMethods />} />
                  <Route path="/admin/package" element={<Packagings />} />
                  <Route path="/admin/pickup" element={<PickupLocations />} />
                  <Route path="/admin/slider" element={<SliderComponent />} />
                  <Route path="/admin/service" element={<ServiceComponent />} />
                  <Route path="/admin/partner" element={<PartnersComponent />} />
                  <Route path="/admin/faq" element={<FaqComponent />} />
                  <Route path="/admin/page" element={<PageComponent />} />
                  <Route path="/admin/paymentgateway" element={<PaymentGatewayComponent />} />
                  <Route path="/admin/order/create" element={<ProductUserDetail />} />
                  <Route path="/admin/currency" element={<Currencies />} />
                  <Route path="/admin/fonts" element={<Fonts />} />
                  <Route path="/admin/role" element={<Roles />} />
                  <Route path="/admin/cities" element={<Cities />} />
              <Route path="/admin/states" element={<States />} />
              <Route path="/admin/TaxManagementForm" element={<TaxManagementForm />} />
              <Route path="/admin/manage/country/tax" element={<ManageTax />} />
              <Route path="/admin/manage/country" element={<Countries />} />
              <Route path="/admin/users" element={<CustomersList />} />
              {/* <Route path="/admin/subscription" element={<VendorSubscriptionPlans />} /> */}
              <Route path="/admin/allorder" element={<AllOrders />} />
              <Route path="/admin/orderspending" element={<PendingOrders />} />
              <Route path="/admin/ordersprocessing" element={<ProcessingOrders />} />
              <Route path="/admin/orderscompleted" element={<CompletedOrders />} />
              <Route path="/admin/ordersdeclined" element={<DeclinedOrders />} />
              <Route path="/admin/tax/calculate" element={<TaxCalculate />} />
              <Route path="/admin/subscription/earning" element={<SubscriptionEarnings />} />
              <Route path="/admin/withdraw/earning" element={<WithdrawEarnings />} />
              <Route path="/admin/commission/earning" element={<CommissionEarningDashboard />} />
              <Route path="/admin/ratings" element={<ProductReviews />} />
              <Route path="/admin/reports" element={<ProductDiscussionReports />} />
              <Route path="/admin/riders" element={<RidersList />} />
              <Route path="/admin/riders" element={<RidersList />} />
              <Route path="/admin/riders/withdraws" element={<Withdraws />} />
              <Route path="/admin/users/deposits/all" element={<CompletedDeposits />} />
              <Route path="/admin/users/deposits/pending" element={<PendingDeposits />} />
              <Route path="/admin/users/transactions" element={<Transactions />} />
              <Route path="/admin/vendors" element={<VendorsList />} />
              <Route path="/admin/vendors/withdraws" element={<VendorsWithdraws />} />
              <Route path="/admin/vendors/subs/completed" element={<CompletedVendorSubscriptions />} />
              <Route path="/admin/vendors/subs/pending" element={<PendingVendorSubscriptions />} />
              <Route path="/admin/verificatons/all" element={<VendorVerifications />} />
              <Route path="/admin/verificatons/pending" element={<PendingVerifications />} />
              <Route path="/admin/subscription" element={<VendorSubscriptionPlans />} />

              {/* <Route path="/admin/customerdetails" element={<CustomerDetails />} /> */}

                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </div>
          </>
        )}
        {!isAuthenticated && (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
