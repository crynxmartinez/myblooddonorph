"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MapPin, Droplet, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Checkbox } from "@/components/ui/Checkbox";
import { BLOOD_TYPES, getFullBloodType } from "@/lib/utils";

interface Donor {
  id: string;
  visibleId: string;
  city: string;
  bloodType: string;
  rhFactor: string;
  isAvailable: boolean;
}

interface RequestForm {
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  requesterBloodType: string;
  hospitalName: string;
  purpose: string;
  consent: boolean;
}

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [donorInfo, setDonorInfo] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [cooldownError, setCooldownError] = useState("");

  const [requestForm, setRequestForm] = useState<RequestForm>({
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
    requesterBloodType: "",
    hospitalName: "",
    purpose: "",
    consent: false,
  });

  useEffect(() => {
    fetchDonors();
  }, [cityFilter, bloodTypeFilter]);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cityFilter) params.append("city", cityFilter);
      if (bloodTypeFilter) params.append("bloodType", bloodTypeFilter);

      const res = await fetch(`/api/donors?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setDonors(data.data);
        if (data.cities) {
          setCities(data.cities);
        }
      }
    } catch (err) {
      console.error("Failed to fetch donors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestInfo = (donor: Donor) => {
    setSelectedDonor(donor);
    setShowRequestModal(true);
    setError("");
    setCooldownError("");
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDonor || !requestForm.consent) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/donors/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorId: selectedDonor.id,
          ...requestForm,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setCooldownError(data.message);
        } else {
          setError(data.message || "Failed to submit request");
        }
        return;
      }

      setShowRequestModal(false);
      setDonorInfo(data.data);
      setShowInfoModal(true);
      setRequestForm({
        requesterName: "",
        requesterEmail: "",
        requesterPhone: "",
        requesterBloodType: "",
        hospitalName: "",
        purpose: "",
        consent: false,
      });
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const bloodTypeOptions = BLOOD_TYPES.map((type) => ({
    value: type,
    label: type,
  }));

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

  const rhOptions = [
    { value: "positive", label: "Positive (+)" },
    { value: "negative", label: "Negative (-)" },
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Find Blood Donors
          </h1>
          <p className="text-secondary-600">
            Search for available blood donors by city and blood type
          </p>
        </div>

        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select
                label="Filter by City"
                options={[{ value: "", label: "All Cities" }, ...cityOptions]}
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Select
                label="Filter by Blood Type"
                options={[
                  { value: "", label: "All Blood Types" },
                  ...bloodTypeOptions,
                ]}
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
              />
            </div>
            <div className="flex items-end w-full md:w-auto">
              <Button onClick={fetchDonors} variant="secondary" className="w-full md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : donors.length === 0 ? (
          <Card className="text-center py-12">
            <Droplet className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-700 mb-2">
              No donors found
            </h3>
            <p className="text-secondary-500">
              Try adjusting your filters or check back later
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <Card key={donor.id} className="hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Droplet className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary-900">
                        {donor.visibleId}
                      </p>
                      <p className="text-sm text-secondary-500">Donor ID</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      donor.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-secondary-100 text-secondary-600"
                    }`}
                  >
                    {donor.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-secondary-600">
                    <MapPin className="w-4 h-4" />
                    <span>{donor.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-bold">
                      {getFullBloodType(donor.bloodType, donor.rhFactor)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleRequestInfo(donor)}
                  className="w-full"
                  disabled={!donor.isAvailable}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Request Contact Info
                </Button>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          title="Request Donor Information"
          size="lg"
        >
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            {cooldownError && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                {cooldownError}
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Your Full Name"
                required
                value={requestForm.requesterName}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, requesterName: e.target.value })
                }
              />
              <Input
                label="Your Email"
                type="email"
                required
                value={requestForm.requesterEmail}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, requesterEmail: e.target.value })
                }
              />
              <Input
                label="Your Phone Number"
                type="tel"
                required
                value={requestForm.requesterPhone}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, requesterPhone: e.target.value })
                }
              />
              <Select
                label="Your Blood Type"
                required
                options={bloodTypeOptions}
                value={requestForm.requesterBloodType}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    requesterBloodType: e.target.value,
                  })
                }
                placeholder="Select blood type"
              />
            </div>

            <Input
              label="Hospital Name"
              required
              value={requestForm.hospitalName}
              onChange={(e) =>
                setRequestForm({ ...requestForm, hospitalName: e.target.value })
              }
            />

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Purpose / Reason for Request
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                value={requestForm.purpose}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, purpose: e.target.value })
                }
                placeholder="Please describe why you need blood donation..."
              />
            </div>

            <div className="bg-secondary-50 p-4 rounded-lg">
              <Checkbox
                label="I understand and agree that: (1) I will contact the donor in a respectful and professional manner; (2) I will only use this information for legitimate blood donation purposes; (3) I acknowledge that MyBloodDonorPH will log this request for security and audit purposes; (4) I will not share the donor's information with third parties."
                checked={requestForm.consent}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, consent: e.target.checked })
                }
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowRequestModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!requestForm.consent || submitting}
                isLoading={submitting}
                className="flex-1"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          title="Donor Contact Information"
          size="md"
        >
          {donorInfo && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <p className="font-medium">Request Approved!</p>
                <p className="text-sm">
                  Please contact the donor respectfully. This information expires
                  in 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-secondary-500">Full Name</p>
                  <p className="font-semibold text-secondary-900">
                    {donorInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">City</p>
                  <p className="font-semibold text-secondary-900">
                    {donorInfo.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Phone Number</p>
                  <p className="font-semibold text-secondary-900">
                    {donorInfo.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Email</p>
                  <p className="font-semibold text-secondary-900">
                    {donorInfo.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Blood Type</p>
                  <p className="font-semibold text-secondary-900">
                    {getFullBloodType(donorInfo.bloodType, donorInfo.rhFactor)}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setShowInfoModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
