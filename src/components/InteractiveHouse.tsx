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
  photo: string;
};

type Scene = 'house' | 'yard';

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

const HOUSE_SERVICES: ServiceItem[] = [
  { id:'roof',       label:'Кровля',     icon:'Home',       color:'#B83228',
    title:'Кровельные работы',
    description:'Двускатные, вальмовые, мансардные крыши. Металлочерепица, мягкая кровля, натуральная черепица. Полная герметичность и долговечность.',
    photo: IMG.house },
  { id:'facade',     label:'Фасад',      icon:'Building2',  color:'#4A6A4A',
    title:'Фасадные работы',
    description:'Утепление и отделка фасадов: штукатурка, облицовка камнем, клинкерная плитка, вентилируемые фасады.',
    photo: IMG.house },
  { id:'walls',      label:'Стены',      icon:'Square',     color:'#5A6E4A',
    title:'Возведение стен',
    description:'Газобетон, кирпич или дерево — любые материалы с гарантией. Утепление, гидроизоляция, идеальная геометрия.',
    photo: IMG.build },
  { id:'interior',   label:'Отделка',    icon:'Paintbrush', color:'#6A8E77',
    title:'Внутренняя отделка',
    description:'Полный цикл: штукатурка, стяжка, плитка, обои, покраска. По вашему дизайн-проекту или создадим с нуля.',
    photo: IMG.interior },
  { id:'plumbing',   label:'Сантехника', icon:'Droplets',   color:'#3A7ABF',
    title:'Сантехнические работы',
    description:'Проектирование и монтаж водоснабжения и канализации. Тёплые полы, системы фильтрации.',
    photo: IMG.interior },
  { id:'electrical', label:'Электрика',  icon:'Zap',        color:'#C08010',
    title:'Электромонтажные работы',
    description:'Электросети, проводка, электрощиты. Умный дом, охранная сигнализация, видеонаблюдение — всё под ключ.',
    photo: IMG.interior },
  { id:'foundation', label:'Фундамент',  icon:'Layers',     color:'#7A6545',
    title:'Фундаментные работы',
    description:'Геологическое исследование грунта, ленточный, свайный или плитный фундамент. Современное армирование.',
    photo: IMG.build },
];

// Двор: у каждой услуги — координаты кнопки в SVG (0-100%)
const YARD_SERVICES: (ServiceItem & { btnX: number; btnY: number })[] = [
  { id:'banya',     label:'Баня',     icon:'Flame',     color:'#AA4A1E',
    title:'Строительство бань',
    description:'Бани из бруса, бревна, газобетона и каркаса. Парная, моечная, комната отдыха. Печи Harvia, Tulikivi.',
    photo: IMG.banya,    btnX: 76, btnY: 44 },
  { id:'gazebo',    label:'Беседка',  icon:'TreePine',  color:'#4A7A3A',
    title:'Беседки',
    description:'Деревянные, металлические, из поликарбоната. Открытые и закрытые, с мангальной зоной.',
    photo: IMG.gazebo,   btnX: 19, btnY: 67 },
  { id:'terrace',   label:'Терраса',  icon:'Columns',   color:'#6A7B4A',
    title:'Террасы и пристройки',
    description:'Террасы из декинга, термодерева, ДПК. Веранды, навесы, зимние сады, пристройки.',
    photo: IMG.terrace,  btnX: 70, btnY: 62 },
  { id:'fence',     label:'Забор',    icon:'Shield',    color:'#7A5A10',
    title:'Заборы и ограждения',
    description:'Кирпичные, металлические, деревянные заборы. Фундамент, опоры, секции — всё с гарантией.',
    photo: IMG.fence,    btnX: 8,  btnY: 46 },
  { id:'gate',      label:'Ворота',   icon:'DoorOpen',  color:'#6A4C2A',
    title:'Ворота и въездные группы',
    description:'Распашные, откатные и автоматические ворота. Кирпичные столбы, калитки. Автоматика Came, Nice.',
    photo: IMG.fence,    btnX: 50, btnY: 87 },
  { id:'paving',    label:'Плитка',   icon:'Grid3x3',   color:'#8A7048',
    title:'Укладка тротуарной плитки',
    description:'Брусчатка, тротуарная плитка, натуральный камень. Подготовка основания, дренаж, бордюры.',
    photo: IMG.paving,   btnX: 39, btnY: 78 },
  { id:'landscape', label:'Ландшафт', icon:'Flower2',   color:'#3A7A3A',
    title:'Ландшафтные работы',
    description:'Планировка участка, озеленение, дренаж, автополив, освещение. Газоны, деревья, кустарники.',
    photo: IMG.landscape,btnX: 28, btnY: 88 },
];

