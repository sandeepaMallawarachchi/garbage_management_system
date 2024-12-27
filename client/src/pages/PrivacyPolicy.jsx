import React from "react";
import { Button } from "flowbite-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto my-10 px-6">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">Privacy Policy</h1>
      <p className="text-lg text-gray-700 mb-4">
        Effective Date: <strong>[Insert Date]</strong>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Information We Collect</h2>
        <p className="text-lg text-gray-700 mb-4">
          We collect information that you provide directly when using the App, including:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li><strong>Personal Information:</strong> When you sign up or use our services, we may collect information such as your name, email address, phone number, and location.</li>
          <li><strong>Usage Data:</strong> We automatically collect data about your interactions with the App, such as your IP address, device type, browser type, and activity logs. This helps us improve the app and your experience.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">2. How We Use Your Information</h2>
        <p className="text-lg text-gray-700 mb-4">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li><strong>To provide and improve our services:</strong> To operate the App, deliver services, and personalize your experience.</li>
          <li><strong>Communication:</strong> To send you important notifications, updates, and information about the App.</li>
          <li><strong>Analytics:</strong> To monitor and analyze usage trends and improve functionality.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">3. Data Sharing and Disclosure</h2>
        <p className="text-lg text-gray-700 mb-4">
          We do not sell, rent, or share your personal information with third parties except in the following cases:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating the App and delivering services (e.g., hosting, analytics, customer support).</li>
          <li><strong>Legal Compliance:</strong> We may disclose your information if required by law or in response to a valid legal request (e.g., a subpoena, court order).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Data Security</h2>
        <p className="text-lg text-gray-700 mb-4">
          We take reasonable measures to protect your personal information, but please note that no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Cookies</h2>
        <p className="text-lg text-gray-700 mb-4">
          We may use cookies to enhance your user experience. Cookies are small files stored on your device that help us remember your preferences and improve the App's functionality. You can control cookie preferences through your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">6. Your Rights and Choices</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li><strong>Access and Correction:</strong> You have the right to access and update your personal information.</li>
          <li><strong>Opt-out:</strong> You can opt-out of receiving promotional emails from us by following the unsubscribe instructions included in such emails.</li>
          <li><strong>Data Deletion:</strong> You can request the deletion of your personal data by contacting us directly.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">7. Children's Privacy</h2>
        <p className="text-lg text-gray-700 mb-4">
          The App is not intended for use by children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected personal information from a child under 13, please contact us, and we will take steps to delete such information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">8. Changes to This Privacy Policy</h2>
        <p className="text-lg text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." Please review this Privacy Policy periodically to stay informed about how we are protecting your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">9. Contact Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Email:</strong> [Your Contact Email] <br />
          <strong>Phone:</strong> [Your Contact Phone Number] <br />
          <strong>Address:</strong> [Your Address]
        </p>
      </section>
|
    </div>
  );
};

export default PrivacyPolicy;