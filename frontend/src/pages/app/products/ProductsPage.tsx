import { useGetOtherUsersProducts } from "@/features/app/products/api/getOtherUsersProducts.ts";
import { ProductsList } from "@/features/app/products/components/ProductsList.tsx";
import { SearchProducts } from "@/features/app/products/components/SearchProducts.tsx";
import { PRODUCT_SORT_OPTIONS, SORT_PRODUCTS_BY } from "@/utils/constants.ts";
import appClasses from "@/styles/app.module.css";
import { Badge, Box, Flex, Loader, NativeSelect, Pagination, Text, Title } from "@mantine/core";
import { IconGridDots, IconSparkles } from "@tabler/icons-react";
import { useSearchParams } from "react-router";

export function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "0", 10) || 0;
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || SORT_PRODUCTS_BY;
    const sortDirection = searchParams.get("sortDirection") || "desc";
    const sort = `${ sortBy } ${ sortDirection }`;

    const getProductsQuery = useGetOtherUsersProducts({
        page,
        search,
        sortBy,
        sortDirection
    });

    if (getProductsQuery.isError) console.log("Error fetching products", getProductsQuery.error);

    const products = getProductsQuery.data?.data.content;
    const totalPages = getProductsQuery.data?.data.totalPages;

    return (
        <>
            <title>{ `All Products | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerProducts}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconGridDots size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 26, md: 32 }} fw={800}>
                        Marketplace
                    </Title>
                    <Badge variant="light" size="lg" leftSection={<IconSparkles size={14}/>}>
                        Browse All
                    </Badge>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Discover second-hand products from verified sellers. Find electronics, clothing, home goods and more.
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

            { getProductsQuery.isPending &&
                <Flex align="center" justify="center" h="60vh">
                    <Loader type="bars" size="md"/>
                </Flex>
            }

            { getProductsQuery.isError &&
                <Box className={ appClasses.emptyState }>
                    <Text c="red.5" fw={500}>
                        There was an error when fetching the products. Please refresh and try again.
                    </Text>
                </Box>
            }

            { products && getProductsQuery.isSuccess &&
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
                                { getProductsQuery.data?.data.totalElements } items
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