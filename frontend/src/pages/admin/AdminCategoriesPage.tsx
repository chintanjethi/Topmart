import { Authorisation } from "@/components/Authorisation.tsx";
import { useGetParentCategories } from "@/features/app/categories/api/getParentCategories";
import { CategoriesTable } from "@/features/app/categories/components/CategoriesTable.tsx";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Loader, Text, Title } from "@mantine/core";
import { IconCategory } from "@tabler/icons-react";

export function AdminCategoriesPage() {

    const getParentCategoriesQuery = useGetParentCategories();

    if (getParentCategoriesQuery.isPending) {
        return (
            <Flex align="center" justify="center" h="60vh">
                <Loader type="bars" size="md"/>
            </Flex>
        );
    }

    if (getParentCategoriesQuery.isError) {
        console.log("Error fetching parent categories", getParentCategoriesQuery.error);
        return (
            <Box className={ appClasses.emptyState }>
                <Text c="red.5" fw={500}>
                    There was an error when fetching categories. Please refresh and try again.
                </Text>
            </Box>
        );
    }

    return (
        <>
            <Authorisation requiresAdminRole={ true }>
                <title>{ `Manage Categories | TopMart` }</title>

                <Box className={ `${appClasses.pageBanner} ${appClasses.bannerAdmin}` }>
                    <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                    <Flex align="center" gap="sm" mb={4}>
                        <IconCategory size={26} style={{ opacity: 0.7 }}/>
                        <Title fz={{ base: 22, md: 28 }} fw={800}>
                            Product Categories
                        </Title>
                    </Flex>
                    <Text c="dimmed" size="sm" maw={500}>
                        Create, edit, and organize product categories and subcategories.
                    </Text>
                </Box>

                <CategoriesTable parentCategories={ getParentCategoriesQuery.data.data }/>
            </Authorisation>
        </>
    );
}