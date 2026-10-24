export type Language = 'en' | 'hinglish' | 'hi' | 'kn';

export interface Translations {
  appTitle: string;
  appTitleSub: string;
  appSubtitle: string;
  startGame: string;
  selectGameMode: string;
  mode2Player: string;
  mode1Player: string;
  p1NameLabel: string;
  p2NameLabel: string;
  p1Placeholder: string;
  p2Placeholder: string;
  aiBotName: string;
  difficultyLabel: string;
  easy: string;
  medium: string;
  hard: string;
  easyDesc: string;
  mediumDesc: string;
  hardDesc: string;
  numRoundsLabel: string;
  timerPerQuestion: string;
  rounds: string;
  faceToFaceMode: string;
  faceToFaceDesc: string;
  submitAnswer: string;
  enterYourAnswer: string;
  correctAnswer: string;
  wrongAnswer: string;
  timesUp: string;
  inputLocked: string;
  blueTeam: string;
  redTeam: string;
  score: string;
  streak: string;
  hideKeypad: string;
  openKeypad: string;
  botThinking: string;
  botReady: string;
  back: string;
  gamePaused: string;
  gamePausedDesc: string;
  resumeGame: string;
  restart: string;
  settings: string;
  playAgain: string;
  changeSettings: string;
  nobodyAnswered: string;
  theCorrectAnswerWas: string;
  answeredCorrectlyFirst: string;
  submitFirstNote: string;
  wins: string;
  matchTied: string;
  bothScoredEqually: string;
  matchStats: string;
  correctAnswersCount: string;
  wrongAttemptsCount: string;
  fastestSpeed: string;
  maxStreakLabel: string;
  langSelectLabel: string;
  categoryAddition: string;
  categorySubtraction: string;
  categoryMultiplication: string;
  categoryDivision: string;
  categoryMissingNumber: string;
  categoryMixedBodmas: string;
  bodmasHint: string;
  cooldownMsg: string;
  clear: string;
  timeRemaining: string;
  instagramLabel: string;
  instagramPlaceholder: string;
  copyInstaStory: string;
  copied: string;
  followOnInsta: string;
  
  // Word Puzzle Translations
  battleCategoryLabel: string;
  mathMode: string;
  wordPuzzleMode: string;
  wordPuzzleHintPrefix: string;
  unscramblePrompt: string;
  wordPuzzleCategory: string;
  wordLanguageLabel: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Math & Word Battle',
    appTitleSub: 'Mind Clash',
    appSubtitle: '2-Player Speed Math & Word Puzzle Battle',
    startGame: 'Start Game Now',
    selectGameMode: 'Select Game Mode',
    mode2Player: '2 Players (Face-to-Face)',
    mode1Player: '1 Player vs AI Bot',
    p1NameLabel: 'Player 1 Name (Blue Team)',
    p2NameLabel: 'Player 2 Name (Red Team)',
    p1Placeholder: 'Player 1 Name',
    p2Placeholder: 'Player 2 Name',
    aiBotName: 'Battle Bot',
    difficultyLabel: 'Difficulty Level',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    easyDesc: '1-20 / 3-4 Letter Words',
    mediumDesc: '1-50 / 5-6 Letter Words',
    hardDesc: '1-100 / 7+ Letter Words & BODMAS',
    numRoundsLabel: 'Number of Rounds',
    timerPerQuestion: 'Timer Per Question',
    rounds: 'Rounds',
    faceToFaceMode: 'Face-to-Face Table Mode',
    faceToFaceDesc: 'Player 1 screen rotated 180° for opposite seating on tablet',
    submitAnswer: 'Submit Answer',
    enterYourAnswer: 'Type or tap letters...',
    correctAnswer: 'Correct Answer!',
    wrongAnswer: 'Wrong Answer!',
    timesUp: "Time's Up!",
    inputLocked: 'Input locked for',
    blueTeam: 'Blue Team',
    redTeam: 'Red Team',
    score: 'Score',
    streak: 'Streak',
    hideKeypad: 'Hide Keypad',
    openKeypad: 'Open Touch Keypad',
    botThinking: 'Battle Bot is thinking...',
    botReady: 'Bot is Ready!',
    back: 'Back',
    gamePaused: 'Game Paused',
    gamePausedDesc: 'Game is currently paused. Press the button below to resume.',
    resumeGame: 'Resume Game',
    restart: 'Restart',
    settings: 'Settings',
    playAgain: 'Play Again',
    changeSettings: 'Change Settings',
    nobodyAnswered: 'Nobody answered in time.',
    theCorrectAnswerWas: 'The correct answer was:',
    answeredCorrectlyFirst: 'answered correctly first!',
    submitFirstNote: '⚡ Submit the correct answer first to win +1 Point!',
    wins: 'Wins!',
    matchTied: 'Match Tied!',
    bothScoredEqually: 'Both players scored equally! An outstanding battle!',
    matchStats: 'Final Match Statistics',
    correctAnswersCount: 'Correct Answers',
    wrongAttemptsCount: 'Wrong Attempts',
    fastestSpeed: 'Fastest Speed',
    maxStreakLabel: 'Max Streak',
    langSelectLabel: 'Language',
    categoryAddition: 'Addition (+)',
    categorySubtraction: 'Subtraction (-)',
    categoryMultiplication: 'Multiplication (×)',
    categoryDivision: 'Division (÷)',
    categoryMissingNumber: 'Missing Number (?)',
    categoryMixedBodmas: 'Mixed (BODMAS)',
    bodmasHint: 'Multiply/Divide first, then Add/Subtract!',
    cooldownMsg: 'Wrong Answer! 3s Cooldown',
    clear: 'Clear',
    timeRemaining: 'Time Remaining:',
    instagramLabel: 'Instagram ID / Handle',
    instagramPlaceholder: 'e.g. @your_username',
    copyInstaStory: 'Copy Score for Insta Story',
    copied: 'Copied!',
    followOnInsta: 'Follow on Instagram',
    
