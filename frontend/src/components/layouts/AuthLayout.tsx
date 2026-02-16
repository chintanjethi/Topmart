import { DarkModeButton } from "@/components/ui/DarkModeButton.tsx";
import { paths } from "@/config/paths.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import { AppShell, Box, Button, Divider, Flex, Image, Loader, Text } from "@mantine/core";
import { IconLock, IconShieldCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router";
import imgUrl from "../../assets/logo.png";

export function AuthLayout() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');

    const { user, isLoadingUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (redirectTo)
                navigate(redirectTo, { replace: true });
            else
                navigate(paths.app.products.path, { replace: true });
        }
    }, [user, navigate, redirectTo]);

    return (
        <AppShell
            header={ { height: 64 } }
            padding="md"
        >
            <AppShell.Header p="md">
                <Flex align="center" justify="space-between" h="100%">
                    <Flex align="center" component={Link} to={paths.home.path}
                          style={{ textDecoration: "none" }}>
                        <Image radius="md" src={ imgUrl } h={ 32 } w={ 32 } me={ 8 }/>
                        <Text
                            size="xl" variant="gradient" fw={ 800 }
                            gradient={ { from: "paleIndigo.7", to: "paleIndigo.4", deg: 135 } }
                        >
                            TopMart
                        </Text>
                    </Flex>

                    <Flex align="center" gap="sm">
                        <Button
                            size="sm" radius="md" variant="light"
                            component={ Link } to={ paths.auth.login.path }
                        >
                            Sign in
                        </Button>

                        <Button
                            size="sm" radius="md"
                            component={ Link } to={ paths.auth.register.path }
                        >
                            Register
                        </Button>

                        <DarkModeButton/>
                    </Flex>
                </Flex>
            </AppShell.Header>

            <AppShell.Main>
                { isLoadingUser || user ? (
                    <Flex align="center" justify="center" h="100vh" w="100%">
                        <Loader type="bars" size="md"/>
                    </Flex>
                ) : (
                    <Flex direction="column" mih="calc(100vh - 64px - 32px)">
                        <Box style={{ flex: 1 }}>
                            <Outlet/>
                        </Box>

                        <Box py="lg" mt="xl">
                            <Divider mb="lg" />
                            <Flex direction="column" justify="center" align="center">
                                <Flex justify="center" align="center" mb="xs">
                                    <Image radius="md" src={ imgUrl } h={ 28 } w={ 28 } me={ 6 }/>
                                    <Text
                                        size="lg" variant="gradient" fw={ 800 }
                                        gradient={ { from: "paleIndigo.7", to: "paleIndigo.4", deg: 135 } }
                                    >
                                        TopMart
                                    </Text>
                                </Flex>

                                <Flex gap="xl" mb="sm" wrap="wrap" justify="center">
                                    <Flex align="center" gap={4}>
                                        <IconShieldCheck size={14} style={{ opacity: 0.5 }}/>
                                        <Text c="dimmed" size="xs">Secure Payments</Text>
                                    </Flex>
                                    <Flex align="center" gap={4}>
                                        <IconLock size={14} style={{ opacity: 0.5 }}/>
                                        <Text c="dimmed" size="xs">2FA Authentication</Text>
                                    </Flex>
                                </Flex>

                                <Text c="dimmed" size="xs">
                                    © { new Date().getFullYear() } TopMart. All rights reserved.
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                ) }
            </AppShell.Main>
        </AppShell>
    );
}