// ─── SVG дома (единый, 400×520) ─────────────────────────────────────────────
// Блок 1 — крыша:         y 0   .. 160
// Блок 2 — стены/отделка: y 160 .. 370
// Блок 3 — фундамент+газон:y 370 .. 520
function HouseSVGFull() {
  return (
    <svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6E8F4"/><stop offset="100%" stopColor="#EEF4F8"/>
        </linearGradient>
        <linearGradient id="hRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C0392B"/><stop offset="100%" stopColor="#8C2018"/>
        </linearGradient>
        <linearGradient id="hWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5EFE4"/><stop offset="100%" stopColor="#E8DFCF"/>
        </linearGradient>
        <linearGradient id="hFound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B0A080"/><stop offset="100%" stopColor="#8A7A5E"/>
        </linearGradient>
        <linearGradient id="hGrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#74B84A"/><stop offset="100%" stopColor="#58962E"/>
        </linearGradient>
      </defs>

      {/* ══ БЛОК 1: КРЫША (y 0–160) ══ */}
      {/* Небо */}
      <rect x="0" y="0" width="400" height="160" fill="url(#hSky)"/>
      {/* Труба */}
      <rect x="268" y="60" width="20" height="60" fill="#C8B890" rx="2"/>
      <rect x="264" y="56" width="28" height="8" fill="#B0A070" rx="2"/>
      {/* Дымок */}
      <ellipse cx="278" cy="46" rx="6" ry="9" fill="#D8D4CC" opacity="0.5"/>
      <ellipse cx="274" cy="32" rx="8" ry="11" fill="#D8D4CC" opacity="0.3"/>
      {/* Крыша — двускатная, простая */}
      <polygon points="40,160 200,36 360,160" fill="url(#hRoof)"/>
      {/* Черепичные линии */}
      {[70,88,106,124,142,158].map((y, i) => {
        const w = (y - 36) * 1.68;
        return <line key={i} x1={200 - w/2} y1={y} x2={200 + w/2} y2={y}
          stroke="#7A1C14" strokeWidth="1.5" opacity="0.22"/>;
      })}
      {/* Конёк */}
      <line x1="200" y1="36" x2="200" y2="160" stroke="#7A1C14" strokeWidth="1.5" opacity="0.18"/>
      {/* Карниз */}
      <rect x="34" y="156" width="332" height="8" fill="#8A2418" rx="0"/>

      {/* ══ БЛОК 2: СТЕНЫ И ОТДЕЛКА (y 160–370) ══ */}
      {/* Стена — бежевый */}
      <rect x="40" y="160" width="320" height="210" fill="url(#hWall)"/>
      {/* Горизонтальная линия этажей */}
      <line x1="40" y1="262" x2="360" y2="262" stroke="#D0C8B8" strokeWidth="1.5" opacity="0.6"/>
      {/* Окна 1-го этажа */}
      {/* Левое */}
      <rect x="60" y="276" width="76" height="72" fill="white" stroke="#C8C0AA" strokeWidth="2" rx="4"/>
      <line x1="98" y1="276" x2="98" y2="348" stroke="#C8C0AA" strokeWidth="1.5"/>
      <line x1="60" y1="312" x2="136" y2="312" stroke="#C8C0AA" strokeWidth="1.5"/>
      <rect x="60" y="276" width="76" height="8" fill="#E0D8C0" rx="2"/>
      <rect x="56" y="346" width="84" height="5" fill="#D8D0B8" rx="2"/>
      {/* Правое */}
      <rect x="264" y="276" width="76" height="72" fill="white" stroke="#C8C0AA" strokeWidth="2" rx="4"/>
      <line x1="302" y1="276" x2="302" y2="348" stroke="#C8C0AA" strokeWidth="1.5"/>
      <line x1="264" y1="312" x2="340" y2="312" stroke="#C8C0AA" strokeWidth="1.5"/>
      <rect x="264" y="276" width="76" height="8" fill="#E0D8C0" rx="2"/>
      <rect x="260" y="346" width="84" height="5" fill="#D8D0B8" rx="2"/>
      {/* Дверь по центру */}
      <rect x="162" y="272" width="76" height="98" fill="#7A5E38" rx="4" stroke="#6A5030" strokeWidth="1.5"/>
      <rect x="165" y="275" width="32" height="92" fill="#6A5030" rx="2"/>
      <rect x="201" y="275" width="32" height="92" fill="#6A5030" rx="2"/>
      <circle cx="196" cy="324" r="5" fill="#D4A83A"/>
      <circle cx="204" cy="324" r="5" fill="#D4A83A"/>
      {/* Арка над дверью */}
      <path d="M158,276 Q200,244 242,276" fill="#EDE5D0" stroke="#D0C8B0" strokeWidth="2"/>
      {/* Окна 2-го этажа */}
      {/* Левое */}
      <rect x="60" y="178" width="76" height="66" fill="white" stroke="#C8C0AA" strokeWidth="2" rx="4"/>
      <line x1="98" y1="178" x2="98" y2="244" stroke="#C8C0AA" strokeWidth="1.5"/>
      <line x1="60" y1="211" x2="136" y2="211" stroke="#C8C0AA" strokeWidth="1.5"/>
      <rect x="60" y="178" width="76" height="8" fill="#E0D8C0" rx="2"/>
      <rect x="56" y="242" width="84" height="5" fill="#D8D0B8" rx="2"/>
      {/* Правое */}
      <rect x="264" y="178" width="76" height="66" fill="white" stroke="#C8C0AA" strokeWidth="2" rx="4"/>
      <line x1="302" y1="178" x2="302" y2="244" stroke="#C8C0AA" strokeWidth="1.5"/>
      <line x1="264" y1="211" x2="340" y2="211" stroke="#C8C0AA" strokeWidth="1.5"/>
      <rect x="264" y="178" width="76" height="8" fill="#E0D8C0" rx="2"/>
      <rect x="260" y="242" width="84" height="5" fill="#D8D0B8" rx="2"/>
      {/* Центральное верхнее (над дверью) */}
      <rect x="170" y="186" width="60" height="52" fill="white" stroke="#C8C0AA" strokeWidth="2" rx="4"/>
      <line x1="200" y1="186" x2="200" y2="238" stroke="#C8C0AA" strokeWidth="1.5"/>
      <line x1="170" y1="212" x2="230" y2="212" stroke="#C8C0AA" strokeWidth="1.5"/>
      <rect x="170" y="186" width="60" height="7" fill="#E0D8C0" rx="2"/>

      {/* ══ БЛОК 3: ФУНДАМЕНТ + ГАЗОН (y 370–520) ══ */}
      {/* Фундамент */}
      <rect x="40" y="368" width="320" height="36" fill="url(#hFound)"/>
      {/* Швы фундамента */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={42 + i*47} y="372" width="40" height="14" rx="2"
          fill="none" stroke="#7A6A50" strokeWidth="1" opacity="0.4"/>
      ))}
      {/* Ступени крыльца */}
      <rect x="152" y="368" width="96" height="10" fill="#C4B080" rx="2"/>
      <rect x="144" y="378" width="112" height="9" fill="#B8A070" rx="2"/>
      <rect x="136" y="387" width="128" height="8" fill="#AC9460" rx="2"/>
      {/* Газон */}
      <rect x="0" y="403" width="400" height="117" fill="url(#hGrass)"/>
      {/* Линия газона — плавный переход */}
      <path d="M0,404 Q100,396 200,402 Q300,408 400,400 L400,520 L0,520Z" fill="#74B84A" opacity="0.7"/>
      {/* Дорожка */}
      <path d="M164,404 L160,520 L240,520 L236,404Z" fill="#D4C89A" opacity="0.8"/>
      {[416,432,448,464,480,496,512].map((y,i)=>(
        <line key={i} x1={165} y1={y} x2={235} y2={y}
          stroke="#B8AE82" strokeWidth="1.2" opacity="0.5"/>
      ))}
      {/* Кустики */}
      <ellipse cx="80" cy="406" rx="26" ry="16" fill="#4E8A34"/>
      <ellipse cx="96" cy="400" rx="20" ry="14" fill="#5A9A3C"/>
      <ellipse cx="64" cy="404" rx="18" ry="13" fill="#62A040"/>
      <ellipse cx="320" cy="406" rx="26" ry="16" fill="#4E8A34"/>
      <ellipse cx="336" cy="400" rx="20" ry="14" fill="#5A9A3C"/>
      <ellipse cx="304" cy="404" rx="18" ry="13" fill="#62A040"/>
    </svg>
  );
}

