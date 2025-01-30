import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-8 mt-28">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-pink-700 animate__animated animate__fadeIn">
        About Our Company
      </h1>

      {/* Mission Statement */}
      <section className="mb-16 bg-pink-50 p-7 rounded-xl shadow-lg animate__animated animate__fadeIn">
        <h2 className="text-3xl font-semibold text-pink-700 mb-5">Our Journey</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          ADAA JAIPUR was started by Keshav Shukla in 2010 and is now managed by his elder son Tulsi Prasad Shukla. It is much reckoned for its in-house exclusive Feminine brand "ADAA". Adaa has almost all types of collections that an Indian Woman needs, be it Kurties, Plazzos, Gowns, Sharara, and many more.
          <br /><br />
          Our mission is to provide the best quality product at its best price. And we love to read your feedback as it encourages us to be more productive for our lovable customers.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-16 animate__animated animate__fadeIn">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {/* Team Member Card */}
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1">
              <div className="relative mb-5 w-36 h-36 mx-auto overflow-hidden rounded-full border-4 border-pink-400 shadow-lg mt-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-900 to-transparent p-2 rounded-b-xl">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
              </div>
              <p className="text-gray-800 font-medium">{member.position}</p>
              <p className="mt-3 text-gray-700">{member.bio}</p>
              <div className="mt-4 flex justify-center space-x-3">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition duration-300">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-3xl font-semibold text-pink-700 mb-5">Get in Touch</h2>
        <form className="bg-white p-8 rounded-xl shadow-lg animate__animated animate__fadeIn">
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-medium">Full Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="border-2 border-pink-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:border-pink-500 focus:ring-pink-500 focus:outline-none transition duration-300" 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="border-2 border-pink-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:border-pink-500 focus:ring-pink-500 focus:outline-none transition duration-300" 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="block text-gray-700 font-medium">Your Message:</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              required 
              className="border-2 border-pink-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:border-pink-500 focus:ring-pink-500 focus:outline-none transition duration-300"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition duration-300 transform hover:-translate-y-1"
          >
            Send Your Message
          </button>
        </form>
      </section>
    </div>
  );
};

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: 'Keshav Shukla',
    position: 'Founder',
    bio: 'With 25 years in the tech industry, Keshav is passionate about innovative solutions.',
    image: 'https://adaajaipur.com/cdn/shop/files/Founders1.png',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 2,
    name: 'Tulsi Prasad Shukla',
    position: 'Co-Founder & Strategic Brand Manager',
    bio: 'Tulsi brings her technical expertise to lead our product development.',
    image: 'https://adaajaipur.com/cdn/shop/files/Founders2.png',
    linkedin: '#',
    twitter: '#',
  },
];

export default AboutUs;