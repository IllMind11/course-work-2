<h2 align="center">
Course Project - Inventory Management System
</h2><br>

## Features

- 💚 [Nuxt 3](https://nuxt.com/) - SSR, ESR, File-based routing, components auto importing, modules, etc.

- ⚡️ Vite - Instant HMR.

- 🔥 The `<script setup>` syntax.

- 📑 [Layout system](./layouts).

- 📥 APIs auto importing - for Composition API, VueUse and custom composables.

- 🏎 Zero-config cloud functions and deploy.

- 🦾 TypeScript, of course.

- 🌧️ Drizzle ORM

- 💽 SQLite

## Database Schema

### Materials Table

| Column       | Type           | Description                    |
| ------------ | -------------- | ------------------------------ |
| MaterialID   | INT            | Primary Key                    |
| MaterialName | VARCHAR(100)   | Name of the material           |
| Price        | DECIMAL(10, 2) | Price per unit of the material |

### Transactions Table

| Column              | Type           | Description                                   |
| ------------------- | -------------- | --------------------------------------------- |
| TransactionID       | INT            | Primary Key                                   |
| MaterialID          | INT            | Foreign Key referencing Materials(MaterialID) |
| Year                | INT            | Year of the transaction                       |
| Month               | INT            | Month of the transaction                      |
| StartingBalance     | DECIMAL(10, 2) | Balance at the beginning of the period        |
| ReceiptsAccountable | DECIMAL(10, 2) | Receipts from accountable person              |
| ReceiptsWarehouse   | DECIMAL(10, 2) | Receipts from central warehouse               |
| IssuesProduction    | DECIMAL(10, 2) | Issues to production                          |
| EndingBalance       | DECIMAL(10, 2) | Balance at the end of the period              |

### Example Schema Creation

```sql
CREATE TABLE Materials (
    MaterialID INT PRIMARY KEY,
    MaterialName VARCHAR(100),
    Price DECIMAL(10, 2)
);

CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY,
    MaterialID INT,
    Year INT,
    Month INT,
    StartingBalance DECIMAL(10, 2),
    ReceiptsAccountable DECIMAL(10, 2),
    ReceiptsWarehouse DECIMAL(10, 2),
    IssuesProduction DECIMAL(10, 2),
    EndingBalance DECIMAL(10, 2),
    FOREIGN KEY (MaterialID) REFERENCES Materials(MaterialID),
    UNIQUE (MaterialID, Year, Month)
);
```
