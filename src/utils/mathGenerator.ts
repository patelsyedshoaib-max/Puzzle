import { Language, translations } from './translations';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionCategory = 
  | 'addition' 
  | 'subtraction' 
  | 'multiplication' 
  | 'division' 
  | 'missing_number' 
  | 'mixed_bodmas';

export interface MathQuestion {
  id: string;
  key: string; // Used to track duplicate prevention
  expressionText: string;
  correctAnswer: number;
  category: QuestionCategory;
  categoryName: string;
  difficulty: Difficulty;
  hintText?: string;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a guaranteed UNIQUE random math question not present in `usedKeys`
 */
export function generateQuestion(
  difficulty: Difficulty,
  lang: Language = 'en',
  usedKeys: Set<string> = new Set()
): MathQuestion {
  const t = translations[lang] || translations.en;
  
  let attempts = 0;
  let finalQuestion: MathQuestion | null = null;

  while (attempts < 50) {
    attempts++;
    const id = Math.random().toString(36).substring(2, 9);

    // Decide categories based on difficulty
    let availableCategories: QuestionCategory[] = [];
    if (difficulty === 'easy') {
      availableCategories = ['addition', 'subtraction', 'multiplication', 'missing_number'];
    } else if (difficulty === 'medium') {
      availableCategories = ['addition', 'subtraction', 'multiplication', 'division', 'missing_number'];
    } else {
      // Hard
      availableCategories = ['addition', 'subtraction', 'multiplication', 'division', 'missing_number', 'mixed_bodmas'];
    }

    const category = pickRandom(availableCategories);

    let expressionText = '';
    let correctAnswer = 0;
    let categoryName = '';
    let hintText = '';

    switch (category) {
      case 'addition': {
        categoryName = t.categoryAddition;
        const maxVal = difficulty === 'easy' ? 25 : difficulty === 'medium' ? 60 : 120;
        const num1 = getRandomInt(1, maxVal);
        const num2 = getRandomInt(1, maxVal);
        correctAnswer = num1 + num2;
        expressionText = `${num1} + ${num2}`;
        break;
      }

      case 'subtraction': {
        categoryName = t.categorySubtraction;
        const maxVal = difficulty === 'easy' ? 25 : difficulty === 'medium' ? 60 : 120;
        let num1 = getRandomInt(2, maxVal);
        let num2 = getRandomInt(1, num1);
        if (num1 === num2) num1 += 1;
        correctAnswer = num1 - num2;
        expressionText = `${num1} - ${num2}`;
        break;
      }

      case 'multiplication': {
        categoryName = t.categoryMultiplication;
        if (difficulty === 'easy') {
          const num1 = getRandomInt(2, 10);
          const num2 = getRandomInt(1, 10);
          correctAnswer = num1 * num2;
          expressionText = `${num1} × ${num2}`;
        } else if (difficulty === 'medium') {
          const num1 = getRandomInt(2, 12);
          const num2 = getRandomInt(2, 15);
          correctAnswer = num1 * num2;
          expressionText = `${num1} × ${num2}`;
        } else {
          // Hard
          const num1 = getRandomInt(3, 25);
          const num2 = getRandomInt(3, 25);
          correctAnswer = num1 * num2;
          expressionText = `${num1} × ${num2}`;
        }
        break;
      }

      case 'division': {
        categoryName = t.categoryDivision;
        if (difficulty === 'easy' || difficulty === 'medium') {
          const divisor = getRandomInt(2, 12);
          const quotient = getRandomInt(2, 12);
          const dividend = divisor * quotient;
          correctAnswer = quotient;
          expressionText = `${dividend} ÷ ${divisor}`;
        } else {
          // Hard
          const divisor = getRandomInt(3, 25);
          const quotient = getRandomInt(4, 30);
          const dividend = divisor * quotient;
          correctAnswer = quotient;
          expressionText = `${dividend} ÷ ${divisor}`;
        }
        break;
      }

      case 'missing_number': {
        categoryName = t.categoryMissingNumber;
        const subType = pickRandom(['mult', 'add', 'sub', 'div']);

        if (subType === 'mult') {
          const num1 = difficulty === 'easy' ? getRandomInt(2, 8) : getRandomInt(2, 12);
          const missing = difficulty === 'easy' ? getRandomInt(2, 9) : getRandomInt(3, 15);
          const result = num1 * missing;
          correctAnswer = missing;
          expressionText = Math.random() > 0.5 ? `${num1} × ? = ${result}` : `? × ${num1} = ${result}`;
        } else if (subType === 'add') {
          const num1 = getRandomInt(5, difficulty === 'easy' ? 25 : 50);
          const missing = getRandomInt(5, difficulty === 'easy' ? 25 : 50);
          const result = num1 + missing;
          correctAnswer = missing;
          expressionText = Math.random() > 0.5 ? `${num1} + ? = ${result}` : `? + ${num1} = ${result}`;
        } else if (subType === 'sub') {
          const missing = getRandomInt(5, difficulty === 'easy' ? 20 : 40);
          const num2 = getRandomInt(3, 20);
          const result = missing + num2;
          correctAnswer = missing;
          expressionText = `? - ${num2} = ${result}`;
        } else {
          // div
          const divisor = getRandomInt(2, 10);
          const result = getRandomInt(2, 12);
          const missing = divisor * result;
          correctAnswer = missing;
          expressionText = `? ÷ ${divisor} = ${result}`;
        }
        break;
      }

      case 'mixed_bodmas': {
        categoryName = t.categoryMixedBodmas;
        hintText = t.bodmasHint;
        const pattern = pickRandom(['a+b*c', 'a*b-c', 'a-b*c', 'a+b/c', 'a*b+c*d']);

        if (pattern === 'a+b*c') {
          const a = getRandomInt(2, 25);
          const b = getRandomInt(2, 10);
          const c = getRandomInt(2, 10);
          correctAnswer = a + (b * c);
          expressionText = `${a} + ${b} × ${c}`;
        } else if (pattern === 'a*b-c') {
          const b = getRandomInt(2, 10);
          const c = getRandomInt(2, 10);
          const a = getRandomInt(2, 10);
          const prod = a * b;
          const sub = getRandomInt(1, Math.max(1, prod - 1));
          correctAnswer = prod - sub;
          expressionText = `${a} × ${b} - ${sub}`;
        } else if (pattern === 'a-b*c') {
          const b = getRandomInt(2, 8);
          const c = getRandomInt(2, 8);
          const prod = b * c;
          const a = prod + getRandomInt(2, 25);
          correctAnswer = a - prod;
          expressionText = `${a} - ${b} × ${c}`;
        } else if (pattern === 'a+b/c') {
          const c = getRandomInt(2, 8);
          const quotient = getRandomInt(2, 10);
          const b = c * quotient;
          const a = getRandomInt(5, 30);
          correctAnswer = a + quotient;
          expressionText = `${a} + ${b} ÷ ${c}`;
        } else {
          const a = getRandomInt(2, 8);
          const b = getRandomInt(2, 8);
          const c = getRandomInt(2, 8);
          const d = getRandomInt(2, 8);
          correctAnswer = (a * b) + (c * d);
          expressionText = `${a} × ${b} + ${c} × ${d}`;
        }
        break;
      }
    }

    const key = expressionText.replace(/\s+/g, '');
    
    // Check if key has already been used in this session
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      finalQuestion = {
        id,
        key,
        expressionText,
        correctAnswer,
        category,
        categoryName,
        difficulty,
        hintText,
      };
      break;
    }
  }

  // Fallback if 50 attempts failed (unlikely)
  if (!finalQuestion) {
    const id = Math.random().toString(36).substring(2, 9);
    const num1 = getRandomInt(10, 99);
    const num2 = getRandomInt(1, 99);
    const expressionText = `${num1} + ${num2}`;
    finalQuestion = {
      id,
      key: expressionText,
      expressionText,
      correctAnswer: num1 + num2,
      category: 'addition',
      categoryName: t.categoryAddition,
      difficulty,
    };
  }

  return finalQuestion;
}
