import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';

// ─── Типы ────────────────────────────────────────────────────────────────────
type ServiceItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  photo: string;
};

type Scene = 'house' | 'yard';

// ─── Изображения ─────────────────────────────────────────────────────────────
const IMG = {
  house:     'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg',
  build:     'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/1d3b199f-ebb7-461d-805d-281a1a73e4fb.jpg',
  interior:  'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg',
  fence:     'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/6b92a4be-11ff-491d-add0-fbc80e28140f.jpg',
  banya:     'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/bba31011-8969-45bf-97d0-06e3f1e822eb.jpg',
  paving:    'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/0e124fd3-3511-48a3-82f6-f1cf3d594d6d.jpg',
  terrace:   'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/81c93e28-6018-41fc-acd4-7b09bf90e32e.jpg',
  gazebo:    'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/ab420f69-276b-45c1-95dd-3ef62245ab01.jpg',
  landscape: 'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/2d454a81-eb45-40d0-b2b8-0075ddb5dfce.jpg',
};

// ─── Данные услуг ─────────────────────────────────────────────────────────────
const HOUSE_SERVICES: ServiceItem[] = [
  { id:'roof',       label:'Кровля',     icon:'Home',       color:'#C0392B',
    title:'Кровельные работы',
    description:'Двускатные, вальмовые, мансардные крыши. Металлочерепица, мягкая кровля, натуральная черепица. Полная герметичность и долговечность.',
    photo: IMG.house },
  { id:'facade',     label:'Фасад',      icon:'Building2',  color:'#5A7A5A',
    title:'Фасадные работы',
    description:'Утепление и отделка фасадов: штукатурка, облицовка камнем, клинкерная плитка, вентилируемые фасады.',
    photo: IMG.house },
  { id:'walls',      label:'Стены',      icon:'Square',     color:'#6B7C5A',
    title:'Возведение стен',
    description:'Газобетон, кирпич или дерево — любые материалы с гарантией. Утепление, гидроизоляция, идеальная геометрия.',
    photo: IMG.build },
  { id:'interior',   label:'Отделка',    icon:'Paintbrush', color:'#7B9E87',
    title:'Внутренняя отделка',
    description:'Полный цикл: штукатурка, стяжка, плитка, обои, покраска. По вашему дизайн-проекту или создадим с нуля.',
    photo: IMG.interior },
  { id:'plumbing',   label:'Сантехника', icon:'Droplets',   color:'#4A90D9',
    title:'Сантехнические работы',
    description:'Проектирование и монтаж водоснабжения и канализации. Тёплые полы, системы фильтрации.',
    photo: IMG.interior },
  { id:'electrical', label:'Электрика',  icon:'Zap',        color:'#E0A020',
    title:'Электромонтажные работы',
    description:'Электросети, проводка, электрощиты. Умный дом, охранная сигнализация, видеонаблюдение — всё под ключ.',
    photo: IMG.interior },
  { id:'foundation', label:'Фундамент',  icon:'Layers',     color:'#8B7355',
    title:'Фундаментные работы',
    description:'Геологическое исследование грунта, ленточный, свайный или плитный фундамент. Современное армирование, гидроизоляция.',
    photo: IMG.build },
];

