import { useRef, useState } from 'react';
import {
  Header,
  Hero,
  About,
  Services,
  Process,
  Reviews,
  Partners,
  Footer,
  CustomCursor
} from './components';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const contactTriggerRef = useRef(null);

  const openContactModal = (triggerElement) => {
    contactTriggerRef.current = triggerElement?.currentTarget ?? triggerElement ?? document.activeElement;
    setModalOpen(true);
  };

  const closeContactModal = () => setModalOpen(false);

  return (
    <>
      <CustomCursor /> 
      <Header onOpenContact={openContactModal} />
      <main className="main">
        <Hero />
        <About />
        <Services />
        <Process />
        <Reviews />
        <Partners />
      </main>
      <Footer onOpenContact={openContactModal} />
      {modalOpen && (
        <ContactModal
          onClose={closeContactModal}
          returnFocusRef={contactTriggerRef}
        />
      )}
    </>
  );
}
