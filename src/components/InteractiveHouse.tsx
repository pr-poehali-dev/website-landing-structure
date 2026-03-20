import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 'foundation',
    label: 'Фундамент',
    title: 'Фундаментные работы',
    description: 'Закладываем надёжную основу вашего дома. Проводим геологические исследования грунта, выбираем оптимальный тип фундамента: ленточный, свайный или плитный. Используем только сертифицированные материалы и современные технологии армирования.',
    icon: 'Layers',
    color: '#8B7355',
    windowX: 68, windowY: 195, windowW: 42, windowH: 38,
    photos: [
      'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/1d3b199f-ebb7-461d-805d-281a1a73e4fb.jpg',
    ],
  },
  {
    id: 'walls',
    label: 'Стены',
    title: 'Возведение стен',
    description: 'Строим стены из газобетона, кирпича или дерева по вашему выбору. Точное соблюдение строительных норм, утепление и гидроизоляция. Каждый ряд кладки проверяется нивелиром для идеальной геометрии.',
    icon: 'Square',
    color: '#6B7C5A',
    windowX: 130, windowY: 195, windowW: 42, windowH: 38,
    photos: [
      'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/1d3b199f-ebb7-461d-805d-281a1a73e4fb.jpg',
    ],
  },
  {
    id: 'roof',
    label: 'Кровля',
    title: 'Кровельные работы',
    description: 'Монтаж кровли любой сложности: двускатная, вальмовая, мансардная. Работаем с металлочерепицей, профнастилом, мягкой кровлей и натуральной черепицей. Гарантируем герметичность и долговечность.',
    icon: 'Home',
    color: '#C0392B',
    windowX: 100, windowY: 100, windowW: 42, windowH: 38,
    photos: [
      'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg',
    ],
  },
  {
    id: 'interior',
    label: 'Отделка',
    title: 'Внутренняя отделка',
    description: 'Полный цикл отделочных работ: штукатурка, стяжка полов, укладка плитки, поклейка обоев, покраска. Работаем по дизайн-проекту или создаём его с нуля. Используем только экологичные материалы премиум-класса.',
    icon: 'Paintbrush',
    color: '#7B9E87',
    windowX: 290, windowY: 195, windowW: 42, windowH: 38,
    photos: [
      'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg',
    ],
  },
  {
    id: 'plumbing',
    label: 'Сантехника',
    title: 'Сантехнические работы',
    description: 'Проектирование и монтаж систем водоснабжения и канализации. Установка сантехнического оборудования, тёплых полов, систем фильтрации воды. Работаем с брендами Hansgrohe, Grohe, Geberit.',
    icon: 'Droplets',
    color: '#4A90D9',
    windowX: 352, windowY: 195, windowW: 42, windowH: 38,
    photos: [
      'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg',
    ],
  },
  {
    id: 'electrical',
    label: 'Электрика',
    title: 'Электромонтажные работы',
    description: 'Проектирование электросетей, монтаж электропроводки, установка розеток и выключателей, подключение электрощитов. Монтаж системы "умный дом", охранной сигнализации и видеонаблюдения.',
    icon: 'Zap',
    color: '#F39C12',
    windowX: 160, windowY: 120, windowW: 42, windowH: 38,
    photos: [
      'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/19c7adca-667e-4d84-9ba0-ecd2404b53ac.jpg',
    ],
  },
  {
    id: 'facade',
    label: 'Фасад',
    title: 'Фасадные работы',
    description: 'Утепление и декоративная отделка фасадов: штукатурка, облицовка камнем, клинкерной плиткой, монтаж вентилируемых фасадов. Создаём дом с безупречным внешним видом и надёжной теплоизоляцией.',
    icon: 'Building2',
    color: '#6B7C5A',
    windowX: 220, windowY: 120, windowW: 42, windowH: 38,
    photos: [
      'https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/files/117df234-1330-4fb8-85ab-dc40c41a875f.jpg',
    ],
  },
];

