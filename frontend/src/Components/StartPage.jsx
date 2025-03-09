import React, { useEffect, useRef } from "react";
import { SignIn } from "@clerk/clerk-react";

const StartPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create stars
    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.08,
      });
    }

    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        // Move stars downward
        star.y += star.speed;

        // Reset star position if it goes off the screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(drawStars);
    };

    drawStars();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Canvas for the night sky animation */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          background: "black",
          width: "100%",
          height: "100%",
        }}
      ></canvas>

      {/* SignIn button */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <SignIn
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              // Form container
              rootBox: "w-10", // Set a smaller width for the form container
              card: "p-4", // Reduce padding inside the form
              formButtonPrimary:
                "h-10 bg-blue-500 hover:bg-blue-600 text-sm px-4", // Customize the button
            },
          }}
        />
      </div>
    </div>
  );
};

export default StartPage;
