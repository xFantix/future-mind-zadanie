import MainLayoutHeader from '@layouts/mainLayout/components/MainLayoutHeader'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className="min-h-screen max-h-full flex flex-col items-center relative overflow-hidden">
      <MainLayoutHeader />
      <main className="flex-1 w-full p-6 md:p-[60px]">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
