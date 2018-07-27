export const ENV = process.env.NODE_ENV || 'development';
export const FULFILMENT = process.env.FULFILMENT || 'http://localhost:9090/orders/';
export const FULFILMENT_RESCHEDUING = process.env.FULFILMENT_RESCHEDUING || 'http://localhost:9090/rescheduling/';
export const FULFILMENT_BILLING = process.env.FULFILMENT_BILLING || 'http://localhost:9090/billings?order-id=';
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;
