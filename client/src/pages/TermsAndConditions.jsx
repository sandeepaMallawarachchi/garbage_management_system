import React from "react";
import { Button } from "flowbite-react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto my-10 px-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">Terms and Conditions</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Introduction</h2>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to [Your App Name]! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using the App, you agree to comply with these terms. If you do not agree with these terms, you must refrain from using the App.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">2. User Account</h2>
        <p className="text-lg text-gray-700 mb-4">
          In order to use certain features of the App, you may be required to create an account. You agree to provide accurate and up-to-date information when creating your account. You are responsible for maintaining the confidentiality of your account credentials.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">3. Use of the App</h2>
        <p className="text-lg text-gray-700 mb-4">
          You agree to use the App only for lawful purposes and in a manner consistent with the applicable laws. You must not engage in any conduct that could damage, disable, or impair the functionality of the App.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Privacy and Data Protection</h2>
        <p className="text-lg text-gray-700 mb-4">
          Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-green-600 underline">Privacy Policy</a> to understand how we collect, use, and protect your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Intellectual Property</h2>
        <p className="text-lg text-gray-700 mb-4">
          All content available on the App, including text, graphics, logos, images, and software, is the property of [Your App Name] or its content providers and is protected by intellectual property laws. You may not reproduce, distribute, or otherwise use any of the content without our permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">6. Limitation of Liability</h2>
        <p className="text-lg text-gray-700 mb-4">
          We strive to provide accurate and reliable information through the App. However, we do not guarantee the accuracy, completeness, or availability of the services. We shall not be held liable for any damages arising from the use of the App or any inability to use the services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">7. Termination</h2>
        <p className="text-lg text-gray-700 mb-4">
          We reserve the right to suspend or terminate your account and access to the App at our discretion if we believe that you have violated these terms or engaged in unlawful activity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">8. Governing Law</h2>
        <p className="text-lg text-gray-700 mb-4">
          These terms and conditions shall be governed by and construed in accordance with the laws of [Your Country/Region]. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in [Your Country/Region].
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">9. Changes to Terms</h2>
        <p className="text-lg text-gray-700 mb-4">
          We reserve the right to update or modify these terms at any time. Any changes will be effective immediately upon posting on this page. Please review this page regularly to stay informed about any updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">10. Contact Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          If you have any questions or concerns about these terms and conditions, please contact us at:
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Email:</strong> [Your Contact Email] <br />
          <strong>Phone:</strong> [Your Contact Phone Number] <br />
          <strong>Address:</strong> [Your Address]
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