export default function InteractiveHouse() {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* SVG House */}
      <div className="relative w-full max-w-2xl mx-auto select-none">
        <svg
          viewBox="0 0 500 320"
          className="w-full h-auto drop-shadow-xl"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))' }}
        >
          {/* Sky background */}
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8EDF0" />
              <stop offset="100%" stopColor="#F5F1EB" />
            </linearGradient>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EDE8DF" />
              <stop offset="100%" stopColor="#DDD6C8" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C0392B" />
              <stop offset="100%" stopColor="#96281B" />
            </linearGradient>
            <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8FAF6E" />
              <stop offset="100%" stopColor="#7A9A5E" />
            </linearGradient>
            <filter id="windowGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sky */}
          <rect width="500" height="320" fill="url(#skyGrad)" rx="16" />

          {/* Clouds */}
          <ellipse cx="80" cy="55" rx="35" ry="16" fill="white" opacity="0.7" />
          <ellipse cx="105" cy="48" rx="28" ry="14" fill="white" opacity="0.7" />
          <ellipse cx="420" cy="65" rx="30" ry="13" fill="white" opacity="0.6" />
          <ellipse cx="445" cy="58" rx="22" ry="11" fill="white" opacity="0.6" />

          {/* Trees */}
          <ellipse cx="50" cy="230" rx="22" ry="35" fill="#6B8F4E" opacity="0.85" />
          <rect x="47" y="260" width="6" height="18" fill="#8B7355" />
          <ellipse cx="455" cy="225" rx="20" ry="32" fill="#6B8F4E" opacity="0.85" />
          <rect x="452" y="253" width="6" height="18" fill="#8B7355" />

          {/* Grass */}
          <rect x="0" y="275" width="500" height="45" fill="url(#grassGrad)" rx="0" />
          <path d="M0 275 Q125 265 250 270 Q375 275 500 268 L500 320 L0 320Z" fill="#8FAF6E" />

          {/* Main house body */}
          <rect x="60" y="160" width="380" height="130" fill="url(#wallGrad)" />

          {/* Second floor */}
          <rect x="90" y="100" width="320" height="75" fill="#E8E2D5" />

          {/* Roof main */}
          <polygon points="55,165 250,60 445,165" fill="url(#roofGrad)" />
          {/* Roof ridge highlight */}
          <line x1="250" y1="60" x2="55" y2="165" stroke="#E85C4A" strokeWidth="2" opacity="0.6" />
          <line x1="250" y1="60" x2="445" y2="165" stroke="#E85C4A" strokeWidth="2" opacity="0.6" />

          {/* Chimney */}
          <rect x="330" y="72" width="24" height="55" fill="#C8B89A" />
          <rect x="326" y="70" width="32" height="8" fill="#B8A88A" />
          {/* Smoke */}
          <ellipse cx="342" cy="55" rx="6" ry="10" fill="#D0C8BC" opacity="0.4" />
          <ellipse cx="338" cy="40" rx="8" ry="12" fill="#D0C8BC" opacity="0.25" />

          {/* Door */}
          <rect x="213" y="215" width="74" height="75" fill="#8B7355" rx="4" />
          <rect x="215" y="217" width="70" height="71" fill="#7A6548" rx="3" />
          <rect x="218" y="220" width="30" height="65" fill="#6B5838" rx="2" />
          <rect x="252" y="220" width="30" height="65" fill="#6B5838" rx="2" />
          {/* Door knobs */}
          <circle cx="248" cy="258" r="4" fill="#C8A96E" />
          <circle cx="252" cy="258" r="4" fill="#C8A96E" />
          {/* Arch above door */}
          <path d="M213 215 Q250 195 287 215" fill="#9A8468" />

          {/* Steps */}
          <rect x="205" y="285" width="90" height="8" fill="#C8B89A" rx="2" />
          <rect x="210" y="280" width="80" height="8" fill="#D4C8A8" rx="2" />

          {/* Walls horizontal line separator */}
          <line x1="60" y1="162" x2="440" y2="162" stroke="#C8B89A" strokeWidth="2" opacity="0.6" />
          <line x1="90" y1="102" x2="410" y2="102" stroke="#C8B89A" strokeWidth="1.5" opacity="0.5" />

          {/* Clickable Windows */}
          {services.map((svc) => {
            const isHovered = hoveredId === svc.id;
            const isActive = activeService?.id === svc.id;
            return (
              <g
                key={svc.id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredId(svc.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveService(svc)}
              >
                {/* Window glow effect on hover */}
                {(isHovered || isActive) && (
                  <rect
                    x={svc.windowX - 4}
                    y={svc.windowY - 4}
                    width={svc.windowW + 8}
                    height={svc.windowH + 8}
                    fill={svc.color}
                    opacity="0.25"
                    rx="5"
                  />
                )}
                {/* Window frame */}
                <rect
                  x={svc.windowX}
                  y={svc.windowY}
                  width={svc.windowW}
                  height={svc.windowH}
                  fill={isHovered || isActive ? '#FFF9E6' : '#B8D4E8'}
                  stroke={isHovered || isActive ? svc.color : '#8BA8C0'}
                  strokeWidth={isHovered || isActive ? 2.5 : 1.5}
                  rx="3"
                />
                {/* Window cross */}
                <line
                  x1={svc.windowX + svc.windowW / 2}
                  y1={svc.windowY}
                  x2={svc.windowX + svc.windowW / 2}
                  y2={svc.windowY + svc.windowH}
                  stroke={isHovered || isActive ? svc.color : '#8BA8C0'}
                  strokeWidth="1"
                  opacity="0.6"
                />
                <line
                  x1={svc.windowX}
                  y1={svc.windowY + svc.windowH / 2}
                  x2={svc.windowX + svc.windowW}
                  y2={svc.windowY + svc.windowH / 2}
                  stroke={isHovered || isActive ? svc.color : '#8BA8C0'}
                  strokeWidth="1"
                  opacity="0.6"
                />
                {/* Window light */}
                {(isHovered || isActive) && (
                  <rect
                    x={svc.windowX + 3}
                    y={svc.windowY + 3}
                    width={svc.windowW - 6}
                    height={svc.windowH - 6}
                    fill={svc.color}
                    opacity="0.15"
                    rx="2"
                  />
                )}
                {/* Label */}
                <text
                  x={svc.windowX + svc.windowW / 2}
                  y={svc.windowY + svc.windowH + 14}
                  textAnchor="middle"
                  fontSize="8"
                  fill={isHovered || isActive ? svc.color : '#7A7060'}
                  fontFamily="Golos Text, sans-serif"
                  fontWeight={isHovered || isActive ? '700' : '500'}
                  style={{ transition: 'all 0.2s' }}
                >
                  {svc.label}
                </text>
              </g>
            );
          })}

          {/* Hint at bottom */}
          <text x="250" y="315" textAnchor="middle" fontSize="9" fill="#9A9080" fontFamily="Golos Text, sans-serif">
            нажмите на окно, чтобы узнать об услуге
          </text>
        </svg>
      </div>

      {/* Service Panel */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#FDFAF5', border: '1px solid hsl(38,20%,85%)' }}
          >
            {/* Panel Header */}
            <div
              className="relative px-6 py-5 flex items-center justify-between"
              style={{ background: `${activeService.color}18`, borderBottom: '1px solid hsl(38,20%,88%)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: activeService.color }}
                >
                  <Icon name={activeService.icon} size={20} className="text-white" fallback="Square" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: activeService.color, fontFamily: 'Golos Text, sans-serif' }}>
                  {activeService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveService(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <Icon name="X" size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Panel Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="p-6 space-y-5"
            >
              <p className="text-base leading-relaxed" style={{ color: '#5A5040', fontFamily: 'Golos Text, sans-serif' }}>
                {activeService.description}
              </p>

              {/* Photo */}
              <div className="rounded-xl overflow-hidden h-52">
                <img
                  src={activeService.photos[0]}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all"
                style={{ background: `linear-gradient(135deg, ${activeService.color}, ${activeService.color}CC)` }}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setActiveService(null);
                }}
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