import { Section } from '@/components/section';
import styles from '../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Roadmap() {
  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <main className={styles.main}>
          <div className="w-full text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Our <span className={styles.gradientText}>Roadmap</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Strategic development plan outlining key milestones and objectives for creating a revolutionary
              blockchain-powered e-commerce platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-4">
              <div className={`${styles.card} sticky top-24`}>
                <Image 
                  src="/images/roadmap-main.jpg" 
                  alt="Tymex Roadmap" 
                  width={150}
                  height={100}
                  className="rounded-lg w-full h-auto mb-8 object-cover"
                />
                <h2 className="text-2xl font-bold mb-4 text-white">Tymex Development Journey</h2>
                <p className="text-gray-300 mb-6">
                  Our carefully planned development strategy spans multiple phases, from initial concept and platform 
                  foundation to global expansion and advanced feature implementation.
                </p>
                <p className="text-gray-300">
                  Each stage is designed to build upon previous achievements, continually enhancing our
                  platform's capabilities while maintaining our core focus on security, transparency, and user experience.
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-400">Q2 2023</span>
                    <span className="text-purple-400">Q4 2023</span>
                    <span className="text-indigo-400">Q2 2024</span>
                    <span className="text-pink-400">Q4 2024+</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-[35%] bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-white text-sm">Current Progress: 35%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8">
              {/* Phase 1 */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500/20"></div>
                
                <div className="relative mb-8">
                  <div className="absolute -left-4 top-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center mb-4">
                      <h2 className="text-3xl font-bold text-white mr-4">Phase 1: Foundation</h2>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">Q2 2023</span>
                    </div>
                    <p className="text-lg text-gray-300 mb-6">
                      Establishing the core framework and initial infrastructure for the Tymex platform, focusing on
                      research, team building, and conceptual development.
                    </p>
                  </div>
                </div>
                
                <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${styles.card} border-l-4 border-green-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Concept Development</h3>
                    </div>
                    <p className="text-gray-300">
                      Extensive market research, competitive analysis, and initial platform architecture design. 
                      Identification of key blockchain technologies and protocols for implementation.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-green-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Whitepaper Publication</h3>
                    </div>
                    <p className="text-gray-300">
                      Release of comprehensive whitepaper detailing the Tymex vision, technical architecture, 
                      tokenomics model, and strategic roadmap for platform development.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-green-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Team Formation</h3>
                    </div>
                    <p className="text-gray-300">
                      Assembly of core development team with expertise in blockchain technology, 
                      e-commerce platforms, security protocols, and user experience design.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-green-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Smart Contract Development</h3>
                    </div>
                    <p className="text-gray-300">
                      Initial creation and testing of core smart contracts for marketplace transactions, 
                      escrow services, and tokenized reward mechanisms.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Phase 2 */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500/20"></div>
                
                <div className="relative mb-8">
                  <div className="absolute -left-4 top-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center mb-4">
                      <h2 className="text-3xl font-bold text-white mr-4">Phase 2: Development</h2>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">Q4 2023</span>
                    </div>
                    <p className="text-lg text-gray-300 mb-6">
                      Building and implementing the core technical infrastructure of the Tymex platform, with focus
                      on security, scalability, and user experience.
                    </p>
                  </div>
                </div>
                
                <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${styles.card} border-l-4 border-green-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">MVP Release</h3>
                    </div>
                    <p className="text-gray-300">
                      Development and launch of Minimum Viable Product featuring core marketplace functionality, 
                      basic transaction capabilities, and initial user interface.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-green-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Token Deployment</h3>
                    </div>
                    <p className="text-gray-300">
                      Deployment of TYMX token smart contract on mainnet with implementation of tokenomics model,
                      including distribution mechanisms and utility functions.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-yellow-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Security Audits</h3>
                    </div>
                    <p className="text-gray-300">
                      Comprehensive security audits of all smart contracts and platform code by multiple 
                      third-party security firms to ensure maximum protection of user assets.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-yellow-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Private Beta</h3>
                    </div>
                    <p className="text-gray-300">
                      Limited release to selected merchants and users for real-world testing, feedback 
                      collection, and iterative improvements to platform functionality.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Phase 3 */}
              <div className="mb-16 relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500/20"></div>
                
                <div className="relative mb-8">
                  <div className="absolute -left-4 top-2 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center mb-4">
                      <h2 className="text-3xl font-bold text-white mr-4">Phase 3: Growth</h2>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold">Q2 2024</span>
                    </div>
                    <p className="text-lg text-gray-300 mb-6">
                      Expanding the platform's reach and capabilities through strategic partnerships, enhanced features,
                      and global market penetration strategies.
                    </p>
                  </div>
                </div>
                
                <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Public Launch</h3>
                    </div>
                    <p className="text-gray-300">
                      Full public release of the Tymex platform with complete marketplace functionality,
                      token integration, and user-friendly interface for global audience.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Mobile App</h3>
                    </div>
                    <p className="text-gray-300">
                      Development and release of native mobile applications for iOS and Android to provide
                      seamless marketplace access across all devices.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Merchant Partnerships</h3>
                    </div>
                    <p className="text-gray-300">
                      Strategic onboarding of established merchants and brands to expand product offerings
                      and increase platform adoption among consumers.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">DAO Governance</h3>
                    </div>
                    <p className="text-gray-300">
                      Implementation of decentralized governance features allowing token holders to
                      vote on platform upgrades, fee structures, and other key decisions.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Phase 4 */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-pink-500/20"></div>
                
                <div className="relative mb-8">
                  <div className="absolute -left-4 top-2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center mb-4">
                      <h2 className="text-3xl font-bold text-white mr-4">Phase 4: Expansion</h2>
                      <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-semibold">Q4 2024+</span>
                    </div>
                    <p className="text-lg text-gray-300 mb-6">
                      Extending the Tymex ecosystem through innovative features, technological advancements,
                      and broader market penetration across global regions.
                    </p>
                  </div>
                </div>
                
                <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Global Expansion</h3>
                    </div>
                    <p className="text-gray-300">
                      Localization of platform for multiple languages and regions, with targeted marketing 
                      campaigns and regional partnerships to drive adoption worldwide.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Cross-Chain Integration</h3>
                    </div>
                    <p className="text-gray-300">
                      Development of cross-chain compatibility to allow seamless transactions across
                      multiple blockchain networks, expanding user payment options.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Advanced Features</h3>
                    </div>
                    <p className="text-gray-300">
                      Introduction of NFT marketplace functionality, DeFi integrations for flexible payment options,
                      and advanced AI-driven product recommendations.
                    </p>
                  </div>
                  
                  <div className={`${styles.card} border-l-4 border-gray-500`}>
                    <div className="flex items-center mb-4">
                      <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <h3 className="text-xl font-semibold text-white">Ecosystem Growth</h3>
                    </div>
                    <p className="text-gray-300">
                      Establishment of grants program and incubator to support development of third-party 
                      integrations and applications that enhance the Tymex ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 lg:p-12 mt-6 border border-blue-500/10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Join Us on Our Journey</h2>
              <p className="text-lg text-gray-300 mb-8">
                Ready to be part of the blockchain revolution in e-commerce? Explore our whitepaper for in-depth 
                details or visit our marketplace to experience the future of online shopping.
              </p>
              <div className={styles.ctas}>
                <Link href="/white-paper" className={styles.primary}>
                  Read Whitepaper
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <Link href="/marketplace" className={styles.secondary}>
                  Explore Marketplace
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <footer className={styles.footer}>
          <Link href="/about-us">
            About Us
          </Link>
          <Link href="/white-paper">
            Whitepaper
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
