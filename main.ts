import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const messages = new Map<string, any>();
messages.set(
    "1",
    {
        id: "1",
        content: "Hello, how do you do?",
        author: "Bob",
    },
    "2",
    {
        id: "2",
        content: "Are you there",
        author: "Bob",
    },
);

const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello world!";
    })
    .get("/message", (context) => {
        context.response.body = Array.from(messages.values());
    })
    .get("/message/:id", (context) => {
        if (messages.has(context?.params?.id)) {
            context.response.body = messages.get(context.params.id);
        }
    });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