    battleCategoryLabel: 'Game Type',
    mathMode: 'Math Battle (गणित)',
    wordPuzzleMode: 'Word Puzzle (शब्द पहेली / ಒಗಟು)',
    wordPuzzleHintPrefix: 'Hint',
    unscramblePrompt: 'Unscramble the letters to form the word!',
    wordPuzzleCategory: 'Word Unscramble Puzzle',
    wordLanguageLabel: 'Word Puzzle Language',
  },
  hinglish: {
    appTitle: 'Math & Word Battle',
    appTitleSub: 'Dimaag Ki Jang',
    appSubtitle: '2-Player Speed Math & Word Puzzle Muqabla',
    startGame: 'Khel Shuru Karo!',
    selectGameMode: 'Game Mode Chuno',
    mode2Player: '2 Players (Aamne-Saamne)',
    mode1Player: '1 Player vs AI Bot',
    p1NameLabel: 'Player 1 Name (Neela Team)',
    p2NameLabel: 'Player 2 Name (Laal Team)',
    p1Placeholder: 'Khiladi 1 ka naam',
    p2Placeholder: 'Khiladi 2 ka naam',
    aiBotName: 'Battle Bot',
    difficultyLabel: 'Kathinaai Level',
    easy: 'Aasan (Easy)',
    medium: 'Madhyam (Med)',
    hard: 'Khatarnak (Hard)',
    easyDesc: '1-20 / 3-4 Chhote Words',
    mediumDesc: '1-50 / 5-6 Words',
    hardDesc: '1-100 / Badeh Words & BODMAS',
    numRoundsLabel: 'Kitne Rounds Khelne Hain?',
    timerPerQuestion: 'Timer Per Question',
    rounds: 'Rounds',
    faceToFaceMode: 'Face-to-Face Table Mode',
    faceToFaceDesc: 'Player 1 screen rotated 180° for opposite seating',
    submitAnswer: 'Jawab Bhejo',
    enterYourAnswer: 'Sahi shabd likho ya tap karo...',
    correctAnswer: 'Sahi Jawab!',
    wrongAnswer: 'Galat Jawab!',
    timesUp: 'Time Up!',
    inputLocked: 'Input locked hai',
    blueTeam: 'Neela Team',
    redTeam: 'Laal Team',
    score: 'Score',
    streak: 'Streak',
    hideKeypad: 'Keypad Chupao',
    openKeypad: 'Touch Keypad Kholo',
    botThinking: 'Battle Bot Soch Raha Hai...',
    botReady: 'Bot Tyar Hai!',
    back: 'Wapas Jao',
    gamePaused: 'Khel Ruka Hua Hai',
    gamePausedDesc: 'Game paused hai. Chalu karne ke liye button dabayein.',
    resumeGame: 'Chalu Karo (Resume)',
    restart: 'Dobaara',
    settings: 'Settings',
    playAgain: 'Phir Se Khele',
    changeSettings: 'Settings Badlo',
    nobodyAnswered: 'Kisine Jawab Nahi Diya.',
    theCorrectAnswerWas: 'Sahi Jawab Thha:',
    answeredCorrectlyFirst: 'Ne Sabse Pehle Sahi Jawab Diya!',
    submitFirstNote: '⚡ Jo Pehle Sahi Jawab Bhejega, Usko +1 Point Milega!',
    wins: 'Jeet Gaya!',
    matchTied: 'Match Draw!',
    bothScoredEqually: 'Dono Khiladi Barabar Hain! Shaandar Muqabla!',
    matchStats: 'Final Match Statistics',
    correctAnswersCount: 'Sahi Jawab (Correct)',
    wrongAttemptsCount: 'Galat Attempts',
    fastestSpeed: 'Sabse Tez Speed',
    maxStreakLabel: 'Max Streak',
    langSelectLabel: 'Language / Bhasha',
    categoryAddition: 'Jod (Addition)',
    categorySubtraction: 'Ghatana (Subtraction)',
    categoryMultiplication: 'Guna (Multiplication)',
    categoryDivision: 'Bhag (Division)',
    categoryMissingNumber: 'Khoya Hua Number (?)',
    categoryMixedBodmas: 'Mishrit (BODMAS Rule)',
    bodmasHint: 'Pehle Guna/Bhag, phir Jod/Ghatana!',
    cooldownMsg: 'Galat Jawab! 3s Cooldown',
    clear: 'Mitao',
    timeRemaining: 'Waqt Bacha Hai:',
    instagramLabel: 'Instagram ID / Handle',
    instagramPlaceholder: 'jaise @aapdinaam',
    copyInstaStory: 'Insta Story Ke Liye Score Copy Karo',
    copied: 'Copy Ho Gaya!',
    followOnInsta: 'Instagram Pe Follow Karo',
    
    battleCategoryLabel: 'Game Type',
    mathMode: 'Math Battle (गणित)',
    wordPuzzleMode: 'Word Puzzle (शब्द पहेली / ಒಗಟು)',
    wordPuzzleHintPrefix: 'Ishaara (Hint)',
    unscramblePrompt: 'Bikhare hue akhshar se sahi shabd banao!',
    wordPuzzleCategory: 'Shabd Paheli (Word Puzzle)',
    wordLanguageLabel: 'Word Puzzle Bhasha',
  },
  hi: {
    appTitle: 'मैथ व शब्द बैटल',
    appTitleSub: 'दिमाग की जंग',
    appSubtitle: '2-खिलाड़ी स्पीड मैथ व शब्द पहेली मुकाबला',
    startGame: 'खेल शुरू करो!',
    selectGameMode: 'गेम मोड चुनें',
    mode2Player: '2 खिलाड़ी (आमने-सामने)',
    mode1Player: '1 खिलाड़ी बनाम AI बॉट',
    p1NameLabel: 'खिलाड़ी 1 का नाम (नीली टीम)',
    p2NameLabel: 'खिलाड़ी 2 का नाम (लाल टीम)',
    p1Placeholder: 'खिलाड़ी 1 का नाम',
    p2Placeholder: 'खिलाड़ी 2 का नाम',
    aiBotName: 'बैटल बॉट',
    difficultyLabel: 'कठिनाई का स्तर',
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'खतरनाक',
    easyDesc: '1-20 / 3-4 अक्षरों के शब्द',
    mediumDesc: '1-50 / 5-6 अक्षरों के शब्द',
    hardDesc: '1-100 / बड़े शब्द व BODMAS',
    numRoundsLabel: 'राउंड्स की संख्या',
    timerPerQuestion: 'प्रति प्रश्न समय',
    rounds: 'राउंड्स',
    faceToFaceMode: 'आमने-सामने टेबल मोड',
    faceToFaceDesc: 'टैबलेट पर सामने बैठने के लिए खिलाड़ी 1 की स्क्रीन 180° घूमेगी',
    submitAnswer: 'उत्तर भेजें',
    enterYourAnswer: 'सही शब्द लिखें या अक्षर चुनें...',
    correctAnswer: 'सही जवाब!',
    wrongAnswer: 'गलत जवाब!',
    timesUp: 'समय समाप्त!',
    inputLocked: 'इनपुट लॉक है',
    blueTeam: 'नीली टीम',
    redTeam: 'लाल टीम',
    score: 'अंक (Score)',
    streak: 'लगातार सही',
    hideKeypad: 'कीपैड छिपाएं',
    openKeypad: 'टच कीपैड खोलें',
    botThinking: 'बैटल बॉट सोच रहा है...',
    botReady: 'बॉट तैयार है!',
    back: 'वापस जाएं',
    gamePaused: 'खेल रुका हुआ है',
    gamePausedDesc: 'खेल रुका हुआ है। जारी रखने के लिए नीचे बटन दबाएं।',
    resumeGame: 'जारी रखें (Resume)',
    restart: 'दोबारा',
    settings: 'सेटिंग्स',
    playAgain: 'फिर से खेलें',
    changeSettings: 'सेटिंग्स बदलें',
    nobodyAnswered: 'समय पर किसी ने उत्तर नहीं दिया।',
    theCorrectAnswerWas: 'सही उत्तर था:',
    answeredCorrectlyFirst: 'ने सबसे पहले सही उत्तर दिया!',
    submitFirstNote: '⚡ +1 अंक जीतने के लिए सबसे पहले सही उत्तर भेजें!',
    wins: 'जीत गए!',
    matchTied: 'मैच टाई हो गया!',
    bothScoredEqually: 'दोनों खिलाड़ियों के अंक बराबर हैं! शानदार मुकाबला!',
    matchStats: 'अंतिम मैच के आंकड़े',
    correctAnswersCount: 'सही उत्तर',
    wrongAttemptsCount: 'गलत प्रयास',
    fastestSpeed: 'सबसे तेज गति',
    maxStreakLabel: 'अधिकतम स्ट्रीक',
    langSelectLabel: 'भाषा (Language)',
    categoryAddition: 'जोड़ (+)',
    categorySubtraction: 'घटाव (-)',
    categoryMultiplication: 'गुणा (×)',
    categoryDivision: 'भाग (÷)',
    categoryMissingNumber: 'खोया नंबर (?)',
    categoryMixedBodmas: 'मिश्रित (BODMAS)',
    bodmasHint: 'पहले गुणा/भाग करें, फिर जोड़/घटाव!',
    cooldownMsg: 'गलत जवाब! 3 सेकंड लॉक',
    clear: 'साफ़ करें',
    timeRemaining: 'शेष समय:',
    instagramLabel: 'इंस्टाग्राम आईडी (Handle)',
    instagramPlaceholder: 'जैसे @आपका_नाम',
    copyInstaStory: 'इंस्टा स्टोरी के लिए स्कोर कॉपी करें',
    copied: 'कॉपी हो गया!',
    followOnInsta: 'इंस्टाग्राम पर फॉलो करें',
    
    battleCategoryLabel: 'गेम का प्रकार',
    mathMode: 'मैथ बैटल (गणित)',
    wordPuzzleMode: 'शब्द पहेली (Word Puzzle)',
    wordPuzzleHintPrefix: 'संकेत (Hint)',
    unscramblePrompt: 'बिखरे हुए अक्षरों को सही क्रम में लगाकर शब्द बनाएं!',
    wordPuzzleCategory: 'शब्द पहेली (Word Puzzle)',
    wordLanguageLabel: 'शब्द पहेली की भाषा',
  },
  kn: {
    appTitle: 'ಮ್ಯಾಥ್ & ವರ್ಡ್ ಬ್ಯಾಟಲ್',
    appTitleSub: 'ಬುದ್ಧಿಯ ಯುದ್ಧ',
    appSubtitle: '2-ಆಟಗಾರರ ವೇಗದ ಗಣಿತ ಮತ್ತು ಅಕ್ಷರ ಒಗಟು ಸ್ಪರ್ಧೆ',
    startGame: 'ಆಟ ಪ್ರಾರಂಭಿಸಿ!',
    selectGameMode: 'ಆಟದ ಮಾದರಿ ಆಯ್ಕೆಮಾಡಿ',
    mode2Player: '2 ಆಟಗಾರರು (ಮುಖಾಮುಖಿ)',
    mode1Player: '1 ಆಟಗಾರ vs AI ಬಾಟ್',
    p1NameLabel: 'ಆಟಗಾರ 1 ರ ಹೆಸರು (ನೀಲಿ ತಂಡ)',
    p2NameLabel: 'ಆಟಗಾರ 2 ರ ಹೆಸರು (ಕೆಂಪು ತಂಡ)',
    p1Placeholder: 'ಆಟಗಾರ 1 ರ ಹೆಸರು',
    p2Placeholder: 'ಆಟಗಾರ 2 ರ ಹೆಸರು',
    aiBotName: 'ಬ್ಯಾಟಲ್ ಬಾಟ್',
    difficultyLabel: 'ಕಷ್ಟದ ಹಂತ',
    easy: 'ಸುಲಭ (Easy)',
    medium: 'ಮಧ್ಯಮ (Medium)',
    hard: 'ಕಠಿಣ (Hard)',
    easyDesc: '1-20 / 3-4 ಅಕ್ಷರಗಳ ಪದಗಳು',
    mediumDesc: '1-50 / 5-6 ಅಕ್ಷರಗಳ ಪದಗಳು',
    hardDesc: '1-100 / ದೊಡ್ಡ ಪದಗಳು & BODMAS',
    numRoundsLabel: 'ಸುತ್ತುಗಳ ಸಂಖ್ಯೆ',
    timerPerQuestion: 'ಪ್ರಶ್ನೆಗೆ ಸಮಯ',
    rounds: 'ಸುತ್ತುಗಳು',
    faceToFaceMode: 'ಮುಖಾಮುಖಿ ಟೇಬಲ್ ಮೋಡ್',
    faceToFaceDesc: 'ಟ್ಯಾಬ್ಲೆಟ್‌ನಲ್ಲಿ ಎದುರುಬದುರು ಕುಳಿತುಕೊಳ್ಳಲು ಆಟಗಾರ 1 ಸ್ಕ್ರೀನ್ 180° ತಿರುಗುತ್ತದೆ',
    submitAnswer: 'ಉತ್ತರ ಸಲ್ಲಿಸಿ',
    enterYourAnswer: 'ಸರಿಯಾದ ಪದವನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಆಯ್ಕೆ ಮಾಡಿ...',
    correctAnswer: 'ಸರಿಯಾದ ಉತ್ತರ!',
    wrongAnswer: 'ತಪ್ಪು ಉತ್ತರ!',
    timesUp: 'ಸಮಯ ಮುಗಿಯಿತು!',
    inputLocked: 'ಇನ್‌ಪುಟ್ ಲಾಕ್ ಆಗಿದೆ',
    blueTeam: 'ನೀಲಿ ತಂಡ',
    redTeam: 'ಕೆಂಪು ತಂಡ',
    score: 'ಅಂಕಗಳು (Score)',
    streak: 'ಸತತ ಜಯ',
    hideKeypad: 'ಕೀಪ್ಯಾಡ್ ಮರೆಮಾಡಿ',
    openKeypad: 'ಟಚ್ ಕೀಪ್ಯಾಡ್ ತೆರೆಯಿರಿ',
    botThinking: 'ಬ್ಯಾಟಲ್ ಬಾಟ್ ಯೋಚಿಸುತ್ತಿದೆ...',
    botReady: 'ಬಾಟ್ ಸಿದ್ಧವಾಗಿದೆ!',
    back: 'ಹಿಂತಿರುಗಿ',
    gamePaused: 'ಆಟವನ್ನು ನಿಲ್ಲಿಸಲಾಗಿದೆ',
    gamePausedDesc: 'ಆಟವನ್ನು ತಾತ್ಕಾಲಿಕವಾಗಿ ನಿಲ್ಲಿಸಲಾಗಿದೆ. ಮುಂದುವರಿಸಲು ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿರಿ.',
    resumeGame: 'ಮುಂದುವರಿಸಿ (Resume)',
    restart: 'ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    playAgain: 'ಮತ್ತೆ ಆಡಿ',
    changeSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ',
    nobodyAnswered: 'ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಯಾರೂ ಉತ್ತರಿಸಲಿಲ್ಲ.',
    theCorrectAnswerWas: 'ಸರಿಯಾದ ಉತ್ತರ ಹೀಗಿತ್ತು:',
    answeredCorrectlyFirst: 'ಮೊದಲು ಸರಿಯಾದ ಉತ್ತರ ನೀಡಿದರು!',
    submitFirstNote: '⚡ +1 ಅಂಕ ಗೆಲ್ಲಲು ಮೊದಲು ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಸಲ್ಲಿಸಿ!',
    wins: 'ಗೆದ್ದಿದ್ದಾರೆ!',
    matchTied: 'ಪಂದ್ಯ ಸಮಬಲಗೊಂಡಿದೆ!',
    bothScoredEqually: 'ಇಬ್ಬರೂ ಆಟಗಾರರ ಅಂಕಗಳು ಸಮಾನವಾಗಿವೆ! ಅತ್ಯುತ್ತಮ ಪಂದ್ಯ!',
    matchStats: 'ಅಂತಿಮ ಪಂದ್ಯದ ಅಂಕಿಅಂಶಗಳು',
    correctAnswersCount: 'ಸರಿಯಾದ ಉತ್ತರಗಳು',
    wrongAttemptsCount: 'ತಪ್ಪು ಪ್ರಯತ್ನಗಳು',
    fastestSpeed: 'ಅತಿ ವೇಗ',
    maxStreakLabel: 'ಗರಿಷ್ಠ ಸ್ಟ್ರೀಕ್',
    langSelectLabel: 'ಭಾಷೆ (Language)',
    categoryAddition: 'ಕೂಡಿಸುವುದು (+)',
    categorySubtraction: 'ಕಳೆಯುವುದು (-)',
    categoryMultiplication: 'ಗುಣಾಕಾರ (×)',
    categoryDivision: 'ಭಾಗಾಕಾರ (÷)',
    categoryMissingNumber: 'ಕಾಣೆಯಾದ ಸಂಖ್ಯೆ (?)',
    categoryMixedBodmas: 'ಮಿಶ್ರ ನಿಯಮ (BODMAS)',
    bodmasHint: 'ಮೊದಲು ಗುಣಾಕಾರ/ಭಾಗಾಕಾರ ಮಾಡಿ, ನಂತರ ಕೂಡಿಸಿ/ಕಳೆಯಿರಿ!',
    cooldownMsg: 'ತಪ್ಪು ಉತ್ತರ! 3 ಸೆಕೆಂಡ್ ಲಾಕ್',
    clear: 'ಅಳಿಸಿ',
    timeRemaining: 'ಉಳಿದ ಸಮಯ:',
    instagramLabel: 'ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ಐಡಿ (Handle)',
    instagramPlaceholder: 'ಉದಾ @ನಿಮ್ಮ_ಹೆಸರು',
    copyInstaStory: 'ಇನ್‌ಸ್ಟಾ ಸ್ಟೋರಿಗಾಗಿ ಸ್ಕೋರ್ ಕಾಪಿ ಮಾಡಿ',
    copied: 'ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!',
    followOnInsta: 'ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ ಫಾಲೋ ಮಾಡಿ',
    
    battleCategoryLabel: 'ಆಟದ ಪ್ರಕಾರ',
    mathMode: 'ಮ್ಯಾಥ್ ಬ್ಯಾಟಲ್ (ಗಣಿತ)',
    wordPuzzleMode: 'ಅಕ್ಷರ ಒಗಟು (Word Puzzle)',
    wordPuzzleHintPrefix: 'ಸುಳಿವು (Hint)',
    unscramblePrompt: 'ಚದುರಿದ ಅಕ್ಷರಗಳನ್ನು ಸರಿಯಾಗಿ ಜೋಡಿಸಿ ಪದ ರೂಪಿಸಿ!',
    wordPuzzleCategory: 'ಅಕ್ಷರ ಒಗಟು (Word Puzzle)',
    wordLanguageLabel: 'ಪದ ಒಗಟಿನ ಭಾಷೆ',
  },
};