const YARD_SERVICES: ServiceItem[] = [
  { id:'fence',     label:'Забор',    icon:'Shield',    color:'#8B6914',
    title:'Заборы и ограждения',
    description:'Кирпичные, металлические, деревянные заборы. Фундамент, опоры, секции — всё с гарантией.',
    photo: IMG.fence },
  { id:'gate',      label:'Ворота',   icon:'DoorOpen',  color:'#7A5C3A',
    title:'Ворота и въездные группы',
    description:'Распашные, откатные и автоматические ворота. Кирпичные столбы, калитки. Автоматика Came, Nice.',
    photo: IMG.fence },
  { id:'paving',    label:'Плитка',   icon:'Grid3x3',   color:'#9A8058',
    title:'Укладка тротуарной плитки',
    description:'Брусчатка, тротуарная плитка, натуральный камень. Подготовка основания, дренаж, бордюры.',
    photo: IMG.paving },
  { id:'banya',     label:'Баня',     icon:'Flame',     color:'#C05A2E',
    title:'Строительство бань',
    description:'Бани из бруса, бревна, газобетона и каркаса. Парная, моечная, комната отдыха. Печи Harvia, Tulikivi.',
    photo: IMG.banya },
  { id:'gazebo',    label:'Беседка',  icon:'TreePine',  color:'#5A8A4A',
    title:'Беседки',
    description:'Деревянные, металлические, из поликарбоната. Открытые и закрытые, с мангальной зоной.',
    photo: IMG.gazebo },
  { id:'terrace',   label:'Терраса',  icon:'Columns',   color:'#7A8B5A',
    title:'Террасы и пристройки',
    description:'Террасы из декинга, термодерева, ДПК. Веранды, навесы, зимние сады, пристройки.',
    photo: IMG.terrace },
  { id:'landscape', label:'Ландшафт', icon:'Flower2',   color:'#4A8A4A',
    title:'Ландшафтные работы',
    description:'Планировка участка, озеленение, дренаж, автополив, освещение. Газоны, деревья, кустарники.',
    photo: IMG.landscape },
];

// ─── Блок дома ────────────────────────────────────────────────────────────────
interface HouseBlockProps {
  services: ServiceItem[];
  bgFrom: string;
  bgTo: string;
  label: string;
  sublabel?: string;
  onSelect: (s: ServiceItem) => void;
  selected: string | null;
  borderRadius?: string;
  minHeight?: string;
  svgContent: React.ReactNode;
}

function HouseBlock({ services, bgFrom, bgTo, label, sublabel, onSelect, selected, borderRadius, minHeight = '120px', svgContent }: HouseBlockProps) {
  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{
        background: `linear-gradient(180deg, ${bgFrom}, ${bgTo})`,
        borderRadius,
        minHeight,
      }}
    >
      {/* SVG illustration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {svgContent}
      </div>

      {/* Section label */}
      <div className="absolute top-3 left-4 z-10">
        <span className="text-xs font-semibold uppercase tracking-widest opacity-40" style={{ color: '#1a1208' }}>
          {label}
        </span>
        {sublabel && (
          <div className="text-xs opacity-25 mt-0.5" style={{ color: '#1a1208' }}>{sublabel}</div>
        )}
      </div>

      {/* Service chips */}
      <div className="relative z-10 flex flex-wrap gap-2 p-4 pt-10 pb-5">
        {services.map((svc) => {
          const isActive = selected === svc.id;
          return (
            <motion.button
              key={svc.id}
              onClick={() => onSelect(svc)}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: isActive ? svc.color : 'rgba(255,255,255,0.72)',
                color: isActive ? '#fff' : '#2a2018',
                boxShadow: isActive
                  ? `0 4px 16px ${svc.color}55`
                  : '0 1px 4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(8px)',
                border: isActive ? `1.5px solid ${svc.color}` : '1.5px solid rgba(255,255,255,0.6)',
              }}
            >
              <Icon name={svc.icon} size={14} fallback="Star" />
              {svc.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Карточка услуги ──────────────────────────────────────────────────────────
function ServiceCard({ item, onClose }: { item: ServiceItem; onClose: () => void }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#FDFAF5',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={item.photo} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.35)', color: '#fff' }}
        >
          <Icon name="X" size={13} />
        </button>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: item.color }}>
              <Icon name={item.icon} size={13} className="text-white" fallback="Star" />
            </div>
            <h3 className="text-white font-semibold text-base leading-tight">{item.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm leading-relaxed" style={{ color: '#5A5040' }}>
          {item.description}
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm"
          style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}
        >
          Получить расчёт стоимости
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── SVG иллюстрации для блоков ───────────────────────────────────────────────
const RoofSVG = () => (
  <svg viewBox="0 0 400 110" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <polygon points="200,8 380,108 20,108" fill="#C0392B" />
    <polygon points="200,8 380,108 20,108" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
    <rect x="180" y="18" width="8" height="40" fill="#A02820" />
    <rect x="175" y="15" width="18" height="6" fill="#8B1C14" rx="2" />
  </svg>
);

const WallsSVG = () => (
  <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {[0,1,2,3,4,5,6].map(r => (
      [0,1,2,3,4,5,6,7].map(c => (
        <rect key={`${r}-${c}`}
          x={c * 52 + (r % 2 === 0 ? 0 : 26)} y={r * 24}
          width="46" height="18" rx="2"
          fill={`rgba(180,160,130,${0.15 + (r+c) % 3 * 0.05})`} />
      ))
    ))}
  </svg>
);

const FoundationSVG = () => (
  <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="20" width="400" height="60" fill="rgba(139,115,85,0.3)" />
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <rect key={i} x={i * 42} y="22" width="36" height="14" rx="2"
        fill="rgba(139,115,85,0.25)" />
    ))}
  </svg>
);

const YardSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill="rgba(134,176,92,0.2)" />
    <ellipse cx="60" cy="200" rx="35" ry="55" fill="rgba(90,146,72,0.25)" />
    <ellipse cx="340" cy="190" rx="30" ry="48" fill="rgba(90,146,72,0.22)" />
    <rect x="160" y="100" width="80" height="60" fill="rgba(200,180,140,0.2)" rx="4" />
    <polygon points="200,70 240,100 160,100" fill="rgba(160,80,50,0.2)" />
    <rect x="0" y="265" width="400" height="12" fill="rgba(200,180,140,0.3)" />
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <rect key={i} x={i * 44} y="267" width="36" height="8" rx="1"
        fill="rgba(180,160,120,0.2)" />
    ))}
  </svg>
);

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function InteractiveHouse() {
  const [scene, setScene] = useState<Scene>('house');
  const [isFlipping, setIsFlipping] = useState(false);
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  const flipTo = (target: Scene) => {
    if (isFlipping || scene === target) return;
    setSelected(null);
    setIsFlipping(true);
    setTimeout(() => {
      setScene(target);
      setIsFlipping(false);
    }, 500);
  };

  const isHouse = scene === 'house';

  // Блоки дома
  const houseBlocks = [
    {
      key: 'roof',
      label: 'Кровля',
      sublabel: 'кровельные работы',
      services: HOUSE_SERVICES.filter(s => ['roof'].includes(s.id)),
      bgFrom: '#F2EBE0',
      bgTo: '#E8DDD0',
      borderRadius: '20px 20px 0 0',
      minHeight: '110px',
      svg: <RoofSVG />,
    },
    {
      key: 'walls',
      label: 'Стены и отделка',
      sublabel: 'стены, фасад, интерьер',
      services: HOUSE_SERVICES.filter(s => ['facade','walls','interior','plumbing','electrical'].includes(s.id)),
      bgFrom: '#EDE6D8',
      bgTo: '#E4DDD0',
      borderRadius: '0',
      minHeight: '140px',
      svg: <WallsSVG />,
    },
    {
      key: 'foundation',
      label: 'Фундамент',
      sublabel: 'основание дома',
      services: HOUSE_SERVICES.filter(s => ['foundation'].includes(s.id)),
      bgFrom: '#DDD4C0',
      bgTo: '#CEC5B0',
      borderRadius: '0 0 20px 20px',
      minHeight: '100px',
      svg: <FoundationSVG />,
    },
  ];

  // Блоки двора
  const yardBlocks = [
    {
      key: 'structures',
      label: 'Постройки',
      sublabel: 'баня, беседка, терраса',
      services: YARD_SERVICES.filter(s => ['banya','gazebo','terrace'].includes(s.id)),
      bgFrom: '#DFF0D0',
      bgTo: '#D0E4C0',
      borderRadius: '20px 20px 0 0',
      minHeight: '130px',
      svg: <YardSVG />,
    },
    {
      key: 'hardscape',
      label: 'Ограждения и покрытия',
      sublabel: 'забор, ворота, плитка',
      services: YARD_SERVICES.filter(s => ['fence','gate','paving'].includes(s.id)),
      bgFrom: '#D4E8C8',
      bgTo: '#C8DCBA',
      borderRadius: '0',
      minHeight: '120px',
      svg: <YardSVG />,
    },
    {
      key: 'landscape',
      label: 'Ландшафт',
      sublabel: 'озеленение и благоустройство',
      services: YARD_SERVICES.filter(s => ['landscape'].includes(s.id)),
      bgFrom: '#C8E0B8',
      bgTo: '#B8D0A8',
      borderRadius: '0 0 20px 20px',
      minHeight: '100px',
      svg: <YardSVG />,
    },
  ];

  const blocks = isHouse ? houseBlocks : yardBlocks;
  const switchLabel = isHouse ? 'Двор' : 'Дом';
  const switchIcon = isHouse ? 'TreePine' : 'Home';
  const switchColor = isHouse ? '#2D5A27' : '#3A5A8A';
  const switchBg = isHouse
    ? 'linear-gradient(180deg, #3A7A30 0%, #2D5A27 100%)'
    : 'linear-gradient(180deg, #4A6EA8 0%, #2D4A78 100%)';

  return (
    <div className="w-full flex flex-col items-center">

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
        style={{ background: 'rgba(0,0,0,0.05)', color: '#5A5040' }}
      >
        <Icon name="Hand" size={14} />
        Выберите раздел и нажмите на услугу
      </motion.div>

      {/* Main layout */}
      <div className="w-full max-w-lg mx-auto flex gap-3 items-stretch">

        {/* ── Left: 3D blocks column ── */}
        <div className="flex-1 min-w-0" style={{ perspective: '1200px' }}>
          <motion.div
            animate={{
              rotateY: isFlipping ? 90 : 0,
              opacity: isFlipping ? 0 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'center center', transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={scene}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col"
                style={{ gap: '2px' }}
              >
                {blocks.map((block) => (
                  <HouseBlock
                    key={block.key}
                    services={block.services}
                    bgFrom={block.bgFrom}
                    bgTo={block.bgTo}
                    label={block.label}
                    sublabel={block.sublabel}
                    onSelect={(s) => setSelected(s)}
                    selected={selected?.id ?? null}
                    borderRadius={block.borderRadius}
                    minHeight={block.minHeight}
                    svgContent={block.svg}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Right: flip button ── */}
        <div className="flex flex-col flex-shrink-0" style={{ width: '56px' }}>
          <motion.button
            onClick={() => flipTo(isHouse ? 'yard' : 'house')}
            disabled={isFlipping}
            whileHover={{ scale: 1.03, x: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center justify-center gap-3 w-full h-full rounded-2xl relative overflow-hidden"
            style={{
              background: switchBg,
              boxShadow: `0 8px 32px ${switchColor}55`,
              color: '#fff',
              minHeight: '200px',
            }}
          >
            {/* Glow effect */}
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.25), transparent 70%)' }}
            />

            {/* Icon */}
            <motion.div
              animate={isFlipping ? { rotate: 180, scale: 0.8 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="relative z-10"
            >
              <Icon name={switchIcon} size={22} fallback="Home" />
            </motion.div>

            {/* Vertical text */}
            <span
              className="relative z-10 font-bold tracking-widest uppercase text-xs"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.2em' }}
            >
              {switchLabel}
            </span>

            {/* Arrow hint */}
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="relative z-10 opacity-60"
            >
              <Icon name="ChevronsRight" size={14} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* ── Service card ── */}
      <div className="w-full max-w-lg mx-auto mt-4">
        <AnimatePresence mode="wait">
          {selected && (
            <ServiceCard key={selected.id} item={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
