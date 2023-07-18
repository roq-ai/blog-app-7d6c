import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Button,
  Link,
  IconButton,
  Flex,
  Center,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getBlogCategories, deleteBlogCategoryById } from 'apiSdk/blog-categories';
import { BlogCategoryInterface } from 'interfaces/blog-category';
import { Error } from 'components/error';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  useAuthorizationApi,
  requireNextAuth,
  withAuthorization,
} from '@roq/nextjs';
import { useRouter } from 'next/router';
import { FiTrash, FiEdit2 } from 'react-icons/fi';
import { compose } from 'lib/compose';
import { AccessInfo } from 'components/access-info';

function BlogCategoryListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<BlogCategoryInterface[]>(
    () => '/blog-categories',
    () =>
      getBlogCategories({
        relations: ['blog', 'category'],
      }),
  );
  const router = useRouter();
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteBlogCategoryById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const handleView = (id: string) => {
    if (hasAccess('blog_category', AccessOperationEnum.READ, AccessServiceEnum.PROJECT)) {
      router.push(`/blog-categories/view/${id}`);
    }
  };

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <AccessInfo />
        <Flex justifyContent="space-between" mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Blog Category
          </Text>
          {hasAccess('blog_category', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
            <NextLink href={`/blog-categories/create`} passHref legacyBehavior>
              <Button onClick={(e) => e.stopPropagation()} colorScheme="blue" mr="4" as="a">
                Create
              </Button>
            </NextLink>
          )}
        </Flex>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {deleteError && (
          <Box mb={4}>
            <Error error={deleteError} />{' '}
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {hasAccess('blog', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>blog</Th>}
                  {hasAccess('category', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>category</Th>}

                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr cursor="pointer" onClick={() => handleView(record.id)} key={record.id}>
                    {hasAccess('blog', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/blogs/view/${record.blog?.id}`}>
                          {record.blog?.title}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('category', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/categories/view/${record.category?.id}`}>
                          {record.category?.name}
                        </Link>
                      </Td>
                    )}

                    <Td>
                      {hasAccess('blog_category', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                        <NextLink href={`/blog-categories/edit/${record.id}`} passHref legacyBehavior>
                          <Button
                            onClick={(e) => e.stopPropagation()}
                            mr={2}
                            as="a"
                            variant="outline"
                            colorScheme="blue"
                            leftIcon={<FiEdit2 />}
                          >
                            Edit
                          </Button>
                        </NextLink>
                      )}
                      {hasAccess('blog_category', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(record.id);
                          }}
                          colorScheme="red"
                          variant="outline"
                          aria-label="edit"
                          icon={<FiTrash />}
                        />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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
    operation: AccessOperationEnum.READ,
  }),
)(BlogCategoryListPage);
