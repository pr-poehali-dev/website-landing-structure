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

const YARD_SERVICES: ServiceItem[] = [
  { id:'fence',     label:'Забор',    icon:'Shield',    color:'#7A5A10',
    title:'Заборы и ограждения',
    description:'Кирпичные, металлические, деревянные заборы. Фундамент, опоры, секции — всё с гарантией.',
    photo: IMG.fence },
  { id:'gate',      label:'Ворота',   icon:'DoorOpen',  color:'#6A4C2A',
    title:'Ворота и въездные группы',
    description:'Распашные, откатные и автоматические ворота. Кирпичные столбы, калитки. Автоматика Came, Nice.',
    photo: IMG.fence },
  { id:'paving',    label:'Плитка',   icon:'Grid3x3',   color:'#8A7048',
    title:'Укладка тротуарной плитки',
    description:'Брусчатка, тротуарная плитка, натуральный камень. Подготовка основания, дренаж, бордюры.',
    photo: IMG.paving },
  { id:'banya',     label:'Баня',     icon:'Flame',     color:'#AA4A1E',
    title:'Строительство бань',
    description:'Бани из бруса, бревна, газобетона и каркаса. Парная, моечная, комната отдыха. Печи Harvia, Tulikivi.',
    photo: IMG.banya },
  { id:'gazebo',    label:'Беседка',  icon:'TreePine',  color:'#4A7A3A',
    title:'Беседки',
    description:'Деревянные, металлические, из поликарбоната. Открытые и закрытые, с мангальной зоной.',
    photo: IMG.gazebo },
  { id:'terrace',   label:'Терраса',  icon:'Columns',   color:'#6A7B4A',
    title:'Террасы и пристройки',
    description:'Террасы из декинга, термодерева, ДПК. Веранды, навесы, зимние сады, пристройки.',
    photo: IMG.terrace },
  { id:'landscape', label:'Ландшафт', icon:'Flower2',   color:'#3A7A3A',
    title:'Ландшафтные работы',
    description:'Планировка участка, озеленение, дренаж, автополив, освещение. Газоны, деревья, кустарники.',
    photo: IMG.landscape },
];

