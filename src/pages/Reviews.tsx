import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SiteNav from '@/components/SiteNav';

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

const reviews = [
  { name: 'Алексей Воронов',  role: 'Коттедж 280 м², Подмосковье',         rating: 5,
    text: 'Строили дом 280 кв.м под ключ. Сдали точно в срок, качество отделки выше всяких ожиданий. Особенно понравился подход к деталям — видно, что люди любят своё дело.' },
  { name: 'Марина Соколова',  role: 'Дом 195 м², Дмитровское шоссе',        rating: 5,
    text: 'Очень довольна результатом. Прораб всегда на связи, отчёты приходили каждую неделю. Смета не изменилась ни на рубль — это огромный плюс.' },
  { name: 'Дмитрий Краснов',  role: 'Особняк 420 м², Рублёво-Успенское',   rating: 5,
    text: 'Обращались уже второй раз. Первый дом построили 5 лет назад — ни одной проблемы за это время. Второй объект снова отдали им без сомнений.' },
  { name: 'Ольга Петрова',    role: 'Баня + забор, Истринский район',       rating: 5,
    text: 'Заказывали баню из бруса и забор по периметру участка. Всё сделали быстро и аккуратно. Соседи уже спрашивают контакты бригады.' },
  { name: 'Сергей Жуков',     role: 'Тротуарная плитка, Одинцово',          rating: 5,
    text: 'Отличная работа по укладке плитки во дворе. Ровно, красиво, водоотвод сделан грамотно. Цена соответствует качеству, никаких сюрпризов.' },
  { name: 'Наталья Иванова',  role: 'Ремонт старого дома, Серпухов',        rating: 5,
    text: 'Восстанавливали старый дом 1970-х годов. Заменили все перекрытия, провели новые коммуникации. Теперь дом как новый. Спасибо команде!' },
];

export default function Reviews() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen" style={{ background: 'hsl(40,30%,97%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />
      <div className="pt-24 pb-6 container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
            Отзывы
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
            Говорят клиенты
          </h1>
          <p className="text-base max-w-lg mb-12" style={{ color: 'hsl(30,10%,45%)' }}>
            Более 340 семей уже живут в домах, которые мы построили.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.08}>
              <div className="p-7 rounded-2xl h-full flex flex-col"
                style={{ background: 'hsl(38,25%,95%)', border: '1px solid hsl(38,20%,86%)' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} style={{ color: 'hsl(42,60%,55%)', fontSize: 18 }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'hsl(30,10%,38%)' }}>"{r.text}"</p>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'hsl(30,15%,18%)' }}>{r.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'hsl(30,10%,55%)' }}>{r.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-16 text-center">
          <p className="text-base mb-5" style={{ color: 'hsl(30,10%,45%)' }}>Хотите стать следующим довольным клиентом?</p>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 rounded-2xl font-semibold text-white"
            style={{ background: 'hsl(82,28%,35%)' }}>
            Обсудить проект
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
