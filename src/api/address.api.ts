import http from './http';

const provinceUrl = 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1';
const districtUrl = 'https://vn-public-apis.fpo.vn/districts/getByProvince';
const wardUrl = 'https://vn-public-apis.fpo.vn/wards/getByDistrict';
export const getProvince = async () => {
  return http.get(provinceUrl);
};

export const getDistrictByProvince = async (provinceId: string) => {
  return http.get(districtUrl, { params: { provinceCode: provinceId, limit: -1 } });
};

export const getWardByDistrict = async (districtId: string) => {
  return http.get(wardUrl, { params: { districtCode: districtId, limit: -1 } });
};