// ─── Полный SVG дома (viewBox 0 0 400 520) ───────────────────────────────────
// Блок 1 (крыша): y 0..170   → показываем clip 0..170
// Блок 2 (стены): y 170..380 → показываем clip 170..380
// Блок 3 (фунд.): y 380..520 → показываем clip 380..520
function HouseSVGFull({ highlightBlock }: { highlightBlock?: 'roof' | 'walls' | 'foundation' }) {
  return (
    <svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'100%' }}>
      <defs>
        <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8DFF0"/>
          <stop offset="100%" stopColor="#EDE9E0"/>
        </linearGradient>
        <linearGradient id="hGrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DB55A"/>
          <stop offset="100%" stopColor="#5E9A3C"/>
        </linearGradient>
        <linearGradient id="hWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2EDE2"/>
          <stop offset="100%" stopColor="#E0D8C8"/>
        </linearGradient>
        <linearGradient id="hRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C84038"/>
          <stop offset="100%" stopColor="#8C2820"/>
        </linearGradient>
        <linearGradient id="hFound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8A888"/>
          <stop offset="100%" stopColor="#9A8A6A"/>
        </linearGradient>
        <filter id="hShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00000022"/>
        </filter>
      </defs>

      {/* Sky bg */}
      <rect width="400" height="520" fill="url(#hSky)"/>

      {/* ── ROOF BLOCK (0..170) ── */}
      <g opacity={highlightBlock && highlightBlock !== 'roof' ? 0.55 : 1}>
        {/* Sky top part */}
        <rect x="0" y="0" width="400" height="170" fill="url(#hSky)"/>
        {/* Chimney left */}
        <rect x="108" y="52" width="22" height="62" fill="#C4AE8A" rx="2"/>
        <rect x="104" y="48" width="30" height="10" fill="#A89070" rx="2"/>
        {/* Chimney smoke */}
        <ellipse cx="119" cy="36" rx="7" ry="10" fill="#D8D4CC" opacity="0.45"/>
        <ellipse cx="115" cy="22" rx="9" ry="12" fill="#D8D4CC" opacity="0.28"/>
        {/* Chimney right */}
        <rect x="272" y="60" width="20" height="54" fill="#C4AE8A" rx="2"/>
        <rect x="268" y="56" width="28" height="10" fill="#A89070" rx="2"/>
        {/* Roof main shape */}
        <polygon points="30,170 200,42 370,170" fill="url(#hRoof)" filter="url(#hShadow)"/>
        {/* Roof ridge */}
        <line x1="200" y1="42" x2="200" y2="170" stroke="#70201A" strokeWidth="1.5" opacity="0.3"/>
        {/* Roof tiles hint rows */}
        {[85,100,115,130,145,160].map((y, i) => {
          const w = (y - 42) * 1.85;
          return <line key={i} x1={200 - w/2} y1={y} x2={200 + w/2} y2={y}
            stroke="#8A2820" strokeWidth="1" opacity="0.18"/>;
        })}
        {/* Roof overhang line */}
        <line x1="26" y1="170" x2="374" y2="170" stroke="#7A2218" strokeWidth="2" opacity="0.4"/>
        {/* Dormer window */}
        <polygon points="176,95 200,72 224,95" fill="#B03828"/>
        <rect x="180" y="95" width="40" height="30" fill="#C8E0F0" stroke="#9A2818" strokeWidth="1.5"/>
        <line x1="200" y1="95" x2="200" y2="125" stroke="#9A2818" strokeWidth="1"/>
        <line x1="180" y1="110" x2="220" y2="110" stroke="#9A2818" strokeWidth="1"/>
        {/* Clouds */}
        <ellipse cx="60" cy="40" rx="38" ry="16" fill="white" opacity="0.7"/>
        <ellipse cx="90" cy="30" rx="28" ry="14" fill="white" opacity="0.7"/>
        <ellipse cx="320" cy="50" rx="32" ry="14" fill="white" opacity="0.6"/>
        <ellipse cx="348" cy="38" rx="24" ry="12" fill="white" opacity="0.6"/>
      </g>

      {/* ── WALLS BLOCK (170..380) ── */}
      <g opacity={highlightBlock && highlightBlock !== 'walls' ? 0.55 : 1}>
        {/* Wall body */}
        <rect x="30" y="170" width="340" height="210" fill="url(#hWall)"/>
        {/* Brick texture hint */}
        {[0,1,2,3,4,5,6,7,8].map(row =>
          [0,1,2,3,4,5,6].map(col => (
            <rect key={`b${row}-${col}`}
              x={30 + col*50 + (row%2)*25} y={172 + row*26}
              width="44" height="20" rx="2"
              fill="none" stroke="#D0C8B4" strokeWidth="0.8" opacity="0.55"/>
          ))
        )}
        {/* Left window 1 */}
        <rect x="52" y="195" width="72" height="60" fill="#B8D8F0" stroke="#9A8A6A" strokeWidth="2" rx="3"/>
        <line x1="88" y1="195" x2="88" y2="255" stroke="#9A8A6A" strokeWidth="1.5"/>
        <line x1="52" y1="225" x2="124" y2="225" stroke="#9A8A6A" strokeWidth="1.5"/>
        <rect x="52" y="195" width="72" height="8" fill="#C8B890" rx="2"/>
        {/* Left window sill */}
        <rect x="48" y="253" width="80" height="6" fill="#C8B890" rx="2"/>
        {/* Right window 1 */}
        <rect x="276" y="195" width="72" height="60" fill="#B8D8F0" stroke="#9A8A6A" strokeWidth="2" rx="3"/>
        <line x1="312" y1="195" x2="312" y2="255" stroke="#9A8A6A" strokeWidth="1.5"/>
        <line x1="276" y1="225" x2="348" y2="225" stroke="#9A8A6A" strokeWidth="1.5"/>
        <rect x="276" y="195" width="72" height="8" fill="#C8B890" rx="2"/>
        <rect x="272" y="253" width="80" height="6" fill="#C8B890" rx="2"/>
        {/* Arch over door */}
        <path d="M155,290 Q200,252 245,290" fill="#E8E0D0" stroke="#C8B890" strokeWidth="2"/>
        {/* Door */}
        <rect x="158" y="290" width="84" height="90" fill="#7A5E3A" rx="4"/>
        <rect x="162" y="294" width="36" height="82" fill="#6A5030" rx="2"/>
        <rect x="202" y="294" width="36" height="82" fill="#6A5030" rx="2"/>
        <circle cx="196" cy="340" r="5" fill="#C8A84A"/>
        <circle cx="204" cy="340" r="5" fill="#C8A84A"/>
        {/* Door frame */}
        <rect x="154" y="288" width="92" height="4" fill="#C8B890" rx="2"/>
        {/* Second floor windows */}
        <rect x="60" y="290" width="68" height="55" fill="#B8D8F0" stroke="#9A8A6A" strokeWidth="2" rx="3"/>
        <line x1="94" y1="290" x2="94" y2="345" stroke="#9A8A6A" strokeWidth="1.5"/>
        <line x1="60" y1="318" x2="128" y2="318" stroke="#9A8A6A" strokeWidth="1.5"/>
        <rect x="60" y="290" width="68" height="7" fill="#C8B890" rx="2"/>
        <rect x="56" y="343" width="76" height="5" fill="#C8B890" rx="2"/>
        <rect x="272" y="290" width="68" height="55" fill="#B8D8F0" stroke="#9A8A6A" strokeWidth="2" rx="3"/>
        <line x1="306" y1="290" x2="306" y2="345" stroke="#9A8A6A" strokeWidth="1.5"/>
        <line x1="272" y1="318" x2="340" y2="318" stroke="#9A8A6A" strokeWidth="1.5"/>
        <rect x="272" y="290" width="68" height="7" fill="#C8B890" rx="2"/>
        <rect x="268" y="343" width="76" height="5" fill="#C8B890" rx="2"/>
        {/* Floor divider */}
        <rect x="30" y="272" width="340" height="6" fill="#D0C4A8" rx="1"/>
        {/* Terrace right side */}
        <rect x="372" y="310" width="28" height="70" fill="#E4DDD0" stroke="#C8B890" strokeWidth="1.5"/>
        <rect x="372" y="308" width="28" height="8" fill="#C8B890" rx="1"/>
        {/* Porch steps */}
        <rect x="140" y="375" width="120" height="5" fill="#C8B890" rx="2"/>
      </g>

      {/* ── FOUNDATION BLOCK (380..520) ── */}
      <g opacity={highlightBlock && highlightBlock !== 'foundation' ? 0.55 : 1}>
        {/* Foundation body */}
        <rect x="26" y="378" width="348" height="42" fill="url(#hFound)"/>
        {/* Foundation texture */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <rect key={i} x={28 + i*45} y="382" width="38" height="16" rx="2"
            fill="none" stroke="#8A7858" strokeWidth="1" opacity="0.4"/>
        ))}
        {/* Porch/steps */}
        <rect x="148" y="378" width="104" height="12" fill="#C0AE88" rx="2"/>
        <rect x="140" y="390" width="120" height="10" fill="#B8A480" rx="2"/>
        <rect x="132" y="400" width="136" height="8" fill="#B09870" rx="2"/>
        {/* Grass ground */}
        <rect x="0" y="420" width="400" height="100" fill="url(#hGrass)"/>
        {/* Path to house */}
        <path d="M160,420 L156,520 L244,520 L240,420Z" fill="#D0C4A0" opacity="0.7"/>
        {[430,445,460,475,490,505].map((y,i) => (
          <line key={i} x1={161+(y-420)*0.02} y1={y} x2={239-(y-420)*0.02} y2={y}
            stroke="#B8AE88" strokeWidth="1" opacity="0.5"/>
        ))}
        {/* Shrubs */}
        <ellipse cx="75" cy="422" rx="30" ry="20" fill="#5A9040"/>
        <ellipse cx="90" cy="416" rx="24" ry="18" fill="#4E8038"/>
        <ellipse cx="58" cy="418" rx="20" ry="16" fill="#62A048"/>
        <ellipse cx="325" cy="422" rx="30" ry="20" fill="#5A9040"/>
        <ellipse cx="340" cy="416" rx="24" ry="18" fill="#4E8038"/>
        <ellipse cx="312" cy="418" rx="20" ry="16" fill="#62A048"/>
        {/* Trees far left */}
        <ellipse cx="12" cy="395" rx="22" ry="38" fill="#4A8838" opacity="0.85"/>
        <rect x="8" y="428" width="8" height="18" fill="#7A5830"/>
        {/* Trees far right */}
        <ellipse cx="388" cy="392" rx="22" ry="38" fill="#4A8838" opacity="0.85"/>
        <rect x="384" y="424" width="8" height="18" fill="#7A5830"/>
        {/* Lamp post */}
        <rect x="116" y="408" width="5" height="30" fill="#8A8070"/>
        <ellipse cx="118" cy="407" rx="9" ry="6" fill="#E8D890" opacity="0.9"/>
        <rect x="282" y="408" width="5" height="30" fill="#8A8070"/>
        <ellipse cx="284" cy="407" rx="9" ry="6" fill="#E8D890" opacity="0.9"/>
      </g>
    </svg>
  );
}

