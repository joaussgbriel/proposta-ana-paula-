import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CheckCircle, Download, Rocket, Zap, Target, TrendingUp, Users, MessageSquare, Instagram, MapPin, ArrowUp } from 'lucide-react';

// Componente de contador regressivo
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center gap-4 mb-4">
      {[
        { value: timeLeft.days, label: 'Dias', color: 'from-orange-500 to-orange-600' },
        { value: timeLeft.hours, label: 'Horas', color: 'from-purple-500 to-purple-600' },
        { value: timeLeft.minutes, label: 'Min', color: 'from-blue-500 to-blue-600' },
        { value: timeLeft.seconds, label: 'Seg', color: 'from-cyan-500 to-cyan-600' }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="text-center"
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-2`}>
            <span className="text-2xl font-bold text-white">
              {item.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-sm text-gray-300 font-medium">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

// Componente de partículas flutuantes
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Componente de gradiente animado
const AnimatedGradient = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(249, 115, 22, 0.2) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)",
            "linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(249, 115, 22, 0.2) 50%, rgba(147, 51, 234, 0.2) 100%)",
            "linear-gradient(45deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(249, 115, 22, 0.2) 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {children}
    </div>
  );
};

// Componente de card com efeito glassmorphism
const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)"
      }}
    >
      {children}
    </motion.div>
  );
};

// Componente de botão com efeitos especiais
const SpecialButton = ({ children, variant = "primary", className = "", ...props }: { children: React.ReactNode; variant?: "primary" | "secondary" | "accent"; className?: string; [key: string]: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const variants: Record<string, string> = {
    primary: "from-orange-500 via-orange-600 to-orange-700",
    secondary: "from-gray-700 via-gray-600 to-gray-500",
    accent: "from-purple-500 via-purple-600 to-purple-700"
  };

  return (
    <motion.button
      className={`relative overflow-hidden bg-gradient-to-r ${variants[variant]} text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};

function App() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Função para fazer download do PDF
  const handleDownloadPDF = () => {
    // Cria um link temporário para download do PDF estático
    const link = document.createElement('a');
    link.href = '/proposta_ana_paula_.pdf'; // Caminho para o PDF na pasta public
    link.download = 'Proposta-Comercial-Ana-Paula.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Efeito de parallax para o mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mouseX = useSpring(useTransform(scrollY, [0, 1000], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });

  const mouseY = useSpring(useTransform(scrollY, [0, 1000], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Cursor personalizado */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Partículas flutuantes */}
      <FloatingParticles />

      {/* Hero Section com efeitos especiais */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background animado */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800"
          animate={{
            background: [
              "linear-gradient(45deg, #000000 0%, #1f2937 50%, #111827 100%)",
              "linear-gradient(45deg, #111827 0%, #000000 50%, #1f2937 100%)",
              "linear-gradient(45deg, #1f2937 0%, #111827 50%, #000000 100%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Círculos decorativos animados */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Título principal com efeito de digitação */}
            <motion.h1
              className="font-montserrat text-6xl lg:text-8xl font-bold mb-8 leading-tight pt-16"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                Proposta Comercial
              </span>
              <br />
              <motion.span
                className="block text-4xl lg:text-6xl text-orange-400 mt-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Ana Paula
              </motion.span>
            </motion.h1>

            {/* Subtítulo com efeito de fade */}
            <motion.p
              className="font-inter text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Em <span className="text-orange-400 font-bold">60 dias</span>, você terá audiência engajada pronta para comprar o seu produto.
            </motion.p>

            {/* Botões CTA com efeitos especiais */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <SpecialButton 
                variant="primary" 
                className="text-lg px-10 py-5"
                onClick={() => {
                  const message = "Olá, João! Quero confirmar a minha proposta.";
                  const whatsappUrl = `https://wa.me/35998877595?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <CheckCircle className="w-6 h-6 mr-3" />
                ✅ Confirmar Proposta Agora
              </SpecialButton>
              
              <SpecialButton variant="secondary" className="text-lg px-10 py-5" onClick={handleDownloadPDF}>
                <Download className="w-6 h-6 mr-3" />
                📄 Baixar Proposta em PDF
              </SpecialButton>
            </motion.div>

            {/* Estatísticas com distribuição melhorada */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 mb-16"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {[
                { 
                  icon: Users, 
                  number: "2", 
                  text: "Meses de Aquecimento",
                  description: "Período estratégico para construir autoridade"
                },
                { 
                  icon: TrendingUp, 
                  number: "60", 
                  text: "Dias para Resultados",
                  description: "Timeline otimizada para máximo impacto"
                },
                { 
                  icon: Rocket, 
                  number: "100%", 
                  text: "Foco em Conversão",
                  description: "Gerar leads compradores para a Fase de Vendas"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group relative"
                  whileHover={{ scale: 1.05, y: -8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Card de fundo com efeito glassmorphism */}
                  <div className="relative p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-orange-500/30 transition-all duration-300">
                    {/* Ícone com gradiente melhorado */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-500 via-orange-400 to-purple-500 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      {/* Efeito de brilho no hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.5
                        }}
                      />
                      <stat.icon className="w-10 h-10 text-white relative z-10" />
              </div>
              
                    {/* Número principal com gradiente */}
                    <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-purple-400 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">
                      {stat.number}
              </div>
              
                    {/* Título principal */}
                    <div className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                      {stat.text}
              </div>
              
                    {/* Descrição adicional */}
                    <div className="text-sm text-gray-400 leading-relaxed max-w-48 mx-auto">
                      {stat.description}
              </div>
            </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowUp className="w-6 h-6 text-orange-400" />
        </motion.div>
      </section>

      {/* Fase 1 - Pré-Lançamento com cards glassmorphism */}
      <section className="py-20 relative">
        <AnimatedGradient>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="font-montserrat text-5xl lg:text-7xl font-bold text-white mb-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                🚀 <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                  Pré-Lançamento
                </span>
                <br />
                <span className="text-3xl lg:text-5xl text-gray-300">
                  2 meses para aquecer audiência
                </span>
              </motion.h2>

              <motion.p
                className="font-inter text-2xl text-gray-300 mb-20 text-center max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <strong className="text-white">Objetivo:</strong> construir autoridade e preparar o público para o lançamento.
              </motion.p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  {
                    icon: Users,
                    title: "Conteúdos Semanais",
                    description: "Criação e edição de posts e vídeos curtos alinhados ao calendário de aquecimento. Frequência: 3 a 4 conteúdos por semana.",
                    color: "from-orange-500 to-orange-600"
                  },
                  {
                    icon: MapPin,
                    title: "Campanhas Geolocalizadas",
                    description: "Estratégias para atrair público qualificado da sua região com segmentação precisa.",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    icon: Instagram,
                    title: "Automação Instagram",
                    description: "Sistema automatizado: cada pessoa impactada entra em fluxo → recebe valor via direct e convite para grupo WhatsApp exclusivo.",
                    color: "from-pink-500 to-pink-600"
                  },
                  {
                    icon: MessageSquare,
                    title: "Nutrição no Grupo",
                    description: "Conteúdos gratuitos que criam antecipação e mantêm o público engajado.",
                    color: "from-blue-500 to-blue-600"
                  }
                ].map((item, index) => (
                  <GlassCard key={index} delay={index * 0.1}>
                    <motion.div
                      className={`w-16 h-16 mb-6 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-montserrat text-2xl font-bold text-white mb-4">
                      {item.title}
                </h3>
                    <p className="font-inter text-gray-300 leading-relaxed">
                      {item.description}
                </p>
                  </GlassCard>
                ))}
              </div>
              
              <motion.div
                className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-10 border border-orange-500/30"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-inter text-xl text-orange-100 leading-relaxed text-center">
                  <strong className="text-orange-300 text-2xl">👉 Resultado:</strong> presença constante, audiência aquecida e leads engajados, prontos para o lançamento.
                </p>
              </motion.div>
            </motion.div>
              </div>
        </AnimatedGradient>
      </section>

      {/* Fase de Vendas - Lançamento e Escala */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background com efeito de movimento */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
          animate={{
            background: [
              "linear-gradient(45deg, #111827 0%, #000000 50%, #1f2937 100%)",
              "linear-gradient(45deg, #1f2937 0%, #111827 50%, #000000 100%)",
              "linear-gradient(45deg, #000000 0%, #1f2937 50%, #111827 100%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="font-montserrat text-5xl lg:text-7xl font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              💥 <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Fase de Vendas
              </span>
              <br />
              <span className="text-3xl lg:text-5xl text-gray-300">
                Lançamento e Escala - Apenas na Fase 2
              </span>
            </motion.h2>

            <motion.p
              className="font-inter text-2xl text-gray-300 mb-20 text-center max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <strong className="text-white">Objetivo:</strong> transformar audiência aquecida da Fase 1 em vendas consistentes na Fase 2.
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  icon: Target,
                  title: "Campanhas de Conversão",
                  description: "Campanhas de tráfego direto para conversão (leads e vendas) - Fase de Vendas.",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: TrendingUp,
                  title: "Escala de Anúncios",
                  description: "Escala de anúncios com criativos otimizados para máximo impacto - Fase de Vendas.",
                  color: "from-cyan-500 to-cyan-600"
                },
                {
                  icon: Zap,
                  title: "Conteúdos de Conversão",
                  description: "Conteúdos estratégicos para reforço de ofertas, provas sociais e urgência - Fase de Vendas.",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: Rocket,
                  title: "Otimizações Semanais",
                  description: "Monitoramento e otimização semanal para maximizar ROI - Fase de Vendas.",
                  color: "from-indigo-500 to-indigo-600"
                }
              ].map((item, index) => (
                <GlassCard key={index} delay={index * 0.1}>
                  <motion.div
                    className={`w-16 h-16 mb-6 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-montserrat text-2xl font-bold text-white mb-4">
                    {item.title}
                </h3>
                  <p className="font-inter text-gray-300 leading-relaxed">
                    {item.description}
                </p>
                </GlassCard>
              ))}
            </div>
            
            <motion.div
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-10 border border-blue-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-inter text-xl text-blue-100 leading-relaxed text-center">
                <strong className="text-blue-300 text-2xl">👉 Resultado:</strong> impacto imediato no lançamento e início de vendas previsíveis, sustentadas por um sistema de tráfego e conteúdo em crescimento.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ancoragem de Valor com efeitos 3D */}
      <section className="py-20 relative">
        <AnimatedGradient>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="font-montserrat text-5xl lg:text-6xl font-bold text-white mb-12 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Ancoragem de Valor
                </span>
              </motion.h2>

              <motion.p
                className="font-inter text-2xl text-gray-300 mb-16 text-center leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
              Para você ter clareza do que está incluso no sistema que proponho, aqui está o valor médio de mercado caso cada parte fosse contratada separadamente:
              </motion.p>

              <motion.div
                className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 lg:p-16 border border-white/10"
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)"
                }}
                style={{ perspective: 1000 }}
              >
                <div className="space-y-6 mb-12">
                  {[
                    { service: "Gestão de redes sociais", price: "R$ 1.200/mês" },
                    { service: "Edição de vídeos", price: "R$ 1.000/mês" },
                    { service: "Design e identidade visual", price: "R$ 800/mês" },
                    { service: "Automação no Instagram", price: "R$ 800/mês" },
                    { service: "Gestão de tráfego pago", price: "R$ 1.500/mês" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center py-4 border-b border-gray-600/30"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <span className="font-inter text-gray-300 line-through text-lg">{item.service}</span>
                      <span className="font-inter text-gray-400 line-through text-lg">{item.price}</span>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    className="flex justify-between items-center py-6 border-b-2 border-gray-500/30"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    <span className="font-montserrat text-xl font-bold text-gray-300">Total separadamente</span>
                    <span className="font-montserrat text-xl font-bold text-gray-300">R$ 5.300/mês</span>
                  </motion.div>
              </div>
              
                <motion.div
                  className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-10 border-2 border-orange-500/40"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-inter text-2xl text-center text-orange-100 leading-relaxed">
                    <strong className="font-montserrat text-3xl text-orange-300">👉 No sistema completo que proponho:</strong><br />
                                         <span className="text-white font-semibold text-2xl">tudo isso incluso em um único investimento de R$ 1.000,00</span>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedGradient>
      </section>

      {/* Investimento com cards flutuantes */}
      <section className="py-20 bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
          animate={{
            background: [
              "linear-gradient(45deg, #111827 0%, #000000 50%, #1f2937 100%)",
              "linear-gradient(45deg, #1f2937 0%, #111827 50%, #000000 100%)",
              "linear-gradient(45deg, #000000 0%, #1f2937 50%, #111827 100%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="font-montserrat text-5xl lg:text-6xl font-bold text-white mb-20 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Investimento
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {[
                {
                  phase: "Fase 1",
                  description: "Pré-lançamento – 2 meses",
                  price: "R$ 1.000",
                  period: "por mês",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  phase: "Fase de Vendas",
                  description: "Lançamento e Escala – reajuste automático a partir do mês 3",
                  price: "A definir",
                  period: "por mês",
                  color: "from-purple-500 to-purple-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 text-center"
                  initial={{ opacity: 0, y: 100, rotateY: index === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -20,
                    rotateY: index === 0 ? -5 : 5,
                    boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.25)"
                  }}
                  style={{ perspective: 1000 }}
                >
                  <h3 className="font-montserrat text-3xl font-bold text-white mb-6">
                    {item.phase}
                  </h3>
                  <p className="font-inter text-gray-300 mb-8 text-lg">
                    {item.description}
                  </p>
                  <div className={`text-6xl lg:text-7xl font-montserrat font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-6`}>
                    {item.price}
                  </div>
                  <p className="font-inter text-xl text-gray-300">
                    {item.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Próximos Passos com timeline animada */}
      <section className="py-20 relative">
        <AnimatedGradient>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="font-montserrat text-5xl lg:text-6xl font-bold text-white mb-16 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Próximos Passos
                </span>
              </motion.h2>

                              <motion.div
                  className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                                     {/* Validade da proposta */}
                   <motion.div
                     className="text-center mb-12 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl border border-orange-500/20"
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.6 }}
                   >
                     <motion.p
                       className="font-inter text-2xl text-gray-200 mb-4 leading-relaxed"
                     >
                       Essa proposta é válida até <strong className="text-orange-400 text-3xl">5 de setembro de 2025</strong>
                     </motion.p>
                     
                     {/* Contador regressivo */}
                     <motion.div
                       className="mb-6"
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: 0.8 }}
                     >
                       <CountdownTimer targetDate="2025-09-05" />
                     </motion.div>
                     
                     <motion.div
                       className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full"
                       initial={{ scaleX: 0 }}
                       whileInView={{ scaleX: 1 }}
                       viewport={{ once: true }}
                       transition={{ duration: 1, delay: 1 }}
                     />
                   </motion.div>

                  {/* Início imediato */}
                  <motion.p
                    className="font-inter text-xl text-gray-300 mb-12 text-center leading-relaxed"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                Confirmando ainda esta semana, iniciamos imediatamente:
                  </motion.p>

                  {/* Lista de ações */}
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {[
                      {
                        title: "Produção de conteúdos",
                        description: "Criação de posts e vídeos otimizados",
                        icon: "📝"
                      },
                      {
                        title: "Configuração de campanhas",
                        description: "Setup completo das estratégias de tráfego",
                        icon: "🎯"
                      },
                      {
                        title: "Implementação da automação",
                        description: "Sistema automatizado funcionando",
                        icon: "⚡"
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 group"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {step.icon}
                </div>
                        <h3 className="font-montserrat text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="font-inter text-sm text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    ))}
              </div>
              
                <motion.p
                  className="font-inter text-xl text-gray-300 mb-16 text-center leading-relaxed"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                — garantindo tempo hábil para que seu lançamento comece com força máxima.
                </motion.p>
              
              {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  <SpecialButton 
                    variant="primary" 
                    className="text-xl px-12 py-6"
                    onClick={() => {
                      const message = "Olá, João! Quero confirmar a minha proposta.";
                      const whatsappUrl = `https://wa.me/35998877595?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    <CheckCircle className="w-7 h-7 mr-3" />
                  ✅ Confirmar Proposta Agora
                  </SpecialButton>
                  
                  <SpecialButton variant="secondary" className="text-xl px-10 py-6" onClick={handleDownloadPDF}>
                    <Download className="w-7 h-7 mr-3" />
                  📄 Baixar Proposta em PDF
                  </SpecialButton>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedGradient>
      </section>

      {/* Fechamento com efeito de destaque */}
      <section className="py-20 bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
          animate={{
            background: [
              "linear-gradient(45deg, #111827 0%, #000000 50%, #1f2937 100%)",
              "linear-gradient(45deg, #1f2937 0%, #111827 50%, #000000 100%)",
              "linear-gradient(45deg, #000000 0%, #1f2937 50%, #111827 100%)",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="font-montserrat text-5xl lg:text-7xl font-bold text-white mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ana Paula, o caminho está definido: <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                aquecimento agora, vendas depois.
              </span>
            </motion.h2>

            <motion.div
              className="space-y-10 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                "A Fase 1 coloca seu público no radar.",
                "A Fase de Vendas transforma esse público em clientes e caixa previsível.",
                "Cada semana que passa sem começar é audiência perdida, concorrente ocupando espaço e menos impacto no seu lançamento."
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className="font-inter text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <SpecialButton 
                variant="primary" 
                className="text-2xl lg:text-3xl px-16 py-8"
                onClick={() => {
                  const message = "Olá, João! Quero confirmar a minha proposta.";
                  const whatsappUrl = `https://wa.me/35998877595?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <CheckCircle className="w-9 h-9 mr-4" />
              ✅ Confirmar Proposta Agora
              </SpecialButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fixed Mobile CTA com efeitos */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-700/50 p-4 lg:hidden z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <SpecialButton 
          variant="primary" 
          className="w-full"
          onClick={() => {
            const message = "Olá, João! Quero confirmar a minha proposta.";
            const whatsappUrl = `https://wa.me/35998877595?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }}
        >
          <CheckCircle className="w-6 h-6 mr-3" />
          ✅ Confirmar Proposta Agora
        </SpecialButton>
      </motion.div>

      {/* Footer com efeitos sutis */}
      <motion.footer
        className="bg-black py-12 border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.p
              className="font-inter text-gray-500 text-sm"
              whileHover={{ color: "#f97316" }}
              transition={{ duration: 0.3 }}
            >
              © 2025 Proposta Comercial. Todos os direitos reservados.
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;