import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';

const PORTFOLIO_IMG1 = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg';
const PORTFOLIO_IMG2 = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/1d3b199f-ebb7-461d-805d-281a1a73e4fb.jpg';
const PORTFOLIO_IMG3 = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const projects = [
  { img: PORTFOLIO_IMG1, title: 'Коттедж в Подмосковье',    area: '280 м²', type: 'Газобетон + отделка камнем',  year: '2024' },
  { img: PORTFOLIO_IMG2, title: 'Загородный дом',           area: '195 м²', type: 'Каркасная технология',        year: '2023' },
  { img: PORTFOLIO_IMG3, title: 'Современный особняк',      area: '420 м²', type: 'Монолитный железобетон',      year: '2023' },
  { img: PORTFOLIO_IMG1, title: 'Дом у леса',               area: '310 м²', type: 'Газобетон + мягкая кровля',   year: '2022' },
  { img: PORTFOLIO_IMG2, title: 'Двухэтажный коттедж',      area: '240 м²', type: 'Кирпич + штукатурный фасад',  year: '2022' },
  { img: PORTFOLIO_IMG3, title: 'Дом с мансардой',          area: '175 м²', type: 'Каркасная технология',        year: '2021' },
];

export default function Portfolio() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen" style={{ background: 'hsl(40,30%,97%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />
      <div className="pt-24 pb-6 container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
            Портфолио
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
            Наши работы
          </h1>
          <p className="text-base max-w-lg mb-12" style={{ color: 'hsl(30,10%,45%)' }}>
            Более 340 построенных домов в Москве и Подмосковье. Каждый проект — индивидуален.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }} className="rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: '1px solid hsl(38,20%,85%)' }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,18,10,0.6) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-semibold text-base">{p.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.year}</div>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'hsl(40,30%,97%)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'hsl(30,15%,18%)' }}>{p.type}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'hsl(30,10%,50%)' }}>{p.area}</div>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'hsl(82,28%,38%)' }}
                      onClick={() => navigate('/contact')}>
                      Заказать <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-16 text-center">
          <p className="text-base mb-5" style={{ color: 'hsl(30,10%,45%)' }}>Хотите такой же дом? Оставьте заявку — рассчитаем стоимость бесплатно.</p>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 rounded-2xl font-semibold text-white"
            style={{ background: 'hsl(82,28%,35%)' }}>
            Рассчитать стоимость
          </motion.button>
        </FadeIn>
      </div>
      <footer className="mt-16 px-6 py-10" style={{ background: 'hsl(30,15%,15%)', color: 'rgba(255,255,255,0.5)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2024 СтройДом. Строительство домов под ключ.</p>
        </div>
      </footer>
    </div>
  );
}
