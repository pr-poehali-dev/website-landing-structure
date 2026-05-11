import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';

const HERO_IMG = 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg';

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

const stats = [
  { num: '340+', label: 'построенных домов' },
  { num: '15',   label: 'лет опыта' },
  { num: '120',  label: 'специалистов в штате' },
  { num: '100%', label: 'сдача в срок' },
];

const team = [
  { icon: 'HardHat',    role: 'Прорабы',         desc: 'Опытные руководители объектов с опытом от 10 лет' },
  { icon: 'Ruler',      role: 'Архитекторы',      desc: 'Разработка проектов под любой участок и бюджет' },
  { icon: 'Wrench',     role: 'Мастера',          desc: 'Только штатные специалисты без субподряда' },
  { icon: 'FileCheck',  role: 'Проектировщики',   desc: 'Полная рабочая документация и согласования' },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(40,30%,97%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />

      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,18,10,0.75) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}>
              О компании
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Строим с душой<br />
              <em style={{ color: 'hsl(42,60%,72%)' }}>с 2009 года</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding" style={{ background: 'hsl(38,25%,94%)' }}>
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="p-6 rounded-2xl text-center" style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}>
                  <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(82,28%,35%)' }}>{s.num}</div>
                  <div className="text-sm" style={{ color: 'hsl(30,10%,45%)' }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
                Наша история
              </div>
              <h2 className="text-4xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
                Мы строим не просто дома — мы создаём места, где живут семьи
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'hsl(30,10%,40%)' }}>
                Компания «СтройДом» основана в 2009 году командой инженеров и архитекторов с общим опытом более 30 лет. За эти годы мы возвели более 340 домов в Москве и Подмосковье.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'hsl(30,10%,40%)' }}>
                Наш принцип — фиксированная смета, честный договор и строгое соблюдение сроков. Мы работаем только с собственными бригадами и несём полную ответственность за результат.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {team.map((t, i) => (
                  <div key={t.role} className="p-5 rounded-2xl" style={{ background: 'hsl(38,25%,94%)', border: '1px solid hsl(38,20%,86%)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'hsl(82,22%,88%)' }}>
                      <Icon name={t.icon} size={18} style={{ color: 'hsl(82,28%,35%)' }} />
                    </div>
                    <div className="font-semibold text-sm mb-1" style={{ color: 'hsl(30,15%,18%)' }}>{t.role}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'hsl(30,10%,48%)' }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10" style={{ background: 'hsl(30,15%,15%)', color: 'rgba(255,255,255,0.5)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2024 СтройДом. Строительство домов под ключ.</p>
        </div>
      </footer>
    </div>
  );
}
