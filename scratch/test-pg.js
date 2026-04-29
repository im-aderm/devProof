import pkg from 'pg';
const { Client } = pkg;

const connectionString = "postgresql://postgres.pdxfdupxifyvzyezwuot:devProof-123@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

async function test() {
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log("Connected successfully with pg library!");
    const res = await client.query('SELECT NOW()');
    console.log("Query result:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("Connection failed with pg library:", err);
  }
}

test();
