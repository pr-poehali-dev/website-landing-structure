import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';
import { servicesData } from '@/data/servicesData';

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

const allPhotos = servicesData.flatMap(s =>
  s.photos.map(p => ({ ...p, category: s.title, slug: s.slug }))
);

const categories = ['Все', ...servicesData.filter(s => s.photos.length > 0).map(s => s.title)];

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Все');
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const filtered = activeCategory === 'Все'
    ? allPhotos
    : allPhotos.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(40,30%,97%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />
      <div className="pt-24 pb-16 container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
            Портфолио
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
            Наши работы
          </h1>
          <p className="text-base max-w-lg mb-8" style={{ color: 'hsl(30,10%,45%)' }}>
            Реальные фотографии наших объектов — от фундамента до сдачи.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={activeCategory === cat
                ? { background: 'hsl(82,28%,35%)', color: 'white' }
                : { background: 'hsl(38,20%,90%)', color: 'hsl(30,10%,45%)' }}>
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {filtered.map((photo, i) => (
              <motion.div key={`${photo.slug}-${photo.url}`}
                layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3]"
                style={{ border: '1px solid hsl(38,20%,85%)' }}
                onClick={() => setActivePhoto(i)}>
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}>
                  <span className="text-xs text-white font-medium leading-tight">{photo.caption}</span>
                  <span className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{photo.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Icon name="ImageOff" size={40} className="mx-auto mb-3" style={{ color: 'hsl(30,10%,65%)' }} />
            <p className="text-sm" style={{ color: 'hsl(30,10%,55%)' }}>Фотографии скоро появятся</p>
          </div>
        )}

        <FadeIn delay={0.3} className="mt-16 text-center">
          <p className="text-base mb-5" style={{ color: 'hsl(30,10%,45%)' }}>
            Хотите такой же результат? Оставьте заявку — рассчитаем стоимость бесплатно.
          </p>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 rounded-2xl font-semibold text-white"
            style={{ background: 'hsl(82,28%,35%)' }}>
            Рассчитать стоимость
          </motion.button>
        </FadeIn>
      </div>

      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setActivePhoto(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <img src={filtered[activePhoto].url} alt={filtered[activePhoto].caption}
                className="w-full rounded-2xl object-cover max-h-[80vh]" />
              <div className="mt-3 text-center">
                <p className="text-white text-sm">{filtered[activePhoto].caption}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{filtered[activePhoto].category}</p>
              </div>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }} onClick={() => setActivePhoto(null)}>
                <Icon name="X" size={18} className="text-white" />
              </button>
              <button className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
                onClick={() => setActivePhoto(v => v !== null ? (v - 1 + filtered.length) % filtered.length : 0)}>
                <Icon name="ChevronLeft" size={20} className="text-white" />
              </button>
              <button className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
                onClick={() => setActivePhoto(v => v !== null ? (v + 1) % filtered.length : 0)}>
                <Icon name="ChevronRight" size={20} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="px-6 py-10" style={{ background: 'hsl(30,15%,15%)', color: 'rgba(255,255,255,0.5)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2024 СтройДом. Строительство домов под ключ.</p>
        </div>
      </footer>
    </div>
  );
}
