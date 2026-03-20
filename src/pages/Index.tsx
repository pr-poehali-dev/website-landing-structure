import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/icon';
import InteractiveHouse from '@/components/InteractiveHouse';

const HERO_IMG = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg';
const PORTFOLIO_IMG1 = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg';
const PORTFOLIO_IMG2 = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/1d3b199f-ebb7-461d-805d-281a1a73e4fb.jpg';
const PORTFOLIO_IMG3 = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const navLinks = [
  { label: 'О нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contact' },
];

const services = [
  { icon: 'Layers', title: 'Фундаментные работы', desc: 'Геологическое исследование, монолитный и свайный фундамент под ключ.' },
  { icon: 'Square', title: 'Возведение стен', desc: 'Газобетон, кирпич, дерево — любые материалы с гарантией качества.' },
  { icon: 'Home', title: 'Кровельные работы', desc: 'Монтаж кровли любой сложности: металлочерепица, мягкая кровля, сланец.' },
  { icon: 'Paintbrush', title: 'Внутренняя отделка', desc: 'Полный цикл чистовой отделки по вашему дизайн-проекту.' },
  { icon: 'Droplets', title: 'Сантехника', desc: 'Проектирование и монтаж водоснабжения, канализации, тёплых полов.' },
  { icon: 'Zap', title: 'Электромонтаж', desc: 'Электрика, умный дом, охранные системы и видеонаблюдение.' },
];

const advantages = [
  { icon: 'Shield', title: 'Гарантия 10 лет', desc: 'Даём письменную гарантию на все конструктивные работы' },
  { icon: 'FileCheck', title: 'Фиксированная смета', desc: 'Цена не меняется в процессе строительства' },
  { icon: 'Clock', title: 'Сдача в срок', desc: 'Штрафные санкции за каждый день просрочки по договору' },
  { icon: 'Users', title: 'Свои бригады', desc: 'Только штатные специалисты без субподряда' },
  { icon: 'Award', title: 'Сертифицированные материалы', desc: 'Работаем только с проверенными поставщиками' },
  { icon: 'Camera', title: 'Фотоотчёт', desc: 'Еженедельный фотоотчёт о ходе строительства' },
  { icon: 'Headphones', title: 'Персональный менеджер', desc: 'Один контакт на весь период строительства' },
];

const portfolio = [
  { img: PORTFOLIO_IMG1, title: 'Коттедж в Подмосковье', area: '280 м²', type: 'Газобетон + отделка камнем' },
  { img: PORTFOLIO_IMG2, title: 'Загородный дом', area: '195 м²', type: 'Каркасная технология' },
  { img: PORTFOLIO_IMG3, title: 'Современный особняк', area: '420 м²', type: 'Монолитный железобетон' },
];

const steps = [
  { num: '01', title: 'Консультация', desc: 'Бесплатная встреча, обсуждение проекта и пожеланий, выезд на участок' },
  { num: '02', title: 'Проектирование', desc: 'Архитектурный проект, рабочая документация, согласование всех деталей' },
  { num: '03', title: 'Строительство', desc: 'Поэтапное строительство с еженедельными отчётами и контролем качества' },
  { num: '04', title: 'Сдача', desc: 'Финальная приёмка, подписание актов, оформление гарантийных документов' },
];

const reviews = [
  {
    name: 'Алексей Воронов',
    text: 'Строили дом 280 кв.м под ключ. Сдали точно в срок, качество отделки выше всяких ожиданий. Особенно понравился подход к деталям — видно, что люди любят своё дело.',
    rating: 5,
    role: 'Коттедж 280 м², Подмосковье',
  },
  {
    name: 'Марина Соколова',
    text: 'Очень довольна результатом. Прораб всегда на связи, отчёты приходили каждую неделю. Смета не изменилась ни на рубль — это огромный плюс.',
    rating: 5,
    role: 'Дом 195 м², Дмитровское шоссе',
  },
  {
    name: 'Дмитрий Краснов',
    text: 'Обращались уже второй раз. Первый дом построили 5 лет назад — ни одной проблемы за это время. Второй объект снова отдали им без сомнений.',
    rating: 5,
    role: 'Особняк 420 м², Рублёво-Успенское',
  },
];

