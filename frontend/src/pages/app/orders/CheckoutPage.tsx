import { useGetAddressesByUser } from "@/api/addresses/getAddressesByUser.ts";
import { useGetCart } from "@/api/cart/getCart.ts";
import { useGetCartTotal } from "@/api/cart/getCartTotal.ts";
import { paths } from "@/config/paths.ts";
import { CartItemsList } from "@/features/app/cart/components/CartItemsList.tsx";
import { AddressSelectCard } from "@/features/app/orders/components/AddressSelectCard.tsx";
import { CheckoutTotalCard } from "@/features/app/orders/components/CheckoutTotalCard.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import appClasses from "@/styles/app.module.css";
import { Badge, Box, Button, Flex, Loader, Text, Title } from "@mantine/core";
import { IconArrowBack, IconLock, IconShieldCheck } from "@tabler/icons-react";
import { useState } from "react";
import { Link, Navigate } from "react-router";

export function CheckoutPage() {
    const { user } = useAuth();
    const [selectedDeliveryAddressId, setSelectedDeliveryAddressId] = useState<string>("");
    const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const getAddressesQuery = useGetAddressesByUser({ userId: user!.id.toString() });
    const getCartQuery = useGetCart({ userId: user!.id.toString() });
    const getCartTotalQuery = useGetCartTotal({ userId: user!.id.toString() });

    if (getAddressesQuery.isPending || getCartQuery.isPending || getCartTotalQuery.isPending || loading) {
        return (
            <Flex align="center" justify="center" h="100vh" w="100%">
                <Loader type="bars" size="md"/>
            </Flex>
        );
    }

    if (getAddressesQuery.isError) {
        console.log("Error fetching addresses", getAddressesQuery.error);
        return (
            <Box className={ appClasses.emptyState }>
                <Text c="red.5" fw={500}>
                    There was an error when fetching your addresses. Please refresh and try again.
                </Text>
            </Box>
        );
    }

    if (getCartQuery.isError) {
        console.log("Error fetching cart", getCartQuery.error);
        return (
            <Box className={ appClasses.emptyState }>
                <Text c="red.5" fw={500}>
                    There was an error when fetching your cart. Please refresh and try again.
                </Text>
            </Box>
        );
    }

    if (getCartTotalQuery.isError) {
        console.log("Error fetching cart total", getCartTotalQuery.error);
        return (
            <Box className={ appClasses.emptyState }>
                <Text c="red.5" fw={500}>
                    There was an error when calculating your cart total. Please refresh and try again.
                </Text>
            </Box>
        );
    }

    const cartItems = getCartQuery.data?.data;
    const cartTotal = getCartTotalQuery.data?.data;
    const totalItems =
        cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartValid = cartItems.every((item) =>
        !item.product.isDeleted && (item.quantity <= item.product.availableQuantity)
    );
    const cartEmpty = cartItems.length === 0;

    const addresses = getAddressesQuery.data?.data;
    const deliveryAddress =
        addresses.find(address => address.id.toString() === selectedDeliveryAddressId);
    const billingAddress =
        addresses.find(address => address.id.toString() === selectedBillingAddressId);

    if (cartEmpty) return <Navigate to={ paths.app.cart.getHref() }/>;

    return (
        <>
            <title>{ `Checkout | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerCheckout}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconShieldCheck size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        Secure Checkout
                    </Title>
                    <Badge variant="light" color="green" size="lg" leftSection={<IconLock size={14}/>}>
                        SSL Encrypted
                    </Badge>
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Select your delivery and billing addresses, review your order, and complete the purchase.
                </Text>
            </Box>

            <Flex
                direction={ { base: "column", md: "row" } }
                justify={ { base: "flex-start", md: "center" } }
                align={ { base: "center", md: "flex-start" } }
                gap="md"
            >
                <Flex direction="column" gap="md">
                    <Button
                        w="fit-content"
                        variant="light" leftSection={ <IconArrowBack size={ 20 }/> }
                        component={ Link } to={ paths.app.cart.getHref() }
                    >
                        Back to cart
                    </Button>

                    <AddressSelectCard
                        title="Select delivery address"
                        selectedAddressId={ selectedDeliveryAddressId }
                        setSelectedAddressId={ setSelectedDeliveryAddressId }
                        addresses={ addresses }
                    />

                    <AddressSelectCard
                        title="Select billing address"
                        selectedAddressId={ selectedBillingAddressId }
                        setSelectedAddressId={ setSelectedBillingAddressId }
                        addresses={ addresses }
                    />

                    <CartItemsList
                        title={ <Title mt={ 5 } order={ 2 }> Review cart </Title> }
                        cartItems={ cartItems } cartTotal={ cartTotal }
                        totalItems={ totalItems } cartValid={ cartValid }
                        cartEmpty={ cartEmpty }
                    />
                </Flex>

                <CheckoutTotalCard
                    deliveryAddress={ deliveryAddress } billingAddress={ billingAddress }
                    cartTotal={ cartTotal } totalItems={ totalItems } cartValid={ cartValid }
                    setLoading={ setLoading }
                />
            </Flex>
        </>
    );
}