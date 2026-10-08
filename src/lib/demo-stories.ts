import { StoryPayload, MascotId } from '@/types';

export const DEMO_STORIES: Record<string, StoryPayload> = {
  photosynthesis: {
    storyTitle: "Pip the Sprout's Sunny Secret Kitchen",
    topic: "Photosynthesis & How Plants Cook Sunbeams",
    age: 8,
    mascot: 'channie',
    isDemo: true,
    mascotIntro: "Howwwwl! Welcome to nature's most dazzling chemistry laboratory! I'm channie the Wise wolf, and today we're shrinking down into microscopic green kitchens!",
    storyText: [
      "[SCENE: Deep beneath Whispering Meadow where tiny Pip the Seed rests in cool soil]\nDeep underground, Pip the tiny seed wondered how giant trees grew so tall without ever eating sandwiches, pancakes, or crunchy apples.",
      "[SCENE: The bright meadow surface as Pip bursts upward into golden sunlight]\n*POP!* One sunny morning, Pip sprouted two emerald leaves above ground! Maya the Robin chirped from an oak branch: 'Welcome to the sunroom, little sprout!' Pip's roots reached deep into the damp earth, *SLURP!* drinking cool underground water.",
      "[SCENE: Inside Pip's green leaf kitchen packed with billions of glowing chlorophyll solar chefs]\nInside Pip's leaves were billions of microscopic kitchen helpers called Chlorophyll. They wore shiny solar chef hats! As golden sunlight streamed down, *ZAP!* the chefs caught the light rays and trapped invisible air called Carbon Dioxide.",
      "[SCENE: Sweet bubbling sap rising through Pip's stem as fresh clean oxygen drifts out]\n*SIZZLE!* The chlorophyll chefs mixed the sunbeams, root water, and air together to bake sweet, energy-rich Glucose sugar sap! Pip felt a surge of superpower energy and grew a full inch taller before dinner.",
      "[SCENE: Maya the Robin inhaling the fresh mountain air above the smiling sprout]\n*WHOOSH!* As a final magical bonus, Pip gently released fresh, clean Oxygen into the breeze. 'Thank you, Pip!' Maya chirped, breathing deeply. Pip smiled proudly—plants and animals are truly the ultimate superhero team!"
    ],
    flashcards: [
      {
        front: "What is Photosynthesis?",
        back: "The magical process plants use to turn sunlight, water, and air into delicious sweet plant food (sugar)!"
      },
      {
        front: "What is Chlorophyll?",
        back: "The bright green superpower pigment inside leaves that acts like tiny solar-powered chef hats catching sunlight!"
      },
      {
        front: "What is Glucose?",
        back: "Sweet, energizing sugar sap made by plants during photosynthesis to help them grow big and strong!"
      },
      {
        front: "What do plants give us to breathe?",
        back: "Fresh, clean Oxygen (O2) that all animals and humans need for every breath!"
      }
    ],
    quiz: [
      {
        question: "What special green 'chef helper' in leaves catches golden sunlight to cook food?",
        options: [
          "A) Chlorophyll",
          "B) Sand grains",
          "C) Spider silk",
          "D) Honey drops"
        ],
        correctAnswer: 0,
        hintForWrongAnswer: "Think about the green solar-powered chef hats inside Pip's leaves that trap the sunlight!"
      },
      {
        question: "What two ingredients does Pip combine with sunlight to bake sweet plant food?",
        options: [
          "A) Orange juice and black pepper",
          "B) Water from roots and carbon dioxide from the air",
          "C) Soil pebbles and pancake syrup",
          "D) Moon dust and morning frost"
        ],
        correctAnswer: 1,
        hintForWrongAnswer: "Remember what Pip's roots slurped up from underground and what the leaves caught from the breeze!"
      },
      {
        question: "What gift do plants release into the breeze after baking their glucose?",
        options: [
          "A) Heavy grey clouds",
          "B) Cold ice cubes",
          "C) Fresh oxygen for animals and people to breathe",
          "D) Purple glitter smoke"
        ],
        correctAnswer: 2,
        hintForWrongAnswer: "Recall what Maya the Robin gratefully breathed in when thanking Pip the Sprout!"
      }
    ],
    learningKeyTakeaway: "Plants use sunlight, water, and carbon dioxide through chlorophyll to make glucose food and release fresh oxygen!",
    conceptsMastered: [
      "Plants convert solar light, water, and carbon dioxide into glucose",
      "Chlorophyll is the green pigment acting as cellular solar panels",
      "Photosynthesis supplies vital oxygen to Earth's atmosphere"
    ],
    recommendedNextTopic: "The Water Cycle: Journey of a Raindrop"
  },
  gravity: {
    storyTitle: "Barnaby's Bouncing Apple and the Earth's Invisible Hug",
    topic: "Gravity & Why Things Fall Down",
    age: 7,
    mascot: 'lee',
    isDemo: true,
    mascotIntro: "Roar! lee the bunny here! Today we're solving a gigantic cosmic puzzle: why don't puppies and apples float up into outer space?",
    storyText: [
      "[SCENE: A sunny apple orchard where energetic puppy Leo is leaping for butterflies]\nLeo was a cheerful pup who believed he could jump straight over the moon. Every afternoon, he bounced across the lawn, chasing dandelion seeds and leaping over picnic tables.",
      "[SCENE: An apple breaking off a high wooden branch and plummeting down]\n*SNAP!* An apple broke loose from the tallest branch. Leo paused mid-wag. The apple didn't float up into the clouds, nor did it drift sideways into Mrs. Gable's garden. *THUD!* It landed directly in the grass right in front of Leo's nose!",
      "[SCENE: Barnaby the Bear resting against the big tree pointing toward the center of Earth]\n'Why do things always drop down instead of floating away?' Leo barked. Barnaby the Bear smiled warmly: 'That, young pup, is Earth's great invisible hug: Gravity! Because Earth is colossal and heavy, it gently pulls everything toward its center.'",
      "[SCENE: Leo taking a huge leap into the sky before gently landing on his paws]\n*BOING!* Leo gave his biggest leap ever into the air. He soared high for one glorious second, and then Earth's gentle gravity hug brought his paws safely back down. 'Thank goodness for gravity,' Leo laughed, 'or my favorite bone would float away to Mars!'"
    ],
    flashcards: [
      {
        front: "What is Gravity?",
        back: "Earth's invisible pulling force that draws all objects, people, and animals toward the center of the planet!"
      },
      {
        front: "Why does Earth have such strong gravity?",
        back: "Because Earth is super massive and heavy! The more mass an object has, the stronger its gravitational pull."
      },
      {
        front: "What would happen without gravity?",
        back: "Everything not tied down—water, trees, playgrounds, and puppies—would float away into outer space!"
      }
    ],
    quiz: [
      {
        question: "What is gravity?",
        options: [
          "A) A strong gust of winter wind",
          "B) An invisible pulling force from Earth that draws things downward",
          "C) A sticky honey made by bees",
          "D) A magic mirror illusion"
        ],
        correctAnswer: 1,
        hintForWrongAnswer: "Barnaby described Earth's invisible hug pulling everything toward the center of the ground!"
      },
      {
        question: "What happened to the apple when it snapped from the tree branch?",
        options: [
          "A) It floated into the clouds",
          "B) It turned into a bird",
          "C) It fell downward to the ground",
          "D) It zoomed to outer space"
        ],
        correctAnswer: 2,
        hintForWrongAnswer: "Think about where the apple landed when Leo heard the *THUD!*"
      },
      {
        question: "What would happen if Earth didn't have gravity?",
        options: [
          "A) Everything would float away into space",
          "B) The grass would turn neon blue",
          "C) The sun would stop shining",
          "D) Fish would start flying airplanes"
        ],
        correctAnswer: 0,
        hintForWrongAnswer: "Recall what Leo said about his favorite chew bone if Earth couldn't pull things down!"
      }
    ],
    learningKeyTakeaway: "Gravity is the invisible force of attraction that pulls objects toward massive bodies like Earth.",
    conceptsMastered: [
      "Gravity is an attractive force that pulls objects toward Earth's center",
      "Mass determines the strength of gravitational pull",
      "Gravity keeps our atmosphere, oceans, and feet securely grounded"
    ],
    recommendedNextTopic: "The Moon's Orbit and Ocean Tides"
  },
  blackholes: {
    storyTitle: "Cosmo the Comet and the Cosmic Whirlpool",
    topic: "Black Holes in Deep Space",
    age: 10,
    mascot: 'minnie',
    isDemo: true,
    mascotIntro: "Pip-pip! Navigator Minnie here! Fasten your cosmic seatbelts—we are voyaging past the rings of Saturn toward the most mysterious wonders of the galaxy!",
    storyText: [
      "[SCENE: The starry expanse beyond Saturn's glowing rings where Cosmo the Comet glides]\n*SWOOSH!* Far out in deep space, Cosmo the Comet was touring the Milky Way. Cosmo had a sparkling tail of blue ice and loved gliding past purple nebulae and golden constellations.",
      "[SCENE: A mysterious pitch-black sphere surrounded by a superheated swirling ring of gold light]\n*BEEP-BEEP!* Cosmo's navigation beacon blinked: 'WARNING: Extreme mass ahead!' Cosmo looked ahead. Instead of a shining star, there was a circle of pitch-black darkness surrounded by a swirling, glowing ring of super-heated gas called an Accretion Disk.",
      "[SCENE: Explorer Pippa the Penguin in a high-tech star cruiser pointing to the Event Horizon]\n'Greetings, young voyager!' Pippa the Penguin radioed through the comms. 'You are gazing at a Black Hole! Millions of years ago, a colossal star ran out of fuel. When it collapsed inward, all its huge mass was squeezed into a point so tiny and dense that its gravity became immense!'",
      "[SCENE: Beams of light bending around the dark whirlpool in deep space]\n*WHAM!* 'Can light even escape from it?' Cosmo gasped. 'Not at all!' Pippa explained. 'Once anything crosses the boundary called the Event Horizon, gravity is so intense that even light—the fastest thing in the universe—cannot escape.' Cosmo safely admired the cosmic marvel, amazed by the wonders of space!"
    ],
    flashcards: [
      {
        front: "What is a Black Hole?",
        back: "A region in deep space where immense matter is compressed into a tiny point, creating gravity so strong nothing can escape!"
      },
      {
        front: "What is the Event Horizon?",
        back: "The invisible boundary line or 'point of no return' surrounding a black hole!"
      },
      {
        front: "What is an Accretion Disk?",
        back: "A glowing, swirling disk of super-heated gas and dust spinning at extreme speeds around the black hole!"
      },
      {
        front: "Can light escape from a black hole?",
        back: "No! Even light, the fastest traveler in the universe, cannot escape once it crosses the event horizon."
      }
    ],
    quiz: [
      {
        question: "How does a stellar black hole typically form?",
        options: [
          "A) Two rocky asteroids bump together",
          "B) A massive star runs out of nuclear fuel and collapses under its own gravity",
          "C) Aliens build a giant space drain",
          "D) A cloud of cold steam freezes solid"
        ],
        correctAnswer: 1,
        hintForWrongAnswer: "Pippa explained what happens to a colossal giant star when it runs out of fuel and collapses inward!"
      },
      {
        question: "Why does the center of a black hole appear pitch black?",
        options: [
          "A) It is painted with dark space dust",
          "B) It only comes out during nighttime",
          "C) Its gravity is so strong that even light cannot escape",
          "D) It turns off its light bulbs to sleep"
        ],
        correctAnswer: 2,
        hintForWrongAnswer: "Think about why not even light—the fastest traveler in the cosmos—can escape its gravitational pull!"
      },
      {
        question: "What is the name of the invisible boundary around a black hole where nothing can escape?",
        options: [
          "A) The Event Horizon",
          "B) The Speed Limit Line",
          "C) The Star Highway",
          "D) The Solar Fence"
        ],
        correctAnswer: 0,
        hintForWrongAnswer: "Pippa called this invisible 'point of no return' the Event Horizon!"
      }
    ],
    learningKeyTakeaway: "A black hole is formed from collapsed massive stars and has gravity so intense that not even light can escape.",
    conceptsMastered: [
      "Black holes form from the gravitational collapse of massive stars",
      "The Event Horizon marks the point of no return for matter and light",
      "Accretion disks swirl super-heated matter outside the horizon"
    ],
    recommendedNextTopic: "Supernovas & How New Stars Are Born"
  },
  algebra: {
    storyTitle: "Felix and the Secret Mystery Magic Box",
    topic: "Algebra & Solving for X",
    age: 9,
    mascot: 'felix',
    isDemo: true,
    mascotIntro: "Greetings, clever detective! Felix the Fox here! Today we're cracking the code of mysterious hidden numbers using detective magic!",
    storyText: [
      "[SCENE: The cozy workshop of Felix the Fox filled with golden scales and mystery treasure boxes]\n*TA-DA!* In the puzzle workshop of Felix the Fox sat a gleaming balance scale. On the left side sat a golden treasure box labeled 'X' along with 3 shiny silver coins. On the right side sat 8 silver coins, and the scale was perfectly balanced!",
      "[SCENE: Felix showing the mystery box with a magnifying glass]\n'X is not a scary monster,' Felix chuckled slyly. 'X is simply an undercover number wearing a detective trench coat! Since both sides of the scale are equal, whatever is inside box X plus 3 coins must equal 8 coins.'",
      "[SCENE: Felix taking 3 coins from BOTH sides of the scale at the exact same moment]\n*SWISH!* 'The golden rule of algebra,' whispered Felix, 'is whatever you do to one side, you MUST do to the other side to keep the scale balanced!' Felix took 3 coins off the left side, and *POOF!* took 3 coins off the right side.",
      "[SCENE: The golden box popping open to reveal 5 sparkling coins inside]\n*CLICK!* The scale stayed perfectly level. On the left was just box X. On the right were 5 coins (8 minus 3). Felix flipped open the box—inside were exactly 5 coins! 'X = 5!' cheered Felix. 'You cracked the secret code!'"
    ],
    flashcards: [
      {
        front: "What does 'X' mean in Algebra?",
        back: "A placeholder or mystery variable representing an unknown number we get to discover!"
      },
      {
        front: "What is the Golden Rule of Equations?",
        back: "Whatever operation you perform on one side of the equal sign, you MUST perform on the other side to keep it balanced!"
      },
      {
        front: "How do you solve X + 3 = 8?",
        back: "Subtract 3 from both sides! (8 - 3 = 5), so X = 5!"
      }
    ],
    quiz: [
      {
        question: "In algebra, what is a variable like 'X'?",
        options: [
          "A) An unknown mystery number waiting to be solved",
          "B) A secret spelling mistake",
          "C) A multiplication sign that cannot be changed",
          "D) An eraser brand"
        ],
        correctAnswer: 0,
        hintForWrongAnswer: "Felix described X as an undercover number wearing a detective coat!"
      },
      {
        question: "To keep an equation balanced, what must you do?",
        options: [
          "A) Only change the left side",
          "B) Do the exact same operation to BOTH sides of the equal sign",
          "C) Erase the numbers you don't like",
          "D) Turn the scale upside down"
        ],
        correctAnswer: 1,
        hintForWrongAnswer: "Remember Felix's Golden Rule about taking 3 coins off both sides at once!"
      },
      {
        question: "If X + 4 = 10, what is the value of X?",
        options: [
          "A) 14",
          "B) 40",
          "C) 6",
          "D) 2"
        ],
        correctAnswer: 2,
        hintForWrongAnswer: "Subtract 4 from both sides: 10 minus 4 gives you the value of X!"
      }
    ],
    learningKeyTakeaway: "Variables like X represent unknown values that can be discovered by keeping both sides of an equation balanced.",
    conceptsMastered: [
      "Variables represent unknown numbers in mathematical statements",
      "Equations function like balanced scales requiring equivalent operations",
      "Inverse operations isolate variables to find exact solutions"
    ],
    recommendedNextTopic: "Geometry: The Magic of Shapes and Angles"
  }
};

export function getMatchingDemoStory(topic: string, age: number, mascot?: MascotId): StoryPayload | null {
  const t = topic.toLowerCase();
  let base: StoryPayload | null = null;

  if (t.includes('photo') || t.includes('plant') || t.includes('leaf') || t.includes('sunlight') || t.includes('flower') || t.includes('bio')) {
    base = DEMO_STORIES.photosynthesis;
  } else if (t.includes('grav') || t.includes('fall') || t.includes('apple') || t.includes('weight') || t.includes('force') || t.includes('drop')) {
    base = DEMO_STORIES.gravity;
  } else if (t.includes('black hole') || t.includes('space') || t.includes('star') || t.includes('galaxy') || t.includes('planet') || t.includes('cosmos')) {
    base = DEMO_STORIES.blackholes;
  } else if (t.includes('math') || t.includes('algeb') || t.includes('fraction') || t.includes('variable') || t.includes('equation') || t.includes('number')) {
    base = DEMO_STORIES.algebra;
  } else {
    // Default fallback
    base = DEMO_STORIES.photosynthesis;
  }

  return {
    ...base,
    topic: topic || base.topic,
    age: age || base.age,
    mascot: mascot || base.mascot || 'channie',
  };
}
