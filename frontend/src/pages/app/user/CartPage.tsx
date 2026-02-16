import { useGetCart } from "@/api/cart/getCart.ts";
import { useGetCartTotal } from "@/api/cart/getCartTotal.ts";
import { CartItemsList } from "@/features/app/cart/components/CartItemsList.tsx";
import { CartTotalCard } from "@/features/app/cart/components/CartTotalCard.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import appClasses from "@/styles/app.module.css";
import { Badge, Box, Flex, Loader, Text, Title } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

export function CartPage() {
    const { user } = useAuth();

    const getCartQuery = useGetCart({ userId: user!.id.toString() });
    const getCartTotalQuery = useGetCartTotal({ userId: user!.id.toString() });

    if (getCartQuery.isPending || getCartTotalQuery.isPending) {
        return (
            <Flex align="center" justify="center" h="100vh" w="100%">
                <Loader type="bars" size="md"/>
            </Flex>
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

    return (
        <>
            <title>{ `Cart | TopMart` }</title>

            <Box className={ `${appClasses.pageBanner} ${appClasses.bannerCart}` }>
                <div className={ appClasses.bannerDot1 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>
                <div className={ appClasses.bannerDot2 } style={{ position: 'absolute', borderRadius: '50%', opacity: 0.08, pointerEvents: 'none' }}/>

                <Flex align="center" gap="sm" mb={8}>
                    <IconShoppingCart size={28} style={{ opacity: 0.7 }}/>
                    <Title fz={{ base: 24, md: 30 }} fw={800}>
                        Shopping Cart
                    </Title>
                    { !cartEmpty &&
                        <Badge variant="light" color="teal" size="lg">
                            { totalItems } { totalItems === 1 ? "item" : "items" }
                        </Badge>
                    }
                </Flex>
                <Text c="dimmed" size="sm" maw={500}>
                    Review your items, adjust quantities, and proceed to checkout when you're ready.
                </Text>
            </Box>

            <Flex
                direction={ { base: "column", md: "row" } }
                justify={ { base: "flex-start", md: "center" } }
                align={ { base: "center", md: "flex-start" } }
                mt="sm" gap="md"
            >
                <CartItemsList
                    cartItems={ cartItems } cartTotal={ cartTotal }
                    totalItems={ totalItems } cartValid={ cartValid }
                    cartEmpty={ cartEmpty }
                />

                { !cartEmpty &&
                    <CartTotalCard cartTotal={ cartTotal } totalItems={ totalItems } cartValid={ cartValid }/>
                }
            </Flex>
        </>
    );
}