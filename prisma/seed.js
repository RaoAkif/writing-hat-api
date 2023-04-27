const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash('123456', salt)

  const poem = await prisma.promptCategory.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: 'poem'
    }
  })
  const cooking = await prisma.promptCategory.upsert({
    where: {id: 2},
    update: {},
    create: {
      name: 'cooking'
    }
  })

  const akif = await prisma.user.upsert({
    where: { email: 'akifrao@gmail.com' },
    update: {},
    create: {
      pseudonym: "raoakif",
      email: "akifrao@gmail.com",
      password: hashedPassword,
      city: "Lahore",
      country: "Pakistan",
      profileImage: "https://avatars.githubusercontent.com/u/61361037?s=400&u=5a3fe223b969f16e2a4523817eb3acf361935f74&v=4",
      prompt: {
        create: [
          {
            description: 'Leisure by William Henry Davies',
            promptCategoryId: 1
          },
        ],
      },
    }
  })
  const umman = await prisma.user.upsert({
    where: { email: 'ummanwaseem@gmail.com' },
    update: {},
    create: {
      pseudonym: "ummanwaseem",
      email: "ummanwaseem@gmail.com",
      password: hashedPassword,
      city: "Lahore",
      country: "Pakistan",
      profileImage: "https://avatars.githubusercontent.com/u/61361037?s=400&u=5a3fe223b969f16e2a4523817eb3acf361935f74&v=4",
      prompt: {
        create: [
          {
            description: 'How to make Uzbek Pulao',
            promptCategoryId: 2,
            response: {
              create: [
                {
                  description: 'I love the Uzbek Pulao alot',
                  userId: 1
                },
                {
                  description: 'I love the Pakistani Pulao alot',
                  userId: 1
                },
              ],
            },
          },
          {
            description: 'How to make Pakistani Pulao',
            promptCategoryId: 2
          },
        ],
      },
    }
  })


  console.log({ akif, umman, poem, cooking })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
