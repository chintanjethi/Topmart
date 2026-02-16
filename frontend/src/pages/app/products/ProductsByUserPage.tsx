import { useGetUser } from "@/api/users/getUser.ts";
import { paths } from "@/config/paths.ts";
import { useGetProductsByUser } from "@/features/app/products/api/getProductsByUser.ts";
import { ProductsList } from "@/features/app/products/components/ProductsList.tsx";
import { SearchProducts } from "@/features/app/products/components/SearchProducts.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import { PRODUCT_SORT_OPTIONS, SORT_PRODUCTS_BY } from "@/utils/constants.ts";
import { base64ToDataUri } from "@/utils/fileUtils.ts";
import appClasses from "@/styles/app.module.css";
import { Avatar, Badge, Box, Flex, Loader, NativeSelect, Pagination, Text, Title } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { Navigate, useParams, useSearchParams } from "react-router";

export function ProductsByUserPage() {
    const params = useParams();
    const userId = params.userId as string;
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "0", 10) || 0;
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || SORT_PRODUCTS_BY;
    const sortDirection = searchParams.get("sortDirection") || "desc";
    const sort = `${ sortBy } ${ sortDirection }`;

    const { user: authUser } = useAuth();

    const getProductsByUserQuery = useGetProductsByUser({
        userId,
        page,
        search,
        sortBy,
        sortDirection
    });
    const getUserQuery = useGetUser({ userId });

    // Redirect to seller's product page if user is the logged-in user
    if (authUser!.id.toString() === userId) return <Navigate to={ paths.app.sellerProducts.getHref() }/>;

    if (getProductsByUserQuery.isError) {
        console.log("Error fetching products by user", getProductsByUserQuery.error);
    }

    if (getUserQuery.isError) {
        console.log("Error fetching user", getUserQuery.error);
    }

    const products = getProductsByUserQuery.data?.data.content;
    const totalPages = getProductsByUserQuery.data?.data.totalPages;
    const user = getUserQuery.data?.data;

    return (
        <>
            <title>{ `Products by ${ user?.name } | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerSeller}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    { user ? (
                        <Avatar
                            size={40} src={ user.profileImage ? base64ToDataUri(user.profileImage) : null }
                            name={ user.name } color="initials"
                        />
                    ) : (
                        <IconUser size={28} style={{ opacity: 0.7 }}/>
                    )}
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        { user ? `Products by ${user.name}` : "Seller Products" }
                    </Title>
                    <Badge variant="light" color="cyan" size="lg">
                        Seller
                    </Badge>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Browse all listings from this seller. Discover quality items at great prices.
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

            { (getProductsByUserQuery.isPending || getUserQuery.isPending) &&
                <Flex align="center" justify="center" h="60vh">
                    <Loader type="bars" size="md"/>
                </Flex>
            }

            { (getProductsByUserQuery.isError || getUserQuery.isError) &&
                <Box className={ appClasses.emptyState }>
                    <Text c="red.5" fw={500}>
                        There was an error when fetching the products. Please refresh and try again.
                    </Text>
                </Box>
            }

            { products && getProductsByUserQuery.isSuccess &&
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
                                { getProductsByUserQuery.data?.data.totalElements } items
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