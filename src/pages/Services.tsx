import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';

const roofingPhotos = [
  {
    url: 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/bucket/b6d4fddf-0072-4968-8ed4-58bf48e04bce.jpg',
    caption: 'Монтаж стропильной системы с трубой',
  },
  {
    url: 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/bucket/0514614e-9cf5-48d3-92c0-b6ebbce29368.jpg',
    caption: 'Обрешётка двускатной крыши',
  },
  {
    url: 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/bucket/eab0120d-6fcb-4be6-80b8-7572037b7595.jpg',
    caption: 'Металлочерепица с мансардными окнами',
  },
  {
    url: 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/bucket/fde825fe-290c-444f-8a45-5e61820b2a57.jpg',
    caption: 'Укладка металлочерепицы на сложной крыше',
  },
  {
    url: 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/bucket/c4b9238b-5703-463c-85d0-df1f891c4ac5.jpg',
    caption: 'Кровля из профнастила на срубе',
  },
];

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

const services = [
  {
    icon: 'Home',
    title: 'Строительство с нуля',
    desc: 'Полный цикл строительства домов — от фундамента до отделки. Работа «под ключ» с фиксированной сметой.',
    items: ['Полный цикл строительства домов', 'Фундамент, коробка, крыша, отделка', 'Работа «под ключ»'],
  },
  {
    icon: 'Layers',
    title: 'Фундаментные работы',
    desc: 'Геологическое исследование, монолитный, ленточный и свайный фундамент с гарантией.',
    items: ['Геологическое исследование грунта', 'Ленточный, свайный или плитный фундамент', 'Современное армирование'],
  },
  {
    icon: 'Home',
    title: 'Кровельные работы',
    desc: 'Монтаж кровли любой сложности: металлочерепица, мягкая кровля, натуральная черепица.',
    items: ['Двускатные, вальмовые, мансардные крыши', 'Металлочерепица, мягкая кровля, черепица', 'Полная герметичность и долговечность'],
  },
  {
    icon: 'Building2',
    title: 'Фасадные работы',
    desc: 'Утепление и отделка фасадов. Штукатурка, покраска, реставрация.',
    items: ['Утепление фасадов', 'Штукатурка и покраска', 'Ремонт и реставрация фасадов'],
  },
  {
    icon: 'Wrench',
    title: 'Ремонт и восстановление домов',
    desc: 'Капитальный ремонт, замена конструкций, восстановление жилого состояния старых зданий.',
    items: ['Капитальный ремонт', 'Замена конструкций и коммуникаций', 'Восстановление жилого состояния зданий'],
  },
  {
    icon: 'Shield',
    title: 'Заборы и ограждения',
    desc: 'Установка заборов из металла, дерева и бетона. Ремонт и усиление существующих ограждений.',
    items: ['Металлические, деревянные, бетонные заборы', 'Ремонт и усиление ограждений', 'Фундамент под забор'],
  },
  {
    icon: 'Grid3x3',
    title: 'Уличные плиточные работы',
    desc: 'Укладка тротуарной плитки, мощение дорожек и дворов с подготовкой основания.',
    items: ['Укладка тротуарной плитки', 'Мощение дорожек, дворов и площадок', 'Подготовка основания и дренаж'],
  },
  {
    icon: 'Flame',
    title: 'Строительство бань',
    desc: 'Проектирование и строительство бань под ключ. Деревянные и каркасные бани.',
    items: ['Проектирование и строительство под ключ', 'Деревянные и каркасные бани', 'Парная, моечная, комната отдыха'],
  },
  {
    icon: 'TreePine',
    title: 'Беседки и террасы',
    desc: 'Строительство беседок и террас разных типов. Открытые и закрытые, индивидуальные проекты.',
    items: ['Беседки различных типов', 'Открытые и закрытые террасы', 'Индивидуальные проекты'],
  },
];

function RoofingGallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <FadeIn className="mt-16">
      <div className="mb-6">
        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3"
          style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
          Примеры работ
        </div>
        <h2 className="text-2xl md:text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
          Кровельные работы
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {roofingPhotos.map((photo, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3]"
            style={{ border: '1px solid hsl(38,20%,85%)' }} onClick={() => setActive(i)}>
            <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-end p-3 opacity-0 hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }}>
              <span className="text-xs text-white font-medium leading-tight">{photo.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)' }} onClick={() => setActive(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <img src={roofingPhotos[active].url} alt={roofingPhotos[active].caption}
                className="w-full rounded-2xl object-cover max-h-[80vh]" />
              <p className="mt-3 text-center text-white text-sm">{roofingPhotos[active].caption}</p>
              <div className="absolute top-3 right-3">
                <button className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }} onClick={() => setActive(null)}>
                  <Icon name="X" size={18} className="text-white" />
                </button>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <button className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  onClick={() => setActive(v => v !== null ? (v - 1 + roofingPhotos.length) % roofingPhotos.length : 0)}>
                  <Icon name="ChevronLeft" size={20} className="text-white" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  onClick={() => setActive(v => v !== null ? (v + 1) % roofingPhotos.length : 0)}>
                  <Icon name="ChevronRight" size={20} className="text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeIn>
  );
}

function ServiceCard({ s, i, onOrder }: { s: typeof services[0]; i: number; onOrder: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={i * 0.06} className="h-full">
      <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl flex flex-col h-full"
        style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
          style={{ background: 'hsl(82,22%,90%)' }}>
          <Icon name={s.icon} size={22} style={{ color: 'hsl(82,28%,35%)' }} />
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'hsl(30,15%,18%)' }}>{s.title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(30,10%,45%)' }}>{s.desc}</p>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }} className="mb-4 space-y-1.5 overflow-hidden">
              {s.items.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'hsl(30,10%,38%)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'hsl(82,28%,45%)' }} />
                  {item}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <div className="mt-auto flex items-center gap-3">
          <button className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'hsl(82,28%,38%)' }}
            onClick={() => setOpen(v => !v)}>
            {open ? 'Скрыть' : 'Подробнее'}
            <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.22 }}>
              <Icon name="ChevronRight" size={14} />
            </motion.span>
          </button>
          <button className="ml-auto text-sm font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: 'hsl(82,22%,90%)', color: 'hsl(82,28%,30%)' }} onClick={onOrder}>
            Заказать
          </button>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export default function Services() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen" style={{ background: 'hsl(38,25%,94%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />
      <div className="pt-24 pb-6 container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
            Услуги
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
            Полный цикл строительства
          </h1>
          <p className="text-base max-w-lg mb-12" style={{ color: 'hsl(30,10%,45%)' }}>
            От фундамента до беседки — берёмся за любые задачи с гарантией качества.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} onOrder={() => navigate('/contact')} />
          ))}
        </div>

        <RoofingGallery />
      </div>
      <footer className="mt-16 px-6 py-10" style={{ background: 'hsl(30,15%,15%)', color: 'rgba(255,255,255,0.5)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2024 СтройДом. Строительство домов под ключ.</p>
        </div>
      </footer>
    </div>
  );
}