export default function Index() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(40,30%,97%)', fontFamily: 'Golos Text, sans-serif' }}>

      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{ background: 'rgba(250,247,240,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid hsl(38,20%,88%)' }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(82,28%,35%)' }}>
              <Icon name="Home" size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold" style={{ color: 'hsl(82,28%,28%)' }}>СтройДом</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href.slice(1))}
                className="text-sm font-medium transition-colors"
                style={{ color: 'hsl(30,15%,35%)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'hsl(82,28%,35%)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'hsl(30,15%,35%)')}
              >
                {l.label}
              </button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hidden md:block"
            style={{ background: 'hsl(82,28%,35%)' }}
          >
            Рассчитать стоимость
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,22,15,0.72) 0%, rgba(30,35,20,0.45) 60%, transparent 100%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(42,60%,70%)', display: 'inline-block' }} />
              Москва и Московская область
            </div>
            <h1
              className="text-5xl md:text-7xl font-light mb-4 leading-tight"
              style={{ color: '#FDFAF2', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
            >
              Строительство домов
              <br />
              <em style={{ fontStyle: 'italic', color: 'hsl(42,60%,72%)' }}>под ключ</em>
            </h1>
            <p className="text-xl md:text-2xl mb-10 font-light max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
              От фундамента до отделки — с гарантией 10 лет и фиксированной сметой
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 rounded-2xl font-semibold text-lg text-white"
                style={{ background: 'hsl(82,28%,35%)' }}
              >
                Рассчитать стоимость
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('portfolio')}
                className="px-8 py-4 rounded-2xl font-semibold text-lg"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'white', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                Смотреть работы
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-10 mt-20"
          >
            {[
              { val: '15+', label: 'лет на рынке' },
              { val: '340', label: 'домов построено' },
              { val: '10', label: 'лет гарантии' },
              { val: '98%', label: 'клиентов довольны' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold" style={{ color: 'hsl(42,60%,72%)', fontFamily: 'Cormorant Garamond, serif' }}>{s.val}</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-padding" style={{ background: 'hsl(38,25%,94%)' }}>
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
                О компании
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
                Строим дома с душой<br />
                <em style={{ color: 'hsl(82,28%,38%)' }}>с 2009 года</em>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'hsl(30,10%,40%)' }}>
                Мы — команда профессионалов, которая строит не просто здания, а места, где рождаются семейные истории. За 15 лет работы мы возвели более 340 домов в Москве и Подмосковье.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'hsl(30,10%,40%)' }}>
                Наш принцип — фиксированная смета, честный договор и строгое соблюдение сроков. Мы работаем только с собственными бригадами и несём полную ответственность за результат.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '340+', label: 'построенных домов' },
                  { num: '15', label: 'лет опыта' },
                  { num: '120', label: 'специалистов в штате' },
                  { num: '100%', label: 'сдача в срок' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-6 rounded-2xl"
                    style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}
                  >
                    <div className="text-3xl font-bold mb-1"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(82,28%,35%)' }}>
                      {s.num}
                    </div>
                    <div className="text-sm" style={{ color: 'hsl(30,10%,45%)' }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* INTERACTIVE HOUSE */}
      <section id="house" className="section-padding" style={{ background: 'hsl(40,30%,97%)' }}>
        <div className="container-max">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
              Интерактивный дом
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Все услуги в одном доме
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'hsl(30,10%,45%)' }}>
              Нажмите на любое окно, чтобы узнать подробнее об услуге
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <InteractiveHouse />
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding" style={{ background: 'hsl(38,25%,94%)' }}>
        <div className="container-max">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
              Услуги
            </div>
            <h2 className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Полный цикл строительства
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl group cursor-pointer h-full"
                  style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'hsl(82,22%,90%)' }}>
                    <Icon name={s.icon} size={22} style={{ color: 'hsl(82,28%,35%)' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'hsl(30,15%,18%)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(30,10%,45%)' }}>{s.desc}</p>
                  <button
                    className="mt-4 text-sm font-medium flex items-center gap-1.5"
                    style={{ color: 'hsl(82,28%,38%)' }}
                    onClick={() => scrollTo('contact')}
                  >
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </button>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="section-padding" style={{ background: 'hsl(82,28%,35%)' }}>
        <div className="container-max">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>
              Преимущества
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Почему выбирают нас
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.06}>
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Icon name={a.icon} size={18} className="text-white" fallback="Check" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5">{a.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section-padding" style={{ background: 'hsl(40,30%,97%)' }}>
        <div className="container-max">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
              Портфолио
            </div>
            <h2 className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Наши работы
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ border: '1px solid hsl(38,20%,85%)' }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5" style={{ background: 'hsl(38,25%,95%)' }}>
                    <h3 className="text-base font-semibold mb-1" style={{ color: 'hsl(30,15%,18%)' }}>{p.title}</h3>
                    <p className="text-sm" style={{ color: 'hsl(30,10%,48%)' }}>{p.area} · {p.type}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section-padding" style={{ background: 'hsl(38,25%,94%)' }}>
        <div className="container-max">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
              Процесс
            </div>
            <h2 className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Как мы работаем
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px z-0"
                      style={{ background: 'linear-gradient(90deg, hsl(82,28%,55%), transparent)' }} />
                  )}
                  <div className="relative z-10">
                    <div className="text-5xl font-light mb-4"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(82,28%,35%)' }}>
                      {s.num}
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'hsl(30,15%,18%)' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(30,10%,45%)' }}>{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="section-padding" style={{ background: 'hsl(40,30%,97%)' }}>
        <div className="container-max">
          <FadeIn className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
              Отзывы
            </div>
            <h2 className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Говорят клиенты
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.1}>
                <div className="p-7 rounded-2xl h-full flex flex-col"
                  style={{ background: 'hsl(38,25%,95%)', border: '1px solid hsl(38,20%,86%)' }}>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} style={{ color: 'hsl(42,60%,55%)', fontSize: 16 }}>★</span>
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
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-padding" style={{ background: 'hsl(38,25%,93%)' }}>
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
                Контакты
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
                Начнём строить<br />
                <em style={{ color: 'hsl(82,28%,38%)' }}>ваш дом?</em>
              </h2>
              <p className="text-base mb-8" style={{ color: 'hsl(30,10%,42%)' }}>
                Оставьте заявку, и мы свяжемся с вами в течение 30 минут для бесплатной консультации.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'MapPin', text: 'Москва, ул. Садовая-Триумфальная, 16' },
                  { icon: 'Mail', text: 'info@stroydom.ru' },
                  { icon: 'Clock', text: 'Работаем круглосуточно, 7 дней в неделю' },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(82,22%,88%)' }}>
                      <Icon name={c.icon} size={16} style={{ color: 'hsl(82,28%,35%)' }} />
                    </div>
                    <span className="text-sm" style={{ color: 'hsl(30,15%,30%)' }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="p-8 rounded-3xl" style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}>
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'hsl(30,15%,18%)' }}>
                  Оставить заявку
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'hsl(82,28%,45%)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'hsl(38,20%,82%)')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>
                      Телефон
                    </label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'hsl(82,28%,45%)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'hsl(38,20%,82%)')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>
                      Тип проекта
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)' }}
                    >
                      <option>Дом под ключ</option>
                      <option>Только фундамент</option>
                      <option>Коробка дома</option>
                      <option>Внутренняя отделка</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-semibold text-white mt-2"
                    style={{ background: 'hsl(82,28%,35%)' }}
                  >
                    Отправить заявку
                  </motion.button>
                  <p className="text-xs text-center" style={{ color: 'hsl(30,10%,55%)' }}>
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" style={{ background: 'hsl(38,25%,93%)' }}>
        <div className="container-max px-4 md:px-8">
          <FadeIn className="text-center py-12 pb-8">
            <h2 className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,20%)' }}>
              Мы на карте
            </h2>
            <p className="text-sm mt-2" style={{ color: 'hsl(30,10%,50%)' }}>Москва, ул. Садовая-Триумфальная, 16</p>
          </FadeIn>
        </div>
        <div className="w-full h-96 md:h-[480px] overflow-hidden">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.604198%2C55.756294&z=13&pt=37.604198%2C55.756294%2Cpm2rdm&l=map"
            width="100%"
            height="100%"
            style={{ border: 'none', display: 'block' }}
            title="Офис СтройДом на карте"
            allowFullScreen
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10" style={{ background: 'hsl(30,15%,15%)', color: 'rgba(255,255,255,0.5)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(82,28%,35%)' }}>
              <Icon name="Home" size={14} className="text-white" />
            </div>
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>СтройДом</span>
          </div>
          <p className="text-sm">© 2024 СтройДом. Строительство домов под ключ.</p>
          <div className="flex gap-6">
            {navLinks.slice(0, 3).map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href.slice(1))}
                className="text-sm hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}