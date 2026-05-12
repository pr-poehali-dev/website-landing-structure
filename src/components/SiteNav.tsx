import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    navigate(href);
  };

  const handleModalOpen = () => {
    setMenuOpen(false);
    openModal();
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{ background: 'rgba(250,247,240,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid hsl(38,20%,88%)' }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src="https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/bucket/43608f94-6244-46cd-9e58-325d08cdb686.jpg"
              alt="Логотип"
              className="h-10 w-auto object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </Link>

          {/* Desktop nav */}
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

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {location.pathname !== '/' && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium"
                style={{ background: 'hsl(38,20%,88%)', color: 'hsl(30,15%,30%)' }}
              >
                <Icon name="ArrowLeft" size={14} />
                На главную
              </motion.button>
            )}
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

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: 'hsl(38,20%,88%)' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} style={{ color: 'hsl(30,15%,25%)' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
            style={{ background: 'hsl(40,30%,97%)', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid hsl(38,20%,88%)' }}>
              <img
                src="https://cdn.poehali.dev/projects/da8bc0c0-1c84-4c7d-8cc7-f69388f0cde6/bucket/43608f94-6244-46cd-9e58-325d08cdb686.jpg"
                alt="Логотип"
                className="h-9 w-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'hsl(38,20%,88%)' }}
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="X" size={18} style={{ color: 'hsl(30,15%,30%)' }} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
              {location.pathname !== '/' && (
                <button
                  onClick={() => handleNavClick('/')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 text-sm font-medium"
                  style={{ background: 'hsl(82,22%,90%)', color: 'hsl(82,28%,32%)' }}
                >
                  <Icon name="ArrowLeft" size={16} />
                  На главную
                </button>
              )}
              {navLinks.map((l) => {
                const active = location.pathname === l.href;
                return (
                  <button
                    key={l.href}
                    onClick={() => handleNavClick(l.href)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-1 text-sm font-medium text-left transition-all"
                    style={{
                      background: active ? 'hsl(82,22%,90%)' : 'transparent',
                      color: active ? 'hsl(82,28%,32%)' : 'hsl(30,15%,28%)',
                    }}
                  >
                    {l.label}
                    {active && <Icon name="ChevronRight" size={14} style={{ color: 'hsl(82,28%,40%)' }} />}
                  </button>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="px-4 pb-8 space-y-3" style={{ borderTop: '1px solid hsl(38,20%,88%)', paddingTop: '16px' }}>
              <a href="tel:+79051785769"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: 'hsl(38,20%,88%)', color: 'hsl(30,15%,25%)' }}
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="Phone" size={16} />
                +7 (905) 178-57-69
              </a>
              <button
                onClick={handleModalOpen}
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm"
                style={{ background: 'hsl(82,28%,35%)' }}
              >
                Рассчитать стоимость
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
