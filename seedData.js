const usersData = [
  {
    id: 1,
    pseudonym: "CoolDude123",
    email: "cool@example.com",
    password: "password1",
    hat: 1,
    city: "City1",
    country: "Country1",
    profileImage: "user1.jpg",
  },
  {
    id: 2,
    pseudonym: "MusicLover22",
    email: "music@example.com",
    password: "password2",
    hat: 2,
    city: "City2",
    country: "Country2",
    profileImage: "user2.jpg",
  },
  {
    id: 3,
    pseudonym: "TravelBug99",
    email: "travel@example.com",
    password: "password3",
    hat: 3,
    city: "City3",
    country: "Country3",
    profileImage: "user3.jpg",
  },
  {
    id: 4,
    pseudonym: "TechGeek007",
    email: "tech@example.com",
    password: "password4",
    hat: 4,
    city: "City4",
    country: "Country4",
    profileImage: "user4.jpg",
  },
  {
    id: 5,
    pseudonym: "FitnessFanatic42",
    email: "fitness@example.com",
    password: "password5",
    hat: 5,
    city: "City5",
    country: "Country5",
    profileImage: "user5.jpg",
  },
];
const responseData = [
  // Responses for Prompt 1
  {
    description:
      "I absolutely love Hawaii. The beaches, the sunsets, and the friendly people make it my favorite vacation destination.",
    promptId: 1,
    userId: 1,
  },
  {
    description:
      "My favorite vacation spot is the Maldives. Crystal clear waters, overwater bungalows, and snorkeling in the coral reefs make it magical.",
    promptId: 1,
    userId: 2,
  },
  // Add more responses for Prompt 1

  // Responses for Prompt 2
  {
    description:
      "My favorite book is 'To Kill a Mockingbird' by Harper Lee. It's a timeless classic that explores important social issues.",
    promptId: 2,
    userId: 3,
  },
  {
    description:
      "I love 'The Lord of the Rings' series by J.R.R. Tolkien. The rich world-building and epic adventure always captivate me.",
    promptId: 2,
    userId: 4,
  },
  {
    description:
      "I had a challenging problem at work involving a complex software bug. It took several days of debugging, but finally, I found the issue and fixed it.",
    promptId: 3,
    userId: 5,
  },
  {
    description:
      "At work, I had to manage a tight project deadline, and we successfully delivered the project on time. Team collaboration and dedication made it possible.",
    promptId: 3,
    userId: 1,
  },

  {
    description:
      "If I could have dinner with anyone, I'd choose Albert Einstein. I'd love to discuss his theories and gain insights into his genius mind.",
    promptId: 4,
    userId: 2,
  },
  {
    description:
      "I'd have dinner with Mahatma Gandhi to learn about his peaceful resistance and leadership in India's independence movement.",
    promptId: 4,
    userId: 4,
  },
  {
    description:
      "My favorite hobby is playing the guitar. I love the music and the sense of relaxation it brings me. If you're a beginner, practice regularly, and you'll get better!",
    promptId: 5,
    userId: 3,
  },
  {
    description:
      "I enjoy painting in my free time. It's a creative outlet that allows me to express my thoughts and emotions on canvas.",
    promptId: 5,
    userId: 1,
  },
  {
    description:
      "I'm proud of completing my first marathon. The training was tough, but crossing the finish line was an incredible feeling of achievement.",
    promptId: 6,
    userId: 5,
  },
  {
    description:
      "My biggest achievement was launching my own business. It required hard work, dedication, and a lot of learning, but it's been worth it.",
    promptId: 6,
    userId: 3,
  },
  {
    description:
      "The best advice I've received is 'Never give up.' It has motivated me to persevere through challenges and strive for my goals.",
    promptId: 7,
    userId: 4,
  },
  {
    description:
      "My grandfather once told me, 'Always be honest and kind.' This advice has shaped my character and values.",
    promptId: 7,
    userId: 5,
  },

  {
    description:
      "A childhood memory that makes me smile is the time I found a box of kittens in our backyard. They were so cute and playful!",
    promptId: 8,
    userId: 1,
  },
  {
    description:
      "I remember a funny moment from my childhood when I dressed up as a superhero and tried to fly. I learned that gravity is real!",
    promptId: 8,
    userId: 2,
  },

  {
    description:
      "My dream travel destination is Japan. I'm fascinated by the culture, history, and cuisine of the country.",
    promptId: 9,
    userId: 3,
  },
  {
    description:
      "I've always wanted to visit the Greek islands. The picturesque landscapes and Mediterranean lifestyle are incredibly appealing.",
    promptId: 9,
    userId: 4,
  },
];

const promptData = [
  {
    id: 1,
    title: "Tell us about your favorite vacation destination.",
    description: "Share your experiences and memories from your best vacation spot.",
    promptCategoryId: 1,
    userId: 1,
  },
  {
    id: 2,
    title: "What is your favorite book, and why do you love it?",
    description: "Discuss the book that has had the most impact on your life.",
    promptCategoryId: 2,
    userId: 2,
  },
  {
    id: 3,
    title: "Describe a challenging problem you've solved at work.",
    description: "Explain how you approached the problem and what solution you came up with.",
    promptCategoryId: 1,
    userId: 3,
  },
  {
    id: 4,
    title: "If you could have dinner with anyone, living or dead, who would it be?",
    description: "Share your reasons and what you'd hope to discuss with them.",
    promptCategoryId: 3,
    userId: 2,
  },
  {
    id: 5,
    title: "What's your favorite hobby or pastime?",
    description: "Tell us why you enjoy it and any tips for beginners.",
    promptCategoryId: 4,
    userId: 1,
  },
  {
    id: 6,
    title: "Discuss a personal achievement you're proud of.",
    description: "Share the story of how you accomplished a significant goal in your life.",
    promptCategoryId: 1,
    userId: 4,
  },
  {
    id: 7,
    title: "What's the best piece of advice you've ever received?",
    description: "Explain who gave you the advice and how it has impacted your life.",
    promptCategoryId: 3,
    userId: 1,
  },
  {
    id: 8,
    title: "Tell a childhood memory that still makes you smile.",
    description: "Share a heartwarming or funny moment from your early years.",
    promptCategoryId: 4,
    userId: 1,
  },
  {
    id: 9,
    title: "What's your dream travel destination, and why?",
    description: "Describe the place you've always wanted to visit and your reasons for choosing it.",
    promptCategoryId: 2,
    userId: 3,
  },
  {
    id: 10,
    title: "Discuss a recent technological advancement that excites you.",
    description: "Explain how it could change the world or your daily life.",
    promptCategoryId: 1,
    userId: 2,
  },
];

module.exports = { promptData, responseData, usersData };
