import { UpdateUserForm } from "@/features/app/users/components/UpdateUserForm.tsx";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Text, Title } from "@mantine/core";
import { IconUserCog } from "@tabler/icons-react";

export function UpdateUserPage() {
    return (
        <>
            <title>Account Settings</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerUser}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <Flex align="center" gap="sm" mb={4}>
                    <IconUserCog size={26} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 22, md: 28 }} fw={800}>
                        Account Settings
                    </Title>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Update your profile information, change your password, and manage account preferences.
                </Text>
            </Box>

            <UpdateUserForm/>
        </>
    );

}