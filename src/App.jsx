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

export default function App() {
  return (
    <>
      <CustomCursor /> 
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
