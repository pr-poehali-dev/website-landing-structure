import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';

type ServiceItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  photos: string[];
};

// ─── Услуги ДОМ (окна) ───────────────────────────────────────────────────────
const houseServices: ServiceItem[] = [
  {
    id: 'foundation',
    label: 'Фундамент',
    title: 'Фундаментные работы',
    description: 'Закладываем надёжную основу вашего дома. Проводим геологические исследования грунта, выбираем оптимальный тип фундамента: ленточный, свайный или плитный. Используем только сертифицированные материалы и современные технологии армирования.',
    icon: 'Layers',
    color: '#8B7355',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/1d3b199f-ebb7-461d-805d-281a1a73e4fb.jpg'],
  },
  {
    id: 'walls',
    label: 'Стены',
    title: 'Возведение стен',
    description: 'Строим стены из газобетона, кирпича или дерева по вашему выбору. Точное соблюдение строительных норм, утепление и гидроизоляция. Каждый ряд кладки проверяется нивелиром для идеальной геометрии.',
    icon: 'Square',
    color: '#6B7C5A',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/1d3b199f-ebb7-461d-805d-281a1a73e4fb.jpg'],
  },
  {
    id: 'roof',
    label: 'Кровля',
    title: 'Кровельные работы',
    description: 'Монтаж кровли любой сложности: двускатная, вальмовая, мансардная. Работаем с металлочерепицей, профнастилом, мягкой кровлей и натуральной черепицей. Гарантируем герметичность и долговечность.',
    icon: 'Home',
    color: '#C0392B',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg'],
  },
  {
    id: 'interior',
    label: 'Отделка',
    title: 'Внутренняя отделка',
    description: 'Полный цикл отделочных работ: штукатурка, стяжка полов, укладка плитки, поклейка обоев, покраска. Работаем по дизайн-проекту или создаём его с нуля. Используем только экологичные материалы премиум-класса.',
    icon: 'Paintbrush',
    color: '#7B9E87',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg'],
  },
  {
    id: 'plumbing',
    label: 'Сантехника',
    title: 'Сантехнические работы',
    description: 'Проектирование и монтаж систем водоснабжения и канализации. Установка сантехнического оборудования, тёплых полов, систем фильтрации воды. Работаем с брендами Hansgrohe, Grohe, Geberit.',
    icon: 'Droplets',
    color: '#4A90D9',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg'],
  },
  {
    id: 'electrical',
    label: 'Электрика',
    title: 'Электромонтажные работы',
    description: 'Проектирование электросетей, монтаж электропроводки, установка розеток и выключателей, подключение электрощитов. Монтаж системы "умный дом", охранной сигнализации и видеонаблюдения.',
    icon: 'Zap',
    color: '#F39C12',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg'],
  },
  {
    id: 'facade',
    label: 'Фасад',
    title: 'Фасадные работы',
    description: 'Утепление и декоративная отделка фасадов: штукатурка, облицовка камнем, клинкерной плиткой, монтаж вентилируемых фасадов. Создаём дом с безупречным внешним видом и надёжной теплоизоляцией.',
    icon: 'Building2',
    color: '#6B7C5A',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg'],
  },
];

