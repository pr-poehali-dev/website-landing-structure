import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/icon';
import { servicesData } from '@/data/servicesData';

const serviceOptions = [
  ...servicesData.map(s => s.title),
  'Другое',
];

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function RequestModal({ open, onClose, defaultService }: RequestModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService ?? '');
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setName(''); setPhone(''); setService(defaultService ?? ''); setComment(''); setSent(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)' }} onClick={handleClose}>
          <motion.div initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden"
            style={{ background: 'hsl(40,30%,97%)', boxShadow: '0 24px 80px rgba(0,0,0,0.25)' }}
            onClick={e => e.stopPropagation()}>

            <button onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
              style={{ background: 'hsl(38,20%,88%)' }}>
              <Icon name="X" size={15} style={{ color: 'hsl(30,15%,30%)' }} />
            </button>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="px-7 pt-7 pb-2">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                      style={{ background: 'hsl(82,22%,88%)', color: 'hsl(82,28%,35%)' }}>
                      Бесплатный расчёт
                    </div>
                    <h2 className="text-2xl font-light mb-1"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
                      Рассчитать стоимость
                    </h2>
                    <p className="text-sm mb-6" style={{ color: 'hsl(30,10%,50%)' }}>
                      Заполните форму — перезвоним в течение 30 минут
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="px-7 pb-7 space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'hsl(30,10%,45%)' }}>
                        Ваше имя *
                      </label>
                      <input required value={name} onChange={e => setName(e.target.value)}
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: 'hsl(38,20%,91%)', border: '1.5px solid hsl(38,20%,85%)', color: 'hsl(30,15%,15%)', fontFamily: 'Golos Text, sans-serif' }}
                        onFocus={e => e.target.style.borderColor = 'hsl(82,28%,45%)'}
                        onBlur={e => e.target.style.borderColor = 'hsl(38,20%,85%)'} />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'hsl(30,10%,45%)' }}>
                        Номер телефона *
                      </label>
                      <input required value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="+7 (999) 000-00-00" type="tel"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: 'hsl(38,20%,91%)', border: '1.5px solid hsl(38,20%,85%)', color: 'hsl(30,15%,15%)', fontFamily: 'Golos Text, sans-serif' }}
                        onFocus={e => e.target.style.borderColor = 'hsl(82,28%,45%)'}
                        onBlur={e => e.target.style.borderColor = 'hsl(38,20%,85%)'} />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'hsl(30,10%,45%)' }}>
                        Вид работ
                      </label>
                      <select value={service} onChange={e => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
                        style={{ background: 'hsl(38,20%,91%)', border: '1.5px solid hsl(38,20%,85%)', color: service ? 'hsl(30,15%,15%)' : 'hsl(30,10%,60%)', fontFamily: 'Golos Text, sans-serif' }}
                        onFocus={e => e.target.style.borderColor = 'hsl(82,28%,45%)'}
                        onBlur={e => e.target.style.borderColor = 'hsl(38,20%,85%)'}>
                        <option value="" disabled>Выберите услугу</option>
                        {serviceOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'hsl(30,10%,45%)' }}>
                        Комментарий
                      </label>
                      <textarea value={comment} onChange={e => setComment(e.target.value)}
                        placeholder="Опишите задачу, размеры объекта, пожелания..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                        style={{ background: 'hsl(38,20%,91%)', border: '1.5px solid hsl(38,20%,85%)', color: 'hsl(30,15%,15%)', fontFamily: 'Golos Text, sans-serif' }}
                        onFocus={e => e.target.style.borderColor = 'hsl(82,28%,45%)'}
                        onBlur={e => e.target.style.borderColor = 'hsl(38,20%,85%)'} />
                    </div>

                    <motion.button type="submit" disabled={loading}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2"
                      style={{ background: 'hsl(82,28%,35%)', opacity: loading ? 0.7 : 1 }}>
                      {loading
                        ? <><Icon name="Loader2" size={16} className="animate-spin" />Отправляем...</>
                        : 'Отправить заявку'}
                    </motion.button>

                    <p className="text-center text-xs" style={{ color: 'hsl(30,10%,60%)' }}>
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  className="px-7 py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'hsl(82,22%,88%)' }}>
                    <Icon name="CheckCircle" size={32} style={{ color: 'hsl(82,28%,38%)' }} />
                  </div>
                  <h3 className="text-2xl font-light mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, serif', color: 'hsl(30,15%,15%)' }}>
                    Заявка принята!
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(30,10%,50%)' }}>
                    Мы свяжемся с вами в ближайшее время
                  </p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="px-8 py-3 rounded-xl font-semibold text-white text-sm"
                    style={{ background: 'hsl(82,28%,35%)' }}>
                    Закрыть
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
