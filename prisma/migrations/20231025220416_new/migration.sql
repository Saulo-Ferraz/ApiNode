-- CreateTable
CREATE TABLE "Curriculo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Curriculo_pkey" PRIMARY KEY ("id")
);
