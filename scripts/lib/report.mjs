export function createReporter(name) {
  const errors = [];
  return {
    error(file, message) {
      errors.push(`${file}: ${message}`);
    },
    finish(note) {
      if (errors.length > 0) {
        console.error(`${name}: ${errors.length} problem(s)`);
        for (const error of errors) console.error(`  - ${error}`);
        process.exit(1);
      }
      console.log(`${name}: ok${note ? ` (${note})` : ''}`);
    },
  };
}
