-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "categoriaPaiId" TEXT,
    "centroDeCusto" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroOrcamento" (
    "id" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "valor" DECIMAL(14,2) NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistroOrcamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_categoriaPaiId_fkey" FOREIGN KEY ("categoriaPaiId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroOrcamento" ADD CONSTRAINT "RegistroOrcamento_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
