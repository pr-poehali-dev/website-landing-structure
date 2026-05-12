import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useRequestModal } from '@/context/RequestModalContext';

export const navLinks = [
  { label: 'О нас',           href: '/about' },
  { label: 'Услуги',          href: '/services' },
  { label: 'Портфолио',       href: '/portfolio' },
  { label: 'Отзывы',          href: '/reviews' },
  { label: 'Где мы работаем', href: '/geography' },
  { label: 'Контакты',        href: '/contact' },
];

export default function SiteNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useRequestModal();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ background: 'rgba(250,247,240,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid hsl(38,20%,88%)' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(82,28%,35%)' }}>
            <Icon name="Home" size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: 'hsl(82,28%,28%)' }}>СтройДом</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => {
            const active = location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium transition-colors"
                style={{ color: active ? 'hsl(82,28%,35%)' : 'hsl(30,15%,35%)', borderBottom: active ? '2px solid hsl(82,28%,45%)' : '2px solid transparent', paddingBottom: '2px' }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+79051785769"
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: 'hsl(82,28%,35%)' }}>
            <Icon name="Phone" size={15} />
            +7 (905) 178-57-69
          </a>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal()}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'hsl(82,28%,35%)' }}
          >
            Рассчитать стоимость
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}