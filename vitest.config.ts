// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'], // ✅ 指定明確搜尋範圍
        globals: true,
        setupFiles: ['./tests/setup.ts'],
    }
});
