import { SuccessResponse } from '~/types/utils.type';
import http from './http';
import { UserInformation } from '~/types/user.type';

const URL_PROFILE = 'users/me';

const userApi = {
  updateInformation(body: UserInformation) {
    return http.post<SuccessResponse<{}>>(URL_PROFILE, body);
  }
};

export default userApi;
