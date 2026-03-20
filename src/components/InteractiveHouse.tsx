import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';

type ServiceItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  photo: string;
};

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

const ALL_SERVICES: ServiceItem[] = [
  // ── ДОМ ──────────────────────────────────────────────────────────────
  { id:'foundation', label:'Фундамент',  icon:'Layers',    color:'#8B7355',
    title:'Фундаментные работы',
    description:'Закладываем надёжную основу: геологическое исследование грунта, ленточный, свайный или плитный фундамент. Современное армирование, гидроизоляция, сертифицированные материалы.',
    photo: IMG.build },
  { id:'walls',      label:'Стены',      icon:'Square',    color:'#6B7C5A',
    title:'Возведение стен',
    description:'Газобетон, кирпич или дерево — любые материалы с гарантией. Утепление, гидроизоляция, идеальная геометрия: каждый ряд кладки проверяется нивелиром.',
    photo: IMG.build },
  { id:'roof',       label:'Кровля',     icon:'Home',      color:'#C0392B',
    title:'Кровельные работы',
    description:'Двускатные, вальмовые, мансардные крыши. Металлочерепица, мягкая кровля, натуральная черепица. Полная герметичность и долговечность.',
    photo: IMG.house },
  { id:'interior',   label:'Отделка',    icon:'Paintbrush',color:'#7B9E87',
    title:'Внутренняя отделка',
    description:'Полный цикл: штукатурка, стяжка, плитка, обои, покраска. По вашему дизайн-проекту или создадим с нуля. Только экологичные материалы премиум-класса.',
    photo: IMG.interior },
  { id:'plumbing',   label:'Сантехника', icon:'Droplets',  color:'#4A90D9',
    title:'Сантехнические работы',
    description:'Проектирование и монтаж водоснабжения и канализации. Тёплые полы, системы фильтрации. Оборудование Hansgrohe, Grohe, Geberit.',
    photo: IMG.interior },
  { id:'electrical', label:'Электрика',  icon:'Zap',       color:'#E0A020',
    title:'Электромонтажные работы',
    description:'Электросети, проводка, электрощиты. Умный дом, охранная сигнализация, видеонаблюдение — всё под ключ.',
    photo: IMG.interior },
  { id:'facade',     label:'Фасад',      icon:'Building2', color:'#5A7A5A',
    title:'Фасадные работы',
    description:'Утепление и отделка фасадов: штукатурка, облицовка камнем, клинкерная плитка, вентилируемые фасады. Безупречный внешний вид и надёжная теплоизоляция.',
    photo: IMG.house },
  // ── ДВОР ─────────────────────────────────────────────────────────────
  { id:'fence',      label:'Забор',      icon:'Shield',    color:'#8B6914',
    title:'Заборы и ограждения',
    description:'Кирпичные, металлические, деревянные заборы и комбинированные ограждения. Фундамент, опоры, секции — всё с гарантией.',
    photo: IMG.fence },
  { id:'gate',       label:'Ворота',     icon:'DoorOpen',  color:'#7A5C3A',
    title:'Ворота и въездные группы',
    description:'Распашные, откатные и автоматические ворота. Кирпичные столбы, калитки, въездные арки. Автоматика Came, Nice — управление со смартфона.',
    photo: IMG.fence },
  { id:'paving',     label:'Плитка',     icon:'Grid3x3',   color:'#9A8058',
    title:'Укладка тротуарной плитки',
    description:'Брусчатка, тротуарная плитка, натуральный камень. Подготовка основания, дренаж, бордюры. Срок службы — от 25 лет.',
    photo: IMG.paving },
  { id:'banya',      label:'Баня',       icon:'Flame',     color:'#C05A2E',
    title:'Строительство бань',
    description:'Бани из бруса, бревна, газобетона и каркаса. Парная, моечная, комната отдыха, веранда. Печи Harvia, Tulikivi, дымоходы, вентиляция — сдаём под ключ.',
    photo: IMG.banya },
  { id:'gazebo',     label:'Беседка',    icon:'TreePine',  color:'#5A8A4A',
    title:'Беседки',
    description:'Деревянные, металлические, из поликарбоната. Открытые и закрытые, с мангальной зоной. Антисептик, покраска, кровля. Готово за 5–10 дней.',
    photo: IMG.gazebo },
  { id:'terrace',    label:'Терраса',    icon:'Columns',   color:'#7A8B5A',
    title:'Террасы и пристройки',
    description:'Террасы из декинга, термодерева, ДПК. Веранды, навесы, зимние сады, пристройки. Собственный проект, монтаж с нуля под ключ.',
    photo: IMG.terrace },
  { id:'landscape',  label:'Ландшафт',   icon:'Flower2',   color:'#4A8A4A',
    title:'Ландшафтные работы',
    description:'Планировка участка, озеленение, дренаж, автополив, освещение. Газоны, деревья, кустарники. Стильный ухоженный участок с нуля.',
    photo: IMG.landscape },
];

