import Express, { json } from "express";
import { PrismaClient } from "@prisma/client";

const app = Express();
app.use(json())
const prisma = new PrismaClient();

app.post("/test", async (req, res) => {
  const { email, name, street, country } = req.body;
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      address: {
        create: {
          street: street,
          country: country,
        },
      },
    },
    include: { address: true },
  });

  res.send(user)
});

app.listen(8000, () => console.log('App running!'))