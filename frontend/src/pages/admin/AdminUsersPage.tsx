import { Authorisation } from "@/components/Authorisation.tsx";
import { UsersTable } from "@/features/app/users/components/UsersTable.tsx";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";

export function AdminUsersPage() {

    return (
        <>
            <Authorisation requiresAdminRole={ true }>
                <title>{ `Manage Users | TopMart` }</title>

                <Box className={ `${appClasses.pageBanner} ${appClasses.bannerAdmin}` }>
                    <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                    <Flex align="center" gap="sm" mb={4}>
                        <IconUsers size={26} style={{ opacity: 0.7 }}/>
                        <Title fz={{ base: 22, md: 28 }} fw={800}>
                            Manage Users
                        </Title>
                    </Flex>
                    <Text c="dimmed" size="sm" maw={500}>
                        View and manage user accounts, roles, and permissions.
                    </Text>
                </Box>

                <UsersTable/>
            </Authorisation>
        </>
    );
}