const svc = (id: string) => ALL_SERVICES.find(s => s.id === id)!;

// ── Метка с фоном ──────────────────────────────────────────────────────────────
function Label({ x, y, text, color, active }: { x: number; y: number; text: string; color: string; active: boolean }) {
  const pad = 6;
  const w = text.length * 7.2 + pad * 2;
  return (
    <g>
      <rect x={x - w / 2} y={y - 13} width={w} height={20} rx="5"
        fill={active ? color : 'rgba(30,25,20,0.72)'} opacity={active ? 0.95 : 0.85} />
      <text x={x} y={y + 2} textAnchor="middle" fontSize="11" fill="white"
        fontFamily="Golos Text,sans-serif" fontWeight="600">{text}</text>
    </g>
  );
}

// ── Кликабельная зона ──────────────────────────────────────────────────────────
function Zone({ id, hovered, onClick, onHover, children, labelX, labelY, color }:
  { id: string; hovered: string | null; onClick: (id: string) => void; onHover: (id: string | null) => void;
    children: React.ReactNode; labelX: number; labelY: number; color: string }) {
  const isH = hovered === id;
  const s = svc(id);
  return (
    <g style={{ cursor: 'pointer' }}
      onMouseEnter={() => onHover(id)} onMouseLeave={() => onHover(null)}
      onClick={() => onClick(id)}>
      {isH && <rect x={labelX - 50} y={labelY - 60} width={100} height={70}
        fill={color} opacity={0.08} rx="8" />}
      {children}
      <Label x={labelX} y={labelY} text={s.label} color={color} active={isH} />
    </g>
  );
}

