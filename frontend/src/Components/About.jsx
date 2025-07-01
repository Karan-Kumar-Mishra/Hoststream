import { useEffect, useRef } from 'react';

const About = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = spotlightRef.current.getBoundingClientRect();
        const x = (clientX - left) / width * 100;
        const y = (clientY - top) / height * 100;
        spotlightRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(56, 182, 255, 0.15) 0%, rgba(255,255,255,0) 70%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className=" min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 relative overflow-hidden">
      {/* Spotlight background */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 182, 255, 0.15) 0%, rgba(255,255,255,0) 70%)',
          transition: 'background 0.3s ease-out',
        }}
      />



      <div className="max-w-3xl mx-auto text-center mt-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">HostStream</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
        </div>

        {/* Single paragraph content */}
        <div className="bg-gray-900/60  backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-2xl">
          <p className="text-gray-300 leading-relaxed text-lg cursor-pointer">
            HostStream is a premium cloud infrastructure platform providing comprehensive hosting solutions including
            high-performance website hosting, scalable EC2 instances, and managed database services.
            We combine enterprise-grade reliability with developer-friendly tools to empower businesses
            of all sizes. Our globally distributed network ensures 99.9% uptime, while intuitive controls
            and automated scaling make infrastructure management effortless. Whether you're launching a
            simple website or deploying complex applications, HostStream delivers the perfect balance of
            power, flexibility, and ease-of-use.
          </p>
        </div>
      </div>
    </div>

  );
};

export default About;