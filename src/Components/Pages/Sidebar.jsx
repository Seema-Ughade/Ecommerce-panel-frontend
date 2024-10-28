import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/mainlogo.png'; // Adjust extension if necessary
import {
  MdDashboard,
  MdShoppingCart,
  MdAccountBalance,
  MdVerifiedUser,
  MdSupport,
  MdWarning,
  MdFlag,
  MdShop,
  MdPostAdd,
  MdFolderSpecial,
  MdCategory,
  MdFolder,
  MdSettings,
  MdFileCopy,
  MdPublic,
  MdMail,
  MdCreate,
  MdAttachMoney,
  MdMenu,
  MdMap,
  MdUpload,
  MdComment,
  MdPercent,
  MdPeople,
  MdGroupAdd,
  MdMonetizationOn,
  MdAdd,
  MdCheckCircle,
  MdPayment,
  MdMessage,
  MdHome,
  MdLocalShipping,
  MdGroup,
  MdHistory,
  MdLogout,
  MdHourglassEmpty,
  MdBuild,
  MdCancel,
  MdCalculate,
  MdMoneyOff,
  MdAddBox,
  MdList,
  MdVisibilityOff,
  MdGridView,
  MdRateReview,
  MdReport,
  MdImage,
  MdWork,
  MdPlace,
  MdDescription,
  MdAnnouncement,
  MdMoreHoriz,
  MdError,
  MdSlideshow,
  MdStar,
  MdLocalOffer,
  MdTune,
  MdPerson,
  MdHelp,
  MdContactMail,
  MdPageview,
  MdLink,
  MdEmail,
  MdOutlineDescription,
  MdInfo,
  MdFacebook,
  MdShare,
  MdGTranslate,
  MdLanguage,
  MdFontDownload,
  MdSearch,
  MdAssessment,
  MdTextFields,
} from 'react-icons/md'; // Import Material Design icons

const { Sider } = Layout;
const { SubMenu } = Menu;

