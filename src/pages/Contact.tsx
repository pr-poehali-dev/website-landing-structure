import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';
import { servicesData } from '@/data/servicesData';

const SEND_URL = 'https://functions.poehali.dev/c942bbb7-d414-4e28-815f-eaa7cdc19c21';

const serviceOptions = [...servicesData.map(s => s.title), 'Другое'];

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service, comment }),
      });
    } catch (_) {
      console.error('Ошибка отправки');
    }
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(38,25%,93%)', fontFamily: 'Golos Text, sans-serif' }}>
      <SiteNav />
      <div className="pt-24 pb-16 container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
            Контакты
          </div>
          <h1 className="text-4xl md:text-6xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
            Начнём строить<br />
            <em style={{ color: 'hsl(82,28%,38%)' }}>ваш дом?</em>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-base mb-8" style={{ color: 'hsl(30,10%,42%)' }}>
              Оставьте заявку, и мы свяжемся с вами в течение 30 минут для бесплатной консультации.
            </p>
            <div className="space-y-4">
              {([
                { icon: 'MapPin', text: 'Москва и Московская область', href: '' },
                { icon: 'Phone',  text: '+7 (905) 178-57-69', href: 'tel:+79051785769' },
                { icon: 'Clock',  text: 'Работаем круглосуточно, 7 дней в неделю', href: '' },
              ] as { icon: string; text: string; href: string }[]).map((c) => (
                <div key={c.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(82,22%,88%)' }}>
                    <Icon name={c.icon} size={16} style={{ color: 'hsl(82,28%,35%)' }} />
                  </div>
                  {c.href
                    ? <a href={c.href} className="text-sm font-semibold hover:underline"
                        style={{ color: 'hsl(82,28%,35%)' }}>{c.text}</a>
                    : <span className="text-sm" style={{ color: 'hsl(30,15%,30%)' }}>{c.text}</span>
                  }
                </div>
              ))}
            </div>
            <a href="tel:+79051785769"
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-white"
              style={{ background: 'hsl(82,28%,35%)' }}>
              <Icon name="Phone" size={18} className="text-white" />
              Позвонить нам
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="p-8 rounded-3xl" style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}>
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-xl font-semibold mb-6" style={{ color: 'hsl(30,15%,18%)' }}>Оставить заявку</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>Ваше имя *</label>
                        <input required type="text" placeholder="Иван Иванов" value={name} onChange={e => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)', fontFamily: 'Golos Text, sans-serif' }}
                          onFocus={e => (e.currentTarget.style.borderColor = 'hsl(82,28%,45%)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'hsl(38,20%,82%)')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>Телефон *</label>
                        <input required type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={e => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)', fontFamily: 'Golos Text, sans-serif' }}
                          onFocus={e => (e.currentTarget.style.borderColor = 'hsl(82,28%,45%)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'hsl(38,20%,82%)')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>Вид работ</label>
                        <select value={service} onChange={e => setService(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                          style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)', fontFamily: 'Golos Text, sans-serif' }}>
                          <option value="">Выберите услугу</option>
                          {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>Комментарий</label>
                        <textarea placeholder="Опишите задачу..." value={comment} onChange={e => setComment(e.target.value)}
                          rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                          style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)', fontFamily: 'Golos Text, sans-serif' }}
                          onFocus={e => (e.currentTarget.style.borderColor = 'hsl(82,28%,45%)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'hsl(38,20%,82%)')} />
                      </div>
                      <motion.button type="submit" disabled={loading}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl font-semibold text-white mt-2 flex items-center justify-center gap-2"
                        style={{ background: 'hsl(82,28%,35%)', opacity: loading ? 0.7 : 1 }}>
                        {loading
                          ? <><Icon name="Loader2" size={16} className="animate-spin" />Отправляем...</>
                          : 'Отправить заявку'}
                      </motion.button>
                      <p className="text-xs text-center" style={{ color: 'hsl(30,10%,55%)' }}>
                        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'hsl(82,22%,88%)' }}>
                      <Icon name="CheckCircle" size={32} style={{ color: 'hsl(82,28%,38%)' }} />
                    </div>
                    <h3 className="text-2xl font-light mb-3"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
                      Спасибо!
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(30,10%,50%)' }}>
                      Заявка принята. Мы свяжемся с вами в ближайшее время
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-80 md:h-96 overflow-hidden">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.604198%2C55.756294&z=13&pt=37.604198%2C55.756294%2Cpm2rdm&l=map"
          width="100%" height="100%"
          style={{ border: 'none', display: 'block' }}
          title="Офис СтройДом на карте" allowFullScreen />
      </div>

      <footer className="px-6 py-10" style={{ background: 'hsl(30,15%,15%)', color: 'rgba(255,255,255,0.5)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2024 СтройДом. Строительство домов под ключ.</p>
        </div>
      </footer>
    </div>
  );
}
