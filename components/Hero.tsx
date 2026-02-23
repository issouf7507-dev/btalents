import React, { useEffect, useRef } from "react";
import Link from "next/link";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particules
    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebondir sur les bords
        if (canvas && (this.x > canvas.width || this.x < 0)) {
          this.speedX *= -1;
        }
        if (canvas && (this.y > canvas.height || this.y < 0)) {
          this.speedY *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    // Animation
    function animate() {
      if (!canvas) return;
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Redimensionner le canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="h-screen w-full bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(/imgs/herobg.png)` }}
    >
      {/* Canvas pour l'animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Contenu */}
      <div className="flex flex-col items-center justify-center h-full px-4 relative" style={{ zIndex: 2 }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center tracking-wider">
          Libérez tout le potentiel <br />
          <span className="bg-gradient-to-r from-white to-[#789f78] bg-clip-text text-transparent">
            de vos talents
          </span>
        </h1>

        <p className="text-white text-center text-sm sm:text-base md:text-lg mt-6 sm:mt-8 md:mt-10 max-w-3xl px-4">
          Nous aidons les organisations à devenir engagées, performantes et durables.
          <br />
          BTalent accompagne les entreprises dans la définition de leurs besoins, la création de
          fiches de poste et l'identification des compétences clés pour chaque rôle.
        </p>

        <Link href="/services" className="inline-block text-center text-base sm:text-lg mt-6 sm:mt-8 md:mt-10 bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full cursor-pointer hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <span className="text-sm sm:text-base font-semibold">Découvrir nos services</span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;