// ─── SVG двора (единая картинка) ─────────────────────────────────────────────
function YardSVGFull() {
  return (
    <svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'100%' }}>
      <defs>
        <linearGradient id="ySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8D8F0"/>
          <stop offset="100%" stopColor="#D8ECF8"/>
        </linearGradient>
        <linearGradient id="yGrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#82B854"/>
          <stop offset="100%" stopColor="#5E9A38"/>
        </linearGradient>
        <linearGradient id="yPath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4C8A4"/>
          <stop offset="100%" stopColor="#C0B490"/>
        </linearGradient>
        <filter id="ySh" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000018"/>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="400" height="520" fill="url(#ySky)"/>
      {/* Clouds */}
      <ellipse cx="80" cy="45" rx="42" ry="17" fill="white" opacity="0.75"/>
      <ellipse cx="115" cy="33" rx="30" ry="15" fill="white" opacity="0.75"/>
      <ellipse cx="300" cy="52" rx="36" ry="15" fill="white" opacity="0.65"/>
      <ellipse cx="330" cy="40" rx="26" ry="13" fill="white" opacity="0.65"/>

      {/* === FENCE perimeter === */}
      {/* Top fence */}
      <rect x="18" y="115" width="364" height="9" fill="#C8A830" rx="2"/>
      {[20,42,64,86,108,130,152,174,196,218,240,262,284,306,328,350,370].map((x,i)=>(
        <rect key={i} x={x} y="108" width="14" height="24" rx="2" fill="#D4B440"/>
      ))}
      {/* Left fence */}
      <rect x="18" y="115" width="9" height="310" fill="#C8A830" rx="2"/>
      {[130,158,186,214,242,270,298,326,354,380].map((y,i)=>(
        <rect key={i} x="11" y={y} width="23" height="20" rx="2" fill="#D4B440"/>
      ))}
      {/* Right fence */}
      <rect x="373" y="115" width="9" height="310" fill="#C8A830" rx="2"/>
      {[130,158,186,214,242,270,298,326,354,380].map((y,i)=>(
        <rect key={i} x="366" y={y} width="23" height="20" rx="2" fill="#D4B440"/>
      ))}
      {/* Bottom fence (left of gate) */}
      <rect x="18" y="422" width="118" height="9" fill="#C8A830" rx="2"/>
      {[22,44,66,88,110,128].map((x,i)=>(
        <rect key={i} x={x} y="415" width="14" height="22" rx="2" fill="#D4B440"/>
      ))}
      {/* Bottom fence (right of gate) */}
      <rect x="264" y="422" width="118" height="9" fill="#C8A830" rx="2"/>
      {[266,288,310,332,354,370].map((x,i)=>(
        <rect key={i} x={x} y="415" width="14" height="22" rx="2" fill="#D4B440"/>
      ))}

      {/* === GATE === */}
      {/* Left pillar */}
      <rect x="128" y="400" width="28" height="38" fill="#D4B870" rx="3"/>
      <rect x="124" y="396" width="36" height="8" fill="#B89848" rx="2"/>
      {/* Right pillar */}
      <rect x="244" y="400" width="28" height="38" fill="#D4B870" rx="3"/>
      <rect x="240" y="396" width="36" height="8" fill="#B89848" rx="2"/>
      {/* Left gate panel */}
      <rect x="156" y="408" width="46" height="24" rx="2" fill="#A88040"/>
      {[159,167,175,183,191].map((x,i)=>(
        <rect key={i} x={x} y="411" width="5" height="18" rx="1" fill="#C0A050"/>
      ))}
      {/* Right gate panel */}
      <rect x="198" y="408" width="46" height="24" rx="2" fill="#A88040"/>
      {[201,209,217,225,233].map((x,i)=>(
        <rect key={i} x={x} y="411" width="5" height="18" rx="1" fill="#C0A050"/>
      ))}

      {/* === GROUND / GRASS === */}
      <rect x="0" y="430" width="400" height="90" fill="url(#yGrass)"/>
      <rect x="18" y="428" width="364" height="5" fill="#7AB050" opacity="0.7"/>

      {/* === PAVING path === */}
      <path d="M166,520 L162,430 L238,430 L234,520Z" fill="url(#yPath)"/>
      {[436,448,460,472,484,496,508].map((y,i)=>(
        <line key={i} x1={163+(y-430)*0.03} y1={y} x2={237-(y-430)*0.03} y2={y}
          stroke="#B0A480" strokeWidth="1.2" opacity="0.6"/>
      ))}
      {[170,180,190,200,210,220,230].map((x,i)=>(
        <line key={i} x1={x} y1="430" x2={x-4} y2="520"
          stroke="#B0A480" strokeWidth="1" opacity="0.4"/>
      ))}

      {/* === TERRACE (right side, attached to house area) === */}
      <rect x="295" y="180" width="78" height="130" fill="#D8D0A8" rx="4" filter="url(#ySh)"/>
      {[188,200,212,224,236,248,260,272,284,296,306].map((y,i)=>(
        <rect key={i} x="297" y={y} width="74" height="10" rx="1"
          fill="#E4DDB8" stroke="#C0B888" strokeWidth="0.8"/>
      ))}
      {/* Terrace railing */}
      <rect x="295" y="178" width="78" height="5" fill="#B8AE80" rx="2"/>
      <rect x="295" y="308" width="78" height="5" fill="#B8AE80" rx="2"/>
      {[298,310,322,334,346,358].map((x,i)=>(
        <rect key={i} x={x} y="183" width="4" height="120" rx="1" fill="#C8C090" opacity="0.8"/>
      ))}

      {/* === BANYA (back right) === */}
      <rect x="295" y="118" width="74" height="65" fill="#D4B898" rx="4" filter="url(#ySh)"/>
      {/* Banya roof */}
      <polygon points="287,122 332,92 377,122" fill="#8B5230"/>
      <polygon points="291,125 332,96 373,125 373,130 291,130" fill="#7A4828" opacity="0.7"/>
      {/* Banya chimney */}
      <rect x="348" y="96" width="14" height="30" fill="#C0A870" rx="2"/>
      <rect x="344" y="93" width="22" height="7" fill="#A89058" rx="2"/>
      {/* Banya smoke */}
      <ellipse cx="355" cy="80" rx="7" ry="10" fill="#E0DCD8" opacity="0.45"/>
      <ellipse cx="352" cy="65" rx="9" ry="12" fill="#E0DCD8" opacity="0.28"/>
      {/* Banya window */}
      <rect x="301" y="130" width="28" height="22" fill="#B8D8F0" stroke="#8A6040" strokeWidth="1.5" rx="2"/>
      <line x1="315" y1="130" x2="315" y2="152" stroke="#8A6040" strokeWidth="1"/>
      <line x1="301" y1="141" x2="329" y2="141" stroke="#8A6040" strokeWidth="1"/>
      {/* Banya door */}
      <rect x="345" y="138" width="22" height="45" fill="#6A3820" rx="3"/>
      <circle cx="350" cy="162" r="3" fill="#C8A040"/>

      {/* === GAZEBO (left side) === */}
      {/* Platform */}
      <rect x="30" y="300" width="110" height="90" fill="#D4C898" rx="4" filter="url(#ySh)"/>
      {/* Decking */}
      {[304,314,324,334,344,354,362,372,380].map((y,i)=>(
        <rect key={i} x="32" y={y} width="106" height="8" rx="1"
          fill="#DDD0A0" stroke="#B8A870" strokeWidth="0.7"/>
      ))}
      {/* Columns */}
      {[34,65,96,127].map((x,i)=>(
        <rect key={i} x={x} y="248" width="8" height="52" rx="2" fill="#C4B070"/>
      ))}
      {/* Roof */}
      <polygon points="22,260 85,215 148,260" fill="#5A8A3A"/>
      <polygon points="26,263 85,219 144,263 144,270 26,270" fill="#4A7A2C" opacity="0.7"/>
      {/* Bench */}
      <rect x="36" y="274" width="96" height="10" rx="3" fill="#C4A860"/>
      <rect x="40" y="284" width="8" height="14" fill="#A88840"/>
      <rect x="116" y="284" width="8" height="14" fill="#A88840"/>
      {/* Barbecue */}
      <rect x="106" y="310" width="24" height="26" rx="3" fill="#5A5050" filter="url(#ySh)"/>
      <rect x="104" y="306" width="28" height="6" rx="2" fill="#484040"/>
      <rect x="114" y="336" width="4" height="14" fill="#484040"/>
      <rect x="120" y="336" width="4" height="14" fill="#484040"/>
      <ellipse cx="118" cy="309" rx="8" ry="3" fill="#E04020" opacity="0.5"/>

      {/* === LANDSCAPE / TREES === */}
      {/* Big tree left back */}
      <ellipse cx="38" cy="152" rx="30" ry="46" fill="#4A8830"/>
      <ellipse cx="28" cy="168" rx="22" ry="36" fill="#3E7828"/>
      <rect x="33" y="192" width="10" height="30" fill="#7A5828"/>
      {/* Tree right back */}
      <ellipse cx="210" cy="145" rx="26" ry="40" fill="#4A8830"/>
      <rect x="206" y="180" width="8" height="24" fill="#7A5828"/>
      {/* Flower beds */}
      <ellipse cx="68" cy="420" rx="42" ry="14" fill="#6AAA48" opacity="0.9"/>
      {[50,62,74,86,98].map((x,i)=>(
        <circle key={i} cx={x} cy={418} r={5}
          fill={['#E8C040','#E06040','#D060A0','#60A8D0','#E8C040'][i]}/>
      ))}
      <ellipse cx="332" cy="420" rx="42" ry="14" fill="#6AAA48" opacity="0.9"/>
      {[310,322,334,346,358].map((x,i)=>(
        <circle key={i} cx={x} cy={418} r={5}
          fill={['#E06040','#D060A0','#E8C040','#60A8D0','#E06040'][i]}/>
      ))}
      {/* Lamp posts */}
      <rect x="147" y="408" width="5" height="28" fill="#8A8070"/>
      <ellipse cx="149" cy="406" rx="9" ry="6" fill="#F0E890" opacity="0.9"/>
      <rect x="248" y="408" width="5" height="28" fill="#8A8070"/>
      <ellipse cx="250" cy="406" rx="9" ry="6" fill="#F0E890" opacity="0.9"/>
      {/* Small shrubs */}
      <ellipse cx="170" cy="260" rx="20" ry="15" fill="#5A9840" opacity="0.8"/>
      <ellipse cx="230" cy="255" rx="22" ry="16" fill="#5A9840" opacity="0.8"/>
      <ellipse cx="200" cy="248" rx="18" ry="14" fill="#4E8A38" opacity="0.8"/>
      {/* Lawn texture dots */}
      {[...Array(18)].map((_,i)=>(
        <ellipse key={i} cx={40 + i*20} cy={460 + (i%3)*12} rx="6" ry="3"
          fill="#70A040" opacity="0.35"/>
      ))}
    </svg>
  );
}

