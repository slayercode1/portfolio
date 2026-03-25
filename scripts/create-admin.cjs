const crypto = require("crypto");
const { Pool } = require("pg");

const N = 16384, r = 16, p = 1, dkLen = 64;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password.normalize("NFKC"), salt, dkLen, { N, r, p, maxmem: 128 * N * r * 2 }, (err, key) => {
      if (err) return reject(err);
      resolve(`${salt}:${key.toString("hex")}`);
    });
  });
}

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const email = process.env.ADMIN_EMAIL || "admin@portfolio.com";
    const password = process.env.ADMIN_PASSWORD || "Admin123!";

    const existing = await pool.query("SELECT id FROM \"User\" WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      console.log("Admin user already exists:", email);
      return;
    }

    const id = crypto.randomUUID();
    const now = new Date();
    const hash = await hashPassword(password);

    await pool.query("BEGIN");

    await pool.query(
      `INSERT INTO "User" (id, email, "emailVerified", name, role, "createdAt", "updatedAt")
       VALUES ($1, $2, false, 'Admin', 'ADMIN', $3, $3)`,
      [id, email, now]
    );

    await pool.query(
      `INSERT INTO "Account" (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
       VALUES ($1, $2, $2, 'credential', $3, $4, $4)`,
      [crypto.randomUUID(), id, hash, now]
    );

    await pool.query("COMMIT");

    console.log("Admin user created successfully!");
    console.log("Email:", email);
  } catch (error) {
    await pool.query("ROLLBACK").catch(() => {});
    console.error("Error creating admin user:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
