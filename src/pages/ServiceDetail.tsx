import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';
import { servicesData } from '@/data/servicesData';
import { useRequestModal } from '@/context/RequestModalContext';

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

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openModal } = useRequestModal();
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(38,25%,94%)' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: 'hsl(30,10%,45%)' }}>Услуга не найдена</p>
          <button onClick={() => navigate('/services')} className="text-sm font-medium underline" style={{ color: 'hsl(82,28%,38%)' }}>
            Вернуться к услугам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'hsl(38,25%,94%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />
      <div className="pt-24 pb-16 container-max">
        <FadeIn>
          <button onClick={() => navigate('/services')}
            className="flex items-center gap-1.5 text-sm font-medium mb-8"
            style={{ color: 'hsl(82,28%,38%)' }}>
            <Icon name="ArrowLeft" size={16} />
            Все услуги
          </button>

          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
            Услуги
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
            {service.title}
          </h1>
          <p className="text-base max-w-2xl leading-relaxed mb-8" style={{ color: 'hsl(30,10%,45%)' }}>
            {service.fullDesc}
          </p>

          {service.items.length > 0 && (
            <ul className="flex flex-wrap gap-3 mb-12">
              {service.items.map(item => (
                <li key={item} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                  style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)', color: 'hsl(30,10%,38%)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'hsl(82,28%,45%)' }} />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </FadeIn>

        {service.photos.length > 0 && (
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-light mb-5"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Примеры работ
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {service.photos.map((photo, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-xl cursor-pointer aspect-video"
                  style={{ border: '1px solid hsl(38,20%,85%)' }}
                  onClick={() => setActivePhoto(i)}>
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }}>
                    <span className="text-xs text-white font-medium">{photo.caption}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        )}

        {service.photos.length === 0 && (
          <FadeIn delay={0.1}>
            <div className="rounded-2xl p-10 text-center" style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}>
              <Icon name="ImageOff" size={32} className="mx-auto mb-3" style={{ color: 'hsl(30,10%,65%)' }} />
              <p className="text-sm" style={{ color: 'hsl(30,10%,55%)' }}>Фотографии работ скоро появятся</p>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2} className="mt-12">
          <div className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'hsl(30,15%,15%)' }}>
            <div>
              <p className="text-lg font-medium text-white mb-1">Нужна {service.title.toLowerCase()}?</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Оставьте заявку — рассчитаем стоимость бесплатно</p>
            </div>
            <button onClick={() => openModal(service.title)}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ background: 'hsl(82,28%,45%)', color: 'white' }}>
              Получить расчёт
            </button>
          </div>
        </FadeIn>
      </div>

      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setActivePhoto(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <img src={service.photos[activePhoto].url} alt={service.photos[activePhoto].caption}
                className="w-full rounded-2xl object-cover max-h-[80vh]" />
              <p className="mt-3 text-center text-white text-sm">{service.photos[activePhoto].caption}</p>
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }} onClick={() => setActivePhoto(null)}>
                <Icon name="X" size={18} className="text-white" />
              </button>
              <button className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
                onClick={() => setActivePhoto(v => v !== null ? (v - 1 + service.photos.length) % service.photos.length : 0)}>
                <Icon name="ChevronLeft" size={20} className="text-white" />
              </button>
              <button className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
                onClick={() => setActivePhoto(v => v !== null ? (v + 1) % service.photos.length : 0)}>
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