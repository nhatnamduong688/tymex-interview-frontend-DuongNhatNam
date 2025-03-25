import styles from '../page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function WhitePaper() {
  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <main className={styles.main}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Tymex <span className={styles.gradientText}>Whitepaper</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of our vision for a blockchain-powered e-commerce platform that 
              revolutionizes how people buy and sell online.
            </p>
          </div>

          {/* Executive Summary */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Executive Summary</h2>
              <p className="text-lg text-gray-300 mb-6">
                Tymex is a decentralized e-commerce platform built on blockchain technology that aims to address 
                the fundamental limitations of traditional online marketplaces. Our platform leverages the 
                power of distributed ledger technology to create a more transparent, secure, and user-centric 
                trading environment.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                By eliminating unnecessary intermediaries and implementing smart contract-based 
                transactions, Tymex significantly reduces fees while providing enhanced security features 
                and streamlined dispute resolution mechanisms.
              </p>
              <p className="text-lg text-gray-300">
                The TYMX token serves as the native utility token of the ecosystem, providing governance rights, 
                transaction fee discounts, and access to premium features. This document outlines our vision, 
                technical architecture, tokenomics model, and strategic roadmap for platform development.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"></div>
              <Image 
                src="/images/whitepaper-summary.jpg" 
                alt="Tymex Whitepaper" 
                width={150}
                height={100}
                className="rounded-lg w-full h-auto object-cover relative z-10"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 px-4 py-2 rounded text-sm text-gray-300 z-20">
                Reimagining e-commerce through blockchain technology
              </div>
            </div>
          </section>

          {/* Document Overview */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Document Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={styles.card}>
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">The Problem</h3>
                <p className="text-gray-300">
                  Analysis of current e-commerce marketplaces, their limitations, high fees, 
                  centralized control, and the lack of transparency that affects both merchants and consumers.
                </p>
              </div>

              <div className={styles.card}>
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Our Solution</h3>
                <p className="text-gray-300">
                  Detailed explanation of Tymex's architecture, including our blockchain implementation, 
                  smart contract features, and how we solve the key problems of traditional marketplaces.
                </p>
              </div>

              <div className={styles.card}>
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Token Economics</h3>
                <p className="text-gray-300">
                  Comprehensive overview of the TYMX token utility, distribution model, governance mechanisms,
                  and the economic incentives that drive platform growth and user adoption.
                </p>
              </div>
            </div>
          </section>

          {/* The Problem Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 lg:p-12 mb-10 border border-blue-500/10">
              <h2 className="text-3xl font-bold mb-6">The Problem</h2>
              <p className="text-lg text-gray-300 mb-6">
                Traditional e-commerce platforms suffer from several fundamental issues that limit their 
                effectiveness and fairness for both merchants and consumers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    Centralized Control
                  </h3>
                  <p className="text-gray-300">
                    Major platforms hold excessive power over merchants, dictating terms, fees, and visibility. 
                    This centralization leads to policies that primarily benefit the platform rather than its users.
                  </p>
                </div>

                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    High Fees
                  </h3>
                  <p className="text-gray-300">
                    Traditional platforms charge substantial fees (often 15-30% of the sale price), cutting into 
                    merchant profits and forcing higher prices for consumers. These fees support bloated middleman 
                    structures.
                  </p>
                </div>

                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    Limited Payment Options
                  </h3>
                  <p className="text-gray-300">
                    Most platforms restrict payment methods to traditional financial systems, excluding users 
                    without access to banking services and limiting cross-border commerce with high fees and 
                    lengthy processing times.
                  </p>
                </div>

                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    Data Privacy Concerns
                  </h3>
                  <p className="text-gray-300">
                    Centralized platforms collect and monetize vast amounts of user data, often without transparent 
                    policies. Users have little control over their personal information and digital footprint.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Solution Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-8 lg:p-12 mb-10 border border-purple-500/10">
              <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
              <p className="text-lg text-gray-300 mb-6">
                Tymex addresses these challenges through a decentralized marketplace platform built on blockchain 
                technology, offering:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Decentralized Marketplace
                  </h3>
                  <p className="text-gray-300">
                    No single entity controls the platform. Governance is distributed among token holders, 
                    ensuring policies evolve to benefit the entire community rather than a centralized authority.
                  </p>
                </div>

                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Tokenized Economy
                  </h3>
                  <p className="text-gray-300">
                    The TYMX token powers our ecosystem, providing utility for transactions, governance voting, 
                    loyalty rewards, and access to premium features with substantially lower fees than traditional platforms.
                  </p>
                </div>

                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Smart Contract Escrow
                  </h3>
                  <p className="text-gray-300">
                    Automated escrow contracts ensure payment release only when predetermined conditions are met, 
                    eliminating the need for blind trust between transacting parties and reducing dispute rates.
                  </p>
                </div>

                <div className="bg-black/20 p-6 rounded-lg border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Blockchain-Based Reputation
                  </h3>
                  <p className="text-gray-300">
                    Our immutable reputation system prevents manipulation and fake reviews, creating reliable 
                    trust indicators for buyers and sellers based on verified transaction history.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Token Economics */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Token Economics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className={styles.card}>
                <h3 className="text-2xl font-bold mb-6">TYMX Token Utility</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <span className="font-semibold text-white">Transaction Fees:</span>
                      <p className="text-gray-300 mt-1">Users can pay platform fees in TYMX tokens at a discounted rate compared to traditional currency payments.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <span className="font-semibold text-white">Governance:</span>
                      <p className="text-gray-300 mt-1">Token holders can vote on platform upgrades, fee structures, and other key decisions proportional to their holdings.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <span className="font-semibold text-white">Staking Rewards:</span>
                      <p className="text-gray-300 mt-1">Users can stake TYMX tokens to earn passive income from a portion of platform transaction fees.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <span className="font-semibold text-white">Premium Features:</span>
                      <p className="text-gray-300 mt-1">Access to advanced selling tools, enhanced visibility, and premium support services for token holders.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className={styles.card}>
                <h3 className="text-2xl font-bold mb-6">Token Distribution</h3>
                <div className="bg-black/30 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-2 gap-y-4 text-center">
                    <div>
                      <span className="text-blue-400 font-bold text-lg">40%</span>
                      <p className="text-gray-300 text-sm">Community & Users</p>
                    </div>
                    <div>
                      <span className="text-purple-400 font-bold text-lg">20%</span>
                      <p className="text-gray-300 text-sm">Team & Advisors</p>
                    </div>
                    <div>
                      <span className="text-pink-400 font-bold text-lg">15%</span>
                      <p className="text-gray-300 text-sm">Platform Development</p>
                    </div>
                    <div>
                      <span className="text-indigo-400 font-bold text-lg">10%</span>
                      <p className="text-gray-300 text-sm">Marketing & Partnerships</p>
                    </div>
                    <div>
                      <span className="text-green-400 font-bold text-lg">10%</span>
                      <p className="text-gray-300 text-sm">Liquidity Pool</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-bold text-lg">5%</span>
                      <p className="text-gray-300 text-sm">Ecosystem Growth Fund</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">
                  Total supply: 1,000,000,000 TYMX tokens with a deflationary mechanism through token burning from a 
                  percentage of transaction fees, creating sustainable token value growth.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 lg:p-12 text-center mb-16 border border-blue-500/10">
            <h2 className="text-3xl font-bold mb-6">Ready to Learn More?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our platform roadmap or visit our marketplace to experience the future of decentralized e-commerce.
            </p>
            <div className={styles.ctas}>
              <Link href="/roadmap" className={styles.primary}>
                View Roadmap
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <Link href="/marketplace" className={styles.secondary}>
                Explore Marketplace
              </Link>
            </div>
          </section>
        </main>
        
        <footer className={styles.footer}>
          <Link href="/about-us">
            About Us
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