// ─── SVG двора — как фотография, объекты стоят на земле ──────────────────────
function YardSVGFull() {
  return (
    <svg viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C8E8"/><stop offset="100%" stopColor="#D8ECF8"/>
        </linearGradient>
        <linearGradient id="yGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CBB52"/><stop offset="100%" stopColor="#5A9838"/>
        </linearGradient>
        <linearGradient id="yDirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8B888"/><stop offset="100%" stopColor="#A8986A"/>
        </linearGradient>
        <linearGradient id="yBanyaWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4B898"/><stop offset="100%" stopColor="#C0A07C"/>
        </linearGradient>
        <linearGradient id="yBanyaRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A4828"/><stop offset="100%" stopColor="#5A3018"/>
        </linearGradient>
        <linearGradient id="yGazeboRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A8830"/><stop offset="100%" stopColor="#3A6818"/>
        </linearGradient>
        <linearGradient id="yFencePillar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8C880"/><stop offset="100%" stopColor="#B8A858"/>
        </linearGradient>
        <linearGradient id="yPath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0C4A4"/><stop offset="100%" stopColor="#B8A882"/>
        </linearGradient>
        <filter id="ySh1"><feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#00000030"/></filter>
        <filter id="ySh2"><feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#00000025"/></filter>
      </defs>

      {/* ── SKY ── */}
      <rect width="600" height="460" fill="url(#ySky)"/>
      <ellipse cx="90" cy="55" rx="55" ry="22" fill="white" opacity="0.72"/>
      <ellipse cx="130" cy="42" rx="38" ry="18" fill="white" opacity="0.72"/>
      <ellipse cx="430" cy="48" rx="48" ry="20" fill="white" opacity="0.62"/>
      <ellipse cx="472" cy="35" rx="30" ry="15" fill="white" opacity="0.62"/>
      {/* Far background trees (horizon) */}
      <ellipse cx="25" cy="185" rx="28" ry="44" fill="#3A7028" opacity="0.7"/>
      <ellipse cx="12" cy="202" rx="20" ry="32" fill="#2E6020" opacity="0.7"/>
      <ellipse cx="560" cy="180" rx="30" ry="46" fill="#3A7028" opacity="0.7"/>
      <ellipse cx="578" cy="198" rx="22" ry="34" fill="#2E6020" opacity="0.7"/>
      <ellipse cx="300" cy="155" rx="24" ry="38" fill="#3E7430" opacity="0.5"/>
      <ellipse cx="280" cy="165" rx="18" ry="28" fill="#3E7430" opacity="0.5"/>

      {/* ── GROUND LINE ~y=240 ── */}
      <rect x="0" y="238" width="600" height="222" fill="url(#yGround)"/>
      {/* Ground shading */}
      <rect x="0" y="238" width="600" height="18" fill="#8ACC60" opacity="0.5"/>
      {/* Lawn texture */}
      {[...Array(20)].map((_,i)=>(
        <ellipse key={i} cx={18+i*30} cy={258+(i%4)*14} rx="10" ry="4"
          fill="#70AE48" opacity="0.28"/>
      ))}

      {/* ── FENCE ── (back, y≈228, on horizon) */}
      {/* Horizontal rails */}
      <rect x="0" y="222" width="600" height="7" fill="#C8A830" rx="2"/>
      <rect x="0" y="232" width="600" height="5" fill="#B89820" rx="2" opacity="0.7"/>
      {/* Vertical pickets */}
      {[...Array(40)].map((_,i)=>(
        <rect key={i} x={i*15} y="208" width="10" height="30" rx="2" fill="#D4B438"/>
      ))}
      {/* Left fence section (side) */}
      <rect x="0" y="222" width="7" height="180" fill="#C8A830" rx="2"/>
      {[235,258,281,304,327,350,373,396].map((y,i)=>(
        <rect key={i} x="-2" y={y} width="16" height="18" rx="2" fill="#D4B438"/>
      ))}
      {/* Right fence section (side) */}
      <rect x="593" y="222" width="7" height="180" fill="#C8A830" rx="2"/>
      {[235,258,281,304,327,350,373,396].map((y,i)=>(
        <rect key={i} x="586" y={y} width="16" height="18" rx="2" fill="#D4B438"/>
      ))}

      {/* ── BANYA (back right) ── */}
      {/* Shadow on ground */}
      <ellipse cx="465" cy="242" rx="58" ry="10" fill="#00000018"/>
      {/* Body */}
      <rect x="408" y="148" width="118" height="94" fill="url(#yBanyaWall)" rx="4" filter="url(#ySh1)"/>
      {/* Log texture */}
      {[152,164,176,188,200,210,220,230].map((y,i)=>(
        <line key={i} x1="408" y1={y} x2="526" y2={y}
          stroke="#B09070" strokeWidth="1.2" opacity="0.4"/>
      ))}
      {/* Roof */}
      <polygon points="398,152 467,108 536,152" fill="url(#yBanyaRoof)" filter="url(#ySh1)"/>
      <polygon points="402,155 467,112 532,155 532,160 402,160" fill="#4A2010" opacity="0.5"/>
      {/* Chimney */}
      <rect x="500" y="112" width="18" height="42" fill="#C8B070" rx="2"/>
      <rect x="496" y="109" width="26" height="7" fill="#A89050" rx="2"/>
      {/* Smoke */}
      <ellipse cx="509" cy="96" rx="8" ry="12" fill="#E8E4E0" opacity="0.5"/>
      <ellipse cx="505" cy="78" rx="10" ry="14" fill="#E8E4E0" opacity="0.3"/>
      <ellipse cx="512" cy="62" rx="12" ry="16" fill="#E8E4E0" opacity="0.18"/>
      {/* Window */}
      <rect x="418" y="164" width="36" height="28" fill="#A8D0F0" stroke="#8A6040" strokeWidth="2" rx="3"/>
      <line x1="436" y1="164" x2="436" y2="192" stroke="#8A6040" strokeWidth="1.5"/>
      <line x1="418" y1="178" x2="454" y2="178" stroke="#8A6040" strokeWidth="1.5"/>
      <rect x="418" y="164" width="36" height="6" fill="#C8A870" rx="2"/>
      {/* Door */}
      <rect x="472" y="178" width="36" height="64" fill="#6A3820" rx="3"/>
      <rect x="474" y="180" width="32" height="60" fill="#5A3018" rx="2"/>
      <circle cx="480" cy="212" r="4" fill="#C8A040"/>
      {/* Ground strip under banya */}
      <rect x="400" y="238" width="134" height="8" fill="#8A9850" opacity="0.6" rx="2"/>

      {/* ── GAZEBO (left) ── */}
      <ellipse cx="140" cy="244" rx="72" ry="12" fill="#00000015"/>
      {/* Platform/floor */}
      <rect x="72" y="228" width="140" height="16" fill="#C8B870" rx="3"/>
      {/* Decking boards */}
      {[76,90,104,118,132,146,160,174,188,200].map((x,i)=>(
        <rect key={i} x={x} y="228" width="12" height="16" rx="1"
          fill={i%2===0 ? '#D8C880' : '#C4B468'}/>
      ))}
      {/* 4 columns */}
      {[78,121,156,199].map((x,i)=>(
        <rect key={i} x={x} y="155" width="10" height="73" rx="3" fill="#C8B050" filter="url(#ySh2)"/>
      ))}
      {/* Roof */}
      <polygon points="60,168 140,118 220,168" fill="url(#yGazeboRoof)" filter="url(#ySh1)"/>
      <polygon points="65,172 140,123 215,172 215,178 65,178" fill="#2A5810" opacity="0.6"/>
      {/* Ridge finial */}
      <polygon points="136,118 140,108 144,118" fill="#88CC40"/>
      {/* Bench left */}
      <rect x="78" y="194" width="20" height="8" rx="2" fill="#C8A858"/>
      <rect x="80" y="202" width="4" height="26" fill="#A8884A"/>
      <rect x="92" y="202" width="4" height="26" fill="#A8884A"/>
      {/* Bench right */}
      <rect x="190" y="194" width="20" height="8" rx="2" fill="#C8A858"/>
      <rect x="192" y="202" width="4" height="26" fill="#A8884A"/>
      <rect x="204" y="202" width="4" height="26" fill="#A8884A"/>
      {/* Table */}
      <rect x="118" y="190" width="50" height="8" rx="3" fill="#D4B868"/>
      <rect x="126" y="198" width="6" height="30" fill="#B09848"/>
      <rect x="154" y="198" width="6" height="30" fill="#B09848"/>
      {/* Barbecue grill */}
      <ellipse cx="215" cy="218" rx="14" ry="5" fill="#484040"/>
      <rect x="204" y="218" width="22" height="18" rx="3" fill="#3C3434" filter="url(#ySh2)"/>
      <rect x="208" y="236" width="4" height="12" fill="#3C3434"/>
      <rect x="214" y="236" width="4" height="12" fill="#3C3434"/>
      <ellipse cx="215" cy="217" rx="11" ry="4" fill="#E04820" opacity="0.4"/>
      {/* Ground under gazebo */}
      <rect x="70" y="240" width="144" height="6" fill="#8A9850" opacity="0.5" rx="2"/>

      {/* ── TERRACE (right, lower) ── */}
      <ellipse cx="430" cy="300" rx="80" ry="12" fill="#00000012"/>
      {/* Platform */}
      <rect x="358" y="260" width="148" height="42" fill="#C8C488" rx="4" filter="url(#ySh2)"/>
      {/* Deck boards */}
      {[262,272,282,292].map((y,i)=>(
        <rect key={i} x="360" y={y} width="144" height="8" rx="1"
          fill={i%2===0 ? '#D4D098' : '#C0BC80'} stroke="#ACA870" strokeWidth="0.7"/>
      ))}
      {/* Railing posts */}
      {[362,380,400,420,440,460,478,496].map((x,i)=>(
        <rect key={i} x={x} y="248" width="5" height="14" rx="1" fill="#B8A858"/>
      ))}
      {/* Railing top rail */}
      <rect x="358" y="248" width="148" height="5" fill="#C8B860" rx="2"/>
      {/* Steps down */}
      <rect x="440" y="300" width="60" height="8" fill="#B8AE80" rx="2"/>
      <rect x="446" y="306" width="52" height="8" fill="#ACA478" rx="2"/>
      {/* Chairs */}
      <rect x="374" y="272" width="24" height="20" rx="3" fill="#8AB060"/>
      <rect x="372" y="268" width="28" height="6" rx="2" fill="#9AC068"/>
      <rect x="410" y="272" width="24" height="20" rx="3" fill="#8AB060"/>
      <rect x="408" y="268" width="28" height="6" rx="2" fill="#9AC068"/>
      {/* Small table on terrace */}
      <rect x="440" y="268" width="40" height="6" rx="3" fill="#C8B868"/>
      <rect x="450" y="274" width="5" height="18" fill="#A89848"/>
      <rect x="466" y="274" width="5" height="18" fill="#A89848"/>
      {/* Ground strip */}
      <rect x="356" y="300" width="152" height="6" fill="#8A9850" opacity="0.5" rx="2"/>

      {/* ── PAVING PATH ── */}
      {/* Central path from gate upward */}
      <path d="M252,460 L246,300 L354,300 L348,460Z" fill="url(#yPath)"/>
      {/* Tile grid */}
      {[310,326,342,358,374,390,406,422,438].map((y,i)=>(
        <line key={i} x1={247+(y-300)*0.02} y1={y} x2={353-(y-300)*0.02} y2={y}
          stroke="#A89870" strokeWidth="1.5" opacity="0.55"/>
      ))}
      {[260,274,288,302,316,330,344].map((x,i)=>(
        <line key={i} x1={x} y1="300" x2={x-4} y2="460"
          stroke="#A89870" strokeWidth="1" opacity="0.35"/>
      ))}

      {/* ── GATE ── (bottom center) */}
      {/* Left pillar */}
      <rect x="228" y="390" width="26" height="52" fill="url(#yFencePillar)" rx="4" filter="url(#ySh2)"/>
      <rect x="224" y="386" width="34" height="10" fill="#B8A850" rx="3"/>
      <rect x="226" y="396" width="30" height="4" fill="#D8C870" opacity="0.6"/>
      {/* Right pillar */}
      <rect x="346" y="390" width="26" height="52" fill="url(#yFencePillar)" rx="4" filter="url(#ySh2)"/>
      <rect x="342" y="386" width="34" height="10" fill="#B8A850" rx="3"/>
      <rect x="344" y="396" width="30" height="4" fill="#D8C870" opacity="0.6"/>
      {/* Left gate panel */}
      <rect x="254" y="400" width="48" height="36" rx="3" fill="#B08840" filter="url(#ySh2)"/>
      {[257,265,273,281,289,295].map((x,i)=>(
        <rect key={i} x={x} y="403" width="6" height="30" rx="1.5" fill="#C89A48"/>
      ))}
      <line x1="254" y1="418" x2="302" y2="418" stroke="#C89A48" strokeWidth="1.5" opacity="0.5"/>
      {/* Right gate panel */}
      <rect x="298" y="400" width="48" height="36" rx="3" fill="#B08840" filter="url(#ySh2)"/>
      {[301,309,317,325,333,341].map((x,i)=>(
        <rect key={i} x={x} y="403" width="6" height="30" rx="1.5" fill="#C89A48"/>
      ))}
      <line x1="298" y1="418" x2="346" y2="418" stroke="#C89A48" strokeWidth="1.5" opacity="0.5"/>
      {/* Gate shadow */}
      <ellipse cx="300" cy="438" rx="50" ry="6" fill="#00000018"/>

      {/* ── LANDSCAPE / FLOWER BEDS ── */}
      {/* Left flower bed */}
      <ellipse cx="95" cy="248" rx="50" ry="14" fill="#5A9838" opacity="0.9"/>
      {[58,70,82,94,106,118,128].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="238" width="3" height="12" fill="#5A8828"/>
          <circle cx={x+1} cy={236}
            fill={['#E8C838','#E05038','#D04898','#40A8D0','#E8A030','#60C840','#E8C838'][i]}
            r={5}/>
        </g>
      ))}
      {/* Right flower bed */}
      <ellipse cx="505" cy="248" rx="50" ry="14" fill="#5A9838" opacity="0.9"/>
      {[468,480,492,504,516,528,540].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="238" width="3" height="12" fill="#5A8828"/>
          <circle cx={x+1} cy={236}
            fill={['#E05038','#D04898','#40A8D0','#E8C838','#E8A030','#60C840','#E05038'][i]}
            r={5}/>
        </g>
      ))}
      {/* Grass patches / lawn marks */}
      {[...Array(14)].map((_,i)=>(
        <ellipse key={i} cx={30+i*40} cy={320+(i%3)*20} rx="12" ry="5"
          fill="#6AAA40" opacity="0.22"/>
      ))}
      {/* Lamp posts */}
      <rect x="192" y="368" width="6" height="48" fill="#8A8878"/>
      <rect x="188" y="364" width="14" height="8" rx="3" fill="#C0C0A0"/>
      <ellipse cx="195" cy="363" rx="12" ry="7" fill="#F8F090" opacity="0.85"/>
      <rect x="402" y="368" width="6" height="48" fill="#8A8878"/>
      <rect x="398" y="364" width="14" height="8" rx="3" fill="#C0C0A0"/>
      <ellipse cx="405" cy="363" rx="12" ry="7" fill="#F8F090" opacity="0.85"/>
    </svg>
  );
}

