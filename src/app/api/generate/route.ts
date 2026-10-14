import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { StoryPayload, MascotId } from '@/types';
import { getMatchingDemoStory } from '@/lib/demo-stories';
import { getMascot } from '@/lib/mascots';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, age, mascot, tone, apiKey: clientApiKey } = body;

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json(
        { error: 'Please provide a topic for the story adventure.' },
        { status: 400 }
      );
    }

    const childAge = Number(age) || 8;
    if (childAge < 5 || childAge > 15) {
      return NextResponse.json(
        { error: 'Age must be between 5 and 15 years old.' },
        { status: 400 }
      );
    }

    const mascotId: MascotId = mascot || 'channie';
    const mascotObj = getMascot(mascotId);

    // Determine the API key to use
    // Only use GEMINI_API_KEY (server-only). Never use NEXT_PUBLIC_ prefixed
    // env vars for secrets — Next.js inlines them into the client JS bundle.
    const apiKey =
      (clientApiKey && clientApiKey.trim()) ||
      process.env.GEMINI_API_KEY ||
      '';

    const isPlaceholderKey =
      !apiKey ||
      apiKey === 'YOUR_KEY_HERE' ||
      apiKey === 'YOUR_GEMINI_API_KEY_HERE' ||
      apiKey.includes('YOUR_KEY');

    // If no valid key is provided, use high-quality demo fallback
    if (isPlaceholderKey) {
      const demoStory = getMatchingDemoStory(topic, childAge, mascotId) || {
        storyTitle: `${topic}: The Great Mystery Adventure`,
        topic: topic,
        age: childAge,
        mascot: mascotId,
        isDemo: true,
        mascotIntro: mascotObj.greeting,
        storyText: [
          `[SCENE: A curious workshop filled with glowing maps and gadgets]\n${mascotObj.name} looked through the telescope. 'Today we are exploring ${topic}!'`,
          `[SCENE: The core concept coming alive with energy and color]\n*ZOOM!* With a rush of wonder, the secrets of ${topic} opened up in front of our eyes!`,
          `[SCENE: A celebration of discovery with stars in the sky]\n*TA-DA!* We solved the grand puzzle of ${topic} together!`
        ],
        flashcards: [
          {
            front: `What is ${topic}?`,
            back: `An exciting subject of discovery that helps us understand how the world and universe work!`
          },
          {
            front: `Why is ${topic} important?`,
            back: `It gives us the tools to think critically, solve mysteries, and create new things!`
          }
        ],
        quiz: [
          {
            question: `What makes ${topic} so exciting to explore?`,
            options: [
              "A) It unlocks curious secrets about our world",
              "B) It turns off the sunshine",
              "C) It hides all the books",
              "D) It only happens at midnight"
            ],
            correctAnswer: 0,
            hintForWrongAnswer: `${mascotObj.hintReaction} Remember our adventure exploring how ${topic} helps us understand the universe!`
          }
        ],
        learningKeyTakeaway: `Explored the core foundations of ${topic} with ${mascotObj.name}!`,
        conceptsMastered: [
          `Discovered essential principles of ${topic}`,
          `Practiced active reading comprehension and reasoning`
        ],
        recommendedNextTopic: `Advanced Secrets of ${topic}`
      };

      return NextResponse.json({
        ...demoStory,
        isDemo: true,
        mascot: mascotId,
        note: 'Loaded in interactive Demo Mode. You can add your Gemini API key in Settings at any time to generate custom AI stories for any topic!'
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);

    // Initialize model – getGenerativeModel() validates lazily on
    // generateContent(), so we handle fallback there instead.
    const generationConfig = {
      responseMimeType: 'application/json' as const,
      temperature: 0.7,
    };

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
      generationConfig,
    });

    const toneInstruction = tone ? `Tone and setting preference: ${tone}.` : '';

    const systemPrompt = `You are a master children's educator and story writer inspired by popular educational YouTube channels (Kurzgesagt, Khan Academy Kids) and interactive e-comics.

Generate a learning experience for TOPIC: "${topic}", AGE: ${childAge}, host mascot: "${mascotObj.name} (${mascotObj.specialty})".
${toneInstruction}

Requirements:
- Story Style: Comic-book pacing, visual scene cues in brackets [SCENE: ...], sound effects in asterisks *ZOOM!*, short paragraphs, and kid-friendly metaphors.
- Host Mascot: Write a warm, enthusiastic introductory greeting from ${mascotObj.name} for "mascotIntro", and mention ${mascotObj.name} guiding the narrative.
- Universal Adaptation: If the subject is abstract (like Algebra or Grammar), turn variables into physical mystery items or rules into magic spells.
- Flashcards: Extract 3-5 core concepts/terms into bite-sized card fronts and backs with kid-friendly explanations and visual analogies.
- Quiz: Create 3-4 multiple choice questions with 4 options each, marking the correct index (0, 1, 2, or 3) and a gentle pedagogical mascot hint.
- Learning Key Takeaway: 1-sentence recap of the core concept mastered.

Return EXCLUSIVELY valid JSON in this structure:
{
  "mascotIntro": "Welcome greeting spoken by the chosen mascot",
  "storyTitle": "Exciting Comic Book Title",
  "storyText": [
    "[SCENE: Visual comic panel scene description]\\nParagraph 1 text with *SOUNDS*...",
    "[SCENE: Visual comic panel scene description]\\nParagraph 2 text with *SOUNDS*...",
    "[SCENE: Visual comic panel scene description]\\nParagraph 3 text with *SOUNDS*...",
    "[SCENE: Visual comic panel scene description]\\nParagraph 4 text with *SOUNDS*..."
  ],
  "flashcards": [
    {
      "front": "Concept or Term Question",
      "back": "Simple kid-friendly explanation with visual analogy"
    },
    {
      "front": "Concept 2",
      "back": "Explanation 2"
    },
    {
      "front": "Concept 3",
      "back": "Explanation 3"
    }
  ],
  "quiz": [
    {
      "question": "Question text here?",
      "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
      "correctAnswer": 0,
      "hintForWrongAnswer": "Mascot hint explaining why without giving it away"
    }
  ],
  "learningKeyTakeaway": "1-sentence recap of the core concept mastered."
}`;

    let result;
    try {
      result = await model.generateContent(systemPrompt);
    } catch (primaryErr) {
      // gemini-2.5-flash failed – fall back to gemini-3.5-flash-lite
      console.warn('Primary model (gemini-2.5-flash) failed, trying gemini-3.5-flash-lite:', primaryErr);
      const fallbackModel = genAI.getGenerativeModel({
        model: 'gemini-3.5-flash-lite',
        generationConfig,
      });
      result = await fallbackModel.generateContent(systemPrompt);
    }

    const responseText = result.response.text();

    if (!responseText) {
      throw new Error('Received an empty response from Gemini API.');
    }

    // Clean any markdown formatting if present
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    let parsedPayload: StoryPayload;
    try {
      parsedPayload = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON:', responseText, parseErr);
      return NextResponse.json(
        {
          error: 'The AI generated a response that could not be parsed as valid JSON. Please try again.',
          rawResponse: responseText.slice(0, 500),
        },
        { status: 502 }
      );
    }

    // Validate structure
    if (
      !parsedPayload.storyTitle ||
      !Array.isArray(parsedPayload.storyText) ||
      !Array.isArray(parsedPayload.quiz) ||
      parsedPayload.quiz.length === 0
    ) {
      throw new Error('Generated story is missing required fields.');
    }

    // Normalize quiz questions & answers (handles index 0-3 or letter "A"-"D")
    const normalizedQuiz = parsedPayload.quiz.map((q) => {
      let correctIdx = 0;
      if (typeof q.correctAnswer === 'number') {
        correctIdx = Math.max(0, Math.min(3, q.correctAnswer));
      } else if (typeof q.correctAnswer === 'string') {
        const char = q.correctAnswer.trim().toUpperCase().charAt(0);
        if (char === 'A') correctIdx = 0;
        else if (char === 'B') correctIdx = 1;
        else if (char === 'C') correctIdx = 2;
        else if (char === 'D') correctIdx = 3;
        else {
          const num = parseInt(char, 10);
          if (!isNaN(num) && num >= 0 && num <= 3) {
            correctIdx = num;
          }
        }
      }

      // Ensure options have clean formatting
      const options = Array.isArray(q.options)
        ? q.options.map((opt, i) => {
          const letter = ['A', 'B', 'C', 'D'][i];
          const clean = opt.replace(/^[A-D]\)\s*/, '').trim();
          return `${letter}) ${clean}`;
        })
        : ['A) Option 1', 'B) Option 2', 'C) Option 3', 'D) Option 4'];

      return {
        question: q.question,
        options,
        correctAnswer: correctIdx,
        hintForWrongAnswer: q.hintForWrongAnswer || `${mascotObj.hintReaction} Look back at what happened in the comic!`,
      };
    });

    // Normalize flashcards
    const normalizedFlashcards = Array.isArray(parsedPayload.flashcards) && parsedPayload.flashcards.length > 0
      ? parsedPayload.flashcards.map(f => ({
        front: f.front || `Key Concept of ${topic}`,
        back: f.back || `Important discovery about ${topic}`
      }))
      : [
        {
          front: `Core Idea of ${topic}`,
          back: parsedPayload.learningKeyTakeaway || `Key principle discovered in ${parsedPayload.storyTitle}`
        },
        {
          front: `How does it work?`,
          back: `Everything connects together step-by-step through fascinating rules of nature and logic!`
        }
      ];

    const finalPayload: StoryPayload = {
      storyTitle: parsedPayload.storyTitle,
      storyText: parsedPayload.storyText,
      mascotIntro: parsedPayload.mascotIntro || mascotObj.greeting,
      flashcards: normalizedFlashcards,
      quiz: normalizedQuiz,
      learningKeyTakeaway: parsedPayload.learningKeyTakeaway || `Mastered the core concepts of ${topic} through interactive storytelling!`,
      conceptsMastered: parsedPayload.conceptsMastered || [
        `Understood core ideas of ${topic}`,
        `Applied critical thinking through reading comprehension`,
      ],
      recommendedNextTopic: parsedPayload.recommendedNextTopic || `Deep dive into ${topic}`,
      topic,
      age: childAge,
      mascot: mascotId,
      isDemo: false,
    };

    return NextResponse.json(finalPayload);
  } catch (err: unknown) {
    console.error('Error in /api/generate:', err);
    const message = err instanceof Error ? err.message : 'Unknown error occurred while generating story.';

    return NextResponse.json(
      {
        error: message,
        tip: 'Check that your Google Gemini API key is valid. You can also test instantly with our high-quality demo stories!',
      },
      { status: 500 }
    );
  }
}
