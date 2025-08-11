import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Usar as variáveis do Aiven
const redisAiven = process.env.REDIS_AIVEN;

console.log("Testando conexão com Redis Aiven...");
console.log("URL:", redisAiven);

// Criar cliente Redis usando ioredis (mesmo que está sendo usado no projeto)
let redis: Redis;

if (redisAiven) {
  // Usar a URL completa do Aiven
  redis = new Redis(redisAiven);

  redis.on("connect", () => {
    console.log("🔗 Conectado ao Redis Aiven com sucesso!");
  });

  redis.on("error", (err) => {
    console.error("❌ Erro ao conectar ao Redis Aiven:", err);
  });
} else {
  console.log("❌ Variável REDIS_AIVEN não definida. Verifique seu .env.");
}

async function testRedis() {
  try {
    console.log("🧪 Iniciando teste...");

    // Teste 1: Ping
    const pong = await redis.ping();
    console.log("📡 Ping:", pong);

    // Teste 2: Set/Get
    const testKey = "test-connection-" + Date.now();
    const testValue = "Hello from Aiven Redis!";

    await redis.set(testKey, testValue);
    console.log("💾 Dado salvo:", testKey, "=", testValue);

    const retrievedValue = await redis.get(testKey);
    console.log("📖 Dado lido:", retrievedValue);

    // Teste 3: Delete
    await redis.del(testKey);
    console.log("🗑️ Dado removido");

    // Verificar se foi removido
    const deletedValue = await redis.get(testKey);
    console.log(
      "🔍 Verificação após delete:",
      deletedValue === null ? "OK - removido" : "Erro - ainda existe"
    );

    console.log("✅ Todos os testes passaram!");
  } catch (error) {
    console.error("❌ Erro durante o teste:", error);
    process.exit(1);
  } finally {
    await redis.disconnect();
    console.log("🔌 Conexão encerrada");
    process.exit(0);
  }
}

// Executar teste
testRedis();
