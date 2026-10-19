import { FaBullseye, FaCompass, FaHeart, FaEarthAmericas } from 'react-icons/fa6';

const team = [
  { name: "Rhea Kapoor", role: "Founder and CEO", avatar: "https://i.pravatar.cc/100?img=5" },
  { name: "Aman Verma", role: "Head of Operations", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Sara Malik", role: "Lead Travel Curator", avatar: "https://i.pravatar.cc/100?img=9" },
  { name: "Devon Lee", role: "Customer Success", avatar: "https://i.pravatar.cc/100?img=15" },
];

const About = () => {
  return (
    <main>
      <section id="about" className="page active">
        
        <section className="about-hero">
          <div className="container">
            <h1>We Believe Travel Changes People</h1>
            <p>TravelX was founded to make world-class travel planning accessible, honest, and genuinely exciting — one trip at a time.</p>
          </div>
        </section>

        <section className="container section about-mission">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80" alt="Team planning travel" />
          <div>
            <span className="badge-soft"><FaBullseye /> Our Mission</span>
            <h2>Making unforgettable travel effortless for everyone.</h2>
            <p className="text-muted">
              Founded in 2021, TravelX started as a small team of backpackers frustrated with clunky
              booking sites. Today we help thousands of travelers a month discover destinations that
              fit their budget, pace, and sense of adventure — backed by real support, not just
              a search bar.
            </p>
            <p className="text-muted"><strong>Our vision</strong> is a world where planning a trip feels as exciting as taking one.</p>
          </div>
        </section>

        <section className="section section-muted">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">What drives us</span>
              <h2>Our Values</h2>
            </div>
            <div className="grid grid-3">
              <div className="value-card">
                <span className="value-icon"><FaCompass /></span>
                <h3>Curated Journeys</h3>
                <p>Every itinerary is hand-built by travel experts, not templated packages.</p>
              </div>
              <div className="value-card">
                <span className="value-icon"><FaHeart /></span>
                <h3>Traveler First</h3>
                <p>Transparent pricing, real reviews, and support that actually answers.</p>
              </div>
              <div className="value-card">
                <span className="value-icon"><FaEarthAmericas /></span>
                <h3>Global Network</h3>
                <p>Trusted local partners in over 60 countries for authentic experiences.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container section">
          <div className="section-heading">
            <span className="eyebrow">Meet the people</span>
            <h2>Our Team</h2>
            <p>The humans behind every itinerary.</p>
          </div>
          <div className="grid grid-4">
            {team.map((member, idx) => (
              <div key={idx} className="card team-card">
                <img src={member.avatar} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default About;