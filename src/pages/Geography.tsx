import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';
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

const cities = [
  'Балашиха', 'Подольск', 'Химки', 'Мытищи', 'Королёв', 'Люберцы', 'Красногорск',
  'Одинцово', 'Домодедово', 'Щёлково', 'Сергиев Посад', 'Электросталь', 'Коломна',
  'Серпухов', 'Раменское', 'Орехово-Зуево', 'Долгопрудный', 'Пушкино', 'Реутов',
  'Жуковский', 'Воскресенск', 'Чехов', 'Наро-Фоминск', 'Дмитров', 'Истра', 'Клин',
  'Лобня', 'Лыткарино', 'Луховицы', 'Можайск', 'Ногинск', 'Павловский Посад',
  'Шатура', 'Солнечногорск', 'Краснознаменск', 'Фрязино', 'Дзержинский', 'Ивантеевка',
  'Лосино-Петровский', 'Дубна', 'Талдом', 'Ступино', 'Кашира', 'Зарайск', 'Озёры',
  'Бронницы', 'Егорьевск', 'Протвино', 'Пущино', 'Волоколамск', 'Руза', 'Звенигород',
];

const advantages = [
  { icon: 'Zap',        text: 'Быстрый выезд на объект — в течение суток' },
  { icon: 'Ruler',      text: 'Бесплатный замер и консультация на месте' },
  { icon: 'FileText',   text: 'Официальный договор с фиксацией всех условий' },
  { icon: 'Shield',     text: 'Гарантия на все виды работ — письменно' },
  { icon: 'Calculator', text: 'Фиксированная смета — цена не меняется' },
  { icon: 'Camera',     text: 'Еженедельный фотоотчёт о ходе работ' },
  { icon: 'Home',       text: 'Работа под ключ — от проекта до сдачи' },
];

export default function Geography() {
  const { openModal } = useRequestModal();

  return (
    <div className="min-h-screen" style={{ background: 'hsl(40,30%,97%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />

      <div className="pt-24 pb-16 container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
            Где мы работаем
          </div>
          <h1 className="text-4xl md:text-6xl font-light mb-5"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
            Строительные работы<br />
            <em style={{ color: 'hsl(82,28%,38%)' }}>в Москве и Подмосковье</em>
          </h1>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: 'hsl(30,10%,42%)' }}>
            Мы выполняем строительные и отделочные работы в Москве и по всей Московской области —
            в городах, посёлках, деревнях, СНТ и коттеджных посёлках. Выезжаем на любой объект,
            делаем замер бесплатно и составляем смету в день обращения.
          </p>
        </motion.div>

        {/* Блок 1 — о географии */}
        <FadeIn>
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-light mb-5"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Москва и вся Московская область
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'hsl(30,10%,40%)' }}>
                <p>
                  Мы работаем в Москве и охватываем всю Московскую область — от ближайшего
                  Подмосковья до отдалённых районов. <strong style={{ color: 'hsl(30,15%,20%)' }}>Ремонт квартир в Московской области,
                  строительство домов в Подмосковье, отделочные работы в Москве и МО</strong> — всё это
                  наш профиль. Мы не работаем через посредников: приедут те же мастера, которые
                  делали замер и составляли смету.
                </p>
                <p>
                  <strong style={{ color: 'hsl(30,15%,20%)' }}>Ремонт под ключ в Московской области</strong> — наш главный продукт.
                  Берём объект в любом состоянии: после пожара, после долгого простоя, в черновой
                  или жилой отделке. Вы получаете результат, а не «почти готово».
                </p>
                <p>
                  Возможен выезд в ближайшие районы за пределами МО — по согласованию.
                  Если ваш населённый пункт не указан в списке — позвоните, мы уточним возможность
                  и стоимость выезда.
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'hsl(30,10%,40%)' }}>
                <p>
                  <strong style={{ color: 'hsl(30,15%,20%)' }}>Строительные работы в Подмосковье</strong> — кровля, фасады, фундаменты,
                  заборы, тротуарная плитка, бани, беседки и пристройки. Работаем и на новых
                  объектах, и на восстановлении старых домов. Каждый проект — по договору,
                  с фиксированной сметой и гарантией.
                </p>
                <p>
                  Мы выезжаем в города, посёлки городского типа, деревни, СНТ и коттеджные
                  посёлки по всей Московской области. Дополнительных наценок за удалённость
                  нет — стоимость выезда включена в первичный расчёт.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Блок 2 — города */}
        <FadeIn delay={0.1}>
          <div className="mb-14 p-8 rounded-3xl" style={{ background: 'hsl(38,25%,94%)', border: '1px solid hsl(38,20%,85%)' }}>
            <h2 className="text-2xl md:text-3xl font-light mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Города, где мы работаем
            </h2>
            <p className="text-sm mb-6" style={{ color: 'hsl(30,10%,50%)' }}>
              Москва и следующие города Московской области:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {cities.map(city => (
                <span key={city}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ background: 'hsl(40,30%,97%)', color: 'hsl(30,15%,25%)', border: '1px solid hsl(38,20%,82%)' }}>
                  {city}
                </span>
              ))}
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: 'hsl(82,22%,90%)', border: '1px solid hsl(82,20%,82%)' }}>
              <Icon name="MapPin" size={18} style={{ color: 'hsl(82,28%,38%)', flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm font-medium" style={{ color: 'hsl(82,28%,28%)' }}>
                Если вашего населённого пункта нет в списке — мы всё равно работаем по всей области.
                Позвоните нам, и мы уточним детали выезда.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Блок 3 — преимущества */}
        <FadeIn delay={0.15}>
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-light mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
              Почему нас выбирают в Подмосковье
            </h2>
            <p className="text-sm mb-8" style={{ color: 'hsl(30,10%,50%)' }}>
              Мы не просто строим — мы берём на себя весь процесс и несём ответственность за результат.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {advantages.map((a, i) => (
                <FadeIn key={a.text} delay={i * 0.05}>
                  <div className="flex items-start gap-3 p-4 rounded-2xl h-full"
                    style={{ background: 'hsl(38,25%,94%)', border: '1px solid hsl(38,20%,85%)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(82,22%,88%)' }}>
                      <Icon name={a.icon} size={16} style={{ color: 'hsl(82,28%,35%)' }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(30,10%,35%)' }}>{a.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ background: 'hsl(30,15%,15%)' }}>
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Готовы начать работу на вашем объекте?
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Оставьте заявку — выедем на замер в течение суток. Смета бесплатно.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => openModal()}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-white"
                style={{ background: 'hsl(82,28%,45%)' }}>
                <Icon name="Calculator" size={18} />
                Оставить заявку
              </motion.button>
              <a href="tel:+79051785769"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Icon name="Phone" size={18} />
                +7 (905) 178-57-69
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      <footer className="mt-8 px-6 py-10" style={{ background: 'hsl(30,15%,15%)', color: 'rgba(255,255,255,0.5)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2024 СтройДом. Строительство домов под ключ.</p>
        </div>
      </footer>
    </div>
  );
}
