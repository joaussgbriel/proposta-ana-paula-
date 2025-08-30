import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { CheckCircle, Download, Rocket, Zap, Target, TrendingUp, Users, MessageSquare, Instagram, MapPin, ArrowUp, Star, Sparkles, Zap as Lightning } from 'lucide-react';
import { 
  AdvancedParticleSystem, 
  WaveDistortion, 
  EnergyCard, 
  ExplosionButton, 
  GlitchText, 
  MorphingShapes 
} from './components/AdvancedEffects';

function AppV2() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExploding, setIsExploding] = useState(false);

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
      {/* Sistema de partículas 3D avançado */}
      <AdvancedParticleSystem />
      
      {/* Formas que fazem morphing */}
      <MorphingShapes />

      {/* Cursor personalizado com efeito de energia */}
      <motion.div
        className="fixed w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        {/* Efeito de energia ao redor do cursor */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-50"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Hero Section com efeitos de energia */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com efeito de energia */}
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
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Linhas de energia animadas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: "-100%",
                width: "200%",
              }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Título principal com efeito de glitch */}
            <motion.h1
              className="font-montserrat text-6xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <GlitchText className="bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Proposta Comercial
              </GlitchText>
              <br />
              <motion.span
                className="block text-4xl lg:text-6xl text-cyan-400 mt-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Ana Paula
              </motion.span>
            </motion.h1>

            {/* Subtítulo com efeito de wave */}
            <WaveDistortion>
              <motion.p
                className="font-inter text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Em <span className="text-cyan-400 font-bold">60 dias</span>, você terá audiência engajada pronta para comprar o seu produto.
              </motion.p>
            </WaveDistortion>

            {/* Botões CTA com efeito de explosão */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <ExplosionButton variant="primary" className="text-lg px-10 py-5">
                <Lightning className="w-6 h-6 mr-3" />
                ⚡ Confirmar Proposta Agora
              </ExplosionButton>
              
              <ExplosionButton variant="secondary" className="text-lg px-10 py-5">
                <Download className="w-6 h-6 mr-3" />
                📄 Baixar Proposta em PDF
              </ExplosionButton>
            </motion.div>

            {/* Estatísticas com efeito de energia */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {[
                { icon: Users, number: "2", text: "Meses de Aquecimento" },
                { icon: TrendingUp, number: "60", text: "Dias para Resultados" },
                { icon: Rocket, number: "100%", text: "Foco em Conversão" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <stat.icon className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <div className="text-5xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator com efeito de energia */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <ArrowUp className="w-8 h-8 text-cyan-400" />
            <motion.div
              className="absolute inset-0 w-8 h-8 border-2 border-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Fase 1 - Pré-Lançamento com cards de energia */}
      <section className="py-32 relative">
        <WaveDistortion>
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
                🚀 <GlitchText className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Pré-Lançamento
                </GlitchText>
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
                    description: "Criação e edição de posts e vídeos curtos alinhados ao calendário de aquecimento.",
                    color: "from-cyan-500 to-blue-600"
                  },
                  {
                    icon: MapPin,
                    title: "Campanhas Geolocalizadas",
                    description: "Estratégias para atrair público qualificado da sua região com segmentação precisa.",
                    color: "from-purple-500 to-pink-600"
                  },
                  {
                    icon: Instagram,
                    title: "Automação Instagram",
                    description: "Sistema automatizado com fluxo de conversão e grupo WhatsApp exclusivo.",
                    color: "from-pink-500 to-red-600"
                  },
                  {
                    icon: MessageSquare,
                    title: "Nutrição no Grupo",
                    description: "Conteúdos gratuitos que criam antecipação e mantêm o público engajado.",
                    color: "from-blue-500 to-cyan-600"
                  }
                ].map((item, index) => (
                  <EnergyCard key={index} delay={index * 0.1}>
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
                  </EnergyCard>
                ))}
              </div>

              <motion.div
                className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-10 border border-cyan-500/30 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Efeito de energia de fundo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <p className="font-inter text-xl text-cyan-100 leading-relaxed text-center relative z-10">
                  <strong className="text-cyan-300 text-2xl">⚡ Resultado:</strong> presença constante, audiência aquecida e leads engajados, prontos para o lançamento.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </WaveDistortion>
      </section>

      {/* Fase 2 - Lançamento e Escala */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background com efeito de energia */}
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
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Linhas de energia cruzadas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{
                top: `${30 + i * 20}%`,
                left: "-100%",
                width: "200%",
                transform: `rotate(${45 + i * 15}deg)`,
              }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

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
              💥 <GlitchText className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Lançamento e Escala
              </GlitchText>
              <br />
              <span className="text-3xl lg:text-5xl text-gray-300">
                Transformando audiência em vendas
              </span>
            </motion.h2>

            <motion.p
              className="font-inter text-2xl text-gray-300 mb-20 text-center max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <strong className="text-white">Objetivo:</strong> transformar audiência aquecida em vendas consistentes.
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  icon: Target,
                  title: "Campanhas de Conversão",
                  description: "Campanhas de tráfego direto para conversão (leads e vendas).",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: TrendingUp,
                  title: "Escala de Anúncios",
                  description: "Escala de anúncios com criativos otimizados para máximo impacto.",
                  color: "from-cyan-500 to-cyan-600"
                },
                {
                  icon: Zap,
                  title: "Conteúdos de Conversão",
                  description: "Conteúdos estratégicos para reforço de ofertas, provas sociais e urgência.",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: Rocket,
                  title: "Otimizações Semanais",
                  description: "Monitoramento e otimização semanal para maximizar ROI.",
                  color: "from-indigo-500 to-indigo-600"
                }
              ].map((item, index) => (
                <EnergyCard key={index} delay={index * 0.1}>
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
                </EnergyCard>
              ))}
            </div>

            <motion.div
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-10 border border-blue-500/30 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <p className="font-inter text-xl text-blue-100 leading-relaxed text-center relative z-10">
                <strong className="text-blue-300 text-2xl">⚡ Resultado:</strong> impacto imediato no lançamento e início de vendas previsíveis, sustentadas por um sistema de tráfego e conteúdo em crescimento.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Investimento com efeitos de energia */}
      <section className="py-32 bg-black relative overflow-hidden">
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
            duration: 18,
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
              <GlitchText className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Investimento
              </GlitchText>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {[
                {
                  phase: "Fase 1",
                  description: "Pré-lançamento – 2 meses",
                  price: "R$ 1.000",
                  period: "por mês",
                  color: "from-cyan-500 to-blue-600"
                },
                {
                  phase: "Fase 2",
                  description: "Lançamento e Escala – reajuste automático a partir do mês 3",
                  price: "A definir",
                  period: "por mês",
                  color: "from-purple-500 to-pink-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden"
                  initial={{ opacity: 0, y: 100, rotateY: index === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -20,
                    rotateY: index === 0 ? -5 : 5,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                  }}
                  style={{ perspective: 1000 }}
                >
                  {/* Efeito de energia de fundo */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5`}
                    animate={{
                      opacity: [0.05, 0.15, 0.05],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <h3 className="font-montserrat text-3xl font-bold text-white mb-6 relative z-10">
                    {item.phase}
                  </h3>
                  <p className="font-inter text-gray-300 mb-8 text-lg relative z-10">
                    {item.description}
                  </p>
                  <div className={`text-6xl lg:text-7xl font-montserrat font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-6 relative z-10`}>
                    {item.price}
                  </div>
                  <p className="font-inter text-xl text-gray-300 relative z-10">
                    {item.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final com efeito de explosão */}
      <section className="py-32 bg-black relative overflow-hidden">
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
              Ana Paula, o caminho está definido: <GlitchText className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                aquecimento agora, vendas depois.
              </GlitchText>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <ExplosionButton variant="primary" className="text-2xl lg:text-3xl px-16 py-8">
                <Lightning className="w-9 h-9 mr-4" />
                ⚡ Confirmar Proposta Agora
              </ExplosionButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
              whileHover={{ color: "#06b6d4" }}
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

export default AppV2;