// ─── Блок дома (вырезает нужную полосу SVG) ───────────────────────────────────
// SVG рендерится поверх, но clip обрезает до нужной зоны
// Полная высота SVG = 520px, ширина = 400px
// Каждый блок показывает свою часть через clipPath + transform
interface HouseBlockProps {
  services: ServiceItem[];
  onSelect: (s: ServiceItem) => void;
  selected: string | null;
  borderTop?: string;
  borderBottom?: string;
  // Высота этого блока в единицах SVG (из 520)
  svgYStart: number;
  svgYEnd: number;
  // Текстовая подпись
  sectionLabel: string;
  chipsBg: string;
}

function HouseBlock({
  services, onSelect, selected,
  borderTop, borderBottom,
  svgYStart, svgYEnd,
  sectionLabel, chipsBg,
}: HouseBlockProps) {
  const svgTotalH = 520;
  const svgW = 400;
  const blockH = svgYEnd - svgYStart; // высота блока в единицах SVG
  // Процент высоты блока от полного SVG
  const heightPct = (blockH / svgTotalH) * 100;

  return (
    <div className="relative w-full overflow-hidden"
      style={{
        borderRadius: `${borderTop || '0'} ${borderTop || '0'} ${borderBottom || '0'} ${borderBottom || '0'}`,
        paddingBottom: `${heightPct * 0.98}%`, // aspect ratio trick: ширина × (h/w)
        // но нам нужен aspect ratio отдельного блока относительно ширины SVG
        // Реальный aspect: blockH/svgW
      }}
    >
      {/* Trick: используем padding-bottom для сохранения пропорций */}
      <div className="absolute inset-0"
        style={{ paddingBottom: 0 }}>
        {/* Эта внешняя div уже растянута через paddingBottom выше */}
      </div>
    </div>
  );
}

