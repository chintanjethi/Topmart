import { SalesList } from "@/features/app/orders/components/SalesList.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconCash } from "@tabler/icons-react";

export function SalesPage() {
    const { user } = useAuth();

    return (
        <>
            <title>{ `My sales | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerOrders}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconCash size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        My Sales
                    </Title>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    View your sales history, track fulfilled orders, and monitor revenue.
                </Text>
            </Box>

            <SalesList userId={ user!.id.toString() }/>
        </>
    );
}