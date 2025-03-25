import { Section } from '@/components/section';
import styles from '../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <main className={styles.main}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">About <span className={styles.gradientText}>Tymex</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are building the next generation of decentralized e-commerce, where transparency, 
              security, and user control are the foundation of every transaction.
            </p>
          </div>

          {/* Mission Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6">
                At Tymex, we're on a mission to revolutionize e-commerce through blockchain technology. 
                We believe that online marketplaces should be transparent, secure, and truly owned by the community 
                that uses them.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                By leveraging the power of blockchain, we're creating a platform where:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Transactions are transparent and immutable</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Fees are significantly lower than traditional platforms</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Users maintain control of their data and digital identity</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Community governance ensures the platform evolves with user needs</span>
                </li>
              </ul>
              <p className="text-lg text-gray-300">
                Our goal is to create an ecosystem where buyers and sellers can interact with confidence, 
                knowing that the platform is designed to serve their interests, not extract maximum profit.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"></div>
              <Image 
                src="/images/about-us-mission.jpg" 
                alt="Tymex Mission" 
                width={300}
                height={200}
                className="rounded-lg w-full h-auto object-cover relative z-10"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 px-4 py-2 rounded text-sm text-gray-300 z-20">
                Creating a transparent marketplace for everyone
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={styles.card}>
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-300">
                  We constantly push the boundaries of what's possible in e-commerce, exploring new 
                  technologies and approaches to create better user experiences and more efficient 
                  systems for online trading.
                </p>
              </div>

              <div className={styles.card}>
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Transparency</h3>
                <p className="text-gray-300">
                  We believe in full transparency in our operations, code, and governance. All transactions 
                  on our platform are verifiable on the blockchain, and our development process is open 
                  for community review and input.
                </p>
              </div>

              <div className={styles.card}>
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Security</h3>
                <p className="text-gray-300">
                  Security is at the core of everything we build. We implement the highest standards 
                  of cryptographic security and smart contract auditing to ensure that our users' 
                  funds, data, and digital assets are protected at all times.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg"></div>
              <Image 
                src="/images/about-us-story.jpg" 
                alt="Tymex Story" 
                width={300}
                height={200}
                className="rounded-lg w-full h-auto object-cover relative z-10"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded text-sm text-gray-300 z-20">
                From concept to revolutionary platform
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-300 mb-6">
                Tymex was born from a simple observation: despite the revolutionary potential of blockchain 
                technology, e-commerce remains largely centralized, with a few major companies controlling 
                the marketplace and setting the rules.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Our founders, a group of blockchain developers and e-commerce experts, came together in 2022 
                with a shared vision of creating a truly decentralized marketplace that would put power back 
                in the hands of buyers and sellers.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                After months of research and development, we launched our initial prototype in early 2023, 
                quickly gaining attention for our innovative approach to marketplace design and tokenomics.
              </p>
              <p className="text-lg text-gray-300">
                Today, we're building on that foundation, expanding our platform's capabilities and 
                growing our community of users who share our passion for a more fair, transparent, 
                and user-centric approach to online commerce.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 lg:p-12 text-center mb-16 border border-blue-500/10">
            <h2 className="text-3xl font-bold mb-6">Join the Tymex Revolution</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Be part of the movement to transform e-commerce through blockchain technology. 
              Whether you're a buyer, seller, developer, or investor, there's a place for you in our ecosystem.
            </p>
            <div className={styles.ctas}>
              <Link href="/marketplace" className={styles.primary}>
                Explore Marketplace
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <Link href="/our-teams" className={styles.secondary}>
                Meet Our Team
              </Link>
            </div>
          </section>
        </main>
        
        <footer className={styles.footer}>
          <Link href="/white-paper">
            Whitepaper
          </Link>
          <Link href="/roadmap">
            Roadmap
          </Link>
          <Link href="/our-teams">
            Our Team
          </Link>
          <Link href="/marketplace">
            Marketplace
          </Link>
        </footer>
      </div>
    </div>
  );
}
