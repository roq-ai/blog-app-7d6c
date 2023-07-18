import * as yup from 'yup';

export const newsletterSubscriberValidationSchema = yup.object().shape({
  email: yup.string().required(),
  user_id: yup.string().nullable(),
});
