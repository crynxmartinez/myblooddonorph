import { Heart, Shield, Users, Target, Award, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About MyBloodDonorPH</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Connecting blood donors with those in need across the Philippines
            since 2024.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-secondary-600 mb-4">
                MyBloodDonorPH was created with a simple yet powerful mission: to
                make blood donation more accessible and efficient for all
                Filipinos. We believe that no one should suffer due to a lack of
                available blood donors.
              </p>
              <p className="text-secondary-600 mb-4">
                Our platform connects registered blood donors with individuals
                and families in need, making it easier to find compatible donors
                quickly during emergencies.
              </p>
              <p className="text-secondary-600">
                We are committed to maintaining the highest standards of privacy
                and security while facilitating life-saving connections.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-50 rounded-xl p-6 text-center">
                <Heart className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-2xl text-primary-700">1000+</h3>
                <p className="text-secondary-600">Registered Donors</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 text-center">
                <Users className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-2xl text-primary-700">500+</h3>
                <p className="text-secondary-600">Lives Saved</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 text-center">
                <Target className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-2xl text-primary-700">30+</h3>
                <p className="text-secondary-600">Cities Covered</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 text-center">
                <Clock className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-2xl text-primary-700">24/7</h3>
                <p className="text-secondary-600">Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Shield className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Privacy First
              </h3>
              <p className="text-secondary-600">
                We take data protection seriously. Your personal information is
                encrypted and only shared with your explicit consent.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Heart className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Community Driven
              </h3>
              <p className="text-secondary-600">
                Built by Filipinos, for Filipinos. Our platform is designed to
                serve the unique needs of our community.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Award className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Excellence
              </h3>
              <p className="text-secondary-600">
                We strive for excellence in everything we do, from user
                experience to data security and customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Blood Donation Eligibility
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-secondary-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                General Requirements
              </h3>
              <ul className="space-y-3 text-secondary-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <span>Must be between 18-65 years old</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <span>Must weigh at least 50 kg (110 lbs)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <span>Must be in good health on the day of donation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <span>
                    Must wait at least 56 days between whole blood donations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <span>Must not have gotten a tattoo in the past 12 months</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <span>Must not be pregnant or nursing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
