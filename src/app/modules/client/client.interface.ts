export type TClient = {
  name: string;
  email?: string;
  phoneNumber: string;
  shopName: string;
  gstNumber?: string;
  area: string;
  addressLine1 : string;
  addressLine2? : string;
  addressLine3? : string;
  city : string;
  state : string;
  district : string;
  pinCode : string;
  createdAt?: Date;
  updatedAt?: Date;
};
