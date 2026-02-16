import { useGetAddressesByUser } from "@/api/addresses/getAddressesByUser.ts";
import { CreateAddressActionIcon } from "@/components/ui/CreateAddressActionIcon.tsx";
import { AddressesList } from "@/features/app/addresses/components/AddressesList.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import appClasses from "@/styles/app.module.css";
import { Box, Flex, Loader, Text, Title } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";

export function AddressesPage() {
    const { user } = useAuth();

    const getAddressesByUserQuery = useGetAddressesByUser({ userId: user!.id.toString() });

    if (getAddressesByUserQuery.isPending) {
        return (
            <Flex align="center" justify="center" h="60vh">
                <Loader type="bars" size="md"/>
            </Flex>
        );
    }

    if (getAddressesByUserQuery.isError) {
        console.log("Error fetching user addresses", getAddressesByUserQuery.error);
        return (
            <Box className={ appClasses.emptyState }>
                <Text c="red.5" fw={500}>
                    There was an error when fetching your addresses. Please refresh and try again.
                </Text>
            </Box>
        );
    }

    const addresses = getAddressesByUserQuery.data?.data;

    return (
        <>
            <title>{ `My Addresses | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerUser}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconMapPin size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        My Addresses
                    </Title>
                    <CreateAddressActionIcon size="lg"/>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Manage your delivery and billing addresses for a seamless checkout experience.
                </Text>
            </Box>

            <AddressesList addresses={ addresses }/>
        </>
    );
}