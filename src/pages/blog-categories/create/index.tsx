import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createBlogCategory } from 'apiSdk/blog-categories';
import { Error } from 'components/error';
import { blogCategoryValidationSchema } from 'validationSchema/blog-categories';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BlogInterface } from 'interfaces/blog';
import { CategoryInterface } from 'interfaces/category';
import { getBlogs } from 'apiSdk/blogs';
import { getCategories } from 'apiSdk/categories';
import { BlogCategoryInterface } from 'interfaces/blog-category';

function BlogCategoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BlogCategoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBlogCategory(values);
      resetForm();
      router.push('/blog-categories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BlogCategoryInterface>({
    initialValues: {
      blog_id: (router.query.blog_id as string) ?? null,
      category_id: (router.query.category_id as string) ?? null,
    },
    validationSchema: blogCategoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Blog Category
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<BlogInterface>
            formik={formik}
            name={'blog_id'}
            label={'Select Blog'}
            placeholder={'Select Blog'}
            fetcher={getBlogs}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<CategoryInterface>
            formik={formik}
            name={'category_id'}
            label={'Select Category'}
            placeholder={'Select Category'}
            fetcher={getCategories}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'blog_category',
    operation: AccessOperationEnum.CREATE,
  }),
)(BlogCategoryCreatePage);
