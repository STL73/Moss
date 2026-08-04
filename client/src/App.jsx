import { Hero, PopularProducts, HandMade, Services, SpecialOffers, CustomerReviews, Subscribe, Footer } from './sections';
import Nav from './components/Nav';
function App() {
  return (
    <main className="relative">
      <Nav />
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section className="padding">
        <HandMade />
      </section>
      <section className="padding-x py-10">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffers />
      </section>
      <section className="padding bg-bg-green">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full">
        <Subscribe />
      </section>
      <section className="bg-text-accent padding-x padding-t pb-8">
        <Footer />
      </section>

    </main>
  )
}

export default App
