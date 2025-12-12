const API_URL = process.env.MYPATIENTPH_API_URL || "https://mypatientprofileph.vercel.app/api";
const API_KEY = process.env.MYPATIENTPH_API_KEY || "";

interface BloodProfile {
  bloodType: string;
  rhFactor: string;
  verified?: boolean;
}

interface Patient {
  id: string;
  patientId: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  bloodProfile?: BloodProfile;
}

interface PatientsResponse {
  success: boolean;
  data: {
    patients: Patient[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface PatientResponse {
  success: boolean;
  data: Patient;
}

export async function fetchPatients(page: number = 1, limit: number = 50): Promise<PatientsResponse> {
  const response = await fetch(`${API_URL}/v1/patients?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patients: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchPatient(id: string): Promise<PatientResponse> {
  const response = await fetch(`${API_URL}/v1/patients/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient: ${response.statusText}`);
  }

  return response.json();
}

export async function createPatient(data: {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  status?: string;
}): Promise<{ success: boolean; data: { id: string; patientId: string } }> {
  const response = await fetch(`${API_URL}/v1/patients`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create patient: ${response.statusText}`);
  }

  return response.json();
}

export async function updatePatientBloodProfile(
  patientId: string,
  bloodProfile: BloodProfile
): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/patients/${patientId}/blood-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bloodProfile),
  });

  if (!response.ok) {
    throw new Error(`Failed to update blood profile: ${response.statusText}`);
  }

  return response.json();
}

export async function getTotalPatients(): Promise<number> {
  try {
    const response = await fetchPatients(1, 1);
    return response.data.pagination.total;
  } catch {
    return 0;
  }
}
