export default function HIPAAPage() {
  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">
          HIPAA Compliance & Health Information Protection
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Note:</strong> While HIPAA is a U.S. regulation,
              MyBloodDonorPH follows similar principles to protect your health
              information in accordance with the Philippine Data Privacy Act of
              2012 and international best practices.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Our Commitment to Health Information Privacy
            </h2>
            <p className="text-secondary-600">
              We understand that blood type and health-related information is
              sensitive. We are committed to protecting this information with the
              highest standards of security and privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Protected Health Information (PHI)
            </h2>
            <p className="text-secondary-600 mb-4">
              The following information is treated as protected health
              information:
            </p>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>Blood type and Rh factor</li>
              <li>Donation history</li>
              <li>Health eligibility status</li>
              <li>Any medical conditions disclosed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Security Measures
            </h2>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>End-to-end encryption for data transmission</li>
              <li>Encrypted database storage</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Minimum Necessary Standard
            </h2>
            <p className="text-secondary-600">
              We follow the principle of minimum necessary disclosure. When
              sharing donor information with requesters, we only share what is
              necessary for the blood donation purpose. Full medical history is
              never shared.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Audit Trail
            </h2>
            <p className="text-secondary-600">
              All access to protected health information is logged and monitored.
              This includes who accessed the information, when, and for what
              purpose. These logs are retained for compliance and security
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Your Rights
            </h2>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>Right to access your health information</li>
              <li>Right to request corrections</li>
              <li>Right to know who has accessed your information</li>
              <li>Right to request restrictions on use</li>
              <li>Right to file a complaint</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Contact Our Privacy Officer
            </h2>
            <p className="text-secondary-600">
              For questions or concerns about health information privacy, contact
              our Privacy Officer at privacy@myblooddonorph.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
