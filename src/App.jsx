import {
  Header,
  Hero,
  About,
  Services,
  Process,
  Reviews,
  Partners,
  Footer,
} from './components';

export default function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <About />
        <Services />
        <Process />
        <Reviews />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
