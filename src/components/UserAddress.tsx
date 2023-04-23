import { Select } from 'antd';
import { memo, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getDistrictByProvince, getProvince, getWardByDistrict } from '~/api/address.api';

import { Address, UserAddressType } from '~/types/user.type';

const initialProvince: Address = { value: '', label: 'Chọn tỉnh / thành phố', parentCode: '' };
const initialDistrict: Address = { value: '', label: 'Chọn quận / huyện', parentCode: '' };
const initialWard: Address = { value: '', label: 'Chọn phường / xã', parentCode: '' };
// Handle Address api
const convertDatas = (res: any) => {
  return (
    res?.data?.data?.data?.map((item: any) => {
      return {
        label: item['name_with_type'] || '',
        value: item?.code || '',
        parentCode: item['parent_code'] || ''
      };
    }) || []
  );
};
type UserAddressProps = {
  className?: string;
  itemClassName?: string;
  onAddressChange: (value: UserAddressType) => void;
};
function UserAddress({ className, itemClassName, onAddressChange }: UserAddressProps) {
  const [provinces, setProvinces] = useState<Address[]>([]);
  const [districts, setDistricts] = useState<Address[]>([]);
  const [wards, setWards] = useState<Address[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<Address>(initialProvince);
  const [selectedDistrict, setSelectedDistrict] = useState<Address>(initialDistrict);
  const [selectedWard, setSelectedWard] = useState<Address>(initialWard);

  const fetchProvince = useMutation({
    mutationFn: getProvince,
    onSuccess: (res) => {
      let datas = convertDatas(res);
      setProvinces(datas);
    }
  });

  const fetchDistrict = useMutation({
    mutationFn: () => {
      return getDistrictByProvince(selectedProvince.value);
    },
    onSuccess: (res) => {
      let datas = convertDatas(res);
      setDistricts(datas);
    }
  });

  const fetchWard = useMutation({
    mutationFn: () => {
      return getWardByDistrict(selectedDistrict.value);
    },
    onSuccess: (res) => {
      let datas = convertDatas(res);
      setWards(datas);
    }
  });

  useEffect(() => {
    fetchProvince.mutate();
  }, []);

  useEffect(() => {
    setSelectedDistrict(initialDistrict);
    setSelectedWard(initialWard);
    if (selectedProvince.value) {
      fetchDistrict.mutate();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict.value) {
      fetchWard.mutate();
    } else {
      setWards([]);
    }
    setSelectedWard(initialWard);
  }, [selectedDistrict]);

  useEffect(() => {
    onAddressChange(getData());
  }, [selectedWard, selectedDistrict, selectedProvince]);

  const handleProvinceChange = (value: string, option: {}) => {
    setSelectedProvince(option as Address);
  };

  const handleDistrictChange = (value: string, option: {}) => {
    setSelectedDistrict(option as Address);
  };

  const handleWardChange = (value: string, option: {}) => {
    setSelectedWard(option as Address);
  };

  const getData = (): UserAddressType => {
    if (!selectedDistrict?.value || !selectedProvince?.value || !selectedWard?.value) {
      return { isValid: false };
    } else {
      return {
        isValid: true,
        province: selectedProvince.label,
        provinceCode: selectedProvince.value,
        district: selectedDistrict.label,
        districtCode: selectedDistrict.value,
        ward: selectedWard.label,
        wardCode: selectedWard.value
      };
    }
  };

  return (
    <div className={`w-full flex ${className}`}>
      <div className={itemClassName}>
        <Select
          onChange={handleProvinceChange}
          placeholder='Chọn tỉnh thành phố'
          className='w-full'
          options={provinces}
          loading={fetchProvince?.isLoading}
          value={selectedProvince.label}
          disabled={fetchProvince.isLoading}
        />
      </div>
      <div className={itemClassName}>
        <Select
          onChange={handleDistrictChange}
          placeholder='Chọn quận huyện'
          className='w-full'
          options={districts}
          loading={fetchDistrict?.isLoading}
          value={selectedDistrict.label}
          disabled={fetchDistrict.isLoading || fetchProvince.isLoading}
        />
      </div>
      <div className={itemClassName}>
        <Select
          onChange={handleWardChange}
          placeholder='Chọn phường xã'
          className='w-full'
          options={wards}
          loading={fetchWard?.isLoading}
          value={selectedWard.label}
          disabled={fetchWard.isLoading || fetchDistrict.isLoading || fetchProvince.isLoading}
        />
      </div>
    </div>
  );
}
export default memo(UserAddress);
