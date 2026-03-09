import { useState, useEffect } from 'react';
import moneyStress from '../assets/Money-stress-bro.svg'
import walletBro from '../assets/Wallet-bro.svg'
import bankruptcy from '../assets/Bankruptcy-bro.svg'

const slides = [
  {
    image: moneyStress,
    title: 'Your Finances, Made Effortless',
    description: 'From group dinners and fuel to unexpected owambe expenses — track every kobo and stay on top of your budget stress-free.',
  },
  {
    image: walletBro,
    title: 'Never Get Caught Off Guard Again',
    description: "with our app, you can easily track your income and expenses, set financial goals, and make informed decisions about your money.",
  },
  {
    image: bankruptcy,
    title: 'Naira Smart, Life Easier',
    description: 'Track owambe costs, betting stakes, data bundles & salary extras — spot leaks, track your side hustle extra, and chop life responsibly.',
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full lg:h-screen lg:flex-1 bg-[#B4BEB8] items-center justify-center p-4 lg:p-8">
      
      <div className="relative h-[25vh] lg:h-[90vh] w-full max-w-[500px] bg-[#0A0D0C] rounded-[24px] lg:rounded-[40px] shadow-2xl overflow-hidden flex flex-col border-[4px] lg:border-[8px] border-black">
        
        {/* Progress Bars */}
        <div className="absolute top-2 lg:top-3 left-0 right-0 flex px-4 lg:px-6 gap-2 z-20">
          {slides.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-[#10B981] transition-all duration-[4000ms] ease-linear ${
                  index === currentIndex ? 'w-full' : index < currentIndex ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-row lg:flex-col items-center justify-center relative px-4 lg:px-0 overflow-hidden">
          
          {/* Image Container */}
          <div className="relative flex-1 h-full w-full flex items-center justify-center">
            {slides.map((slide, index) => (
              <img 
                key={index}
                src={slide.image} 
                alt="Illustration" 
                // FIXED: Changed lg:w-[3200px] to lg:w-[320px]
                // ADDED: inset-0 and m-auto to ensure perfect centering in the absolute container
                className={`absolute inset-0 m-auto transition-opacity duration-700 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] 
                  w-[120px] lg:w-[320px] 
                  h-auto max-h-[85%]
                  ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
                `}
              />
            ))}
          </div>

          {/* Text Section */}
          <div className="flex-1 lg:flex-none lg:px-10 lg:pb-12 flex flex-col justify-center lg:justify-end text-left lg:text-center z-10">
            <h2 className="text-white text-sm lg:text-3xl font-bold leading-tight">
              {slides[currentIndex].title}
            </h2>
            <p className="hidden lg:block text-gray-400 text-base leading-relaxed mt-4">
              {slides[currentIndex].description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}