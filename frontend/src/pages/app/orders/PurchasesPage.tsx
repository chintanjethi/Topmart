import { PurchasesList } from "@/features/app/orders/components/PurchasesList.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";

export function PurchasesPage() {
    const { user } = useAuth();

    return (
        <>
            <title>{ `My purchases | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerOrders}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconShoppingBag size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        My Purchases
                    </Title>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Track your orders, view purchase history, and manage returns.
                </Text>
            </Box>

            <PurchasesList userId={ user!.id.toString() }/>
        </>
    );
}