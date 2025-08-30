import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import { CheckCircle, Download, Rocket, Zap, Target, TrendingUp, Users, MessageSquare, Instagram, MapPin, ArrowUp, Star, Sparkles } from 'lucide-react';

// Sistema de partículas 3D avançado
export const AdvancedParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, z: number, color: string}>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 1000,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            zIndex: particle.z
          }}
          animate={{
            y: [0, -window.innerHeight * 2],
            x: [0, Math.random() * 200 - 100],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// Efeito de wave distorção
export const WaveDistortion = ({ children }: { children: React.ReactNode }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 100]);
  
  return (
    <motion.div
      className="relative overflow-hidden"
      style={{ y }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
        animate={{
          clipPath: [
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            "polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)",
            "polygon(0% 0%, 100% 20%, 100% 100%, 0% 80%)",
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {children}
    </motion.div>
  );
};

// Card com efeito de energia elétrica
export const EnergyCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 ${className}`}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        scale: 1.08, 
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      {/* Efeito de energia */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
        animate={{
          opacity: isHovered ? [0.2, 0.6, 0.2] : 0.2,
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Linhas de energia */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Botão com efeito de explosão
export const ExplosionButton = ({ children, variant = "primary", className = "", ...props }: { children: React.ReactNode; variant?: "primary" | "secondary"; className?: string; [key: string]: any }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  const variants = {
    primary: "from-orange-500 via-red-500 to-pink-500",
    secondary: "from-purple-500 via-blue-500 to-cyan-500"
  };

  const handlePress = () => {
    setIsPressed(true);
    // Criar partículas de explosão
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setIsPressed(false);
      setParticles([]);
    }, 600);
  };

  return (
    <div className="relative">
      <motion.button
        className={`relative overflow-hidden bg-gradient-to-r ${variants[variant as keyof typeof variants]} text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onTap={handlePress}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          animate={{
            opacity: isPressed ? [0, 1, 0] : 0,
            scale: isPressed ? [0, 1.5, 0] : 1,
          }}
          transition={{ duration: 0.6 }}
        />
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </motion.button>
      
      {/* Partículas de explosão */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full pointer-events-none"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [0, 1, 0],
            opacity: [1, 0.8, 0],
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// Texto com efeito de glitch
export const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.span
        className="relative z-10"
        animate={{
          x: isGlitching ? [0, -2, 2, 0] : 0,
          y: isGlitching ? [0, 1, -1, 0] : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Efeito de glitch */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-red-400 opacity-80"
            animate={{
              x: [0, -1, 1, 0],
              y: [0, 1, -1, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-cyan-400 opacity-60"
            animate={{
              x: [0, 1, -1, 0],
              y: [0, -1, 1, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        </>
      )}
    </div>
  );
};

// Efeito de morphing entre formas
export const MorphingShapes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full"
        animate={{
          borderRadius: ["50%", "0%", "25%", "50%"],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-400"
        animate={{
          borderRadius: ["0%", "50%", "25%", "0%"],
          scale: [1, 0.8, 1.2, 1],
          rotate: [0, -180, -360, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};







