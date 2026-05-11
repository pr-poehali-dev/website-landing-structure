import { motion } from 'framer-motion';
import Icon from '@/components/ui/icon';
import SiteNav from '@/components/SiteNav';

export default function Contact() {
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
              {[
                { icon: 'MapPin', text: 'Москва, ул. Садовая-Триумфальная, 16' },
                { icon: 'Mail',   text: 'info@stroydom.ru' },
                { icon: 'Clock',  text: 'Работаем круглосуточно, 7 дней в неделю' },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(82,22%,88%)' }}>
                    <Icon name={c.icon} size={16} style={{ color: 'hsl(82,28%,35%)' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'hsl(30,15%,30%)' }}>{c.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="p-8 rounded-3xl" style={{ background: 'hsl(40,30%,97%)', border: '1px solid hsl(38,20%,85%)' }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'hsl(30,15%,18%)' }}>Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'hsl(82,28%,45%)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'hsl(38,20%,82%)')} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'hsl(82,28%,45%)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'hsl(38,20%,82%)')} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(30,15%,30%)' }}>Тип проекта</label>
                  <select className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'hsl(38,25%,92%)', border: '1px solid hsl(38,20%,82%)', color: 'hsl(30,15%,18%)' }}>
                    <option>Дом под ключ</option>
                    <option>Только фундамент</option>
                    <option>Кровельные работы</option>
                    <option>Фасадные работы</option>
                    <option>Ремонт дома</option>
                    <option>Забор или ограждение</option>
                    <option>Тротуарная плитка</option>
                    <option>Баня</option>
                    <option>Беседка или терраса</option>
                    <option>Другое</option>
                  </select>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-semibold text-white mt-2"
                  style={{ background: 'hsl(82,28%,35%)' }}>
                  Отправить заявку
                </motion.button>
                <p className="text-xs text-center" style={{ color: 'hsl(30,10%,55%)' }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map */}
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
