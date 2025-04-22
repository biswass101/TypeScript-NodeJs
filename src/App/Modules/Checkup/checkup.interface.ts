//patient
export type TPatientAddress = {
  street: string;
  city: string;
  zip: string;
};
export type TPatientContact = {
  phone: string;
  email: string;
  address: TPatientAddress;
};
export type TPatient = {
  name: string;
  age: number;
  gender: "male" | "female";
  contanct: TPatientContact;
};

//doctor
interface TDoctorContact extends Omit<TPatientContact, "address"> {}
export type TDoctor = {
  name: string;
  specialization: string;
  experience: number;
  contact: TDoctorContact;
};

//prescription ele

export type TPescription = {
  medichine: string;
  osage: string;
  frequency: string;
  duration: string;
};

export interface ICheckup {
  date: string;
  remarks: string;
  patinents: TPatient;
  doctor: TDoctor;
  pecription: TPescription[];
}
