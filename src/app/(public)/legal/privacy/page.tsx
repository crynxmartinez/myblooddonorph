export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <p className="text-secondary-600">
            Last updated: December 2024
          </p>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-secondary-600 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>City/location information</li>
              <li>Blood type and Rh factor</li>
              <li>Date of birth</li>
              <li>Account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-secondary-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>Connect blood donors with those in need</li>
              <li>Verify your identity and eligibility as a donor</li>
              <li>Communicate with you about donation opportunities</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-secondary-600">
              We only share your personal information with your explicit consent.
              When someone requests your donor information, they must provide
              their own details and agree to contact you respectfully. All
              requests are logged for security purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-secondary-600">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. This includes encryption,
              secure servers, and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-secondary-600 mb-4">
              Under the Philippine Data Privacy Act of 2012, you have the right to:
            </p>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-secondary-600">
              If you have any questions about this Privacy Policy, please contact
              us at privacy@myblooddonorph.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
