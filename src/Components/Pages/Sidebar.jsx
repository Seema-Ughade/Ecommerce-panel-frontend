import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/mainlogo.png'; // Adjust extension if necessary
import {
  MdDashboard,
  MdShoppingCart,
  MdFlag,
  MdShop,
  MdSettings,
  MdFileCopy,
  MdPublic,
  MdMail,
  MdAttachMoney,
  MdMenu,
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
  MdGroup,
  MdHistory,
  MdLogout,
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
      { key: 'all-orders', label: 'All Orders', to: '/admin/orders' },
      { key: 'pending-orders', label: 'Pending Orders', to: '/admin/orders?status=pending' },
      { key: 'processing-orders', label: 'Processing Orders', to: '/admin/orders?status=processing' },
      { key: 'completed-orders', label: 'Completed Orders', to: '/admin/orders?status=completed' },
      { key: 'declined-orders', label: 'Declined Orders', to: '/admin/orders?status=declined' },
      { key: 'pos', label: 'POS', to: '/admin/order/create' },
    ],
  },
  {
    key: 'manage-country',
    icon: <MdFlag />,
    label: 'Manage Country',
    children: [
      { key: 'country', label: 'Country', to: '/admin/manage/country' },
      { key: 'manage-tax', label: 'Manage Tax', to: '/admin/manage/country/tax' },
    ],
  },
  {
    key: 'total-earning',
    icon: <MdAttachMoney />,
    label: 'Total Earning',
    children: [
      { key: 'tax-calculate', label: 'Tax Calculate', to: '/admin/tax/calculate' },
      { key: 'subscription-earning', label: 'Subscription Earning', to: '/admin/subscription/earning' },
      { key: 'withdraw-earning', label: 'Withdraw Earning', to: '/admin/withdraw/earning' },
      { key: 'commission-earning', label: 'Commission Earning', to: '/admin/commission/earning' },
    ],
  },
  {
    key: 'manage-categories',
    icon: <MdShop />,
    label: 'Manage Categories',
    children: [
      { key: 'main-category', label: 'Main Category', to: '/admin/category' },
      { key: 'sub-category', label: 'Sub Category', to: '/admin/subcategory' },
      { key: 'child-category', label: 'Child Category', to: '/admin/childcategory' },
    ],
  },
  
  {
    key: 'products',
    icon: <MdAdd />,
    label: 'Products',
    children: [
      { key: 'add-product', label: 'Add New Product', to: '/admin/products/types' },
      { key: 'all-products', label: 'All Products', to: '/admin/products' },
      { key: 'deactivated-product', label: 'Deactivated Product', to: '/admin/products/deactive' },
      { key: 'product-catalogs', label: 'Product Catalogs', to: '/admin/products/catalogs' },
      { key: 'product-settings', label: 'Product Settings', to: '/admin/products/product-settings' },
    ],
  },
  {
    key: 'bulk-product-upload',
    icon: <MdUpload />,
    label: 'Bulk Product Upload',
    to: '/admin/products/import',
  },
  {
    key: 'product-discussion',
    icon: <MdComment />,
    label: 'Product Discussion',
    children: [
      { key: 'product-reviews', label: 'Product Reviews', to: '/admin/ratings' },
      { key: 'reports', label: 'Reports', to: '/admin/reports' },
    ],
  },
  { key: 'set-coupons', icon: <MdPercent />, label: 'Set Coupons', to: '/admin/coupon' },
  {
    key: 'customers',
    icon: <MdPeople />,
    label: 'Customers',
    children: [
      { key: 'customers-list', label: 'Customers List', to: '/admin/users' },
      { key: 'withdraws', label: 'Withdraws', to: '/admin/users/withdraws' },
    ],
  },
  {
    key: 'riders',
    icon: <MdGroup />,
    label: 'Riders',
    children: [
      { key: 'rider-list', label: 'Rider List', to: '/admin/riders' },
      { key: 'rider-withdraws', label: 'Withdraws', to: '/admin/riders/withdraws' },
    ],
  },
  {
    key: 'customer-deposits',
    icon: <MdMonetizationOn />,
    label: 'Customer Deposits',
    children: [
      { key: 'completed-deposits', label: 'Completed Deposits', to: '/admin/users/deposits/all' },
      { key: 'pending-deposits', label: 'Pending Deposits', to: '/admin/users/deposits/pending' },
      { key: 'transactions', label: 'Transactions', to: '/admin/users/transactions' },
    ],
  },
  {
    key: 'vendors',
    icon: <MdShop />,
    label: 'Vendors',
    children: [
      { key: 'vendors-list', label: 'Vendors List', to: '/admin/vendors' },
      { key: 'vendor-withdraws', label: 'Withdraws', to: '/admin/vendors/withdraws' },
    ],
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
        <div className={`flex justify-center items-center ${collapsed ? 'h-12' : 'h-24' } transition-all duration-300`}>
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
