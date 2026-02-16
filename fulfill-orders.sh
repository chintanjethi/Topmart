#!/bin/bash

# Script to manually fulfill pending Stripe orders
# This simulates what the webhook/success page should do

echo "Fetching pending orders from database..."

# Get all pending orders
docker exec -it mysql-topmart mysql -uuser -ppassword topmart_db -e "
SELECT id, stripe_checkout_id, status, placed_at 
FROM customer_order 
WHERE status = 'PENDING_PAYMENT' 
ORDER BY placed_at DESC;" > /tmp/pending_orders.txt

cat /tmp/pending_orders.txt

echo ""
echo "To fulfill an order, run:"
echo "curl -X POST http://localhost:8080/api/orders/fulfill -H 'Content-Type: application/json' -d '{\"stripeSessionId\": \"YOUR_SESSION_ID\"}'"
