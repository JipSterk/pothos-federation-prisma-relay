import { db } from "../src";

async function main() {
  const user = await db.user.create({
    data: {
      email: "jipsterk1998@gmail.com",
      firstName: "jip",
      lastName: "sterk",
      comments: {
        create: [
          {
            body: "hi",
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
