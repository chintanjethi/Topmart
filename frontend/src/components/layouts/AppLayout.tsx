import imgUrl from "@/assets/logo.png";
import { AppErrorBoundary } from "@/components/error/AppErrorBoundary.tsx";
import { CategoryNavLinks } from "@/components/ui/CategoryNavLinks.tsx";
import { DarkModeButton } from "@/components/ui/DarkModeButton.tsx";
import { UserMenu } from "@/components/ui/UserMenu.tsx";
import { paths } from "@/config/paths.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import {
    AppShell,
    Badge,
    Box,
    Burger,
    Button,
    Divider,
    Flex,
    Image,
    NavLink,
    ScrollArea,
    Text,
    Tooltip
} from "@mantine/core";
import {
    IconCash,
    IconCategoryPlus,
    IconCirclePlus,
    IconDashboard,
    IconGridDots,
    IconHeart,
    IconLock,
    IconPackage,
    IconPackages,
    IconReceipt,
    IconShieldCheck,
    IconShoppingCart,
    IconUsers
} from "@tabler/icons-react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link, NavLink as RouterNavLink, Outlet } from "react-router";

export function AppLayout() {
    const { user } = useAuth();
    const [navBarOpened, setNavBarOpened] = useState(false);

    const isAdmin = user!.roles.some(role => role.name.toLowerCase() === "admin");

    return (
        <AppShell
            header={ { height: 64 } }
            navbar={ {
                width: 280,
                breakpoint: "md",
                collapsed: { mobile: !navBarOpened }
            } }
            padding="md"
        >
            <AppShell.Header p="md">
                <Flex align="center" justify="space-between" h="100%">
                    <Flex align="center">
                        <Burger
                            hiddenFrom="md" size="sm" me="md"
                            opened={ navBarOpened } onClick={ () => setNavBarOpened(!navBarOpened) }
                        />

                        <Flex align="center" component={Link} to={paths.app.products.path}
                              style={{ textDecoration: "none" }}>
                            <Image radius="md" src={ imgUrl } h={ 32 } w={ 32 } me={ 8 }/>
                            <Text
                                size="xl" variant="gradient" fw={ 800 }
                                gradient={ { from: "paleIndigo.7", to: "paleIndigo.4", deg: 135 } }
                            >
                                TopMart
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex align="center" gap="xs">
                        <Tooltip label="Wishlist">
                            <Button
                                variant="subtle" size="compact-md"
                                component={ Link } to={ paths.app.wishlist.path }
                            >
                                <IconHeart size={ 20 }/>
                            </Button>
                        </Tooltip>

                        <Button
                            variant="light" size="compact-md" radius="md"
                            leftSection={ <IconShoppingCart size={ 18 }/> }
                            component={ Link } to={ paths.app.cart.path }
                        >
                            Cart
                        </Button>

                        <DarkModeButton/>
                    </Flex>
                </Flex>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <AppShell.Section
                    my="sm"
                    component={ ScrollArea } grow
                    type="hover" scrollbarSize={ 2 }
                >
                    <Text size="xs" fw={ 700 } c="dimmed" tt="uppercase" ls={0.5} mb={6}>
                        Marketplace
                    </Text>

                    <NavLink
                        label="All Products"
                        leftSection={ <IconGridDots size={ 18 }/> }
                        component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                        to={ paths.app.products.path } end
                    />

                    <CategoryNavLinks closeNavBar={ () => setNavBarOpened(false) }/>

                    <NavLink
                        label="My Purchases"
                        leftSection={ <IconReceipt size={ 18 }/> }
                        component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                        to={ paths.app.purchases.path } end
                    />

                    <Divider my="sm" />

                    <Text size="xs" fw={ 700 } c="dimmed" tt="uppercase" ls={0.5} mb={6}>
                        Seller Hub
                    </Text>

                    <NavLink
                        label="My Products"
                        leftSection={ <IconPackage size={ 18 }/> }
                        component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                        to={ paths.app.sellerProducts.path } end
                    />

                    <NavLink
                        label="My Sales"
                        leftSection={ <IconCash size={ 18 }/> }
                        component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                        to={ paths.app.sales.path } end
                    />

                    <NavLink
                        label="New Product Listing"
                        leftSection={ <IconCirclePlus size={ 18 }/> }
                        component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                        to={ paths.app.createProduct.path }
                        rightSection={
                            <Badge size="xs" variant="light" color="paleIndigo">
                                New
                            </Badge>
                        }
                    />


                    { isAdmin &&
                        <>
                            <Divider my="sm" />

                            <Text size="xs" fw={ 700 } c="dimmed" tt="uppercase" ls={0.5} mb={6}>
                                Administration
                            </Text>

                            <NavLink
                                label="Dashboard"
                                leftSection={ <IconDashboard size={ 18 }/> }
                                component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                                to={ paths.admin.dashboard.path }
                            />

                            <NavLink
                                label="Categories"
                                leftSection={ <IconCategoryPlus size={ 18 }/> }
                                component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                                to={ paths.admin.categories.path }
                            />

                            <NavLink
                                label="Products"
                                leftSection={ <IconPackages size={ 18 }/> }
                                component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                                to={ paths.admin.products.path }
                            />

                            <NavLink
                                label="Users"
                                leftSection={ <IconUsers size={ 18 }/> }
                                component={ RouterNavLink } onClick={ () => setNavBarOpened(false) }
                                to={ paths.admin.users.path }
                            />
                        </>
                    }
                </AppShell.Section>

                <AppShell.Section>
                    <Divider mb="sm" />
                    <Flex justify="space-between" align="center" maw={260}>
                        <UserMenu closeNavBar={ () => setNavBarOpened(false) }/>
                    </Flex>
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                <ErrorBoundary FallbackComponent={ AppErrorBoundary }>
                    <Flex direction="column">
                        <Flex direction="column" mih="100vh">
                            <Outlet/>
                        </Flex>

                        <Box mt={50}>
                            <Divider size="xs" mb="lg" mt="xl"/>

                            <Flex direction="column" justify="center" align="center" w="100%" pb="md">
                                <Flex mb="xs" align="center">
                                    <Image radius="md" src={ imgUrl } h={ 28 } w={ 28 } me={ 6 }/>
                                    <Text
                                        size="lg" variant="gradient" fw={ 800 }
                                        gradient={ { from: "paleIndigo.7", to: "paleIndigo.4", deg: 135 } }
                                    >
                                        TopMart
                                    </Text>
                                </Flex>

                                <Flex gap="lg" mb="xs" wrap="wrap" justify="center">
                                    <Flex align="center" gap={4}>
                                        <IconShieldCheck size={13} style={{ opacity: 0.5 }}/>
                                        <Text c="dimmed" size="xs">Secure Payments</Text>
                                    </Flex>
                                    <Flex align="center" gap={4}>
                                        <IconLock size={13} style={{ opacity: 0.5 }}/>
                                        <Text c="dimmed" size="xs">JWT + 2FA Auth</Text>
                                    </Flex>
                                </Flex>

                                <Text c="dimmed" size="xs">
                                    © { new Date().getFullYear() } TopMart. All rights reserved.
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </ErrorBoundary>
            </AppShell.Main>
        </AppShell>
    );
}