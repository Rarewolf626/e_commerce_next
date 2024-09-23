"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Wifi, Smartphone, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner1 from "@/assests/banner1.jpeg";
import banner2 from "@/assests/banner2.jpeg";
import banner3 from "@/assests/banner3.jpg";

const TechBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: banner1,
      alt: "Latest Smartphone",
      title: "Next-Gen Smartphones",
      description: "Experience the future in your hands",
    },
    {
      image: banner2,
      alt: "High-end Laptop",
      title: "Ultra-Thin Laptops",
      description: "Power meets portability",
    },
    {
      image: banner3,
      alt: "Smart Home Devices",
      title: "Smart Home Innovation",
      description: "Transform your living space",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            quality={100}
            priority
            fill
            className="brightness-75 object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl text-white drop-shadow-lg">
            Explore the Future of Tech
          </h1>
          <p className="mb-6 text-lg md:text-xl text-white drop-shadow-md">
            {slides[currentSlide].title} - {slides[currentSlide].description}
          </p>
          <div>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-200  transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Discover Latest Tech <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 flex space-x-4">
        <div>
          <Wifi className="text-white drop-shadow-md" size={24} />
        </div>
        <div>
          <Smartphone className="text-white drop-shadow-md" size={24} />
        </div>
        <div>
          <Laptop className="text-white drop-shadow-md" size={24} />
        </div>
      </div>
    </div>
  );
};

export default TechBanner;
