export default function DataProtectionPage() {
  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">
          Data Protection Policy
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Philippine Data Privacy Act of 2012 (RA 10173)
            </h2>
            <p className="text-secondary-600">
              MyBloodDonorPH is committed to complying with the Philippine Data
              Privacy Act of 2012 and its implementing rules and regulations. We
              ensure that all personal data is processed fairly, lawfully, and
              transparently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Data Processing Principles
            </h2>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>
                <strong>Transparency:</strong> We inform you about how your data
                is collected and used
              </li>
              <li>
                <strong>Legitimate Purpose:</strong> Data is collected only for
                specified, legitimate purposes
              </li>
              <li>
                <strong>Proportionality:</strong> We collect only what is
                necessary for our services
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Data Subject Rights
            </h2>
            <p className="text-secondary-600 mb-4">
              Under the Data Privacy Act, you have the following rights:
            </p>
            <ul className="list-disc list-inside text-secondary-600 space-y-2">
              <li>
                <strong>Right to be Informed:</strong> Know how your data is
                being processed
              </li>
              <li>
                <strong>Right to Access:</strong> Obtain a copy of your personal
                data
              </li>
              <li>
                <strong>Right to Rectification:</strong> Correct inaccurate data
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your data
              </li>
              <li>
                <strong>Right to Object:</strong> Object to certain types of
                processing
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in
                a structured format
              </li>
              <li>
                <strong>Right to Damages:</strong> Claim compensation for
                violations
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Data Retention
            </h2>
            <p className="text-secondary-600">
              We retain your personal data only for as long as necessary to
              fulfill the purposes for which it was collected, or as required by
              law. Inactive accounts may be deleted after 2 years of inactivity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Data Breach Notification
            </h2>
            <p className="text-secondary-600">
              In the event of a data breach that poses a risk to your rights and
              freedoms, we will notify the National Privacy Commission and
              affected individuals within 72 hours of becoming aware of the
              breach.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Filing a Complaint
            </h2>
            <p className="text-secondary-600">
              If you believe your data privacy rights have been violated, you may
              file a complaint with the National Privacy Commission (NPC) at
              complaints@privacy.gov.ph or contact our Data Protection Officer at
              dpo@myblooddonorph.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
