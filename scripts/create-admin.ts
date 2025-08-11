import { PrismaClient } from "../lib/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Verificar se já existe um usuário admin
    const existingAdmin = await prisma.user.findUnique({
      where: { username: "admin" },
    });

    if (existingAdmin) {
      console.log("👤 Usuário admin já existe!");
      return;
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Criar usuário admin
    const adminUser = await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@comsefaz.com",
        name: "Administrador",
        password: hashedPassword,
      },
    });

    console.log("✅ Usuário admin criado com sucesso!");
    console.log("📧 Email: admin@comsefaz.com");
    console.log("👤 Username: admin");
    console.log("🔑 Senha: admin123");
    console.log("🆔 ID:", adminUser.id);
  } catch (error) {
    console.error("❌ Erro ao criar usuário admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
