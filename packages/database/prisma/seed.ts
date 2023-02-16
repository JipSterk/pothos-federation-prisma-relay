import { faker } from "@faker-js/faker";
import { db } from "../src";
faker.seed(123);

async function main() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();

  const user = await db.user.create({
    data: {
      id: faker.datatype.uuid(),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName, "acme"),
      comments: {
        create: [
          {
            body: faker.lorem.paragraph(3),
          },
        ],
      },
    },
  });

  console.log(user);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
