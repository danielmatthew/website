module.exports = {
  ci: {
    collect: {
      // staticDistDir: './public',
      startServerCommand: `npm run serve`,
      startServerReadyPattern: 'Serving files from: dist',
      url: ['http://localhost:8080'],
    },
    assert: {
      budgetFile: './budget.json',
      preset: 'lighthouse:no-pwa',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
