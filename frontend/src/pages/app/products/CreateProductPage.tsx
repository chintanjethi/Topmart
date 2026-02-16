import { CreateProductForm } from "@/features/app/products/components/CreateProductForm.tsx";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";


export function CreateProductPage() {
    return (
        <>
            <title>{ `Create Product | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerForm}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <Flex align="center" gap="sm" mb={4}>
                    <IconPackage size={26} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 22, md: 28 }} fw={800}>
                        Create Product Listing
                    </Title>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Fill in the details below to list your product on the marketplace.
                </Text>
            </Box>

            <Flex justify="center" align="center" mih="80vh" mt="sm">
                <CreateProductForm/>
            </Flex>
        </>
    );
}