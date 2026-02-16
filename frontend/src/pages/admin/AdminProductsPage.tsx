import { Authorisation } from "@/components/Authorisation.tsx";
import { ProductsTable } from "@/features/app/products/components/ProductsTable.tsx";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconPackages } from "@tabler/icons-react";

export function AdminProductsPage() {

    return (
        <>
            <Authorisation requiresAdminRole={ true }>
                <title>{ `Manage Products | TopMart` }</title>

                <Box className={ `${appClasses.pageBanner} ${appClasses.bannerAdmin}` }>
                    <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                    <Flex align="center" gap="sm" mb={4}>
                        <IconPackages size={26} style={{ opacity: 0.7 }}/>
                        <Title fz={{ base: 22, md: 28 }} fw={800}>
                            Manage Products
                        </Title>
                    </Flex>
                    <Text c="dimmed" size="sm" maw={500}>
                        Review, moderate, and manage all product listings across the platform.
                    </Text>
                </Box>

                <ProductsTable />
            </Authorisation>
        </>
    );
}