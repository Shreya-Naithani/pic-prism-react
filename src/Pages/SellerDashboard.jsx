import React from 'react'
import DashboardSidebar from '../Components/DashboardSidebar'
import PhotoManagement from '../Components/seller/PhotoManagement'

const SellerDashboard = () => {
  return (
    <div className='flex flex-col sm:flex-row'>
    <DashboardSidebar/>
    <div>

    <PhotoManagement/>
    </div>
    </div>
  )
}

export default SellerDashboard