const menuItems = [
  { key: 'dashboard', icon: <MdDashboard />, label: 'Dashboard', to: '/dashboard' },
  {
    key: 'orders',
    icon: <MdShoppingCart />,
    label: 'Orders',
    children: [
      { key: 'all-orders', icon: <MdShoppingCart />, label: 'All Orders', to: '/admin/orders' },
      { key: 'pending-orders', icon: <MdHourglassEmpty />, label: 'Pending Orders', to: '/admin/orders?status=pending' },
      { key: 'processing-orders', icon: <MdBuild />, label: 'Processing Orders', to: '/admin/orders?status=processing' },
      { key: 'completed-orders', icon: <MdCheckCircle />, label: 'Completed Orders', to: '/admin/orders?status=completed' },
      { key: 'declined-orders', icon: <MdCancel />, label: 'Declined Orders', to: '/admin/orders?status=declined' },
      { key: 'pos', label: 'POS', icon: <MdPayment />, to: '/admin/order/create' },
    ],
  },
  {
    key: 'manage-country',
    icon: <MdFlag />,
    label: 'Manage Country',
    children: [
      { key: 'country', icon: <MdMap />, label: 'Country', to: '/admin/manage/country' },
      { key: 'manage-tax', icon: <MdAttachMoney />, label: 'Manage Tax', to: '/admin/manage/country/tax' },
    ],
  },
  {
    key: 'total-earning',
    icon: <MdAttachMoney />,
    label: 'Total Earning',
    children: [
      { key: 'tax-calculate', icon: <MdCalculate />, label: 'Tax Calculate', to: '/admin/tax/calculate' },
      { key: 'subscription-earning', icon: <MdMonetizationOn />, label: 'Subscription Earning', to: '/admin/subscription/earning' },
      { key: 'withdraw-earning', icon: <MdMoneyOff />, label: 'Withdraw Earning', to: '/admin/withdraw/earning' },
      { key: 'commission-earning', icon: <MdMonetizationOn />, label: 'Commission Earning', to: '/admin/commission/earning' },
    ],
  },
  {
    key: 'manage-categories',
    icon: <MdShop />,
    label: 'Manage Categories',
    children: [
      { key: 'main-category', icon: <MdCategory />, label: 'Main Category', to: '/admin/category' },
      { key: 'sub-category', icon: <MdFolder />, label: 'Sub Category', to: '/admin/subcategory' },
      { key: 'child-category', icon: <MdFolderSpecial />, label: 'Child Category', to: '/admin/childcategory' },
    ],
  },

  {
    key: 'products',
    icon: <MdAdd />,
    label: 'Products',
    children: [
      { key: 'add-product', icon: <MdAddBox />, label: 'Add New Product', to: '/admin/products/types' },
      { key: 'all-products', icon: <MdList />, label: 'All Products', to: '/admin/products' },
      { key: 'deactivated-product', icon: <MdVisibilityOff />, label: 'Deactivated Product', to: '/admin/products/deactive' },
      { key: 'product-catalogs', icon: <MdGridView />, label: 'Product Catalogs', to: '/admin/products/catalogs' },
      { key: 'product-settings', icon: <MdSettings />, label: 'Product Settings', to: '/admin/products/product-settings' },
    ],
  },
  {
    key: 'affiliate-products',
    icon: <MdAttachMoney />,  // Assuming this icon represents affiliate products
    label: 'Affiliate Products',
    children: [
      { key: 'add-affiliate-product', icon: <MdAddBox />, label: 'Add Affiliate Product', to: '/admin/products/add-affiliate/AddAffiliateProduct' },
      { key: 'all-affiliate-products', icon: <MdList />, label: 'All Affiliate Products', to: '/admin/products/AllAffiliateProducts' },
    ],
  },

  {
    key: 'bulk-product-upload',
    icon: <MdUpload />,
    label: 'Bulk Product Upload',
    to: '/admin/ProductBulkUpload',
  },
  {
    key: 'product-discussion',
    icon: <MdComment />,
    label: 'Product Discussion',
    children: [
      { key: 'product-reviews', icon: <MdRateReview />, label: 'Product Reviews', to: '/admin/ratings' },
      { key: 'reports', icon: <MdReport />, label: 'Reports', to: '/admin/reports' },
    ],
  },
  { key: 'set-coupons', icon: <MdPercent />, label: 'Set Coupons', to: '/admin/coupon' },
  {
    key: 'customers',
    icon: <MdPeople />,  // Main icon for Customers
    label: 'Customers',
    children: [
      { key: 'customers-list', icon: <MdList />, label: 'Customers List', to: '/admin/users' },
      { key: 'withdraws', icon: <MdAttachMoney />, label: 'Withdraws', to: '/admin/users/withdraws' },
      { key: 'customer-default-image', icon: <MdImage />, label: 'Customer Default Image', to: '/admin/user/default/image' },
    ],
  },

  {
    key: 'riders',
    icon: <MdGroup />,
    label: 'Riders',
    children: [
      { key: 'rider-list', icon: <MdList />, label: 'Rider List', to: '/admin/riders' },
      { key: 'rider-withdraws', icon: <MdAttachMoney />, label: 'Withdraws', to: '/admin/riders/withdraws' },
    ],
  },
  {
    key: 'customer-deposits',
    icon: <MdMonetizationOn />,
    label: 'Customer Deposits',
    children: [
      { key: 'completed-deposits', icon: <MdCheckCircle />, label: 'Completed Deposits', to: '/admin/users/deposits/all' },
      { key: 'pending-deposits', icon: <MdHourglassEmpty />, label: 'Pending Deposits', to: '/admin/users/deposits/pending' },
      { key: 'transactions', icon: <MdAttachMoney />, label: 'Transactions', to: '/admin/users/transactions' },

    ],
  },
  {
    key: 'vendors',
    icon: <MdShop />,
    label: 'Vendors',
    children: [
      { key: 'vendors-list', icon: <MdPeople />, label: 'Vendors List', to: '/admin/vendors' },
      { key: 'vendor-withdraws', icon: <MdMonetizationOn />, label: 'Withdraws', to: '/admin/vendors/withdraws' },
    ],
  },
  {
    key: 'vendor-subscriptions',
    icon: <MdAccountBalance />, // Replace with an appropriate icon
    label: 'Vendor Subscriptions',
    children: [
      { key: 'completed-subscriptions', icon: <MdCheckCircle />, label: 'Completed Subscriptions', to: '/admin/vendors/subs/completed' },
      { key: 'pending-subscriptions', icon: <MdHourglassEmpty />, label: 'Pending Subscriptions', to: '/admin/vendors/subs/pending' },
    ],
  },
  {
    key: 'vendor-verifications',
    icon: <MdVerifiedUser />, // Replace with an appropriate icon
    label: 'Vendor Verifications',
    children: [
      { key: 'all-verifications', icon: <MdList />, label: 'All Verifications', to: '/admin/verificatons/all' },
      { key: 'pending-verifications', icon: <MdHourglassEmpty />, label: 'Pending Verifications', to: '/admin/verificatons/pending' },
    ],
  },
  {
    key: 'vendor-subscription-plans',
    icon: <MdAttachMoney />, // Replace with an appropriate icon
    label: 'Vendor Subscription Plans',
    to: '/admin/subscription',
  },
  {
    key: 'messages',
    icon: <MdMessage />, // Replace with an appropriate icon
    label: 'Messages',
    children: [
      { key: 'tickets', icon: <MdSupport />, label: 'Tickets', to: '/admin/tickets' },
      { key: 'disputes', icon: <MdWarning />, label: 'Disputes', to: '/admin/disputes' },
    ],
  },
  {
    key: 'blog',
    icon: <MdCreate />,  // Assuming MdIcon is imported and represents the desired icon
    label: 'Blog',
    children: [
      { key: 'categories', icon: <MdCategory />, label: 'Categories', to: '/admin/blog/categories' },
      { key: 'posts', icon: <MdPostAdd />, label: 'Posts', to: '/admin/blog/posts' },
      { key: 'settings', icon: <MdSettings />, label: 'Blog Settings', to: '/admin/blog/settings' },
    ],
  },
  {
    key: 'general-settings',
    icon: <MdSettings />, // Replace with an appropriate icon
    label: 'General Settings',
    children: [
      { key: 'logo', icon: <MdImage />, label: 'Logo', to: '/admin/general-settings/logo' },
      { key: 'favicon', icon: <MdImage />, label: 'Favicon', to: '/admin/general-settings/favicon' },
      { key: 'shipping-methods', icon: <MdLocalShipping />, label: 'Shipping Methods', to: '/admin/shipping' },
      { key: 'packagings', icon: <MdWork />, label: 'Packagings', to: '/admin/package' },
      { key: 'pickup-locations', icon: <MdPlace />, label: 'Pickup Locations', to: '/admin/pickup' },
      { key: 'website-contents', icon: <MdDescription />, label: 'Website Contents', to: '/admin/general-settings/contents' },
      { key: 'affiliate-program', icon: <MdAttachMoney />, label: 'Affiliate Program', to: '/admin/general-settings/affilate' },
      { key: 'popup-banner', icon: <MdAnnouncement />, label: 'Popup Banner', to: '/admin/general-settings/popup' },
      { key: 'breadcrumb-banner', icon: <MdMoreHoriz />, label: 'Breadcrumb Banner', to: '/admin/general-settings/breadcrumb' },
      { key: 'error-banner', icon: <MdError />, label: 'Error Banner', to: '/admin/general-settings/error-banner' },
      { key: 'website-maintenance', icon: <MdBuild />, label: 'Website Maintenance', to: '/admin/general-settings/maintenance' },
    ],
  },
  {
    key: 'home-page-settings',
    icon: <MdHome />, // Replace with an appropriate icon
    label: 'Home Page Settings',
    children: [
      { key: 'home-pages', icon: <MdDashboard />, label: 'Home Pages', to: '/admin/home-page-settings' },
      { key: 'sliders', icon: <MdSlideshow />, label: 'Sliders', to: '/admin/slider' },
      { key: 'best-month-offer', icon: <MdStar />, label: 'Best Month Offer', to: '/admin/arrival' },
      { key: 'deal-of-the-day', icon: <MdLocalOffer />, label: 'Deal of the Day', to: '/admin/deal/of/day' },
      { key: 'services', icon: <MdBuild />, label: 'Services', to: '/admin/service' },
      { key: 'partners', icon: <MdPeople />, label: 'Partners', to: '/admin/partner' },
      { key: 'home-page-customization', icon: <MdTune />, label: 'Home Page Customization', to: '/admin/page-settings/customize' },
    ],
  },
  {
    key: 'menu-page-settings',
    icon: <MdMenu />, // Replace with an appropriate icon
    label: 'Menu Page Settings',
    children: [
      { key: 'faq-page', icon: <MdHelp />, label: 'FAQ Page', to: '/admin/faq' },
      { key: 'contact-us-page', icon: <MdContactMail />, label: 'Contact Us Page', to: '/admin/page-settings/contact' },
      { key: 'other-pages', icon: <MdPageview />, label: 'Other Pages', to: '/admin/page' },
      { key: 'customize-menu-links', icon: <MdLink />, label: 'Customize Menu Links', to: '/admin/menu/links' },
    ],
  },
  {
    key: 'email-settings',
    icon: <MdEmail />, // Replace with an appropriate icon
    label: 'Email Settings',
    children: [
      { key: 'email-template', icon: <MdOutlineDescription />, label: 'Email Template', to: '/admin/email-templates' },
      { key: 'email-configurations', icon: <MdSettings />, label: 'Email Configurations', to: '/admin/email-config' },
      { key: 'group-email', icon: <MdGroup />, label: 'Group Email', to: '/admin/groupemail' },
    ],
  },
  {
    key: 'payment-settings',
    icon: <MdPayment />, // Replace with an appropriate icon
    label: 'Payment Settings',
    children: [
      { key: 'payment-information', icon: <MdInfo />, label: 'Payment Information', to: '/admin/payment-informations' },
      { key: 'payment-gateways', icon: <MdPayment />, label: 'Payment Gateways', to: '/admin/paymentgateway' },
      { key: 'currencies', icon: <MdMonetizationOn />, label: 'Currencies', to: '/admin/currency' },
      { key: 'reward-information', icon: <MdStar />, label: 'Reward Information', to: '/admin/rewards' },
    ],
  },
  {
    key: 'social-settings',
    icon: <MdShare />, // Replace with an appropriate icon
    label: 'Social Settings',
    children: [
      { key: 'social-links', icon: <MdLink />, label: 'Social Links', to: '/admin/social-link' },
      { key: 'facebook-login', icon: <MdFacebook />, label: 'Facebook Login', to: '/admin/social/facebook' },
      { key: 'google-login', icon: <MdGTranslate />, label: 'Google Login', to: '/admin/social/google' },
    ],
  },
  {
    key: 'language-settings',
    icon: <MdLanguage />, // Replace with an appropriate icon
    label: 'Language Settings',
    children: [
      { key: 'website-language', icon: <MdLanguage />, label: 'Website Language', to: '/admin/languages' },
      { key: 'admin-panel-language', icon: <MdLanguage />, label: 'Admin Panel Language', to: '/admin/adminlanguages' },
    ],
  },
  {
    key: 'font-option',
    icon: <MdFontDownload />, // Replace with an appropriate icon
    label: 'Font Option',
    to: '/admin/fonts',
  },
  {
    key: 'seo-tools',
    icon: <MdSearch />, // Replace with an appropriate icon
    label: 'SEO Tools',
    children: [
      { key: 'popular-products', icon: <MdStar />, label: 'Popular Products', to: '/admin/products/popular/30' },
      { key: 'google-analytics', icon: <MdAssessment />, label: 'Google Analytics', to: '/admin/seotools/analytics' },
      { key: 'website-meta-keywords', icon: <MdTextFields />, label: 'Website Meta Keywords', to: '/admin/seotools/keywords' },
    ],
  },
  { key: 'staffs', icon: <MdGroup />, label: 'Manage Staffs', to: '/admin/blog/manage-staffs' },

  {
    key: 'subscribers',
    icon: <MdPeople />, // Replace with an appropriate icon
    label: 'Subscribers',
    to: '/admin/subscribers',
  },
  {
    key: 'roles',
    icon: <MdPerson />,
    label: 'Manage Roles',
    to: '/admin/role',
  },
  { key: 'admin-logs', icon: <MdHistory />, label: 'Admin Logs', to: '/admin/logs' },
  { key: 'logout', icon: <MdLogout />, label: 'Logout', to: '/logout' },
];

export default function Sidebar({ collapsed, toggleSidebar }) {
  const navigate = useNavigate();

  const renderMenuItems = (items) => {

    return items.map((item) => {

      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item.to)}>
          <Link to={item.to}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <>
      <Button
        onClick={toggleSidebar}  // Call the function passed from App
        style={{
          position: 'fixed',
          top: 16,
          left: collapsed ? 90 : 260,
          zIndex: 1000,
        }}
        icon={<MdMenu />}
      />
      <Sider
        width={250}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={`flex justify-center items-center ${collapsed ? 'h-12' : 'h-24'} transition-all duration-300`}>
          {collapsed ? (
            <img
              src={logo} // Replace with your logo path
              alt="Logo"
              className="h-8" // Set height for the logo
            />
          ) : (
            <h1 className={`font-semibold text-xl`}>
              Arrc Tech Ecommerce
            </h1>
          )}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ borderRight: 0 }}
        >
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>
    </>
  );
}
