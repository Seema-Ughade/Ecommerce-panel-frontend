import React from 'react'
import AdminDashboardCards from './AdminDashboardCards'
import CardsRow from './CardsRow'
import DashboardOverview from './DashboardOverview'
import RecentProducts from './RecentProducts'
import SalesChart from './SalesChart'
import ResponsiveCharts from './ResponsiveCharts'

const Dashboard = () => {
  return (
    <div>
        <AdminDashboardCards/>
        <CardsRow />
        <DashboardOverview />
        <RecentProducts />
        <SalesChart />
        <ResponsiveCharts />
    </div>
  )
}

export default Dashboard