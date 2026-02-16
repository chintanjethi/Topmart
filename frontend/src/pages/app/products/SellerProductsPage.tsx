import { paths } from "@/config/paths.ts";
import { SellerProductsList } from "@/features/app/products/components/SellerProductsList.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import appClasses from "@/styles/app.module.css";
import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { IconCirclePlus, IconBuildingStore } from "@tabler/icons-react";
import { Link } from "react-router";

export function SellerProductsPage() {
    const { user } = useAuth();

    return (
        <>
            <title>{ `My Products | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerSeller}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconBuildingStore size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        My Products
                    </Title>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Manage your product listings. Create new listings, update prices, and track inventory.
                </Text>
            </Box>

            <Flex direction="column" justify="center" align="center">
                <Flex
                    justify="flex-end" mb="md"
                    w={ { base: 480, xs: 550, md: 800 } }
                >
                    <Button
                        size="sm" variant="light" mt="sm" ms="sm"
                        w="fit-content" radius="md"
                        leftSection={ <IconCirclePlus size={ 18 }/> }
                        component={ Link } to={ paths.app.createProduct.path }
                    >
                        Create product listing
                    </Button>
                </Flex>

                <SellerProductsList sellerId={ user!.id.toString() }/>
            </Flex>
        </>
    );
}