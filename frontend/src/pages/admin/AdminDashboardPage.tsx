import { paths } from "@/config/paths.ts";
import { OrderStatisticsCard } from "@/features/app/orders/components/OrderStatisticsCard.tsx";
import { ProductStatisticsCard } from "@/features/app/products/components/ProductStatisticsCard.tsx";
import { UserStatisticsCard } from "@/features/app/users/components/UserStatisticsCard.tsx";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Paper, Text, ThemeIcon, Title, UnstyledButton } from "@mantine/core";
import { IconCategoryPlus, IconChartBar, IconPackages, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router";

export function AdminDashboardPage() {
    return (
        <>
            <title>{ `Admin Dashboard | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerAdmin}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconChartBar size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        Admin Dashboard
                    </Title>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Monitor platform performance, manage users, products, and categories from one place.
                </Text>
            </Box>

            <Flex justify="center">
                <Paper radius="lg" p="lg" withBorder w="fit-content">
                    <Title
                        ta={{base: "center", md: "start"}}
                        order={2} mb="md"
                    >
                        Monthly Statistics
                    </Title>

                    <Flex
                        direction={ { base: "column", md: "row" } }
                        gap="md"
                    >
                        <UserStatisticsCard />

                        <ProductStatisticsCard />

                        <OrderStatisticsCard />
                    </Flex>
                </Paper>
            </Flex>

            <Title order={3} ta="center" mt="xl" mb="md">Quick Actions</Title>

            <Flex
                gap="md" mb="lg"
                align="stretch"
                justify="center"
                direction={ { base: "column", md: "row" } }
            >
                <UnstyledButton component={Link} to={paths.admin.categories.getHref()} w={250}>
                    <Paper
                        p="lg" radius="lg" withBorder
                        className={ appClasses.quickActionCard }
                        h="100%"
                    >
                        <Flex direction="column" align="center" gap="sm">
                            <ThemeIcon size={48} radius="lg" variant="light" color="violet">
                                <IconCategoryPlus size={24}/>
                            </ThemeIcon>
                            <Text fw={600} size="sm">Manage Categories</Text>
                            <Text c="dimmed" size="xs" ta="center">Create, edit & organize product categories</Text>
                        </Flex>
                    </Paper>
                </UnstyledButton>

                <UnstyledButton component={Link} to={paths.admin.products.getHref()} w={250}>
                    <Paper
                        p="lg" radius="lg" withBorder
                        className={ appClasses.quickActionCard }
                        h="100%"
                    >
                        <Flex direction="column" align="center" gap="sm">
                            <ThemeIcon size={48} radius="lg" variant="light" color="blue">
                                <IconPackages size={24}/>
                            </ThemeIcon>
                            <Text fw={600} size="sm">Manage Products</Text>
                            <Text c="dimmed" size="xs" ta="center">Review, approve & moderate product listings</Text>
                        </Flex>
                    </Paper>
                </UnstyledButton>

                <UnstyledButton component={Link} to={paths.admin.users.getHref()} w={250}>
                    <Paper
                        p="lg" radius="lg" withBorder
                        className={ appClasses.quickActionCard }
                        h="100%"
                    >
                        <Flex direction="column" align="center" gap="sm">
                            <ThemeIcon size={48} radius="lg" variant="light" color="teal">
                                <IconUsers size={24}/>
                            </ThemeIcon>
                            <Text fw={600} size="sm">Manage Users</Text>
                            <Text c="dimmed" size="xs" ta="center">View accounts, roles & user management</Text>
                        </Flex>
                    </Paper>
                </UnstyledButton>
            </Flex>
        </>
    );
}