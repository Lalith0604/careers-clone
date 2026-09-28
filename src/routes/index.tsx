import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, Compass, GraduationCap, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import campus from "@/assets/futurefield-campus.jpg";
import guidance from "@/assets/futurefield-guidance.jpg";
import discovery from "@/assets/futurefield-discovery.jpg";
import planning from "@/assets/futurefield-planning.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pathloom — Find a direction that feels like yours" },
      { name: "description", content: "Explore fields of study, think through your options, and take your next step with clarity at Pathloom." },
      { property: "og:title", content: "Pathloom — Find a direction that feels like yours" },
      { property: "og:description", content: "A fresh space to explore study paths and make thoughtful education choices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const pathways = [
  { title: "Explore your interests", category: "DISCOVER", copy: "Start with the subjects that keep you curious. See where those interests could lead.", image: discovery, alt: "Students working through ideas together", id: "interests", topics: ["Design", "Technology", "Humanities"] },
  { title: "Talk it through", category: "REFLECT", copy: "Good questions make big decisions easier. Prepare for a meaningful conversation about your plans.", image: guidance, alt: "Student and advisor discussing study options", id: "guidance", topics: ["Guidance", "Questions", "Choices"] },
  { title: "Make a plan", category: "MOVE FORWARD", copy: "Turn a broad ambition into smaller, practical steps you can take at your own pace.", image: planning, alt: "Student reviewing notes and planning studies", id: "planning", topics: ["Planning", "Applications", "Study"] },
];

const topics = ["Engineering", "Medicine", "Design", "Law", "Business", "Humanities", "Science", "Education"];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const matches = pathways.filter((pathway) =>
    [pathway.title, pathway.copy, ...pathway.topics].some((item) => item.toLowerCase().includes(query.trim().toLowerCase())),
  );
  const matchingTopics = topics.filter((topic) => topic.toLowerCase().includes(query.trim().toLowerCase()));
  const hasSearch = searched && query.trim().length > 0;

  return (
    <div className="pathloom-page">
      <header className="site-header">
        <div className="shell header-inner">
          <a href="/" className="brand" aria-label="Pathloom home"><span className="brand-symbol" aria-hidden="true">✳</span> pathloom<span className="brand-period">.</span></a>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#paths" onClick={() => setMenuOpen(false)}>Explore paths</a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>How to begin</a>
            <a href="#next-step" onClick={() => setMenuOpen(false)}>Your next step</a>
          </nav>
          <Button asChild className="header-cta"><a href="#paths">Start exploring <ArrowRight size={16} /></a></Button>
          <Button variant="ghost" size="icon" className="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src={campus} alt="Students walking together on a university campus" width={1600} height={1008} />
          <div className="hero-shade" />
          <div className="shell hero-inner">
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> A place to start figuring it out</p>
              <h1 id="hero-title">Your next chapter<br />starts with curiosity.</h1>
              <p className="hero-lede">There isn’t one right path. Explore what interests you, ask better questions, and move forward on your own terms.</p>
              <form className="hero-search" onSubmit={(event) => { event.preventDefault(); setSearched(true); }}>
                <Search size={19} aria-hidden="true" />
                <input value={query} onChange={(event) => { setQuery(event.target.value); setSearched(false); }} placeholder="Try design, science, or planning" aria-label="Search topics" />
                <Button type="submit" size="icon" aria-label="Search topics"><ArrowRight size={18} /></Button>
              </form>
              {hasSearch && <div className="search-results" role="status">
                <strong>Explore “{query.trim()}”</strong>
                {matchingTopics.length || matches.length ? <div className="result-links">
                  {matchingTopics.map((topic) => <a href="#topics" key={topic}>{topic} <ArrowRight size={14} /></a>)}
                  {matches.map((pathway) => <a href={`#${pathway.id}`} key={pathway.id}>{pathway.title} <ArrowRight size={14} /></a>)}
                </div> : <p>No matches here yet. Try a broader subject or browse the paths below.</p>}
              </div>}
            </div>
            <span className="hero-caption">THE JOURNEY IS YOURS TO SHAPE</span>
          </div>
        </section>

        <section className="topics-band" id="topics" aria-label="Areas to explore">
          <div className="shell topics-inner"><span>WHAT SPARKS YOUR INTEREST?</span><div className="topics-list">{topics.map((topic) => <a href="#paths" key={topic}>{topic} <ArrowRight size={13} /></a>)}</div></div>
        </section>

        <section className="paths-section shell" id="paths">
          <div className="section-intro"><div><p className="eyebrow">FIND YOUR WAY</p><h2>Start wherever you are.</h2></div><p>You don't need all the answers today. Pick a starting point and see what opens up.</p></div>
          <div className="path-grid">{pathways.map((pathway, index) => <article className="path-item" id={pathway.id} key={pathway.id}>
            <div className="path-image"><img src={pathway.image} alt={pathway.alt} width={1008} height={768} loading="lazy" /></div>
            <div className="path-text"><span className="path-number">0{index + 1} / {pathway.category}</span><h3>{pathway.title}</h3><p>{pathway.copy}</p><a href="#next-step" aria-label={`Learn more about ${pathway.title}`}>Take the next step <ArrowRight size={17} /></a></div>
          </article>)}</div>
        </section>

        <section className="approach-section" id="approach"><div className="shell approach-inner"><div className="approach-heading"><p className="eyebrow">A SIMPLE WAY IN</p><h2>Small questions.<br /><em>Clearer choices.</em></h2></div><div className="approach-steps"><div><Compass aria-hidden="true" /><h3>Notice what draws you in</h3><p>Think about the problems, subjects, and activities you naturally return to.</p></div><div><BookOpen aria-hidden="true" /><h3>Look beyond the name</h3><p>Explore what a subject actually involves before deciding whether it fits.</p></div><div><GraduationCap aria-hidden="true" /><h3>Keep your options open</h3><p>Compare a few possibilities and check the latest details with each institution.</p></div></div></div></section>

        <section className="next-section shell" id="next-step"><div className="next-mark" aria-hidden="true">✳</div><p className="eyebrow">YOUR NEXT STEP</p><h2>It’s okay to begin<br />without a perfect plan.</h2><p>Every meaningful direction starts somewhere. Explore a field, talk to someone you trust, and keep asking questions.</p><Button asChild><a href="#paths">Explore the paths <ArrowRight size={17} /></a></Button></section>
      </main>
      <footer className="site-footer"><div className="shell footer-inner"><a href="/" className="brand"><span className="brand-symbol" aria-hidden="true">✳</span> pathloom<span className="brand-period">.</span></a><p>An independent space for thoughtful education exploration. Always confirm admissions information with official sources.</p><a href="#hero-title">Back to top ↑</a></div></footer>
    </div>
  );
}
