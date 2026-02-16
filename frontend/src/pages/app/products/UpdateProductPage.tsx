import { Authorisation } from "@/components/Authorisation.tsx";
import { useGetProduct } from "@/features/app/products/api/getProduct.ts";
import { UpdateProductForm } from "@/features/app/products/components/UpdateProductForm.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Loader, Text, Title } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useParams } from "react-router";

export function UpdateProductPage() {
    const params = useParams();
    const productId = params.productId as string;

    const { user } = useAuth();

    const getProductQuery = useGetProduct({ productId });

    if (getProductQuery.isPending) {
        return (
            <Flex w="100%" h="60vh" align="center" justify="center">
                <Loader size="md"/>
            </Flex>
        );
    }

    if (getProductQuery.isError) {
        console.log("Product error", getProductQuery.error);
        return (
            <Box className={ appClasses.emptyState }>
                <Text c="red.5" fw={500}>
                    There was an error when fetching the product details. Please refresh and try again.
                </Text>
            </Box>
        );
    }

    const product = getProductQuery.data?.data;

    return (
        <>
            <title>{ `Update Product | TopMart` }</title>

            <Authorisation
                requiresAdminRole={ false }
                isAuthorised={ user!.id === product.seller.id }
                unauthorisedMessage="You are not allowed to modify products sold by other users."
            >
                <Box className={ `${appClasses.pageBanner} ${appClasses.bannerForm}` }>
                    <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                    <Flex align="center" gap="sm" mb={4}>
                        <IconEdit size={26} style={{ opacity: 0.7 }}/>
                        <Title fz={{ base: 22, md: 28 }} fw={800}>
                            Update Product Listing
                        </Title>
                    </Flex>
                    <Text c="dimmed" size="sm" maw={500}>
                        Make changes to your product details, images, and pricing.
                    </Text>
                </Box>

                <Flex justify="center" align="center" mih="80vh" mt="sm">
                    <UpdateProductForm product={ product }/>
                </Flex>
            </Authorisation>
        </>
    );
}