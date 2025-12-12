export default function TermsPage() {
  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">
          Terms of Service
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <p className="text-secondary-600">Last updated: December 2024</p>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-secondary-600">
              By accessing and using MyBloodDonorPH, you accept and agree to be
              bound by the terms and provisions of this agreement. If you do not
              agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-secondary-600">
              MyBloodDonorPH is a platform that connects blood donors with
              individuals and organizations in need of blood donations. We
              facilitate connections but do not provide medical services or
              guarantee the availability of donors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              3. User Responsibilities
            </h2>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use the platform only for legitimate blood donation purposes</li>
              <li>Treat other users with respect and professionalism</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              4. Prohibited Activities
            </h2>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>Selling or commercializing blood or donor information</li>
              <li>Harassment or abuse of other users</li>
              <li>Providing false or misleading information</li>
              <li>Attempting to circumvent security measures</li>
              <li>Using the platform for any illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-secondary-600">
              MyBloodDonorPH is provided &quot;as is&quot; without warranties of
              any kind. We are not liable for any damages arising from the use of
              our service, including but not limited to direct, indirect,
              incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              6. Termination
            </h2>
            <p className="text-secondary-600">
              We reserve the right to terminate or suspend your account at any
              time for violations of these terms or for any other reason at our
              sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              7. Changes to Terms
            </h2>
            <p className="text-secondary-600">
              We may modify these terms at any time. Continued use of the service
              after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
