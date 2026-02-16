import { useGetCategories } from "@/api/categories/getCategories.ts";
import { useGetProductsByCategory } from "@/features/app/products/api/getProductsByCategory.ts";
import { ProductsList } from "@/features/app/products/components/ProductsList.tsx";
import { SearchProducts } from "@/features/app/products/components/SearchProducts.tsx";
import { PRODUCT_SORT_OPTIONS, SORT_PRODUCTS_BY } from "@/utils/constants.ts";
import appClasses from "@/styles/app.module.css";
import { Badge, Box, Flex, Loader, NativeSelect, Pagination, Text, Title } from "@mantine/core";
import { IconCategory, IconSparkles } from "@tabler/icons-react";
import { useParams, useSearchParams } from "react-router";

export function ProductsByCategoryPage() {
    const params = useParams();
    const categoryId = params.categoryId as string;
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "0", 10) || 0;
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || SORT_PRODUCTS_BY;
    const sortDirection = searchParams.get("sortDirection") || "desc";
    const sort = `${ sortBy } ${ sortDirection }`;

    const getProductsByCategoryQuery = useGetProductsByCategory({
        categoryId,
        page,
        search,
        sortBy,
        sortDirection
    });
    // Use cached categories that were previously fetched to be displayed in the navbar
    const getCategoriesQuery = useGetCategories({});

    if (getProductsByCategoryQuery.isError) {
        console.log("Error fetching products by category", getProductsByCategoryQuery.error);
    }

    if (getCategoriesQuery.isError) {
        console.log("Error fetching categories", getCategoriesQuery.error);
    }

    const products = getProductsByCategoryQuery.data?.data.content;
    const totalPages = getProductsByCategoryQuery.data?.data?.totalPages;
    const category = getCategoriesQuery.data?.data
        ?.find(category => category.id.toString() === categoryId);

    return (
        <>
            <title>{ `${ category?.name } | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerProducts}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconCategory size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        { category?.name || "Category" }
                    </Title>
                    <Badge variant="light" size="lg" leftSection={<IconSparkles size={14}/>}>
                        Category
                    </Badge>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Browse products in this category. Find the best deals from our verified sellers.
                </Text>
            </Box>

            <Flex justify="center" mb="xl">
                <SearchProducts
                    handleSearch={ (search) => {
                        setSearchParams({
                            search: search.trim(),
                            page: "0",
                            sortBy,
                            sortDirection
                        });
                    } }
                    w={{ base: "100%", sm: "60%", md: "50%" }}
                />
            </Flex>

            { (getProductsByCategoryQuery.isPending || getCategoriesQuery.isPending) &&
                <Flex align="center" justify="center" h="60vh">
                    <Loader type="bars" size="md"/>
                </Flex>
            }

            { (getProductsByCategoryQuery.isError || getCategoriesQuery.isError) &&
                <Box className={ appClasses.emptyState }>
                    <Text c="red.5" fw={500}>
                        There was an error when fetching the products. Please refresh and try again.
                    </Text>
                </Box>
            }

            { products && getProductsByCategoryQuery.isSuccess &&
                <>
                    <Flex
                        mb="md"
                        justify={ { base: "center", sm: "space-between" } }
                        align={ { base: "center", sm: "center" } }
                        direction={ { base: "column", sm: "row" } }
                        gap="xs"
                    >
                        <Flex align="center" gap={4}>
                            { search &&
                                <Text size="sm" fw={600}>
                                    Results for "{ search }"
                                </Text>
                            }
                            <Badge variant="light" color="gray" size="lg">
                                { getProductsByCategoryQuery.data?.data.totalElements } items
                            </Badge>
                        </Flex>

                        <NativeSelect
                            w="fit-content" size="sm" radius="md"
                            data={ PRODUCT_SORT_OPTIONS }
                            value={ sort }
                            onChange={ (e) => {
                                const selectedSort = e.currentTarget.value;
                                const [sortBy, sortDirection] = selectedSort.split(" ");

                                setSearchParams({
                                    search,
                                    page: "0",
                                    sortBy,
                                    sortDirection
                                });
                            } }
                        />
                    </Flex>

                    <ProductsList products={ products }/>

                    { totalPages! > 1 &&
                        <Flex align="center" justify="center" mt="xl" mb="md">
                            <Pagination
                                total={ totalPages! } value={ page + 1 }
                                radius="md"
                                onChange={ (p) => {
                                    setSearchParams({
                                        search,
                                        page: (p - 1).toString(),
                                        sortBy,
                                        sortDirection
                                    });
                                    window.scrollTo({ top: 0 });
                                } }
                            />
                        </Flex>
                    }
                </>
            }
        </>
    );
}