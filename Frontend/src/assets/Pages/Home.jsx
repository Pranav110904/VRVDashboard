import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
        <Navbar/>

        <main className='font-raleway'>
    <section class="bg-[#29292f] py-16 px-4 flex justify-center">
      <div class="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-[48px]">
        <div class="text-center flex flex-col md:text-left mb-4 md:mb-0 gap-2">
          <h1 class="text-[16px] font-semibold text-[#bac3ff]">#1 on Cyber Defense</h1>
          <h2 class="text-[54px] text-white font-bold">Global Leader in Cybersecurity</h2>
          <p class="text-[16px] text-white">
            Founded in 2020 in Chennai, Tamil Nadu, VRV Security has rapidly emerged as a global leader in cybersecurity, specializing in AI-driven solutions and advanced cloud-based Vulnerability Assessment and Penetration Testing (VAPT).
          </p>
        </div>
        <div class="">
          <img className='rounded-[4px] w-[1300px]' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732642629327x252856939717899230%2Fmodern-equipped-computer-lab.jpg?w=768&h=512&auto=compress&dpr=1&fit=max" alt="Cybersecurity team"  />
        </div>
      </div>
    </section>

    <section class="bg-[#bac3ff] py-8 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-[24px] text-center font-bold text-[#222c61] ">The #1 Cybersecurity Expert</h2>
        <p className=' text-center mb-6 text-[#222c61]'>Trusted by Fortune 500 companies and government organizations</p>
        <div class="flex flex-wrap justify-center gap-4">
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641422930x898652403163391400%2Fcna--600.png?w=128&h=128&auto=compress&dpr=1&fit=max" alt="CVA"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641428223x497536530428506900%2Faveva_logo.jpeg?w=128&h=128&auto=compress&dpr=1&fit=max" alt="AVEVA"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641434352x477057666202499000%2Fsoftcat6347.jpg?w=128&h=128&auto=compress&dpr=1&fit=max" alt="Softcat"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641553905x114421882164011500%2Fdolat-investments--600.png?w=128&h=128&auto=compress&dpr=1&fit=max" alt="DOLAT"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641548242x912870428040764700%2F1631357188871.jpeg?w=128&h=128&auto=compress&dpr=1&fit=max" alt="DOLAT"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641625582x408526728524461800%2Fimages.png?w=128&h=128&auto=compress&dpr=1&fit=max" alt="KNARA"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641570375x124751013450602240%2Fnavin-fluorine-international-l--600.png?w=128&h=128&auto=compress&dpr=1&fit=max" alt="Nutflex"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641515415x252675644001752350%2Fraffles-medical--600.png?w=128&h=128&auto=compress&dpr=1&fit=max" alt="AEM"  />
          <img className=' h-24 rounded' src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732641524786x812462903976150100%2Faem--600.png?w=128&h=128&auto=compress&dpr=1&fit=max" alt="AEM"  />
        </div>
      </div>
    </section>

    <section class="bg-[#121318] py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-[40px] text-center text-white font-bold mb-6">Discover Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className='bg-[#434659] p-[24px]'>
            <h3 class="text-[18px] font-bold mb-2 text-white ">Data Protection Services</h3>
            <p class="text-[16x] text-white">Safeguard sensitive information from breaches and mishandling.</p>
          </div>
          <div className='bg-[#434659] p-[24px]'>
            <h3 class="text-[18px] font-bold mb-2 text-white ">Compliance Audits</h3>
            <p class="text-[16x] text-white">Ensure your operations align with industry standards and regulations.</p>
          </div>
          <div className='bg-[#434659] p-[24px]'>
            <h3 class="text-[18px] font-bold mb-2 text-white ">Supply Chain Security</h3>
            <p class="text-[16x] text-white">Evaluate and secure the integrity of your supply chain networks.</p>
          </div>
          <div className='bg-[#434659] p-[24px]'>
            <h3 class="text-[18px] font-bold mb-2 text-white ">ICS/SCADA Security Assessments</h3>
            <p class="text-[16x] text-white">Enhance the cybersecurity posture of industrial control systems.</p>
          </div>
          <div className='bg-[#434659] p-[24px]'> 
            <h3 class="text-[18px] font-bold mb-2 text-white ">Financial Data Protection</h3>
            <p class="text-[16x] text-white">Secure sensitive financial information with tailored solutions.</p>
          </div>
          <div className='bg-[#434659] p-[24px]'>
            <h3 class="text-[18px] font-bold mb-2 text-white ">Cloud Security Solutions</h3>
            <p class="text-[16x] text-white">Safeguard your cloud environments against emerging cyber threats.</p>
          </div>
          <div className='bg-[#434659] p-[24px]'>
            <h3 class="text-[18px] font-bold mb-2 text-white ">Network Security Monitoring</h3>
            <p class="text-[16x] text-white">Continuously monitor networks to detect and respond to threats.</p>
          </div>
          <div className='bg-[#434659] p-[24px]'>
            <h3 class="text-[18px] font-bold mb-2 text-white ">Endpoint Security</h3>
            <p class="text-[16x] text-white">Protect devices connected to your network against cyber threats.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#121318] py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-[40px] text-center font-bold text-white mb-6">What Clients Are Saying</h2>
        <div class="flex  flex-col md:flex-row items-center">
          <img src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732640211595x224120572160100740%2FSoftcat_AR_Board_190723_133.jpg?w=512&h=532&auto=compress&dpr=1&fit=max" alt="Client Quote" class="rounded-md w-96 h-96 mr-6" />
          <blockquote >
            <p class="text-[20px] mb-3 text-white">"With VRV Security's AI-driven solutions, our digital fortifications have never been stronger. The intuitive interface and real-time threat detection capabilities are game-changing for our operations. We've found peace of mind knowing our digital ecosystem is continuously protected by technology that adapts as fast as we do."</p>
            <cite class="text-[16px] font-medium text-white">- Graham Charlton, Executive Director and Chief Executive at Softcat PLC</cite>
          </blockquote>
        </div>
      </div>
    </section>

    <section class="bg-[#bac3ff] py-8 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-[56px] font-bold text-center text-[#222c61] mb-6">Join Our Cybersecurity Digest</h2>
        <p className='text-[#222c61] mb-10  text-[20px] text-center '>Stay informed with cutting-edge cybersecurity insights from VRV Security.</p>
        <div class="flex justify-center">
          <input type="email" placeholder="cybersecurity@vrvsecurity.com" class="bg-transparent border border-[#222c61] w-96 h-16 text-[20px] py-2 px-4 rounded-l-md" />
          <button class="bg-[#222c61] text-white font-medium py-2 px-4 border border-[#222c61] rounded-r-md">Sign up</button>
        </div>
      </div>
    </section>
  </main>
        
        <Footer/>

    </div>
  )
}

export default Home