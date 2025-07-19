#!/bin/bash

echo "🔍 Checking DNS configuration for watch.style..."

# Check current nameservers
echo "📡 Current nameservers:"
dig watch.style NS +short

# Check A records
echo "�� Current A records:"
dig watch.style A +short

# Check CNAME records
echo "📡 Current CNAME records:"
dig www.watch.style CNAME +short

# Check if Cloudflare is handling DNS
echo "📡 Checking if Cloudflare is handling DNS:"
dig watch.style +trace | grep -E "(cloudflare|ns[0-9]+\.cloudflare)" 