export default function InteractiveHouse() {
  const [active, setActive] = useState<ServiceItem | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((id: string) => {
    const item = svc(id);
    setActive(item);
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  }, []);

  const handleClose = () => {
    setActive(null);
    sceneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const h = (id: string) => hovered === id;

  return (
    <div className="w-full flex flex-col items-center gap-0">

      {/* ── Hint ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mb-6"
        style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,32%)' }}>
        <Icon name="MousePointerClick" size={15} />
        Нажмите на любой элемент дома или участка
      </motion.div>

      {/* ── Scene ── */}
      <div ref={sceneRef} className="relative w-full max-w-5xl mx-auto select-none">
        <svg viewBox="0 0 960 620" className="w-full h-auto rounded-2xl"
          style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.13))' }}>
          <defs>
            <linearGradient id="skyG2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#BBCFE0" /><stop offset="100%" stopColor="#EDE7DA" />
            </linearGradient>
            <linearGradient id="grassG2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86B05C" /><stop offset="100%" stopColor="#6A9248" />
            </linearGradient>
            <linearGradient id="wallG2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F2ECE0" /><stop offset="100%" stopColor="#DDD5C3" />
            </linearGradient>
            <linearGradient id="roofG2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D0433A" /><stop offset="100%" stopColor="#942B20" />
            </linearGradient>
            <linearGradient id="pathG2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D8CCAA" /><stop offset="100%" stopColor="#C0B090" />
            </linearGradient>
            <linearGradient id="banyaW" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4B898" /><stop offset="100%" stopColor="#C0A278" />
            </linearGradient>
          </defs>

          {/* SKY */}
          <rect width="960" height="620" fill="url(#skyG2)" rx="20" />

          {/* Moving clouds */}
          <motion.g animate={{ x: [0, 8, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
            <ellipse cx="140" cy="75" rx="55" ry="22" fill="white" opacity="0.72" />
            <ellipse cx="185" cy="62" rx="42" ry="20" fill="white" opacity="0.72" />
          </motion.g>
          <motion.g animate={{ x: [0, -6, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}>
            <ellipse cx="820" cy="90" rx="48" ry="20" fill="white" opacity="0.62" />
            <ellipse cx="862" cy="76" rx="36" ry="18" fill="white" opacity="0.62" />
          </motion.g>

          {/* GROUND */}
          <rect x="0" y="455" width="960" height="165" fill="url(#grassG2)" />
          <path d="M0 455 Q240 443 480 449 Q720 455 960 444 L960 620 L0 620Z" fill="#86B05C" />

          {/* ═══════════════════════════════════════════════════════════
              FENCE — периметр участка (фон, не кликабельный)
          ═══════════════════════════════════════════════════════════ */}
          {/* Fence top-left to bottom-left */}
          <rect x="60" y="200" width="8" height="278" fill="#C8A830" />
          {[210,238,266,294,322,350,378,406,434,462].map((fy,fi)=>(
            <rect key={fi} x="56" y={fy} width="16" height="30" rx="2" fill="#D4B438" />
          ))}
          {/* Fence top-right to bottom-right */}
          <rect x="892" y="200" width="8" height="278" fill="#C8A830" />
          {[210,238,266,294,322,350,378,406,434,462].map((fy,fi)=>(
            <rect key={fi} x="888" y={fy} width="16" height="30" rx="2" fill="#D4B438" />
          ))}
          {/* Fence top */}
          <rect x="64" y="200" width="828" height="8" fill="#C8A830" />
          {[80,108,136,164,192,220,248,276,304,332,360,388,416,444,472,500,528,556,584,612,640,668,696,724,752,780,808,836,864].map((fx,fi)=>(
            <rect key={fi} x={fx} y="195" width="16" height="30" rx="2" fill="#D4B438" />
          ))}
          {/* Fence bottom (left of gate) */}
          <rect x="64" y="460" width="310" height="8" fill="#C8A830" />
          {[70,98,126,154,182,210,238,266,294,322,350].map((fx,fi)=>(
            <rect key={fi} x={fx} y="455" width="16" height="30" rx="2" fill="#D4B438" />
          ))}
          {/* Fence bottom (right of gate) */}
          <rect x="580" y="460" width="316" height="8" fill="#C8A830" />
          {[580,608,636,664,692,720,748,776,804,832,860].map((fx,fi)=>(
            <rect key={fi} x={fx} y="455" width="16" height="30" rx="2" fill="#D4B438" />
          ))}

          {/* ═══════════════════════════════════════════════════════════
              CLICKABLE: ЗАБОР (левая секция)
          ═══════════════════════════════════════════════════════════ */}
          <Zone id="fence" hovered={hovered} onClick={handleClick} onHover={setHovered}
            labelX={90} labelY={350} color="#8B6914">
            <rect x="56" y="210" width="24" height="200" fill="transparent" />
          </Zone>

          {/* ═══════════════════════════════════════════════════════════
              LANDSCAPE — газон и деревья (фоновые деревья)
          ═══════════════════════════════════════════════════════════ */}
          {/* BG trees left */}
          <ellipse cx="115" cy="300" rx="34" ry="52" fill="#5A9248" opacity="0.82" />
          <rect x="110" y="348" width="10" height="25" fill="#8B6844" />
          <ellipse cx="155" cy="280" rx="26" ry="42" fill="#4E8840" opacity="0.78" />
          <rect x="150" y="320" width="10" height="22" fill="#8B6844" />
          {/* BG trees right */}
          <ellipse cx="845" cy="300" rx="34" ry="52" fill="#5A9248" opacity="0.82" />
          <rect x="840" y="348" width="10" height="25" fill="#8B6844" />
          <ellipse cx="805" cy="278" rx="26" ry="42" fill="#4E8840" opacity="0.78" />
          <rect x="800" y="318" width="10" height="22" fill="#8B6844" />

          {/* CLICKABLE: ЛАНДШАФТ */}
          <Zone id="landscape" hovered={hovered} onClick={handleClick} onHover={setHovered}
            labelX={135} labelY={390} color="#4A8A4A">
            {/* Flower beds */}
            <ellipse cx="115" cy="430" rx="38" ry="18" fill={h('landscape') ? '#7ABB6A' : '#6AAB5A'} opacity="0.9" />
            {[100,114,128,142].map((fx,fi)=>(
              <circle key={fi} cx={fx} cy={428} r={5}
                fill={['#E8D060','#E87060','#D060A0','#60A0D8'][fi]} opacity="0.9" />
            ))}
          </Zone>

          {/* ═══════════════════════════════════════════════════════════
              GAZEBO — слева, на переднем плане
          ═══════════════════════════════════════════════════════════ */}
          <Zone id="gazebo" hovered={hovered} onClick={handleClick} onHover={setHovered}
            labelX={152} labelY={510} color="#5A8A4A">
            {h('gazebo') && <rect x="82" y="395" width="144" height="108" fill="#5A8A4A" opacity="0.12" rx="8"/>}
            {/* Floor platform */}
            <rect x="86" y="487" width="140" height="12" rx="3"
              fill={h('gazebo') ? '#D0C498' : '#C0B488'} />
            {/* 4 columns */}
            {[90,118,188,216].map((cx,ci)=>(
              <rect key={ci} x={cx} y="408" width="9" height="80" rx="2"
                fill={h('gazebo') ? '#C0A870' : '#A89058'} />
            ))}
            {/* Roof */}
            <polygon points="78,412 154,368 230,412"
              fill={h('gazebo') ? '#78BB68' : '#5A9A4A'} />
            <polygon points="82,415 154,372 226,415 226,420 82,420"
              fill={h('gazebo') ? '#6AAA5A' : '#4A8A3A'} opacity="0.7" />
            {/* Bench */}
            <rect x="96" y="464" width="122" height="14" rx="4"
              fill={h('gazebo') ? '#CCA870' : '#BC9860'} />
            <rect x="100" y="478" width="10" height="10" fill="#9A7848" />
            <rect x="202" y="478" width="10" height="10" fill="#9A7848" />
          </Zone>

          {/* ═══════════════════════════════════════════════════════════
              BANYA — справа, отдельно
          ═══════════════════════════════════════════════════════════ */}
          <Zone id="banya" hovered={hovered} onClick={handleClick} onHover={setHovered}
            labelX={808} labelY={510} color="#C05A2E">
            {h('banya') && <rect x="730" y="390" width="156" height="110" fill="#C05A2E" opacity="0.12" rx="8"/>}
            {/* Body */}
            <rect x="734" y="418" width="150" height="82"
              fill={h('banya') ? '#DCC0A0' : '#CCAC90'} rx="4" />
            {/* Roof */}
            <polygon points="726,422 809,372 892,422"
              fill={h('banya') ? '#A06030' : '#8B5230'} />
            <polygon points="730,425 809,376 888,425 888,432 730,432"
              fill={h('banya') ? '#B87040' : '#9A6038'} opacity="0.65" />
            {/* Chimney */}
            <rect x="850" y="378" width="16" height="42" fill="#B89868" />
            <rect x="846" y="375" width="24" height="8" fill="#A88858" />
            {/* Smoke */}
            <motion.g animate={{ y: [0, -8, 0], opacity: [0.45, 0.18, 0.45] }}
              transition={{ duration: 3.5, repeat: Infinity }}>
              <ellipse cx="858" cy="360" rx="8" ry="12" fill="#D8D0C0" opacity="0.4" />
              <ellipse cx="854" cy="340" rx="10" ry="14" fill="#D8D0C0" opacity="0.22" />
            </motion.g>
            {/* Window */}
            <rect x="742" y="430" width="34" height="28" rx="2"
              fill={h('banya') ? '#FFF8E0' : '#C8D8E8'}
              stroke="#9A7050" strokeWidth="1.5" />
            <line x1="759" y1="430" x2="759" y2="458" stroke="#9A7050" strokeWidth="1" />
            <line x1="742" y1="444" x2="776" y2="444" stroke="#9A7050" strokeWidth="1" />
            {/* Door */}
            <rect x="818" y="444" width="38" height="56" fill="#7A4830" rx="3" />
            <circle cx="826" cy="472" r="4" fill="#C8A060" />
          </Zone>

          {/* ═══════════════════════════════════════════════════════════
              PAVING PATH — дорожка от ворот к дому
          ═══════════════════════════════════════════════════════════ */}
          <Zone id="paving" hovered={hovered} onClick={handleClick} onHover={setHovered}
            labelX={480} labelY={590} color="#9A8058">
            {/* Main path */}
            <path d="M410 620 L410 490 L550 490 L550 620Z"
              fill={h('paving') ? '#DDD0A0' : '#C8BC88'} />
            {/* Tile lines horizontal */}
            {[500,514,528,542,556,570,584,598,612].map((ty,ti)=>(
              <line key={ti} x1="410" y1={ty} x2="550" y2={ty}
                stroke={h('paving') ? '#B8A868' : '#A89858'} strokeWidth="1.5" />
            ))}
            {/* Tile lines vertical */}
            {[422,434,448,462,476,492,508,524,538].map((tx,ti)=>(
              <line key={ti} x1={tx} y1="490" x2={tx} y2="620"
                stroke={h('paving') ? '#B8A868' : '#A89858'} strokeWidth="1.5" />
            ))}
          </Zone>

          {/* ═══════════════════════════════════════════════════════════
              ВОРОТА — внизу центр
          ═══════════════════════════════════════════════════════════ */}
          <Zone id="gate" hovered={hovered} onClick={handleClick} onHover={setHovered}
            labelX={480} labelY={480} color="#7A5C3A">
            {h('gate') && <rect x="374" y="438" width="212" height="60" fill="#7A5C3A" opacity="0.12" rx="6"/>}
            {/* Left pillar */}
            <rect x="378" y="418" width="34" height="72"
              fill={h('gate') ? '#CEB080' : '#BEA070'} rx="3" />
            <rect x="374" y="414" width="42" height="10" fill="#A88858" rx="2" />
            {/* Right pillar */}
            <rect x="548" y="418" width="34" height="72"
              fill={h('gate') ? '#CEB080' : '#BEA070'} rx="3" />
            <rect x="544" y="414" width="42" height="10" fill="#A88858" rx="2" />
            {/* Left gate panel */}
            <rect x="412" y="440" width="68" height="50" rx="3"
              fill={h('gate') ? '#AA8040' : '#987030'} />
            {[418,428,438,448,458,468].map((bx,bi)=>(
              <rect key={bi} x={bx} y="444" width="7" height="42" rx="2"
                fill={h('gate') ? '#C89848' : '#B08838'} />
            ))}
            {/* Right gate panel */}
            <rect x="480" y="440" width="68" height="50" rx="3"
              fill={h('gate') ? '#AA8040' : '#987030'} />
            {[486,496,506,516,526,536].map((bx,bi)=>(
              <rect key={bi} x={bx} y="444" width="7" height="42" rx="2"
                fill={h('gate') ? '#C89848' : '#B08838'} />
            ))}
          </Zone>

          {/* ═══════════════════════════════════════════════════════════
              ТЕРРАСА — примыкает к дому справа
          ═══════════════════════════════════════════════════════════ */}
          <Zone id="terrace" hovered={hovered} onClick={handleClick} onHover={setHovered}
            labelX={655} labelY={452} color="#7A8B5A">
            {h('terrace') && <rect x="597" y="305" width="98" height="200" fill="#7A8B5A" opacity="0.12" rx="6"/>}
            {/* Platform */}
            <rect x="601" y="312" width="90" height="188"
              fill={h('terrace') ? '#D0CC98' : '#BEB888'} rx="4" />
            {/* Decking boards */}
            {[316,328,340,352,364,376,388,400,412,424,436,448,460,472,484].map((ty,ti)=>(
              <rect key={ti} x="601" y={ty} width="90" height="10"
                fill={h('terrace') ? '#D8D0A0' : '#C8C090'} rx="1"
                stroke={h('terrace') ? '#B0A860' : '#A09850'} strokeWidth="0.8" />
            ))}
            {/* Railing */}
            <rect x="686" y="312" width="6" height="188"
              fill={h('terrace') ? '#A09868' : '#908858'} />
            {[316,336,356,376,396,416,436,456,476,494].map((ry2,ri)=>(
              <rect key={ri} x="686" y={ry2} width="6" height="12" fill="#807848" />
            ))}
            {/* Railing top cap */}
            <rect x="601" y="310" width="90" height="6" rx="2"
              fill={h('terrace') ? '#BEB878' : '#AEA868'} />
          </Zone>

          {/* ═══════════════════════════════════════════════════════════
              ГЛАВНЫЙ ДОМ
          ═══════════════════════════════════════════════════════════ */}
          {/* Foundation */}
          <rect x="220" y="490" width="378" height="20" fill="#C0B0A0" rx="3" />
          {/* Ground floor */}
          <rect x="224" y="308" width="370" height="188" fill="url(#wallG2)" />
          {/* Second floor */}
          <rect x="254" y="214" width="310" height="102" fill="#EDE8DC" />
          {/* Roof */}
          <polygon points="202,315 409,145 616,315" fill="url(#roofG2)" />
          <line x1="409" y1="145" x2="202" y2="315" stroke="#E86050" strokeWidth="2.5" opacity="0.5" />
          <line x1="409" y1="145" x2="616" y2="315" stroke="#E86050" strokeWidth="2.5" opacity="0.5" />
          <polygon points="198,318 409,149 620,318 620,325 198,325"
            fill="#9A3025" opacity="0.45" />
          {/* Chimney */}
          <rect x="510" y="162" width="30" height="70" fill="#C8B898" />
          <rect x="505" y="159" width="40" height="10" fill="#B8A888" />
          <motion.g animate={{ y:[0,-9,0], opacity:[0.4,0.15,0.4] }}
            transition={{ duration:4.2, repeat:Infinity }}>
            <ellipse cx="525" cy="143" rx="9" ry="14" fill="#D0C8BC" opacity="0.4" />
            <ellipse cx="521" cy="122" rx="11" ry="16" fill="#D0C8BC" opacity="0.22" />
          </motion.g>
          {/* Wall separators */}
          <line x1="224" y1="310" x2="594" y2="310" stroke="#C0B098" strokeWidth="2" opacity="0.5" />
          <line x1="254" y1="216" x2="564" y2="216" stroke="#C0B098" strokeWidth="1.5" opacity="0.4" />
          {/* Door */}
          <rect x="362" y="386" width="94" height="114" fill="#8B7355" rx="5" />
          <rect x="365" y="389" width="88" height="108" fill="#7A6345" rx="4" />
          <rect x="368" y="392" width="40" height="100" fill="#6B5535" rx="2" />
          <rect x="412" y="392" width="38" height="100" fill="#6B5535" rx="2" />
          <circle cx="408" cy="448" r="5" fill="#C8A86E" />
          <circle cx="413" cy="448" r="5" fill="#C8A86E" />
          <path d="M362 386 Q409 364 456 386" fill="#9A8468" />
          {/* Steps */}
          <rect x="348" y="498" width="122" height="10" fill="#C8B898" rx="3" />
          <rect x="354" y="490" width="110" height="10" fill="#D4C8A8" rx="3" />

          {/* ── КЛИКАБЕЛЬНЫЕ ОКНА ДОМА ── */}
          {[
            // id, x, y, w, h
            ['foundation', 238,  358, 64, 52],
            ['walls',      318,  358, 64, 52],
            ['roof',       268,  228, 64, 52],
            ['interior',   476,  358, 64, 52],
            ['plumbing',   556,  358, 64, 52],
            ['electrical', 336,  240, 64, 52],
            ['facade',     418,  240, 64, 52],
          ].map(([id, wx, wy, ww, wh]) => {
            const s2 = svc(id as string);
            const isH = hovered === id;
            const isA = active?.id === id;
            const lit = isH || isA;
            return (
              <g key={id as string} style={{ cursor:'pointer' }}
                onMouseEnter={()=>setHovered(id as string)}
                onMouseLeave={()=>setHovered(null)}
                onClick={()=>handleClick(id as string)}>
                {lit && <rect x={Number(wx)-7} y={Number(wy)-7} width={Number(ww)+14} height={Number(wh)+14}
                  fill={s2.color} opacity="0.22" rx="6" />}
                <rect x={wx as number} y={wy as number} width={ww as number} height={wh as number}
                  fill={lit ? '#FFF8E0' : '#B8D4E8'}
                  stroke={lit ? s2.color : '#8AAABF'}
                  strokeWidth={lit ? 2.5 : 1.5} rx="3" />
                <line x1={Number(wx)+Number(ww)/2} y1={wy as number}
                      x2={Number(wx)+Number(ww)/2} y2={Number(wy)+Number(wh)}
                  stroke={lit ? s2.color : '#8AAABF'} strokeWidth="1" opacity="0.6"/>
                <line x1={wx as number} y1={Number(wy)+Number(wh)/2}
                      x2={Number(wx)+Number(ww)} y2={Number(wy)+Number(wh)/2}
                  stroke={lit ? s2.color : '#8AAABF'} strokeWidth="1" opacity="0.6"/>
                <Label x={Number(wx)+Number(ww)/2} y={Number(wy)+Number(wh)+17}
                  text={s2.label} color={s2.color} active={lit} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── SERVICE PANEL ─────────────────────────────────────────────── */}
      <div ref={panelRef} className="w-full max-w-2xl mx-auto mt-6 min-h-[8px]">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ background:'#FDFAF5', border:'1px solid hsl(38,20%,85%)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5"
                style={{ background:`${active.color}15`, borderBottom:'1px solid hsl(38,20%,88%)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: active.color }}>
                    <Icon name={active.icon} size={20} className="text-white" fallback="Star" />
                  </div>
                  <h3 className="text-xl font-semibold"
                    style={{ color: active.color, fontFamily:'Golos Text,sans-serif' }}>
                    {active.title}
                  </h3>
                </div>
                <button onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors flex-shrink-0">
                  <Icon name="X" size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Body */}
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.12 }}
                className="p-6 space-y-5">
                <p className="text-sm leading-relaxed" style={{ color:'#5A5040', fontFamily:'Golos Text,sans-serif' }}>
                  {active.description}
                </p>
                <div className="rounded-2xl overflow-hidden h-56">
                  <img src={active.photo} alt={active.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                    onClick={()=>{ document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }); setActive(null); }}
                    className="flex-1 py-3.5 rounded-xl font-semibold text-white text-sm"
                    style={{ background:`linear-gradient(135deg, ${active.color}, ${active.color}BB)` }}>
                    Получить расчёт стоимости
                  </motion.button>
                  <button onClick={handleClose}
                    className="px-5 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all"
                    style={{ background:'hsl(38,25%,92%)', color:'hsl(30,15%,35%)', border:'1px solid hsl(38,20%,84%)' }}>
                    <Icon name="ArrowUp" size={14} />
                    К дому
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