// ─── Блок дома (вырезает свою полосу из цельного SVG) ────────────────────────
interface HouseBlockProps {
  services: ServiceItem[];
  onSelect: (s: ServiceItem) => void;
  selected: string | null;
  clipY1: number;
  clipY2: number;
  borderRadiusStr: string;
  sectionLabel: string;
  labelColor: string;
}

function HouseBlockSimple({
  services, onSelect, selected,
  clipY1, clipY2,
  borderRadiusStr, sectionLabel, labelColor
}: HouseBlockProps) {
  // aspect ratio этого блока относительно ширины SVG (400px)
  // SVG viewBox = 400×520, блок занимает (clipY2-clipY1) единиц по высоте
  // padding-bottom = (blockH / svgW) * 100%
  const pct = ((clipY2 - clipY1) / 400) * 100;
  // Сдвиг SVG: нам нужно показать часть начиная с clipY1
  // Полная высота SVG при данной ширине = (520/400)*100% = 130% ширины
  // translateY = -(clipY1/520)*130% ... но проще: -(clipY1/400)*100%
  const translateYPct = (clipY1 / 400) * 100;

  return (
    <div className="relative w-full overflow-hidden" style={{ borderRadius: borderRadiusStr }}>
      <div style={{ paddingBottom: `${pct}%`, position: 'relative' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '130%', // 520/400 * 100%
            transform: `translateY(-${translateYPct}%)`,
          }}>
            <HouseSVGFull />
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-2.5">
        <div className="absolute top-2 left-3">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.6)', color: labelColor, backdropFilter: 'blur(4px)' }}>
            {sectionLabel}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {services.map(svc => {
            const isActive = selected === svc.id;
            return (
              <motion.button key={svc.id} onClick={() => onSelect(svc)}
                whileHover={{ scale: 1.06, y: -1 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold"
                style={{
                  background: isActive ? svc.color : 'rgba(255,255,255,0.85)',
                  color: isActive ? '#fff' : '#1A1208',
                  boxShadow: isActive ? `0 4px 14px ${svc.color}50` : '0 1px 5px rgba(0,0,0,0.12)',
                  backdropFilter: 'blur(6px)',
                  border: isActive ? `1.5px solid ${svc.color}` : '1.5px solid rgba(255,255,255,0.75)',
                }}>
                <Icon name={svc.icon} size={12} fallback="Star"/>
                {svc.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Двор: SVG + абсолютно позиционированные кнопки у объектов ────────────────
function YardBlock({
  services, onSelect, selected
}: {
  services: typeof YARD_SERVICES;
  onSelect: (s: ServiceItem) => void;
  selected: string | null;
}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ borderRadius: '20px' }}>
      {/* SVG aspect ratio 600:460 */}
      <div style={{ paddingBottom: `${(460/600)*100}%`, position: 'relative' }}>
        <div className="absolute inset-0">
          <YardSVGFull/>
        </div>
      </div>
      {/* Кнопки у каждого объекта */}
      {services.map(svc => {
        const isActive = selected === svc.id;
        return (
          <motion.button
            key={svc.id}
            onClick={() => onSelect(svc)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            initial={false}
            style={{
              position: 'absolute',
              left: `${svc.btnX}%`,
              top: `${svc.btnY}%`,
              transform: 'translate(-50%, -50%)',
              background: isActive ? svc.color : 'rgba(255,255,255,0.9)',
              color: isActive ? '#fff' : '#1A1208',
              boxShadow: isActive
                ? `0 4px 18px ${svc.color}60, 0 0 0 2px ${svc.color}`
                : '0 2px 8px rgba(0,0,0,0.18)',
              border: isActive ? `2px solid ${svc.color}` : '1.5px solid rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              zIndex: isActive ? 20 : 10,
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
            }}
          >
            <Icon name={svc.icon} size={12} fallback="Star"/>
            {svc.label}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Карточка услуги ──────────────────────────────────────────────────────────
function ServiceCard({ item, onClose }: { item: ServiceItem; onClose: () => void }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#FDFAF5', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
    >
      <div className="relative h-40 overflow-hidden">
        <img src={item.photo} alt={item.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)' }}/>
        <button onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.38)', color: '#fff' }}>
          <Icon name="X" size={13}/>
        </button>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: item.color }}>
            <Icon name={item.icon} size={13} className="text-white" fallback="Star"/>
          </div>
          <h3 className="text-white font-semibold text-sm leading-tight">{item.title}</h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm leading-relaxed" style={{ color: '#5A5040' }}>{item.description}</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm"
          style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
          Получить расчёт стоимости
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function InteractiveHouse() {
  const [scene, setScene] = useState<Scene>('house');
  const [isFlipping, setIsFlipping] = useState(false);
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  const flipTo = (target: Scene) => {
    if (isFlipping || scene === target) return;
    setSelected(null);
    setIsFlipping(true);
    setTimeout(() => { setScene(target); setIsFlipping(false); }, 480);
  };

  const isHouse = scene === 'house';
  const switchIcon = isHouse ? 'TreePine' : 'Home';
  const switchLabel = isHouse ? 'Двор' : 'Дом';
  const switchBg = isHouse
    ? 'linear-gradient(180deg, #3A7A30 0%, #245020 100%)'
    : 'linear-gradient(180deg, #4A6EA8 0%, #2C4678 100%)';
  const switchGlow = isHouse ? '#3A7A30' : '#4A6EA8';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hint */}
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
        style={{ background: 'rgba(0,0,0,0.055)', color: '#5A5040' }}>
        <Icon name="Hand" size={14}/>
        Нажмите на услугу чтобы узнать подробнее
      </motion.div>

      {/* Layout — мобиль: max-w-sm, десктоп: max-w-3xl */}
      <div className="w-full max-w-sm md:max-w-3xl mx-auto flex gap-2.5 md:gap-4 items-stretch">

        {/* Blocks column */}
        <div className="flex-1 min-w-0" style={{ perspective: '1000px' }}>
          <motion.div
            animate={{ rotateY: isFlipping ? 85 : 0, opacity: isFlipping ? 0 : 1, scale: isFlipping ? 0.95 : 1 }}
            transition={{ duration: 0.44, ease: [0.4, 0, 0.6, 1] }}
            style={{ transformOrigin: 'left center' }}
          >
            <AnimatePresence mode="wait">
              {isHouse ? (
                <motion.div key="house"
                  initial={{ rotateY: -85, opacity: 0, scale: 0.95 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.44, ease: [0.4, 0, 0.6, 1] }}
                  className="flex flex-col"
                  style={{ gap: '3px' }}
                >
                  <HouseBlockSimple
                    services={HOUSE_SERVICES.filter(s => s.id === 'roof')}
                    onSelect={setSelected} selected={selected?.id ?? null}
                    clipY1={0} clipY2={160}
                    borderRadiusStr="16px 16px 0 0"
                    sectionLabel="Кровля" labelColor="#8A2018"
                  />
                  <HouseBlockSimple
                    services={HOUSE_SERVICES.filter(s => ['facade','walls','interior','plumbing','electrical'].includes(s.id))}
                    onSelect={setSelected} selected={selected?.id ?? null}
                    clipY1={160} clipY2={370}
                    borderRadiusStr="0"
                    sectionLabel="Стены и отделка" labelColor="#3A5A3A"
                  />
                  <HouseBlockSimple
                    services={HOUSE_SERVICES.filter(s => s.id === 'foundation')}
                    onSelect={setSelected} selected={selected?.id ?? null}
                    clipY1={370} clipY2={520}
                    borderRadiusStr="0 0 16px 16px"
                    sectionLabel="Фундамент" labelColor="#5A4028"
                  />
                </motion.div>
              ) : (
                <motion.div key="yard"
                  initial={{ rotateY: -85, opacity: 0, scale: 0.95 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.44, ease: [0.4, 0, 0.6, 1] }}
                >
                  <YardBlock
                    services={YARD_SERVICES}
                    onSelect={setSelected}
                    selected={selected?.id ?? null}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Flip button */}
        <div className="flex-shrink-0" style={{ width: '52px' }}>
          <motion.button
            onClick={() => flipTo(isHouse ? 'yard' : 'house')}
            disabled={isFlipping}
            whileHover={{ scale: 1.04, x: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center gap-3 w-full h-full rounded-2xl relative overflow-hidden"
            style={{
              background: switchBg,
              boxShadow: `0 6px 24px ${switchGlow}55`,
              color: '#fff',
              minHeight: '180px',
            }}
          >
            <motion.div animate={{ opacity: [0.12, 0.3, 0.12] }} transition={{ duration: 2.8, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.28), transparent 65%)' }}/>
            <motion.div animate={isFlipping ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.44 }} className="relative z-10">
              <Icon name={switchIcon} size={20} fallback="Home"/>
            </motion.div>
            <span className="relative z-10 font-bold text-[11px] tracking-[0.22em] uppercase"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              {switchLabel}
            </span>
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.9, repeat: Infinity }}
              className="relative z-10 opacity-55">
              <Icon name="ChevronRight" size={14}/>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Service card */}
      <div className="w-full max-w-sm md:max-w-3xl mx-auto mt-3">
        <AnimatePresence mode="wait">
          {selected && <ServiceCard key={selected.id} item={selected} onClose={() => setSelected(null)}/>}
        </AnimatePresence>
      </div>
    </div>
  );
}