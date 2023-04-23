export type Address = {
  value: string;
  label: string;
  parentCode?: string;
};

export type UserAddressType = {
  isValid?: boolean;
  name?: string;
  phoneNumber?: string;
  province?: string;
  provinceCode?: string;
  district?: string;
  districtCode?: string;
  ward?: string;
  wardCode?: string;
  defaultAddress?: boolean;
};

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  avatar?: string;
  verified?: boolean;
}

export interface UserInformation extends User {
  userAddress: UserAddressType;
}
