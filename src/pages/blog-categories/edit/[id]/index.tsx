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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getBlogCategoryById, updateBlogCategoryById } from 'apiSdk/blog-categories';
import { Error } from 'components/error';
import { blogCategoryValidationSchema } from 'validationSchema/blog-categories';
import { BlogCategoryInterface } from 'interfaces/blog-category';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BlogInterface } from 'interfaces/blog';
import { CategoryInterface } from 'interfaces/category';
import { getBlogs } from 'apiSdk/blogs';
import { getCategories } from 'apiSdk/categories';

function BlogCategoryEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BlogCategoryInterface>(
    () => (id ? `/blog-categories/${id}` : null),
    () => getBlogCategoryById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BlogCategoryInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBlogCategoryById(id, values);
      mutate(updated);
      resetForm();
      router.push('/blog-categories');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BlogCategoryInterface>({
    initialValues: data,
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
            Edit Blog Category
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(BlogCategoryEditPage);