// Упрощённый подход: фиксированные высоты для каждого блока (не padding trick)
interface BlockSimpleProps {
  services: ServiceItem[];
  onSelect: (s: ServiceItem) => void;
  selected: string | null;
  // clip region в SVG координатах (из viewBox 0 0 400 520)
  clipY1: number;
  clipY2: number;
  borderRadiusClass: string;
  sectionLabel: string;
  labelColor: string;
}

function HouseBlockSimple({ services, onSelect, selected, clipY1, clipY2, borderRadiusClass, sectionLabel, labelColor }: BlockSimpleProps) {
  // Высота блока = (clipY2-clipY1)/520 * 100% от ширины SVG
  // Но т.к. ширина SVG = 400, а высота = 520, то aspect ratio = 520/400 = 1.3
  // Для блока: height = width * (clipY2-clipY1)/400
  const pct = ((clipY2 - clipY1) / 400) * 100; // % от ширины контейнера
  const yOffset = clipY1; // сдвиг SVG вверх

  return (
    <div className="relative w-full overflow-hidden" style={{ borderRadius: borderRadiusClass }}>
      {/* SVG container — абсолютно позиционированное полное SVG дома */}
      <div style={{ paddingBottom: `${pct}%`, position: 'relative' }}>
        <div className="absolute inset-0 overflow-hidden">
          {/* Сдвигаем SVG вверх чтобы показать нужный слой */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            // Полная высота SVG = (520/400) * 100% от ширины = 130% ширины
            height: '130%',
            // Затем сдвигаем вверх: yOffset/520 от полной высоты
            transform: `translateY(-${(yOffset / 520) * 100}%)`,
          }}>
            <HouseSVGFull />
          </div>
        </div>
      </div>

      {/* Overlay: chips */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 gap-1.5">
        {/* Section label */}
        <div className="absolute top-2 left-3">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.55)', color: labelColor, backdropFilter: 'blur(4px)' }}>
            {sectionLabel}
          </span>
        </div>
        {/* Chips row */}
        <div className="flex flex-wrap gap-1.5">
          {services.map((svc) => {
            const isActive = selected === svc.id;
            return (
              <motion.button
                key={svc.id}
                onClick={() => onSelect(svc)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: isActive ? svc.color : 'rgba(255,255,255,0.82)',
                  color: isActive ? '#fff' : '#1A1208',
                  boxShadow: isActive ? `0 4px 14px ${svc.color}50` : '0 1px 4px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(6px)',
                  border: isActive ? `1.5px solid ${svc.color}` : '1.5px solid rgba(255,255,255,0.7)',
                }}
              >
                <Icon name={svc.icon} size={12} fallback="Star" />
                {svc.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Блок двора (единая картинка) ─────────────────────────────────────────────
function YardBlock({ services, onSelect, selected }: { services: ServiceItem[]; onSelect: (s: ServiceItem) => void; selected: string | null }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ borderRadius: '20px' }}>
      {/* SVG aspect ratio 400:520 */}
      <div style={{ paddingBottom: '130%', position: 'relative' }}>
        <div className="absolute inset-0">
          <YardSVGFull />
        </div>
      </div>
      {/* Chips overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-3">
        <div className="flex flex-wrap gap-1.5">
          {services.map((svc) => {
            const isActive = selected === svc.id;
            return (
              <motion.button
                key={svc.id}
                onClick={() => onSelect(svc)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{
                  background: isActive ? svc.color : 'rgba(255,255,255,0.82)',
                  color: isActive ? '#fff' : '#1A1208',
                  boxShadow: isActive ? `0 4px 14px ${svc.color}50` : '0 1px 4px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(6px)',
                  border: isActive ? `1.5px solid ${svc.color}` : '1.5px solid rgba(255,255,255,0.7)',
                }}
              >
                <Icon name={svc.icon} size={12} fallback="Star" />
                {svc.label}
              </motion.button>
            );
          })}
        </div>
      </div>
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
      style={{ background: '#FDFAF5', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
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

      {/* Layout */}
      <div className="w-full max-w-sm mx-auto flex gap-2.5 items-stretch">

        {/* Left: blocks column */}
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
                  {/* Roof block: SVG y 0..170 */}
                  <HouseBlockSimple
                    services={HOUSE_SERVICES.filter(s => ['roof'].includes(s.id))}
                    onSelect={setSelected} selected={selected?.id ?? null}
                    clipY1={0} clipY2={170}
                    borderRadiusClass="16px 16px 0 0"
                    sectionLabel="Кровля"
                    labelColor="#8A2018"
                  />
                  {/* Walls block: SVG y 170..380 */}
                  <HouseBlockSimple
                    services={HOUSE_SERVICES.filter(s => ['facade','walls','interior','plumbing','electrical'].includes(s.id))}
                    onSelect={setSelected} selected={selected?.id ?? null}
                    clipY1={170} clipY2={380}
                    borderRadiusClass="0"
                    sectionLabel="Стены и отделка"
                    labelColor="#3A5A3A"
                  />
                  {/* Foundation block: SVG y 380..520 */}
                  <HouseBlockSimple
                    services={HOUSE_SERVICES.filter(s => ['foundation'].includes(s.id))}
                    onSelect={setSelected} selected={selected?.id ?? null}
                    clipY1={380} clipY2={520}
                    borderRadiusClass="0 0 16px 16px"
                    sectionLabel="Фундамент"
                    labelColor="#5A4028"
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

        {/* Right: flip button */}
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
            {/* Glow */}
            <motion.div animate={{ opacity: [0.12, 0.3, 0.12] }} transition={{ duration: 2.8, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.28), transparent 65%)' }}/>
            {/* Icon */}
            <motion.div animate={isFlipping ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.44 }} className="relative z-10">
              <Icon name={switchIcon} size={20} fallback="Home"/>
            </motion.div>
            {/* Vertical text */}
            <span className="relative z-10 font-bold text-[11px] tracking-[0.22em] uppercase"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              {switchLabel}
            </span>
            {/* Arrow */}
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.9, repeat: Infinity }}
              className="relative z-10 opacity-55">
              <Icon name="ChevronRight" size={14}/>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Service card */}
      <div className="w-full max-w-sm mx-auto mt-3">
        <AnimatePresence mode="wait">
          {selected && <ServiceCard key={selected.id} item={selected} onClose={() => setSelected(null)}/>}
        </AnimatePresence>
      </div>
    </div>
  );
}