// ─── Услуги ДВОР (интерактивные зоны) ─────────────────────────────────────────
const yardServices: ServiceItem[] = [
  {
    id: 'fence',
    label: 'Забор',
    title: 'Заборы и ограждения',
    description: 'Проектирование и строительство заборов любого типа: кирпичные, из профнастила, деревянного штакетника, кованые, комбинированные. Устанавливаем опоры, фундамент под забор, монтируем секции с гарантией.',
    icon: 'Fence',
    color: '#8B6914',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/6b92a4be-11ff-491d-add0-fbc80e28140f.jpg'],
  },
  {
    id: 'gate',
    label: 'Ворота',
    title: 'Ворота и въездные группы',
    description: 'Изготовление и монтаж распашных, откатных и автоматических ворот. Кирпичные и металлические столбы, калитки, въездные арки. Автоматика Came, Nice, Faac — удалённое управление со смартфона.',
    icon: 'DoorOpen',
    color: '#7A5C3A',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/6b92a4be-11ff-491d-add0-fbc80e28140f.jpg'],
  },
  {
    id: 'paving',
    label: 'Плитка',
    title: 'Укладка тротуарной плитки',
    description: 'Укладка брусчатки, тротуарной плитки, натурального камня. Подготовка основания, дренаж, бордюры. Работаем с виброплитой, соблюдаем уклоны для отвода воды. Срок службы покрытия — от 25 лет.',
    icon: 'Grid3x3',
    color: '#9A8058',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/0e124fd3-3511-48a3-82f6-f1cf3d594d6d.jpg'],
  },
  {
    id: 'banya',
    label: 'Баня',
    title: 'Строительство бань',
    description: 'Строим бани из бруса, бревна, газобетона и каркаса. Парная, моечная, комната отдыха, веранда. Монтаж печей Harvia, Tulikivi, дымоходов, систем вентиляции. Сдаём готовую баню под ключ.',
    icon: 'Flame',
    color: '#C05A2E',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/bba31011-8969-45bf-97d0-06e3f1e822eb.jpg'],
  },
  {
    id: 'gazebo',
    label: 'Беседка',
    title: 'Беседки',
    description: 'Проектирование и строительство беседок из дерева, металла, поликарбоната. Открытые, закрытые, с мангальной зоной. Обработка антисептиком, покраска, монтаж кровли. Готовая беседка за 5–10 дней.',
    icon: 'TreePine',
    color: '#5A8A4A',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/ab420f69-276b-45c1-95dd-3ef62245ab01.jpg'],
  },
  {
    id: 'terrace',
    label: 'Терраса',
    title: 'Террасы и пристройки',
    description: 'Строим террасы из декинга, термодерева, ДПК. Веранды, навесы, зимние сады, пристройки к дому. Собственный проект, согласование при необходимости, монтаж с нуля под ключ.',
    icon: 'Columns',
    color: '#7A8B5A',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/81c93e28-6018-41fc-acd4-7b09bf90e32e.jpg'],
  },
  {
    id: 'landscape',
    label: 'Ландшафт',
    title: 'Ландшафтные работы',
    description: 'Планировка участка, озеленение, дренаж, автополив, освещение. Посадка деревьев, кустарников, устройство газонов. Создаём стильный ухоженный участок с нуля или преображаем существующий.',
    icon: 'Flower2',
    color: '#4A8A4A',
    photos: ['https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/2d454a81-eb45-40d0-b2b8-0075ddb5dfce.jpg'],
  },
];

// Координаты окон дома (в системе viewBox 0 0 800 600)
type WindowDef = { id: string; x: number; y: number; w: number; h: number };
const houseWindows: WindowDef[] = [
  { id: 'foundation', x: 118, y: 330, w: 58, h: 50 },
  { id: 'walls',      x: 200, y: 330, w: 58, h: 50 },
  { id: 'roof',       x: 160, y: 195, w: 58, h: 50 },
  { id: 'interior',   x: 468, y: 330, w: 58, h: 50 },
  { id: 'plumbing',   x: 550, y: 330, w: 58, h: 50 },
  { id: 'electrical', x: 260, y: 210, w: 58, h: 50 },
  { id: 'facade',     x: 355, y: 210, w: 58, h: 50 },
];

