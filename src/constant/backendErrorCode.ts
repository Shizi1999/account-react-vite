const backendErrorCode = {
  // ERROR CODE
  METHOD_ARGUMENT_NOT_VALID: 500,
  REFRESH_TOKEN_ERROR: 600,
  TOKEN_EXPIRED: 601,
  //FAILURE CODE
  //    COMMON
  SUCCESS: 101,
  FAILURE: 102,
  REFRESH_TOKE_FAILURE: 103,
  //    USER: 1xxx
  USER_NOT_FOUND: 1001,
  USER_EMAIL_REGISTERED: 1002,
  USER_EMAIL_NOT_REGISTERED: 1003,
  USER_RESET_PASSWORD_EXPIRED: 1004,
  USER_NOT_VERIFIED: 1005,
  USER_VERIFIED_CODE_EXPIRED: 1006,
  USER_VERIFIED_CODE_INCORRECT: 1007,
  USER_ADDRESS_NOT_FOUND: 1008,
  //    ORDER 2xxx
  ORDER_NOT_FOUND: 2001,
  ORDER_ITEMS_EMPTY: 2002,
  ORDER_QUANTITY_OUT_OF_STOCK: 2003,
  ORDER_NOT_CANCEL: 2004,
  //    VOUCHER 3xxx
  VOUCHER_NOT_FOUND: 3001,
  VOUCHER_NOT_GET_MINIMUM: 3002,
  VOUCHER_NOT_ACTIVE: 3003,
  VOUCHER_OUT_OF_QUANTITY: 3004,
  VOUCHER_OUT_OF_TIME: 3005,
  VOUCHER_NOT_ACTIVE_FOR_USER: 3006,
  VOUCHER_USED: 3007,
  VOUCHER_NOT_ACTIVE_FOR_PRODUCTS: 3008,
  //    PRODUCT
  PRODUCT_NOT_FOUND: 3009,
  //    PAYMENT 4xxx
  PAYMENT_METHOD_INVALID: 4001,
  //    COLOR 5xxx
  COLOR_CANNOT_DELETE: 5001,
  //    SIZE 5xxx
  SIZE_CANNOT_DELETE: 6001
};
export default backendErrorCode;
