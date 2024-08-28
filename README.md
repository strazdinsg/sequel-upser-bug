# Sequelize upsert bug

Demo repository to show the `upsert()` function bug in Sequelize v6.

Summary: when using `upsert()` with a record that already exists (has the same values for a unique
key as another record in the database), the update works correctly, but the ID of the record is
not updated.

## Usage

Install the dependencies:

```bash
pnpm install
```

Run the tests:

```bash
pnpm test
```
