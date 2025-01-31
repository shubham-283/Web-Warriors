import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 mt-20">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Privacy Policy</h1>

      <section className="space-y-6 text-gray-700">
        <p>
          This Privacy Policy describes how the “Site” or “we” collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Contact</h2>
        <p>
          After reviewing this policy, if you have additional questions, want more information about our privacy practices, or would like to make a complaint, please contact us by email.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Collecting Personal Information</h2>
        <p>
          When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information about an identifiable individual (including the information below) as “Personal Information”.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Device information</h3>
        <ul className="list-disc pl-6">
          <li><strong>Purpose of collection:</strong> To load the Site accurately for you and perform analytics on Site usage to optimize our Site.</li>
          <li><strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.</li>
          <li><strong>Disclosure for a business purpose:</strong> Shared with our processor Shopify.</li>
          <li><strong>Personal Information collected:</strong> Version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Order information</h3>
        <ul className="list-disc pl-6">
          <li><strong>Purpose of collection:</strong> To provide products or services to you to fulfill our contract, process your payment information, arrange for shipping, and provide invoices or order confirmations.</li>
          <li><strong>Source of collection:</strong> Collected from you.</li>
          <li><strong>Disclosure for a business purpose:</strong> Shared with our processor Shopify.</li>
          <li><strong>Personal Information collected:</strong> Name, billing address, shipping address, payment information (including credit & debit card number & UPI address).</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Customer support information</h3>
        <ul className="list-disc pl-6">
          <li><strong>Purpose of collection:</strong> To provide customer support.</li>
          <li><strong>Source of collection:</strong> Collected from you through the website.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Sharing Personal Information</h2>
        <p>
          We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:
        </p>
        <ul className="list-disc pl-6">
          <li>We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information <a href="https://www.shopify.com/legal/privacy" className="text-blue-500" target="_blank" rel="noopener noreferrer">here</a>.</li>
          <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.</li>
          <li>We will share your details with courier partners for best services (Name, Email, Phone & Address).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Behavioral Advertising</h2>
        <p>
          As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.
        </p>
        <ul className="list-disc pl-6">
          <li>We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information <a href="https://www.google.com/intl/en/policies/privacy/" className="text-blue-500" target="_blank" rel="noopener noreferrer">here</a>. You can also opt-out of Google Analytics <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-500" target="_blank" rel="noopener noreferrer">here</a>.</li>
          <li>We use Shopify Audiences to help us show ads on other websites with our advertising partners to buyers who made purchases with other Shopify merchants and who may also be interested in what we have to offer.</li>
        </ul>

        <p>
          For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at <a href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" className="text-blue-500" target="_blank" rel="noopener noreferrer">here</a>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Using Personal Information</h2>
        <p>
          We use your personal information to provide our services to you, including offering products for sale, processing payments, shipping and fulfilling your order, and keeping you up to date on new products, services, and offers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Cookies</h2>
        <p>
          A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use different cookies to optimize your experience, including functional, performance, advertising, and social media cookies.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">Cookies Necessary for the Functioning of the Store</h3>
        <ul className="list-disc pl-6">
          {/* Include all relevant cookie details here */}
          {/* Example: */}
          <li><strong>_ab</strong> - Used in connection with access to admin. (Duration: 2 years)</li>
          <li><strong>_secure_session_id</strong> - Used in connection with navigation through a storefront. (Duration: 24 hours)</li>
          {/* Add other cookies as needed */}
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Do Not Track</h2>
        <p>
          Please note that because there is no consistent industry understanding of how to respond to “Do Not Track” signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Changes</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Complaints</h2>
        <p>
          As noted above, if you would like to make a complaint, please contact us by e-mail or by mail using the details provided under “Contact” above.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
