import { Accessibility, Eye, Ear, Brain, Heart, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  { icon: Eye, title: 'Visual Assistance', desc: 'High contrast, dark mode, color inversion, reading guides, and zoom controls.' },
  { icon: Ear, title: 'Voice Reader', desc: 'Select any text and have it read aloud with adjustable speed and pitch.' },
  { icon: Brain, title: 'Cognitive Support', desc: 'Reduce motion, simplify layouts, and enable focus mode to reduce distractions.' },
  { icon: Accessibility, title: 'Motor Accessibility', desc: 'Full keyboard navigation, big cursor mode, and screen reader optimized.' },
];

const highlights = [
  'WCAG 2.2 AA compliant',
  'No login required',
  'Preferences auto-saved',
  'Works with screen readers',
  'Keyboard accessible',
  'Free & open',
];

const Index = () => {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Hero */}
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-32 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Heart size={16} aria-hidden="true" />
            <span className="text-sm font-medium">Made with care for everyone</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Web Should Be<br />
            <span className="text-accent">Accessible to All</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
            An accessibility assistant that helps blind, low-vision, dyslexic, and motor-impaired users
            navigate the web with ease. Click the button in the bottom-right corner to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const btn = document.querySelector<HTMLButtonElement>('[aria-label="Open accessibility settings"]');
                btn?.click();
              }}
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-4 focus:ring-primary-foreground/50"
            >
              <Accessibility size={20} aria-hidden="true" />
              Try It Now
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="a11y-dimmable">
        {/* Features */}
        <section className="container mx-auto px-6 py-20 max-w-5xl" aria-labelledby="features-heading">
          <h2 id="features-heading" className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Designed for Every User
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14 text-lg">
            Comprehensive tools that adapt the web to your needs — not the other way around.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <article
                key={f.title}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="bg-secondary/50 a11y-dimmable" aria-labelledby="highlights-heading">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <h2 id="highlights-heading" className="font-heading text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
              Built Right
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border"
                >
                  <CheckCircle size={20} className="text-accent shrink-0" aria-hidden="true" />
                  <span className="font-medium text-foreground">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo text for TTS */}
        <section className="container mx-auto px-6 py-20 max-w-3xl" aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="font-heading text-2xl md:text-3xl font-bold text-center mb-6 text-foreground">
            Try the Voice Reader
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Select any text below, then press <kbd className="px-2 py-1 bg-secondary rounded text-sm font-mono">Alt+R</kbd> or
            use the Voice Reader in the sidebar.
          </p>
          <blockquote className="bg-card border border-border rounded-xl p-8 text-lg leading-relaxed text-foreground italic">
            "The power of the Web is in its universality. Access by everyone regardless of disability is an
            essential aspect."
            <footer className="mt-4 text-sm text-muted-foreground not-italic">
              — Tim Berners-Lee, W3C Director and inventor of the World Wide Web
            </footer>
          </blockquote>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card a11y-dimmable">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            AccessibleWeb — Accessibility assistant for a more inclusive internet. ♿
          </p>
        </div>
      </footer>
    </>
  );
};

export default Index;
