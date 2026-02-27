import { Outlet } from 'react-router-dom';
import Slider from '../components/Slider';

export default function AuthLayout() {
  return (
    // flex-col stacks Slider on top of the Form on mobile
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      
      {/* This will be the 30% header on mobile and 50% sidebar on desktop */}
      <Slider />

      {/* Form area */}
      <div className="flex flex-1 items-center justify-center px-6 lg:px-16 bg-[#B4BEB8] md:bg-white">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}