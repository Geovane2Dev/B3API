import requests

def test_endpoint(method, url, label, failed_requests):
    try:
        if method.upper() == 'GET':
            response = requests.get(url)
        elif method.upper() == 'POST':
            response = requests.post(url)
        else:
            print(f"[{label}] ❌ Método não suportado: {method}")
            failed_requests.append((label, url, "Método não suportado"))
            return
        if response.status_code == 200:
            print(f"[{label}] ✅ {url}: {response.status_code}")
        else:
            print(f"[{label}] ❌ {url}: {response.status_code}")
            failed_requests.append((label, url, response.status_code))
    except Exception as e:
        print(f"[{label}] ❌ Erro ao acessar {url}: {str(e)}")
        failed_requests.append((label, url, str(e)))

def main():
    base_url = input("Digite a URL base (pressione Enter para usar http://localhost:3000): ").strip()
    if not base_url:
        base_url = "http://localhost:3000"

    print("\n--- Testando ENDPOINTS ---\n")

    endpoints = [
        # Fundamentus
        ("GET", f"{base_url}/api/fundamentus/available", "Fundamentus - Available"),
        ("GET", f"{base_url}/api/fundamentus/PETR4", "Fundamentus - PETR4"),
        ("GET", f"{base_url}/api/fundamentus/search?query=PETR", "Fundamentus - Search PETR"),

        # Quote
        ("GET", f"{base_url}/api/quote/available", "Quote - Available"),
        ("GET", f"{base_url}/api/quote/taxes", "Quote - Taxes"),
        ("GET", f"{base_url}/api/quote/search?query=ALP", "Quote - Search ALP"),
        ("GET", f"{base_url}/api/quote/VALE3", "Quote - VALE3"),
        ("GET", f"{base_url}/api/quote/result", "Quote - Result"),

        # All (Quote + Fundamentus)
        ("GET", f"{base_url}/api/all/VALE3", "All - VALE3"),

        # Crypto
        ("GET", f"{base_url}/api/crypto/all/bitcoin", "Crypto - Bitcoin"),
        ("GET", f"{base_url}/api/crypto/all/coins", "Crypto - Coins"),
        ("GET", f"{base_url}/api/crypto/transaction/20e64580a0d8520dd676357421f6f39873e61c69c96a1f56f499a21b26592883", "Crypto - Transaction"),
        ("GET", f"{base_url}/api/crypto/wallet/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "Crypto - Wallet"),
        ("GET", f"{base_url}/api/crypto/history/bitcoin", "Crypto - History"),
        ("GET", f"{base_url}/api/crypto/all", "Crypto - All"),
        ("GET", f"{base_url}/api/crypto/global", "Crypto - Global"),
        ("GET", f"{base_url}/api/crypto/latestblock", "Crypto - Latest Block"),
        ("GET", f"{base_url}/api/crypto/trending", "Crypto - Trending"),
        ("GET", f"{base_url}/api/crypto/unconfirmed-transactions", "Crypto - Unconfirmed Transactions"),
    ]

    failed_requests = []

    for method, url, label in endpoints:
        test_endpoint(method, url, label, failed_requests)

    print("\n--- RESUMO FINAL ---\n")
    if not failed_requests:
        print("🎉 Todos os endpoints retornaram status 200!")
    else:
        print("⚠️ Endpoints com falha (status diferente de 200 ou erro):")
        for label, url, status in failed_requests:
            print(f"🔸 {label} - {url} -> {status}")

if __name__ == "__main__":
    main()
