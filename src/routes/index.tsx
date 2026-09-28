import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Landmark,
  Menu,
  MessageCircle,
  Search,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Careers360 — Empowering Students, Building Futures" },
      {
        name: "description",
        content: "Discover colleges, exams, courses, counselling and career opportunities with Careers360.",
      },
      { property: "og:title", content: "Careers360 — Empowering Students, Building Futures" },
      {
        property: "og:description",
        content: "Search colleges, exams and courses, compare options and plan your future with Careers360.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersHome,
});

const news = [
  {
    image: "/images/careers360/news-cbse.jpg",
    tag: "Live",
    title: "CBSE Date Sheet 2027 LIVE: Class 10, 12 exam dates announcement soon at cbse.gov.in",
    time: "September 28, 2026, 11:00 PM IST",
  },
  {
    image: "/images/careers360/news-court.jpg",
    title: "Mumbai: 12 get 6 months in jail for attacking teacher in civic school",
    time: "September 28, 2026, 10:28 PM IST",
  },
  {
    image: "/images/careers360/news-minister.jpg",
    title: "Pralhad Joshi, French higher edu minister hold talks on strengthening research",
    time: "September 28, 2026, 10:22 PM IST",
  },
];

const navItems = [
  ["Engineering", GraduationCap],
  ["Medicine", Stethoscope],
  ["Design", Sparkles],
  ["Law", Landmark],
  ["Management and Business Administration", BookOpen],
  ["University", Landmark],
  ["Others", SlidersHorizontal],
  ["School", GraduationCap],
] as const;

const predictorLinks = ["JEE Main", "GATE", "NEET", "NEET PG", "MHT CET", "CLAT"];
const examLinks = ["JEE Main", "GATE", "CAT", "CLAT", "NEET", "BITSAT", "CUET", "VITEEE"];

