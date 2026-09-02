// ═══════════════════════════════════════════════════════
//  FILL IN YOUR DETAILS BELOW — everything marked REPLACE
// ═══════════════════════════════════════════════════════

export const CONTENT = {

  // ── WHO ─────────────────────────────────────────────
  her: {
    name: 'Her Name',          // REPLACE
    city: 'Her City',          // REPLACE
  },
  you: {
    name: 'Your Name',         // REPLACE
    city: 'Your City',         // REPLACE
  },
  specialDate: 'August 2',

  // ── MUSIC ────────────────────────────────────────────
  // Drop an MP3 in public/audio/ and set the path, or leave null
  music: {
    src: null,                 // REPLACE e.g. '/audio/oursong.mp3'
    title: 'Our Song',
  },

  // ── GATE QUESTIONS ───────────────────────────────────
  // answers[] = accepted answers (all lowercased, trimmed)
  gates: [
    {
      number: 1,
      question: 'What month did we first start talking?',
      hint: 'Think back to the very beginning...',
      answers: ['june'],
    },
    {
      number: 2,
      question: 'What do I always say when you\'re having a bad day?',
      hint: 'You know this by heart...',
      answers: ['placeholder'],  // REPLACE
    },
    {
      number: 3,
      question: 'What did we say to each other on August 2nd?',
      hint: 'The words that changed everything.',
      answers: ['placeholder'],  // REPLACE
    },
    {
      number: 4,
      question: 'What\'s the nickname only I call you?',
      hint: 'Only you would know this one...',
      answers: ['placeholder'],  // REPLACE
    },
    {
      number: 5,
      question: 'What\'s the first thing we\'ll do when we\'re finally in the same city?',
      hint: 'We\'ve talked about this a thousand times.',
      answers: ['placeholder'],  // REPLACE
    },
  ],

  // ── CHAPTER 1: JUNE ──────────────────────────────────
  june: {
    label: 'Chapter One',
    title: 'June — Where It Started',
    story: [
      'I remember the exact moment.',
      'It was June, and I had no idea what was about to happen.',
      'You appeared, and nothing was ever quite the same again.',
      "I didn't know then what I know now.",
      'But looking back — I knew.',
      'I think a part of me knew from the very first conversation.',
    ],
    // Add photo paths: ['/photos/1.jpg', '/photos/2.jpg']
    photos: [],
  },

  // ── CHAPTER 2: THE CALLS ─────────────────────────────
  calls: {
    label: 'Chapter Two',
    title: 'The Space Between',
    distance: 'thousands of miles',   // REPLACE e.g. '4,200 miles'
    totalCallHours: '___',            // REPLACE e.g. '200+'
    cards: [
      { icon: '📱', text: 'Calls that started at 10pm and ended when the sun came up' },
      { icon: '⏰', text: 'Learning each other\'s time zones like a second language' },
      { icon: '💬', text: 'Screenshots of random things I couldn\'t wait to show you' },
      { icon: '🌙', text: 'Falling asleep on call just to feel less far away' },
      { icon: '✈️', text: 'Counting down to every single moment together' },
      { icon: '☕', text: 'Good morning texts that were actually good night texts for you' },
    ],
    photos: [],
  },

  // ── CHAPTER 3: AUGUST 2ND ────────────────────────────
  aug2: {
    label: 'Chapter Three',
    date: 'August 2',
    story: [
      'There are moments that split your life into before and after.',
      'August 2nd is one of mine.',
      'We said something that day.',
      'Something we\'d both been holding, carefully, quietly.',
    ],
    // The quote — the words said on Aug 2nd — shown large and golden
    quote: '"Thanks for coming into my life."',     // REPLACE with actual words
    storyAfter: [
      'Four words.',
      'Four words that changed everything.',
      'I had no idea how much I meant them until I heard you say them back.',
    ],
    photo: null,   // REPLACE e.g. '/photos/aug2.jpg'
  },

  // ── CHAPTER 4: WHAT I SEE IN YOU ─────────────────────
  bubbles: [
    'The way you laugh',
    'Your voice at 2am',
    'How you make everything feel lighter',
    'The way you care about everything',
    'Your ridiculous sense of humor',
    'How you remember the smallest things',
    'The way you look when you\'re excited',
    'That you always show up',
    'Your honesty',
    'The way you say my name',
    'How you make ordinary days feel special',
    'Your strength',
    'The way you listen',
    'How you see the best in people',
    'Your laugh',
    'The way you hold on',
    'How brave you are',
    'Your curiosity',
    'The way you love',
    'That you\'re mine',
    'Your patience with me',
    'How you challenge me',
    'Your kindness',
    'The way you dream big',
    'How you handle hard days',
    'Your voice when you\'re happy',
    'The way you describe things',
    'How you make me feel known',
    'Your warmth',
    'Everything you don\'t even notice about yourself',
    // ADD more personal ones here
  ],

  // ── CHAPTER 5: THE LETTER ────────────────────────────
  letter: {
    label: 'Chapter Five',
    salutation: 'To my favourite person,',
    paragraphs: [
      "I've been trying to write this for a long time.",
      "Not because I didn't know what to say — but because I couldn't find words big enough for what I feel.",
      "You came into my life and made it better in every way I didn't even know I needed.",
      "The distance has been hard. I won't pretend it hasn't been.",
      "But it's also given me something: absolute certainty.",
      "Certainty that what we have is real. That you are worth every mile, every missed moment, every 3am call.",
      "You are the best thing that has happened to me.",
      "I mean that in the most complete way I know how to mean anything.",
      "Happy Birthday.",
      "Thank you for existing. Thank you for choosing this. Thank you for being you.",
    ],
    closing: 'Always yours,',
    signature: 'Your Name',   // REPLACE
    // Optional midway photo
    photo: null,              // REPLACE e.g. '/photos/letter-photo.jpg'
    photoAfterParagraph: 5,   // show photo after paragraph index 5
  },

  // ── CHAPTER 6: OUR FUTURE ────────────────────────────
  future: {
    label: 'Chapter Six',
    title: 'When the Distance Ends',
    intro: "Here's what I think about when I can't sleep:",
    items: [
      'The first morning I don\'t have to say goodbye',
      'Cooking something together and laughing when it goes wrong',
      'Falling asleep next to you without a screen between us',
      'Watching you exist in my space like you\'ve always belonged there',
      'The first time you reach for my hand and I\'m actually there',
      'Every ordinary Tuesday with you',
      'Growing into something neither of us can fully imagine yet',
      'The rest of it — all of it — with you',
    ],
    closing: "I can't wait.",
  },

  // ── FINAL VIDEO ──────────────────────────────────────
  video: {
    // Option A: upload MP4 to public/video/ and set path
    src: null,               // REPLACE e.g. '/video/message.mp4'
    // Option B: YouTube unlisted video
    youtubeId: null,         // REPLACE e.g. 'dQw4w9WgXcQ'
    preText: 'One last thing.',
    postText: 'That\'s everything.',
  },
}
