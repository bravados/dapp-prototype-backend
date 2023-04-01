-- CreateTable
CREATE TABLE `Royalty` (
    `userId` INTEGER NOT NULL,
    `walletId` INTEGER NOT NULL,
    `percent` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `walletId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Royalty` ADD CONSTRAINT `Royalty_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Royalty` ADD CONSTRAINT `Royalty_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