function CareersHome() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const activeNews = useMemo(
    () => Array.from({ length: 3 }, (_, offset) => news[(newsIndex + offset) % news.length]),
    [newsIndex],
  );

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="careers-page">
      <header className="site-header">
        <div className="topbar shell">
          <Button className="mobile-menu" variant="ghost" size="icon" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu">
            {mobileOpen ? <X /> : <Menu />}
          </Button>
          <a className="brand" href="/" aria-label="Careers360 home">
            <span>CAREERS</span><b>360</b>
          </a>
          <form className="header-search" onSubmit={handleSearch}>
            <Search aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Colleges, Exams, Schools & more" aria-label="Search colleges, exams and schools" />
          </form>
          <div className="header-actions">
            <Button variant="ghost" size="icon" aria-label="Messages"><MessageCircle /></Button>
            <span className="action-divider" />
            <Button variant="ghost" size="icon" aria-label="Share"><Share2 /></Button>
            <Button className="login-button" size="sm">Login</Button>
          </div>
        </div>
        <nav className={`category-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Explore categories">
          <div className="category-inner shell">
            {navItems.map(([label, Icon]) => (
              <a href="#explore" className="category-link" key={label}>
                <Icon aria-hidden="true" /> <span>{label}</span><ChevronDown aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content shell">
            <div className="hero-copy">
              <p className="eyebrow">Your future starts here</p>
              <h1>Empowering Students<br />Building Futures</h1>
              <form className="hero-search" onSubmit={handleSearch}>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Colleges, Exams, Courses & more" aria-label="Search colleges, exams and courses" />
                <Button type="submit" variant="ghost" size="icon" aria-label="Search"><Search /></Button>
              </form>
              {submitted && <p className="search-result">Showing results for <strong>{query || "your search"}</strong></p>}
              <div className="popular-links">
                <a href="#predictors"><span>POPULAR</span>JEE Main College Predictor</a>
                <a href="#predictors"><span>POPULAR</span>NEET College Predictor</a>
              </div>
            </div>
            <div className="predictor-visual">
              <img src="/images/careers360/predictor.avif" alt="College predictor dashboard" />
              <div className="visual-copy">
                <p>Turn Your <strong>Score</strong> into<br /><strong>College Opportunities</strong></p>
                <small>Predict your admission chances across<br />colleges based on exam performance,<br />category, and preferences.</small>
                <Button>Explore College Predictors <ArrowRight /></Button>
              </div>
              <div className="verified-pill">✦ &nbsp;<strong>Verified Data</strong><small>Official counselling</small></div>
              <div className="cutoff-card"><strong>Cutoff Trend</strong><small>Last 3 years</small><div className="bars"><i /><i /><i /><i /><i /></div></div>
            </div>
          </div>
          <div className="hero-dots"><i /><i className="active" /><i /></div>
          <NewsStrip items={activeNews} onNext={() => setNewsIndex((index) => (index + 1) % news.length)} onPrevious={() => setNewsIndex((index) => (index + news.length - 1) % news.length)} />
        </section>

        <section className="feature-section shell" id="explore">
          <SectionHeading title="Counselling" copy="We ease your biggest doubts with personalized Video Counselling from our Curated Experts and Answers from the student community" />
          <div className="feature-grid counselling-grid">
            <img className="feature-illustration" src="/images/careers360/counselling.png" alt="Students exploring colleges" />
            <div className="feature-card-stack">
              <InfoCard icon={<GraduationCap />} title="Expert Counselling" copy="Get personalized guidance from expert counsellors - choose your stream to get started." links={["ENGINEERING UG", "MEDICINE UG"]} />
              <InfoCard icon={<MessageCircle />} title="QnA" copy="1 Million+ Questions answered by the student community within 24 hours each" links={["ASK NOW"]} />
            </div>
          </div>
        </section>

        <section className="feature-band" id="predictors">
          <div className="feature-section shell">
            <SectionHeading title="Data" copy="We simplify information for you on over 40,673 Colleges, 674 Exams and 355,172 Courses across domains and regions all over India" />
            <div className="feature-grid data-grid">
              <div className="data-list">
                <InfoCard icon={<Landmark />} title="Rankings" copy="1,500 Colleges Ranked based on transparent, accurate, government-approved, student-friendly data" links={["Top Engineering Colleges", "Top MBA Colleges", "Top Law Colleges"]} />
                <InfoCard icon={<BookOpen />} title="Exams" copy="Easy information and downloads on exam preparation, dates, counselling, syllabus and more" links={examLinks} />
              </div>
              <img className="feature-illustration" src="/images/careers360/data.png" alt="College and course data" />
            </div>
          </div>
        </section>

        <section className="feature-section shell prediction-section">
          <SectionHeading title="Prediction" copy="We predict your College admission chances and Ranks based on years of historical data and advanced Analytics to help you plan in advance" />
          <div className="feature-grid prediction-grid">
            <img className="feature-illustration" src="/images/careers360/prediction.png" alt="College admission prediction" />
            <div className="data-list">
              <InfoCard icon={<Sparkles />} title="College Predictors" copy="Know your College Admission chances at the course-level based on domicile, caste, gender etc" links={predictorLinks} />
              <InfoCard icon={<SlidersHorizontal />} title="Rank Predictors" copy="Predict your Rank before the actual results based on your performance in the exam and get in-depth insights" links={["JEE Main Rank Predictor", "GATE Score Predictor", "NEET Rank Predictor"]} />
            </div>
          </div>
        </section>

        <section className="course-section">
          <div className="shell course-inner">
            <div><p className="eyebrow">Learn and grow</p><h2>Online Courses<br />and Certifications</h2><p>Upskill and reskill to empower your career journey with Online Courses and Certifications</p><Button>Explore Courses <ArrowRight /></Button></div>
            <div className="course-tags"><span>Digital marketing</span><span>Cyber Security</span><span>Artificial Intelligence</span><span>Business Analytics</span><span>Data Science</span><span>Machine Learning</span></div>
          </div>
        </section>

        <section className="impact-section shell">
          <SectionHeading title="Our Impact" copy="Real stories of students and parents who turned career dreams into reality with Careers360's expert counselling and informed guidance." />
          <div className="impact-tabs"><Button variant="outline">Video Stories</Button><Button variant="ghost">Written Reviews</Button></div>
        </section>
      </main>
      <footer className="footer"><div className="shell footer-inner"><a className="brand" href="/"><span>CAREERS</span><b>360</b></a><p>Empowering students to make informed career decisions.</p><Button variant="outline">Download Careers360 App</Button></div></footer>
    </div>
  );
}

function NewsStrip({ items, onNext, onPrevious }: { items: typeof news; onNext: () => void; onPrevious: () => void }) {
  return <div className="news-strip shell"><div className="news-heading"><strong>Latest News and Notifications</strong><a href="#news">View All</a></div><div className="news-items">{items.map((item) => <a className="news-item" href="#news" key={item.title}><img src={item.image} alt="" /><div><strong>{item.tag && <em>{item.tag}</em>}{item.title}</strong><small>{item.time}</small></div></a>)}</div><Button variant="outline" size="icon" className="news-next" onClick={onNext} aria-label="Next news"><ChevronRight /></Button><Button variant="outline" size="icon" className="news-prev" onClick={onPrevious} aria-label="Previous news"><ChevronLeft /></Button></div>;
}

function SectionHeading({ title, copy }: { title: string; copy: string }) {
  return <div className="section-heading"><h2>{title}</h2><p>{copy}</p></div>;
}

function InfoCard({ icon, title, copy, links }: { icon: React.ReactNode; title: string; copy: string; links: string[] }) {
  return <article className="info-card"><div className="info-title">{icon}<h3>{title}</h3></div><p>{copy}</p><div className="info-links">{links.map((link) => <a href="#explore" key={link}>{link} <ArrowRight /></a>)}</div></article>;
}
