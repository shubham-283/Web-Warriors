// utils/orderUtils.js
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${randomStr}`;
};