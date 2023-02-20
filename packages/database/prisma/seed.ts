import { faker } from "@faker-js/faker";
import { db } from "../src";
faker.seed(123);

const AMOUT_OF_USERS = Number(process.env.AMOUNT_OF_USERS ?? 100);

async function main() {
  for (let i = 0; i < AMOUT_OF_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();

    await db.user.create({
      data: {
        id: faker.datatype.uuid(),
        firstName,
        lastName,
        email: faker.internet.email(firstName, lastName, "acme.com"),
        comments: {
          create: [
            {
              body: faker.lorem.paragraph(3),
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
