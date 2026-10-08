import { Mascot, MascotId } from '@/types';

export const MASCOTS: Record<MascotId, Mascot> = {
  channie: {
    id: 'channie',
    name: 'chanie the Wise wolf',
    avatar: '🐺',
    title: 'Professor of Big Questions',
    specialty: 'Science & Big Questions',
    colorScheme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      gradient: 'from-emerald-600 via-teal-600 to-indigo-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      bubbleBg: 'bg-emerald-50/90 border-emerald-200',
    },
    greeting: "Howwwwl! I'm channie the Wise wolf! Grab your magnifying glass, because today we're unraveling the deepest mysteries of science!",
    catchphrase: "Hoo's ready to unlock the secrets of the universe?",
    correctReaction: "Howwwwl! Spot on, curious wolf! Your brain is shining like a supernova!",
    hintReaction: "Howwwwl! Think carefully—let's examine this scientific clue together:",
  },
  lee: {
    id: 'lee',
    name: 'lee the bunny',
    avatar: '🐰',
    title: 'Master Problem Solver',
    specialty: 'Math & Problem Solving',
    colorScheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-950',
      gradient: 'from-amber-500 via-orange-500 to-amber-600',
      badgeBg: 'bg-amber-100 text-amber-900',
      bubbleBg: 'bg-amber-50/90 border-amber-200',
    },
    greeting: "Bunn! I'm Lee the bunny! Whether it's tricky numbers or giant puzzles, we'll solve them together step-by-step!",
    catchphrase: "Let's crunch some numbers and build big ideas!",
    correctReaction: "Bunnnylicious! You totally nailed that problem like a champ!",
    hintReaction: "Rabbit-tastic! Here's a honey-sweet hint to help you solve it:",
  },
  minnie: {
    id: 'minnie',
    name: 'minnie the puppy',
    avatar: '🐶',
    title: 'Chief World Navigator',
    specialty: 'History & Geography',
    colorScheme: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-950',
      gradient: 'from-sky-500 via-blue-600 to-indigo-600',
      badgeBg: 'bg-sky-100 text-sky-900',
      bubbleBg: 'bg-sky-50/90 border-sky-200',
    },
    greeting: "woof woof! I'm Minnie the Puppy! Let's play with words and stories together!",
    catchphrase: "Let's play with words and stories together!",
    correctReaction: "woof woof! You're amazing!",
    hintReaction: "woof woof! Think carefully—let's examine this clue together:",
  },
  felix: {
    id: 'felix',
    name: 'Felix the chick',
    avatar: '🐥',
    title: 'Storyteller & Word Crafter',
    specialty: 'Language & Creative Arts',
    colorScheme: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-950',
      gradient: 'from-rose-500 via-purple-600 to-indigo-600',
      badgeBg: 'bg-rose-100 text-rose-900',
      bubbleBg: 'bg-rose-50/90 border-rose-200',
    },
    greeting: "peep peep! I'm Felix the chick! Get ready to learn new words, new sentences and  vocabulary!",
    catchphrase: "Let's learn new words, new sentences and  vocabulary together!",
    correctReaction: "peep peep! You're amazing!",
    hintReaction: "peep peep! Think carefully—let's learn together:",
  },
};

export const MASCOT_LIST = Object.values(MASCOTS);

export function getMascot(id?: MascotId | string): Mascot {
  if (id && id in MASCOTS) {
    return MASCOTS[id as MascotId];
  }
  return MASCOTS.channie;
}
