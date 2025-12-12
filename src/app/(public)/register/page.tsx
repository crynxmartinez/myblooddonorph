"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Droplet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card } from "@/components/ui/Card";
import { BLOOD_TYPES, PHILIPPINE_CITIES } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    bloodType: "",
    rhFactor: "positive",
    dateOfBirth: "",
    consentInfo: false,
    consentContact: false,
  });

  const bloodTypeOptions = BLOOD_TYPES.map((type) => ({
    value: type,
    label: type,
  }));

  const cityOptions = PHILIPPINE_CITIES.map((city) => ({
    value: city,
    label: city,
  }));

  const rhOptions = [
    { value: "positive", label: "Positive (+)" },
    { value: "negative", label: "Negative (-)" },
  ];

  const handleNext = () => {
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }
    if (step === 2) {
      if (!formData.firstName || !formData.lastName || !formData.city || !formData.bloodType) {
        setError("Please fill in all required fields");
        return;
      }
    }
    setError("");
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentInfo || !formData.consentContact) {
      setError("You must agree to both consent statements to register");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Card>
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Droplet className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-secondary-900">
              Become a Blood Donor
            </h1>
            <p className="text-secondary-600 mt-2">
              Join our community and help save lives
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      s <= step
                        ? "bg-primary-600 text-white"
                        : "bg-secondary-200 text-secondary-500"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-1 ${
                        s < step ? "bg-primary-600" : "bg-secondary-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                  Account Information
                </h2>
                <Input
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  label="Password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  helperText="Minimum 6 characters"
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
                <Button type="button" onClick={handleNext} className="w-full">
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <Input
                    label="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <Select
                  label="City"
                  required
                  options={cityOptions}
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="Select your city"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Blood Type"
                    required
                    options={bloodTypeOptions}
                    value={formData.bloodType}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodType: e.target.value })
                    }
                    placeholder="Select"
                  />
                  <Select
                    label="Rh Factor"
                    options={rhOptions}
                    value={formData.rhFactor}
                    onChange={(e) =>
                      setFormData({ ...formData, rhFactor: e.target.value })
                    }
                  />
                </div>
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                />
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext} className="flex-1">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                  Consent & Agreement
                </h2>
                <div className="space-y-4 bg-secondary-50 p-4 rounded-lg">
                  <Checkbox
                    label="I confirm that all information I have provided is true and accurate. I understand that MyBloodDonorPH will store my information securely and in compliance with data protection laws including the Philippine Data Privacy Act of 2012."
                    checked={formData.consentInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, consentInfo: e.target.checked })
                    }
                  />
                  <Checkbox
                    label="I consent to being contacted by individuals or organizations seeking blood donors for legitimate medical purposes. I understand that my contact information will only be shared after the requester provides their information and agrees to contact me respectfully."
                    checked={formData.consentContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        consentContact: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                  <strong>Important:</strong> By registering, you acknowledge
                  that blood donation eligibility requirements apply. You must be
                  18-65 years old, weigh at least 50kg, and be in good health.
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    isLoading={loading}
                    disabled={loading || !formData.consentInfo || !formData.consentContact}
                  >
                    Complete Registration
                  </Button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
