import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Client } from "jsr:@db/postgres";
import * as os from "node:os";
const userInfo = os.userInfo();
const client = new Client({
    database: "dino",
    hostname: "./",
    host_type: "socket",
    port: 5432,
    user: userInfo.username,
});

const router = new Router();
router
    .get("/test", async (context) => {
        try {
            await client.connect();
            const name = "Charlie";
            const sql = "SELECT * FROM messages WHERE receiver = $1";
            const res = await client.queryObject(sql, [name]);
            context.response.body = res.rows;
        } catch (err) {
            console.error("DB connection failed:", err.message);
            console.log(err.message);
            console.error(err);
        } finally {
            try {
                await client.end();
            } catch (err) {
                console.log("Error closing client: " + err.message);
            }
        }
    });
try {
    const app = new Application();
    app.use(router.routes());
    app.use(router.allowedMethods());

    await app.listen({ port: 8000 });
    await client.end();
} catch (err) {
    console.log("Uncaught error: " + err.message);
}
