import imgUrl from "@/assets/home.png";
import { paths } from "@/config/paths.ts";
import { api } from "@/lib/apiClient.ts";
import { ProductResponse } from "@/types/api.ts";
import { PRODUCT_CONDITION } from "@/utils/constants.ts";
import { base64ToDataUri } from "@/utils/fileUtils.ts";
import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Group,
    Image,
    Loader,
    SimpleGrid,
    Text,
    ThemeIcon,
    Title,
    useMantineColorScheme
} from "@mantine/core";
import {
    IconArrowRight,
    IconChecklist,
    IconLeaf,
    IconPackages,
    IconPaywall,
    IconShieldCheck,
    IconSparkles,
    IconList,
    IconTool,
    IconTrendingUp,
    IconUsers
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import classes from "./HomePage.module.css";

const FEATURES = [
    {
        icon: IconChecklist,
        title: "Fast & Easy Listings",
        description: "Post your items in minutes with a smooth, guided listing process. Upload images, set prices, and go live instantly."
    },
    {
        icon: IconPaywall,
        title: "Secure Payments",
        description: "Buy and sell with confidence through secure Stripe-powered payments with buyer protection built in."
    },
    {
        icon: IconPackages,
        title: "15+ Categories",
        description: "From electronics to home goods, buy or sell across a wide range of product types with smart filtering."
    },
    {
        icon: IconLeaf,
        title: "Eco-Friendly Impact",
        description: "Every item resold helps cut landfill waste and reduce CO₂ emissions. Shop sustainably."
    },
    {
        icon: IconShieldCheck,
        title: "Verified Sellers",
        description: "Every seller goes through email verification and optional 2FA for a trustworthy marketplace."
    },
    {
        icon: IconSparkles,
        title: "Smart Experience",
        description: "Wishlist tracking, cart management, order history, and real-time notifications — all in one place."
    }
];

const STATS = [
    { value: "15+", label: "Product Categories", icon: IconPackages },
    { value: "5", label: "Product Conditions", icon: IconTrendingUp },
    { value: "2FA", label: "Security Enabled", icon: IconShieldCheck },
    { value: "24/7", label: "Platform Access", icon: IconUsers }
];

export function HomePage() {
    const { colorScheme } = useMantineColorScheme();
    const [latestProducts, setLatestProducts] = useState<ProductResponse[]>([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchLatestProducts() {
            try {
                const response = await api.get<ProductResponse[]>("/api/products/latest");
                setLatestProducts(response.data);
            } catch (error) {
                console.error("Error fetching latest products:", error);
                setIsError(true);
            }
        }
        fetchLatestProducts();
    }, []);

    const productCards = useMemo(() =>
        latestProducts.map((product: ProductResponse, index: number) => {
            const displayedImage = product.images[0];
            const hasDiscount = product.previousPrice && product.previousPrice > product.price;

            return (
                <Grid.Col span={ { base: 12, sm: 6, md: 4, lg: 3 } } key={ product.id }>
                    <Flex justify="center" style={{ animationDelay: `${index * 0.08}s` }} className="animate-fade-in-up">
                        <Card w={ 300 } withBorder className={ classes.productCard } padding="0">
                            <Card.Section className={ classes.productImageSection }>
                                <Box pos="relative">
                                    <Image
                                        src={ base64ToDataUri(displayedImage.image, displayedImage.type) }
                                        alt="Product Image"
                                        fit="contain" h={ 180 }
                                        bg={ colorScheme === "dark" ? "dark.4" : "gray.1" }
                                        p="xs"
                                    />
                                    { hasDiscount &&
                                        <Badge
                                            color="red" variant="filled" size="sm"
                                            pos="absolute" top={8} right={8}
                                            style={{ zIndex: 2 }}
                                        >
                                            { Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100) }% OFF
                                        </Badge>
                                    }
                                </Box>
                            </Card.Section>

                            <Box p="sm">
                                <Text size="md" lineClamp={2} fw={600} h={48} lh={1.4}>
                                    { product.name }
                                </Text>

                                <Flex justify="space-between" mt="xs" mb={4}>
                                    <Flex align="center" gap={4}>
                                        <IconList size={14} style={{ opacity: 0.6 }}/>
                                        <Text size="xs" c="dimmed">
                                            { product.category.name }
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap={4}>
                                        <IconTool size={14} style={{ opacity: 0.6 }}/>
                                        <Text size="xs" c="dimmed">
                                            { PRODUCT_CONDITION[product.condition] }
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex align="center" gap={4} mb="xs">
                                    <IconPackages size={14} style={{ opacity: 0.6 }}/>
                                    <Text
                                        size="xs"
                                        c={ product.availableQuantity <= 3 ? "red.6" : "dimmed" }
                                        fw={ product.availableQuantity <= 3 ? 600 : 400 }
                                    >
                                        { product.availableQuantity <= 3 ? `Only ${product.availableQuantity} left!` : `${product.availableQuantity} available` }
                                    </Text>
                                </Flex>

                                <Flex align="baseline" gap="xs" mt="auto" pt="xs"
                                      style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}>
                                    <Text size="xl" fw={700} className={ classes.priceBadge }>
                                        £{ product.price.toFixed(2) }
                                    </Text>
                                    { hasDiscount &&
                                        <Text size="sm" fw={400} c="dimmed" td="line-through">
                                            £{ product.previousPrice.toFixed(2) }
                                        </Text>
                                    }
                                </Flex>
                            </Box>
                        </Card>
                    </Flex>
                </Grid.Col>
            );
        })
    , [colorScheme, latestProducts]);

    return (
        <>
            <title>{`Welcome | TopMart`}</title>

            {/* ===== HERO SECTION ===== */}
            <Box className={ classes.heroSection } mb={60}>
                <div className={ classes.heroDecoration1 }/>
                <div className={ classes.heroDecoration2 }/>
                <div className={ classes.heroDecoration3 }/>

                <Container size="lg" w="100%">
                    <Flex gap={50} align="center" justify="space-between" wrap="wrap">
                        <Flex direction="column" maw={520} className={ classes.heroContent }>
                            <Badge variant="light" size="lg" mb="md" w="fit-content">
                                Sustainable Marketplace
                            </Badge>

                            <Title fz={{ base: 36, sm: 44, md: 52 }} className={ classes.heroTitle }>
                                Buy Smart,{" "}
                                <Text
                                    span inherit variant="gradient"
                                    gradient={{ from: "paleIndigo.6", to: "blue.4", deg: 120 }}
                                >
                                    Sell Sustainably
                                </Text>
                            </Title>

                            <Text c="dimmed" mt="lg" fz={{ base: "md", md: "lg" }} className={ classes.heroSubtitle }>
                                Discover great deals on second-hand goods, or give your old products a new home.
                                Simple, secure, and eco-friendly — join a marketplace that cares about the planet.
                            </Text>

                            <Group mt={32}>
                                <Button
                                    size="lg" radius="xl"
                                    rightSection={<IconArrowRight size={18}/>}
                                    component={Link} to={paths.auth.register.path}
                                    variant="gradient"
                                    gradient={{ from: "paleIndigo.6", to: "paleIndigo.8", deg: 135 }}
                                >
                                    Get Started
                                </Button>

                                <Button
                                    variant="light" size="lg" radius="xl"
                                    component={Link} to={paths.auth.login.path}
                                >
                                    Sign In
                                </Button>
                            </Group>
                        </Flex>

                        <Box
                            display={{ base: "none", md: "block" }}
                            className={ classes.heroImage }
                        >
                            <Image
                                src={imgUrl} h={380} w={380}
                                radius="lg"
                            />
                        </Box>
                    </Flex>
                </Container>
            </Box>

            {/* ===== STATS SECTION ===== */}
            <Container size="lg" mb={60}>
                <Box className={ classes.statsSection }>
                    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl">
                        { STATS.map((stat) => (
                            <Flex key={stat.label} direction="column" align="center" ta="center">
                                <stat.icon size={28} style={{ marginBottom: 8, opacity: 0.9 }}/>
                                <Text className={ classes.statNumber }>{ stat.value }</Text>
                                <Text className={ classes.statLabel }>{ stat.label }</Text>
                            </Flex>
                        ))}
                    </SimpleGrid>
                </Box>
            </Container>

            {/* ===== FEATURES SECTION ===== */}
            <Container size="lg" mb={60}>
                <Flex direction="column" align="center" mb="xl">
                    <Title order={2} ta="center" fz={30} className={ classes.sectionTitle }>
                        Why Choose TopMart?
                    </Title>
                    <Text c="dimmed" ta="center" mt="lg" maw={560}>
                        Built with modern technology and designed for the best user experience.
                        Here's what makes our platform stand out.
                    </Text>
                </Flex>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                    { FEATURES.map((feature, index) => (
                        <Card
                            key={feature.title}
                            withBorder padding="xl"
                            className={ classes.featureCard }
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ThemeIcon
                                size={54} radius="md" variant="light"
                                color="paleIndigo"
                            >
                                <feature.icon size={28}/>
                            </ThemeIcon>

                            <Text size="lg" fw={600} mt="md">
                                { feature.title }
                            </Text>

                            <Text size="sm" c="dimmed" mt="xs" lh={1.6}>
                                { feature.description }
                            </Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>

            {/* ===== LATEST PRODUCTS SECTION ===== */}
            <Container size="lg" mb={60}>
                <Flex direction="column" align="center" mb="xl">
                    <Title order={2} ta="center" fz={30} className={ classes.sectionTitle }>
                        Latest Products
                    </Title>
                    <Text c="dimmed" ta="center" mt="lg" maw={500}>
                        Fresh listings from our community. Browse the newest items available on the marketplace.
                    </Text>
                </Flex>

                { isError ? (
                    <Card withBorder p="xl" ta="center">
                        <Text c="red" fw={500}>
                            There was an error fetching the latest products.
                        </Text>
                        <Text c="dimmed" size="sm" mt="xs">
                            Please refresh and try again.
                        </Text>
                    </Card>
                ) : productCards.length === 0 ? (
                    <Flex justify="center" py="xl">
                        <Loader type="bars"/>
                    </Flex>
                ) : (
                    <Grid gutter="lg">
                        { productCards }
                    </Grid>
                )}
            </Container>

            {/* ===== CTA SECTION ===== */}
            <Container size="lg" mb={40}>
                <Box className={ classes.ctaSection }>
                    <Title order={2} fz={{ base: 24, md: 32 }} mb="sm">
                        Ready to start buying & selling?
                    </Title>
                    <Text c="dimmed" maw={480} mx="auto" mb="xl">
                        Join TopMart today and be part of a growing sustainable marketplace.
                        List your first product in under 2 minutes.
                    </Text>
                    <Group justify="center">
                        <Button
                            size="lg" radius="xl"
                            rightSection={<IconArrowRight size={18}/>}
                            component={Link} to={paths.auth.register.path}
                            variant="gradient"
                            gradient={{ from: "paleIndigo.6", to: "paleIndigo.8", deg: 135 }}
                        >
                            Create Account
                        </Button>
                        <Button
                            variant="default" size="lg" radius="xl"
                            component={Link} to={paths.auth.login.path}
                        >
                            Sign In
                        </Button>
                    </Group>
                </Box>
            </Container>
        </>
    );
}