export default function InteractiveHouse() {
  const [active, setActive] = useState<ServiceItem | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const allServices = [...houseServices, ...yardServices];
  const getService = (id: string) => allServices.find(s => s.id === id) ?? null;

  const handleClick = (id: string) => setActive(getService(id));

  return (
    <div className="relative w-full flex flex-col items-center gap-6">

      {/* Hint bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
        style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,32%)' }}
      >
        <Icon name="MousePointerClick" size={15} />
        Нажмите на элементы дома и участка, чтобы узнать подробнее
      </motion.div>

      {/* ── SCENE SVG ─────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-4xl mx-auto select-none">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.10))' }}
        >
          <defs>
            <linearGradient id="skyG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C9DDE8" />
              <stop offset="100%" stopColor="#EEE8DC" />
            </linearGradient>
            <linearGradient id="wallG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F0EAE0" />
              <stop offset="100%" stopColor="#DDD5C5" />
            </linearGradient>
            <linearGradient id="roofG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D0433A" />
              <stop offset="100%" stopColor="#962B20" />
            </linearGradient>
            <linearGradient id="grassG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7EAA5C" />
              <stop offset="100%" stopColor="#6A9448" />
            </linearGradient>
            <linearGradient id="pathG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4C8A8" />
              <stop offset="100%" stopColor="#C0B090" />
            </linearGradient>
            <linearGradient id="banyaRoof" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5E3C" />
              <stop offset="100%" stopColor="#6A4428" />
            </linearGradient>
            <linearGradient id="gazeboRoof" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5A8A4A" />
              <stop offset="100%" stopColor="#3A6A2A" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── SKY ── */}
          <rect width="800" height="600" fill="url(#skyG)" rx="20" />

          {/* Clouds */}
          <motion.g animate={{ x: [0, 6, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
            <ellipse cx="120" cy="80" rx="52" ry="22" fill="white" opacity="0.75" />
            <ellipse cx="158" cy="68" rx="40" ry="20" fill="white" opacity="0.75" />
          </motion.g>
          <motion.g animate={{ x: [0, -5, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}>
            <ellipse cx="680" cy="95" rx="44" ry="19" fill="white" opacity="0.65" />
            <ellipse cx="715" cy="82" rx="34" ry="17" fill="white" opacity="0.65" />
          </motion.g>

          {/* ── GROUND / GRASS ── */}
          <rect x="0" y="440" width="800" height="160" fill="url(#grassG)" />
          <path d="M0 440 Q200 428 400 435 Q600 442 800 430 L800 600 L0 600Z" fill="#7EAA5C" />

          {/* ── FENCE (left + right, clickable) ── */}
          {['fence-left', 'fence-right'].map((fid, fi) => {
            const isLeft = fi === 0;
            const fx = isLeft ? 20 : 580;
            const fw = isLeft ? 150 : 200;
            const isH = hovered === 'fence';
            return (
              <g key={fid} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('fence')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick('fence')}
              >
                {isH && <rect x={fx - 4} y={438} width={fw + 8} height={80} fill="#8B6914" opacity="0.18" rx="4" />}
                {/* Fence posts */}
                {Array.from({ length: Math.floor(fw / 28) + 1 }).map((_, pi) => (
                  <rect key={pi} x={fx + pi * 28} y={440} width={8} height={55} rx="2"
                    fill={isH ? '#C8A040' : '#B89828'} />
                ))}
                {/* Rails */}
                <rect x={fx} y={450} width={fw} height={8} rx="2" fill={isH ? '#D4AC48' : '#C8A030'} opacity="0.85" />
                <rect x={fx} y={470} width={fw} height={8} rx="2" fill={isH ? '#D4AC48' : '#C8A030'} opacity="0.85" />
                {/* Label */}
                {fi === 0 && <text x={fx + fw / 2} y={508} textAnchor="middle" fontSize="11"
                  fill={isH ? '#8B6914' : '#7A6010'} fontFamily="Golos Text,sans-serif" fontWeight={isH ? '700' : '500'}>Забор</text>}
              </g>
            );
          })}

          {/* ── GATES (center-bottom, clickable) ── */}
          {(() => {
            const isH = hovered === 'gate';
            return (
              <g style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('gate')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick('gate')}
              >
                {isH && <rect x={310} y={436} width={180} height={90} fill="#7A5C3A" opacity="0.18" rx="6" />}
                {/* Brick pillars */}
                <rect x={310} y={420} width={28} height={100} fill={isH ? '#C8A870' : '#B89860'} rx="3" />
                <rect x={462} y={420} width={28} height={100} fill={isH ? '#C8A870' : '#B89860'} rx="3" />
                {/* Gate panels */}
                <rect x={338} y={438} width={62} height={72} fill={isH ? '#A07840' : '#907030'} rx="3" />
                <rect x={400} y={438} width={62} height={72} fill={isH ? '#A07840' : '#907030'} rx="3" />
                {/* Gate bars */}
                {[346, 358, 370, 382, 408, 420, 432, 444].map((bx, bi) => (
                  <rect key={bi} x={bx} y={442} width={6} height={64} rx="2" fill={isH ? '#C8A050' : '#B89040'} />
                ))}
                {/* Label */}
                <text x={400} y={526} textAnchor="middle" fontSize="11"
                  fill={isH ? '#7A5C3A' : '#6A4C2A'} fontFamily="Golos Text,sans-serif" fontWeight={isH ? '700' : '500'}>Ворота</text>
              </g>
            );
          })()}

          {/* ── PAVING PATH (clickable) ── */}
          {(() => {
            const isH = hovered === 'paving';
            return (
              <g style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('paving')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick('paving')}
              >
                {/* Main path from gate to door */}
                <path d="M358 510 L358 540 L442 540 L442 510 Z" fill={isH ? '#DDD0A0' : '#CAB888'} />
                <path d="M340 540 L340 570 L460 570 L460 540 Z" fill={isH ? '#DDD0A0' : '#CAB888'} />
                {/* Tile grid lines */}
                {[358, 380, 400, 420, 442].map((lx, li) => (
                  <line key={`pv${li}`} x1={lx} y1={510} x2={lx} y2={540} stroke={isH ? '#C0A868' : '#B09858'} strokeWidth="1.5" />
                ))}
                <line x1={358} y1={525} x2={442} y2={525} stroke={isH ? '#C0A868' : '#B09858'} strokeWidth="1.5" />
                {/* Side decorative path left */}
                <rect x={130} y={490} width={228} height={22} rx="4" fill={isH ? '#D8CC98' : '#C4B880'} />
                {[150, 175, 200, 225, 250, 275, 300, 325].map((tx, ti) => (
                  <rect key={`pt${ti}`} x={tx} y={490} width={22} height={22} rx="2"
                    fill={isH ? '#D0C088' : '#BCB070'} stroke={isH ? '#C0A860' : '#ACA050'} strokeWidth="1" />
                ))}
                <text x={240} y={562} textAnchor="middle" fontSize="11"
                  fill={isH ? '#9A8058' : '#8A7048'} fontFamily="Golos Text,sans-serif" fontWeight={isH ? '700' : '500'}>Тротуарная плитка</text>
              </g>
            );
          })()}

          {/* ── LANDSCAPE — trees bg, decorative (clickable zone) ── */}
          {(() => {
            const isH = hovered === 'landscape';
            const trees = [
              { cx: 80, cy: 370, rx: 30, ry: 48 },
              { cx: 720, cy: 375, rx: 28, ry: 44 },
              { cx: 58, cy: 420, rx: 22, ry: 36 },
              { cx: 742, cy: 425, rx: 20, ry: 33 },
            ];
            return (
              <g style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('landscape')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick('landscape')}
              >
                {trees.map((t, ti) => (
                  <g key={ti}>
                    {isH && <ellipse cx={t.cx} cy={t.cy} rx={t.rx + 6} ry={t.ry + 6} fill="#4A8A4A" opacity="0.25" />}
                    <ellipse cx={t.cx} cy={t.cy} rx={t.rx} ry={t.ry} fill={isH ? '#5AAA5A' : '#4E9048'} opacity="0.9" />
                    <rect x={t.cx - 5} y={t.cy + t.ry - 4} width={10} height={20} fill="#8B6844" />
                  </g>
                ))}
                {/* Flower beds */}
                <ellipse cx="160" cy="490" rx="28" ry="14" fill={isH ? '#6AAA5A' : '#5A9A4A'} opacity="0.8" />
                <ellipse cx="640" cy="490" rx="28" ry="14" fill={isH ? '#6AAA5A' : '#5A9A4A'} opacity="0.8" />
                {[155, 165, 175].map((fx, fi) => (
                  <circle key={fi} cx={fx} cy={487} r={4} fill={fi % 2 === 0 ? '#E8D060' : '#E87060'} opacity="0.9" />
                ))}
                {[635, 645, 655].map((fx, fi) => (
                  <circle key={fi} cx={fx} cy={487} r={4} fill={fi % 2 === 0 ? '#E87060' : '#D060A0'} opacity="0.9" />
                ))}
                <text x={80} y={520} textAnchor="middle" fontSize="10"
                  fill={isH ? '#3A7A3A' : '#2A6A2A'} fontFamily="Golos Text,sans-serif" fontWeight={isH ? '700' : '500'}>Ландшафт</text>
              </g>
            );
          })()}

          {/* ── BANYA (right side, clickable) ── */}
          {(() => {
            const isH = hovered === 'banya';
            return (
              <g style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('banya')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick('banya')}
              >
                {isH && <rect x={604} y={348} width={148} height={130} fill="#C05A2E" opacity="0.15" rx="8" />}
                {/* Body */}
                <rect x={608} y={378} width={140} height={100} fill={isH ? '#D4B898' : '#C8A888'} rx="4" />
                {/* Roof */}
                <polygon points="600,380 678,340 756,380" fill={isH ? '#A06830' : '#8B5E3C'} />
                {/* Door */}
                <rect x={658} y={418} width={36} height={60} fill="#7A5038" rx="3" />
                {/* Window */}
                <rect x={616} y={390} width={30} height={26} fill={isH ? '#FFFAE0' : '#C8D8E8'} rx="2"
                  stroke="#9A7050" strokeWidth="1.5" />
                <line x1={631} y1={390} x2={631} y2={416} stroke="#9A7050" strokeWidth="1" />
                <line x1={616} y1={403} x2={646} y2={403} stroke="#9A7050" strokeWidth="1" />
                {/* Smoke from chimney */}
                <rect x={718} y={348} width={14} height={30} fill="#B08860" />
                <motion.g animate={{ y: [0, -6, 0], opacity: [0.4, 0.2, 0.4] }} transition={{ duration: 3, repeat: Infinity }}>
                  <ellipse cx={725} cy={336} rx={7} ry={10} fill="#D8D0C0" opacity="0.4" />
                  <ellipse cx={722} cy={318} rx={9} ry={12} fill="#D8D0C0" opacity="0.22" />
                </motion.g>
                {/* Label */}
                <text x={678} y={490} textAnchor="middle" fontSize="11"
                  fill={isH ? '#C05A2E' : '#A04A20'} fontFamily="Golos Text,sans-serif" fontWeight={isH ? '700' : '500'}>Баня</text>
              </g>
            );
          })()}

          {/* ── GAZEBO (left side, clickable) ── */}
          {(() => {
            const isH = hovered === 'gazebo';
            return (
              <g style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('gazebo')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick('gazebo')}
              >
                {isH && <rect x={44} y={340} width={150} height={120} fill="#5A8A4A" opacity="0.15" rx="8" />}
                {/* Floor */}
                <rect x={48} y={432} width={140} height={10} fill={isH ? '#D0C098' : '#C0B088'} rx="2" />
                {/* Columns */}
                {[52, 86, 120, 154, 174].map((cx, ci) => (
                  <rect key={ci} x={cx} y={370} width={8} height={62} fill={isH ? '#B0A070' : '#A09060'} rx="2" />
                ))}
                {/* Roof */}
                <polygon points="40,372 118,332 196,372" fill={isH ? '#6AAA5A' : '#5A8A4A'} />
                <polygon points="44,375 118,336 192,375" fill={isH ? '#78B868' : '#6A9858'} opacity="0.6" />
                {/* Bench inside */}
                <rect x={60} y={408} width={118} height={16} fill={isH ? '#C8A870' : '#B89860'} rx="3" />
                <rect x={64} y={424} width={10} height={10} fill="#A07848" />
                <rect x={164} y={424} width={10} height={10} fill="#A07848" />
                {/* Label */}
                <text x={118} y={456} textAnchor="middle" fontSize="11"
                  fill={isH ? '#5A8A4A' : '#4A7A3A'} fontFamily="Golos Text,sans-serif" fontWeight={isH ? '700' : '500'}>Беседка</text>
              </g>
            );
          })()}

          {/* ── TERRACE (attached to house right, clickable) ── */}
          {(() => {
            const isH = hovered === 'terrace';
            return (
              <g style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered('terrace')}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick('terrace')}
              >
                {isH && <rect x={580} y={345} width={28} height={170} fill="#7A8B5A" opacity="0.18" />}
                {/* Terrace platform */}
                <rect x={584} y={350} width={24} height={130} fill={isH ? '#CCC898' : '#BEB888'} rx="3" />
                {/* Decking boards */}
                {[358, 370, 382, 394, 406, 418, 430, 442, 454, 466].map((ty, ti) => (
                  <rect key={ti} x={584} y={ty} width={24} height={10} fill={isH ? '#D4CC98' : '#C4BC88'} rx="1"
                    stroke={isH ? '#B0A868' : '#A09858'} strokeWidth="0.8" />
                ))}
                {/* Railing */}
                <rect x={603} y={350} width={5} height={130} fill={isH ? '#A09868' : '#908858'} />
                {[356, 376, 396, 416, 436, 456, 470].map((ry2, ri) => (
                  <rect key={ri} x={603} y={ry2} width={5} height={8} fill="#807848" />
                ))}
                <text x={596} y={494} textAnchor="middle" fontSize="10"
                  fill={isH ? '#7A8B5A' : '#6A7B4A'} fontFamily="Golos Text,sans-serif" fontWeight={isH ? '700' : '500'}
                  transform="rotate(-90, 596, 494)">Терраса</text>
              </g>
            );
          })()}

          {/* ── MAIN HOUSE ───────────────────────────────────────────── */}
          {/* Foundation */}
          <rect x={100} y={432} width={490} height={20} fill="#C0B0A0" rx="3" />
          {/* Ground floor */}
          <rect x={108} y={282} width={474} height={165} fill="url(#wallG)" />
          {/* Second floor */}
          <rect x={138} y={185} width={414} height={108} fill="#EDE8DC" />
          {/* Roof */}
          <polygon points="88,287 345,128 602,287" fill="url(#roofG)" />
          <line x1={345} y1={128} x2={88} y2={287} stroke="#E86050" strokeWidth="2.5" opacity="0.55" />
          <line x1={345} y1={128} x2={602} y2={287} stroke="#E86050" strokeWidth="2.5" opacity="0.55" />
          {/* Roof overhang */}
          <polygon points="82,290 345,132 608,290 608,296 82,296" fill="#9A3025" opacity="0.5" />
          {/* Chimney */}
          <rect x={468} y={145} width={32} height={70} fill="#C8B898" />
          <rect x={463} y={142} width={42} height={10} fill="#B8A888" />
          <motion.g animate={{ y: [0, -8, 0], opacity: [0.38, 0.18, 0.38] }} transition={{ duration: 4, repeat: Infinity }}>
            <ellipse cx={484} cy={126} rx={9} ry={14} fill="#D0C8BC" opacity="0.38" />
            <ellipse cx={480} cy={106} rx={11} ry={16} fill="#D0C8BC" opacity="0.22" />
          </motion.g>
          {/* Wall lines */}
          <line x1={108} y1={284} x2={582} y2={284} stroke="#C0B098" strokeWidth="2" opacity="0.55" />
          <line x1={138} y1={187} x2={552} y2={187} stroke="#C0B098" strokeWidth="1.5" opacity="0.45" />
          {/* Door */}
          <rect x={300} y={352} width={90} height={100} fill="#8B7355" rx="5" />
          <rect x={303} y={355} width={84} height={94} fill="#7A6345" rx="4" />
          <rect x={306} y={358} width={38} height={88} fill="#6B5535" rx="2" />
          <rect x={348} y={358} width={36} height={88} fill="#6B5535" rx="2" />
          <circle cx={345} cy={408} r={5} fill="#C8A86E" />
          <circle cx={350} cy={408} r={5} fill="#C8A86E" />
          <path d="M300 352 Q345 328 390 352" fill="#9A8468" />
          {/* Steps */}
          <rect x={286} y={448} width={118} height={10} fill="#C8B898" rx="3" />
          <rect x={292} y={440} width={106} height={10} fill="#D4C8A8" rx="3" />

          {/* ── HOUSE WINDOWS (clickable) ── */}
          {houseWindows.map((w) => {
            const svc = houseServices.find(s => s.id === w.id);
            if (!svc) return null;
            const isH = hovered === w.id;
            const isA = active?.id === w.id;
            return (
              <g key={w.id} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(w.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(w.id)}
              >
                {(isH || isA) && (
                  <rect x={w.x - 6} y={w.y - 6} width={w.w + 12} height={w.h + 12}
                    fill={svc.color} opacity="0.22" rx="6" />
                )}
                <rect x={w.x} y={w.y} width={w.w} height={w.h}
                  fill={(isH || isA) ? '#FFF8E0' : '#B8D4E8'}
                  stroke={(isH || isA) ? svc.color : '#8AAABF'}
                  strokeWidth={(isH || isA) ? 2.5 : 1.5} rx="3" />
                <line x1={w.x + w.w / 2} y1={w.y} x2={w.x + w.w / 2} y2={w.y + w.h}
                  stroke={(isH || isA) ? svc.color : '#8AAABF'} strokeWidth="1" opacity="0.6" />
                <line x1={w.x} y1={w.y + w.h / 2} x2={w.x + w.w} y2={w.y + w.h / 2}
                  stroke={(isH || isA) ? svc.color : '#8AAABF'} strokeWidth="1" opacity="0.6" />
                {(isH || isA) && (
                  <rect x={w.x + 3} y={w.y + 3} width={w.w - 6} height={w.h - 6}
                    fill={svc.color} opacity="0.12" rx="2" />
                )}
                <text x={w.x + w.w / 2} y={w.y + w.h + 16} textAnchor="middle" fontSize="10"
                  fill={(isH || isA) ? svc.color : '#7A7060'}
                  fontFamily="Golos Text,sans-serif" fontWeight={(isH || isA) ? '700' : '500'}>
                  {svc.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── SERVICE PANEL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: '#FDFAF5', border: '1px solid hsl(38,20%,85%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ background: `${active.color}18`, borderBottom: '1px solid hsl(38,20%,88%)' }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: active.color }}>
                  <Icon name={active.icon} size={20} className="text-white" fallback="Star" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: active.color, fontFamily: 'Golos Text,sans-serif' }}>
                  {active.title}
                </h3>
              </div>
              <button onClick={() => setActive(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors">
                <Icon name="X" size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.14 }}
              className="p-6 space-y-5"
            >
              <p className="text-sm leading-relaxed" style={{ color: '#5A5040', fontFamily: 'Golos Text,sans-serif' }}>
                {active.description}
              </p>
              <div className="rounded-2xl overflow-hidden h-52">
                <img src={active.photos[0]} alt={active.title} className="w-full h-full object-cover" />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setActive(null); }}
                className="w-full py-3.5 rounded-xl font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${active.color}, ${active.color}BB)` }}
              >
                Получить расчёт стоимости
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
