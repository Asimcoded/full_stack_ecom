import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default RootLayout