import * as yup from 'yup';

export const blogCategoryValidationSchema = yup.object().shape({
  blog_id: yup.string().nullable(),
  category_id: yup.string().nullable(),
});
