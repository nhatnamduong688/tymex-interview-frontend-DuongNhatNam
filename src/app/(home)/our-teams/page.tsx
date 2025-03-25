import { Section } from '@/components/section';
import styles from '../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function OurTeams() {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Co-Founder',
      bio: 'Former blockchain developer with 10+ years of experience in e-commerce platforms. John leads the strategic vision and product development at Tymex.',
      image: '/images/team/placeholder.png'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO & Co-Founder',
      bio: 'Blockchain architect with a background in distributed systems. Sarah oversees all technical aspects of the Tymex platform and leads our engineering team.',
      image: '/images/team/placeholder.png'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Product Officer',
      bio: 'Former UX lead at major e-commerce companies, Michael brings user-centered design principles to create intuitive and accessible experiences on our platform.',
      image: '/images/team/placeholder.png'
    },
    {
      name: 'Aisha Patel',
      role: 'Chief Marketing Officer',
      bio: 'With experience in both traditional and digital marketing for tech startups, Aisha drives our marketing strategy and community engagement efforts.',
      image: '/images/team/placeholder.png'
    },
    {
      name: 'David Rodriguez',
      role: 'Head of Blockchain',
      bio: 'Cryptography expert and smart contract developer who ensures our platform maintains the highest standards of security and technical excellence.',
      image: '/images/team/placeholder.png'
    },
    {
      name: 'Emily Tanaka',
      role: 'Head of Business Development',
      bio: 'Former consultant with extensive experience in partnerships and growth strategies for tech companies in global markets.',
      image: '/images/team/placeholder.png'
    }
  ];

  const advisors = [
    {
      name: 'Dr. Robert Wilson',
      role: 'Blockchain Economics Advisor',
      bio: 'Professor of Economics specializing in cryptocurrency markets and token economics. Provides guidance on Tymex&apos;s economic model and incentive structures.',
      image: '/images/team/placeholder.png'
    },
    {
      name: 'Lisa Banks',
      role: 'Legal & Compliance Advisor',
      bio: 'Specialized attorney in blockchain regulation and compliance. Advises on legal frameworks across different jurisdictions.',
      image: '/images/team/placeholder.png'
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <main className={styles.main}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Our <span className={styles.gradientText}>Team</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the passionate group of innovators, developers, and visionaries working together to revolutionize e-commerce through blockchain technology.
            </p>
          </div>

          {/* Leadership Section */}
          <section className="mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 p-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/10">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
                <h2 className="text-3xl font-bold mb-6">Leadership Team</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our leadership team brings together decades of combined experience in blockchain development, e-commerce, 
                  finance, and technology innovation. United by a shared vision of decentralized commerce, our team is 
                  dedicated to building the future of online marketplaces.
                </p>
                <p className="text-lg text-gray-300">
                  With backgrounds spanning from Silicon Valley startups to established financial institutions, 
                  our diverse leadership group provides the perfect balance of innovative thinking and strategic execution.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image 
                  src="/images/team/leadership-team.jpg" 
                  alt="Tymex Leadership Team" 
                  width={150}
                  height={100}
                  className="rounded-lg object-cover shadow-2xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* CEO */}
              <div className={`${styles.card} hover:translate-y-[-5px] transition-transform duration-300`}>
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src="/images/team/ceo.jpg" 
                    alt="Sarah Johnson - CEO" 
                    width={100}
                    height={100}
                    className="w-full h-auto object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="flex gap-3">
                      <a href="#" className="text-white hover:text-blue-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-blue-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Sarah Johnson</h3>
                <h4 className="text-blue-400 font-medium mb-4">Chief Executive Officer</h4>
                <p className="text-gray-300">
                  Former fintech executive with 15+ years experience in blockchain and digital payment systems. Led two successful startups prior to founding Tymex.
                </p>
              </div>

              {/* CTO */}
              <div className={`${styles.card} hover:translate-y-[-5px] transition-transform duration-300`}>
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src="/images/team/cto.jpg" 
                    alt="Michael Chen - CTO" 
                    width={100}
                    height={100}
                    className="w-full h-auto object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="flex gap-3">
                      <a href="#" className="text-white hover:text-blue-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-blue-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Michael Chen</h3>
                <h4 className="text-blue-400 font-medium mb-4">Chief Technology Officer</h4>
                <p className="text-gray-300">
                  Blockchain architect with expertise in smart contract development and distributed systems. Previously led development teams at major crypto projects.
                </p>
              </div>

              {/* COO */}
              <div className={`${styles.card} hover:translate-y-[-5px] transition-transform duration-300`}>
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src="/images/team/coo.jpg" 
                    alt="Alex Rodriguez - COO" 
                    width={100}
                    height={100}
                    className="w-full h-auto object-cover aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="flex gap-3">
                      <a href="#" className="text-white hover:text-blue-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-blue-400 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Alex Rodriguez</h3>
                <h4 className="text-blue-400 font-medium mb-4">Chief Operations Officer</h4>
                <p className="text-gray-300">
                  Operations expert with experience scaling e-commerce platforms. Former executive at a major online marketplace with focus on global expansion.
                </p>
              </div>
            </div>
          </section>

          {/* Advisory Board */}
          <section className="mb-20">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-10 p-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/10">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pl-10">
                <h2 className="text-3xl font-bold mb-6">Advisory Board</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our advisory board comprises industry veterans from blockchain, finance, e-commerce, and regulatory 
                  sectors. Their collective expertise guides our strategic decisions and helps navigate the complex 
                  intersection of blockchain technology and commercial applications.
                </p>
                <p className="text-lg text-gray-300">
                  With their guidance, we ensure that Tymex remains at the forefront of industry developments while 
                  implementing best practices in security, scalability, and user experience.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image 
                  src="/images/team/advisory-board.jpg" 
                  alt="Tymex Advisory Board" 
                  width={150}
                  height={100}
                  className="rounded-lg object-cover shadow-2xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Advisors */}
              <div className={`${styles.card} hover:translate-y-[-5px] transition-transform duration-300`}>
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src="/images/team/advisor-1.jpg" 
                    alt="Dr. Emma Patel" 
                    width={90}
                    height={90}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Dr. Emma Patel</h3>
                <h4 className="text-purple-400 font-medium mb-4">Blockchain Economics</h4>
                <p className="text-gray-300 text-sm">
                  Professor of Economics specializing in tokenomics and blockchain incentive structures.
                </p>
              </div>

              <div className={`${styles.card} hover:translate-y-[-5px] transition-transform duration-300`}>
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src="/images/team/advisor-2.jpg" 
                    alt="James Wilson" 
                    width={90}
                    height={90}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">James Wilson</h3>
                <h4 className="text-purple-400 font-medium mb-4">E-commerce Strategy</h4>
                <p className="text-gray-300 text-sm">
                  Former executive at global e-commerce companies with expertise in marketplace growth.
                </p>
              </div>

              <div className={`${styles.card} hover:translate-y-[-5px] transition-transform duration-300`}>
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src="/images/team/advisor-3.jpg" 
                    alt="Sophia Kim" 
                    width={90}
                    height={90}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Sophia Kim</h3>
                <h4 className="text-purple-400 font-medium mb-4">Regulatory Affairs</h4>
                <p className="text-gray-300 text-sm">
                  Legal expert specializing in blockchain regulation and compliance across global markets.
                </p>
              </div>

              <div className={`${styles.card} hover:translate-y-[-5px] transition-transform duration-300`}>
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src="/images/team/advisor-4.jpg" 
                    alt="David Martinez" 
                    width={90}
                    height={90}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">David Martinez</h3>
                <h4 className="text-purple-400 font-medium mb-4">Security Architecture</h4>
                <p className="text-gray-300 text-sm">
                  Cybersecurity expert with focus on blockchain security and smart contract auditing.
                </p>
              </div>
            </div>
          </section>

          {/* Development Team */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Development Team</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Behind Tymex's innovative technology is a talented team of developers, designers, and product specialists dedicated to creating the future of decentralized commerce.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`${styles.card} text-center p-8`}>
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Blockchain Engineers</h3>
                <p className="text-gray-300">
                  Our blockchain team specializes in smart contract development, security implementation, and cross-chain interoperability solutions. They're responsible for the robust foundation that powers our marketplace.
                </p>
              </div>

              <div className={`${styles.card} text-center p-8`}>
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Frontend Specialists</h3>
                <p className="text-gray-300">
                  Our frontend team creates intuitive, beautiful interfaces that make blockchain technology accessible to everyone. They focus on user experience, responsive design, and seamless interactions.
                </p>
              </div>

              <div className={`${styles.card} text-center p-8`}>
                <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Security & QA Team</h3>
                <p className="text-gray-300">
                  Our security specialists and quality assurance experts ensure that Tymex maintains the highest standards of security, performance, and reliability through rigorous testing and continual improvement.
                </p>
              </div>
            </div>
          </section>

          {/* Join Our Team */}
          <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 lg:p-12 mb-16 border border-blue-500/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                We're always looking for talented individuals passionate about blockchain technology and e-commerce to join our growing team.
              </p>
              <div className={styles.ctas}>
                <Link href="/careers" className={styles.primary}>
                  View Open Positions
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <Link href="/contact" className={styles.secondary}>
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold mb-3">Innovative Environment</h3>
                <p className="text-gray-300">
                  Work at the cutting edge of blockchain and e-commerce technology with opportunities to contribute to groundbreaking projects.
                </p>
              </div>
              <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold mb-3">Remote-First Culture</h3>
                <p className="text-gray-300">
                  Enjoy the flexibility of our remote-first approach with team members collaborating across multiple time zones worldwide.
                </p>
              </div>
              <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold mb-3">Growth Opportunities</h3>
                <p className="text-gray-300">
                  Continuous learning, professional development support, and opportunities to grow alongside our rapidly expanding platform.
                </p>
              </div>
            </div>
          </section>
        </main>
        
        <footer className={styles.footer}>
          <Link href="/about-us">
            About Us
          </Link>
          <Link href="/white-paper">
            Whitepaper
          </Link>
          <Link href="/roadmap">
            Roadmap
          </Link>
          <Link href="/marketplace">
            Marketplace
          </Link>
        </footer>
      </div>
    </div>
  );
}
