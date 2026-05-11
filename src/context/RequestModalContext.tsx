import { createContext, useContext, useState, type ReactNode } from 'react';
import RequestModal from '@/components/RequestModal';

interface ModalContextType {
  openModal: (defaultService?: string) => void;
}

const ModalContext = createContext<ModalContextType>({ openModal: () => {} });

export function useRequestModal() {
  return useContext(ModalContext);
}

export function RequestModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [defaultService, setDefaultService] = useState<string | undefined>();

  const openModal = (service?: string) => {
    setDefaultService(service);
    setOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <RequestModal open={open} onClose={() => setOpen(false)} defaultService={defaultService} />
    </ModalContext.Provider>
  );
}
