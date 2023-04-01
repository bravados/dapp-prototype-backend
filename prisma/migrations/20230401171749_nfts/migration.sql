-- CreateTable
CREATE TABLE `Nft` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `media` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `blockchain` ENUM('NEAR') NOT NULL,

    PRIMARY KEY (`id`, `blockchain`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
