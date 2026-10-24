import { Difficulty } from './mathGenerator';
import { Language, translations } from './translations';

export interface WordQuestion {
  id: string;
  key: string;
  targetWord: string;
  scrambledLetters: string[];
  hintText: string;
  categoryName: string;
  language: Language;
  difficulty: Difficulty;
}

interface WordEntry {
  word: string;
  letters: string[];
  hintEn: string;
  hintHi: string;
  hintKn: string;
  difficulty: Difficulty;
}

// English Word List
const ENGLISH_WORDS: WordEntry[] = [
  // Easy
  { word: 'MATH', letters: ['M', 'A', 'T', 'H'], hintEn: 'Subject of numbers', hintHi: 'गणित का विषय', hintKn: 'ಸಂಖ್ಯೆಗಳ ವಿಷಯ', difficulty: 'easy' },
  { word: 'CAT', letters: ['C', 'A', 'T'], hintEn: 'Pet animal that meows', hintHi: 'म्याऊं करने वाली बिल्ली', hintKn: 'ಮ್ಯಾವ್ ಎನ್ನುವ ಪ್ರಾಣಿ', difficulty: 'easy' },
  { word: 'SUN', letters: ['S', 'U', 'N'], hintEn: 'Gives us light & warmth', hintHi: 'सूरज जो धूप देता है', hintKn: 'ಬೆಳಕು ನೀಡುವ ಸೂರ್ಯ', difficulty: 'easy' },
  { word: 'STAR', letters: ['S', 'T', 'A', 'R'], hintEn: 'Shines in the night sky', hintHi: 'रात को चमकने वाला तारा', hintKn: 'ರಾತ್ರಿ ಆಕಾಶದಲ್ಲಿ ಹೊಳೆಯುವುದು', difficulty: 'easy' },
  { word: 'BOOK', letters: ['B', 'O', 'O', 'K'], hintEn: 'Thing we read', hintHi: 'पढ़ने की किताब', hintKn: 'ಓದುವ ಪುಸ್ತಕ', difficulty: 'easy' },
  { word: 'FISH', letters: ['F', 'I', 'S', 'H'], hintEn: 'Swims in water', hintHi: 'पानी में तैरने वाली मछली', hintKn: 'ನೀರಿನ ಮೀನು', difficulty: 'easy' },
  { word: 'TREE', letters: ['T', 'R', 'E', 'E'], hintEn: 'Gives oxygen and shade', hintHi: 'छाया देने वाला पेड़', hintKn: 'ನೆರಳು ನೀಡುವ ಮರ', difficulty: 'easy' },
  { word: 'MOON', letters: ['M', 'O', 'O', 'N'], hintEn: 'Earth natural satellite', hintHi: 'चंदा मामा', hintKn: 'ರಾತ್ರಿ ಚಂದ್ರ', difficulty: 'easy' },
  { word: 'GAME', letters: ['G', 'A', 'M', 'E'], hintEn: 'Activity played for fun', hintHi: 'मजेदार खेल', hintKn: 'ಆಡುವ ಆಟ', difficulty: 'easy' },
  { word: 'BIRD', letters: ['B', 'I', 'R', 'D'], hintEn: 'Flies in the sky', hintHi: 'आकाश में उड़ने वाला पक्षी', hintKn: 'ಆಕಾಶದ ಹಕ್ಕಿ', difficulty: 'easy' },
  { word: 'LION', letters: ['L', 'I', 'O', 'N'], hintEn: 'King of the jungle', hintHi: 'जंगल का राजा शेर', hintKn: 'ಕಾಡಿನ ರಾಜ ಸಿಂಹ', difficulty: 'easy' },
  { word: 'MILK', letters: ['M', 'I', 'L', 'K'], hintEn: 'Healthy white drink', hintHi: 'सेहतमंद सफेद दूध', hintKn: 'ಬಿಳಿ ಹಾಲು', difficulty: 'easy' },
  { word: 'FIRE', letters: ['F', 'I', 'R', 'E'], hintEn: 'Hot and burning', hintHi: 'जलने वाली आग', hintKn: 'ಉರಿಯುವ ಬೆಂಕಿ', difficulty: 'easy' },
  { word: 'RAIN', letters: ['R', 'A', 'I', 'N'], hintEn: 'Water drops from clouds', hintHi: 'बादलों से बरसने वाली बारिश', hintKn: 'ಮಳೆ ನೀರು', difficulty: 'easy' },
  { word: 'GOLD', letters: ['G', 'O', 'L', 'D'], hintEn: 'Precious yellow metal', hintHi: 'कीमती पीला सोना', hintKn: 'ಬಂಗಾರ', difficulty: 'easy' },

  // Medium
  { word: 'APPLE', letters: ['A', 'P', 'P', 'L', 'E'], hintEn: 'A sweet red fruit', hintHi: 'एक मीठा लाल फल', hintKn: 'ಸಿಹಿಯಾದ ಕೆಂಪು ಹಣ್ಣು', difficulty: 'medium' },
  { word: 'PLANET', letters: ['P', 'L', 'A', 'N', 'E', 'T'], hintEn: 'Earth or Mars', hintHi: 'पृथ्वी या मंगल ग्रह', hintKn: 'ಭೂಮಿ ಅಥವಾ ಮಂಗಳ ಗ್ರಹ', difficulty: 'medium' },
  { word: 'TIGER', letters: ['T', 'I', 'G', 'E', 'R'], hintEn: 'National animal of India', hintHi: 'भारत का राष्ट्रीय पशु', hintKn: 'ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಪ್ರಾಣಿ', difficulty: 'medium' },
  { word: 'SCHOOL', letters: ['S', 'C', 'H', 'O', 'O', 'L'], hintEn: 'Place where we study', hintHi: 'पढ़ने की जगह (विद्यालय)', hintKn: 'ಕಲಿಯುವ ಸ್ಥಳ (ಶಾಲೆ)', difficulty: 'medium' },
  { word: 'BRAIN', letters: ['B', 'R', 'A', 'I', 'N'], hintEn: 'Organ inside head that thinks', hintHi: 'सोचने वाला अंग (दिमाग)', hintKn: 'ಯೋಚಿಸುವ ಅಂಗ (ಮೆದುಳು)', difficulty: 'medium' },
  { word: 'ORANGE', letters: ['O', 'R', 'A', 'N', 'G', 'E'], hintEn: 'Citrus juicy fruit', hintHi: 'रसदार फल (संतरा)', hintKn: 'ಕಿತ್ತಳೆ ಹಣ್ಣು', difficulty: 'medium' },
  { word: 'PENCIL', letters: ['P', 'E', 'N', 'C', 'I', 'L'], hintEn: 'Tool used for writing', hintHi: 'लिखने की पेंसिल', hintKn: 'ಬರೆಯುವ ಪೆನ್ಸಿಲ್', difficulty: 'medium' },
  { word: 'GUITAR', letters: ['G', 'U', 'I', 'T', 'A', 'R'], hintEn: 'String musical instrument', hintHi: 'संगीत का वाद्य यंत्र', hintKn: 'ಸಂಗೀತ ವಾದ್ಯ', difficulty: 'medium' },
  { word: 'SUMMER', letters: ['S', 'U', 'M', 'M', 'E', 'R'], hintEn: 'Hot sunny season', hintHi: 'गर्मी का मौसम', hintKn: 'ಬಿಸಿಲ ಕಾಲ', difficulty: 'medium' },
  { word: 'DOCTOR', letters: ['D', 'O', 'C', 'T', 'O', 'R'], hintEn: 'Medical professional', hintHi: 'इलाज करने वाला चिकित्सक', hintKn: 'ವೈದ್ಯರು', difficulty: 'medium' },
  { word: 'WINTER', letters: ['W', 'I', 'N', 'T', 'E', 'R'], hintEn: 'Cold snowy season', hintHi: 'सर्दी का मौसम', hintKn: 'ಚಳಿ ಕಾಲ', difficulty: 'medium' },
  { word: 'ROCKET', letters: ['R', 'O', 'C', 'K', 'E', 'T'], hintEn: 'Space travel vehicle', hintHi: 'अंतरिक्ष यान', hintKn: 'ರಾಕೆಟ್', difficulty: 'medium' },

  // Hard
  { word: 'CHAMPION', letters: ['C', 'H', 'A', 'M', 'P', 'I', 'O', 'N'], hintEn: 'The winner of a contest', hintHi: 'प्रतियोगिता का विजेता', hintKn: 'ಸ್ಪರ್ಧೆಯ ವಿಜೇತ', difficulty: 'hard' },
  { word: 'COMPUTER', letters: ['C', 'O', 'M', 'P', 'U', 'T', 'E', 'R'], hintEn: 'Electronic calculation device', hintHi: 'संगणक मशीन', hintKn: 'ಗಣಕಯಂತ್ರ ಸಾಧನ', difficulty: 'hard' },
  { word: 'BUTTERFLY', letters: ['B', 'U', 'T', 'T', 'E', 'R', 'F', 'L', 'Y'], hintEn: 'Colorful flying insect', hintHi: 'रंग-बिरंगी तितली', hintKn: 'ಬಣ್ಣ ಬಣ್ಣದ ಚಿಟ್ಟೆ', difficulty: 'hard' },
  { word: 'UNIVERSE', letters: ['U', 'N', 'I', 'V', 'E', 'R', 'S', 'E'], hintEn: 'All space and galaxies', hintHi: 'संपूर्ण ब्रह्मांड', hintKn: 'ಸಂಪೂರ್ಣ ಬ್ರಹ್ಮಾಂಡ', difficulty: 'hard' },
  { word: 'ELEPHANT', letters: ['E', 'L', 'E', 'P', 'H', 'A', 'N', 'T'], hintEn: 'Huge animal with trunk', hintHi: 'सूंड वाला बड़ा हाथी', hintKn: 'ದೊಡ್ಡ ಆನೆ', difficulty: 'hard' },
  { word: 'MOUNTAIN', letters: ['M', 'O', 'U', 'N', 'T', 'A', 'I', 'N'], hintEn: 'Tall rocky landform', hintHi: 'ऊंचा पर्वत/पहाड़', hintKn: 'ಎತ್ತರದ ಬೆಟ್ಟ', difficulty: 'hard' },
  { word: 'DINOSAUR', letters: ['D', 'I', 'N', 'O', 'S', 'A', 'U', 'R'], hintEn: 'Prehistoric giant reptile', hintHi: 'प्रागैतिहासिक विशाल जीव', hintKn: 'ಡೈನೋಸಾರ್', difficulty: 'hard' },
  { word: 'ASTRONAUT', letters: ['A', 'S', 'T', 'R', 'O', 'N', 'A', 'U', 'T'], hintEn: 'Space traveler', hintHi: 'अंतरिक्ष यात्री', hintKn: 'ಬಹ್ಯಾಕಾಶಯಾನಿ', difficulty: 'hard' },
];

// Hindi Word List
const HINDI_WORDS: WordEntry[] = [
  // Easy
  { word: 'कमल', letters: ['क', 'म', 'ल'], hintEn: 'Lotus flower', hintHi: 'भारत का राष्ट्रीय फूल (कमल)', hintKn: 'ರಾಷ್ಟ್ರೀಯ ಹೂವು', difficulty: 'easy' },
  { word: 'सूरज', letters: ['सू', 'र', 'ज'], hintEn: 'Sun in the sky', hintHi: 'आकाश में चमकने वाला सूर्य', hintKn: 'ಆಕಾಶದ ಸೂರ್ಯ', difficulty: 'easy' },
  { word: 'किताब', letters: ['कि', 'ता', 'ब'], hintEn: 'Book for reading', hintHi: 'पढ़ने की पुस्तक/किताब', hintKn: 'ಓದುವ ಪುಸ್ತಕ', difficulty: 'easy' },
  { word: 'शेर', letters: ['शे', 'र'], hintEn: 'King of the jungle', hintHi: 'जंगल का राजा', hintKn: 'ಕಾಡಿನ ರಾಜ', difficulty: 'easy' },
  { word: 'फूल', letters: ['फू', 'ल'], hintEn: 'Flower', hintHi: 'सुंदर महकने वाला फूल', hintKn: 'ಹೂವು', difficulty: 'easy' },
  { word: 'पेड़', letters: ['पे', 'ड़'], hintEn: 'Tree', hintHi: 'छाया देने वाला वृक्ष', hintKn: 'ಮರ', difficulty: 'easy' },
  { word: 'पानी', letters: ['पा', 'नी'], hintEn: 'Water', hintHi: 'जीवनदायी जल', hintKn: 'ನೀರು', difficulty: 'easy' },
  { word: 'हवा', letters: ['ह', 'वा'], hintEn: 'Air / Wind', hintHi: 'सांस लेने वाली वायु', hintKn: 'ಗಾಳಿ', difficulty: 'easy' },
  { word: 'घर', letters: ['घ', 'र'], hintEn: 'House / Home', hintHi: 'रहने का निवास स्थान', hintKn: 'ಮನೆ', difficulty: 'easy' },
  { word: 'अमर', letters: ['अ', 'म', 'र'], hintEn: 'Immortal', hintHi: 'जो कभी न मरे', hintKn: 'ಅಮರ', difficulty: 'easy' },

  // Medium
  { word: 'भारत', letters: ['भा', 'र', 'त'], hintEn: 'Our nation India', hintHi: 'हमारा प्यारा देश', hintKn: 'ನಮ್ಮ ಪವಿತ್ರ ದೇಶ', difficulty: 'medium' },
  { word: 'नमस्ते', letters: ['न', 'म', 'स्ते'], hintEn: 'Traditional Indian greeting', hintHi: 'भारतीय सम्मानजनक अभिवादन', hintKn: 'ಭಾರತೀಯ ವಂದನೆ', difficulty: 'medium' },
  { word: 'दिमाग', letters: ['दि', 'मा', 'ग'], hintEn: 'Brain that thinks', hintHi: 'सोचने की शक्ति वाला अंग', hintKn: 'ಯೋಚಿಸುವ ಶಕ್ತಿ', difficulty: 'medium' },
  { word: 'गणित', letters: ['ग', 'णि', 'त'], hintEn: 'Subject of math', hintHi: 'संख्याओं का विषय (मैथ)', hintKn: 'ಸಂಖ್ಯೆಗಳ विषय', difficulty: 'medium' },
  { word: 'सपना', letters: ['स', 'प', 'ना'], hintEn: 'Dream', hintHi: 'नींद में दिखने वाला स्वप्न', hintKn: 'ಕನಸು', difficulty: 'medium' },
  { word: 'दोस्त', letters: ['दो', 'स्त'], hintEn: 'Friend', hintHi: 'सच्चा साथी/मित्र', hintKn: 'ಗೆಳೆಯ', difficulty: 'medium' },
  { word: 'चमक', letters: ['च', 'म', 'क'], hintEn: 'Shine / Glow', hintHi: 'रोशनी की दमक', hintKn: 'ಹೊಳಪು', difficulty: 'medium' },
  { word: 'समुद्र', letters: ['स', 'मु', 'द्र'], hintEn: 'Ocean / Sea', hintHi: 'विशाल सागर', hintKn: 'ಸಮುದ್ರ', difficulty: 'medium' },

  // Hard
  { word: 'विद्यालय', letters: ['वि', 'द्या', 'ल', 'य'], hintEn: 'School / Institution', hintHi: 'पढ़ने का मंदिर (स्कूल)', hintKn: 'ಕಲಿಯುವ ಶಾಲೆ', difficulty: 'hard' },
  { word: 'स्वतंत्रता', letters: ['स्व', 'तं', 'त्र', 'ता'], hintEn: 'Freedom / Independence', hintHi: 'आज़ादी (स्वतंत्रता)', hintKn: 'ಸ್ವಾತಂತ್ರ್ಯ', difficulty: 'hard' },
  { word: 'अभ्यास', letters: ['अ', 'भ्या', 'स'], hintEn: 'Practice / Exercise', hintHi: 'बार-बार सीखने की क्रिया', hintKn: 'ಅಭ್ಯಾಸ', difficulty: 'hard' },
  { word: 'सिपाही', letters: ['सि', 'पा', 'ही'], hintEn: 'Soldier', hintHi: 'देश का रक्षक सैनिक', hintKn: 'ಸೈನಿಕ', difficulty: 'hard' },
  { word: 'परिश्रम', letters: ['प', 'रि', 'श्र', 'म'], hintEn: 'Hard work', hintHi: 'मेहनत और लगन', hintKn: 'ಕಷ್ಟಪಟ್ಟು ಕೆಲಸ', difficulty: 'hard' },
  { word: 'सफलता', letters: ['स', 'फ', 'ल', 'ता'], hintEn: 'Success', hintHi: 'जीत और कामियाबी', hintKn: 'ಯಶಸ್ಸು', difficulty: 'hard' },
];

// Kannada Word List (Enhanced with User Requested Words)
const KANNADA_WORDS: WordEntry[] = [
  // Easy
  { word: 'ಬೆಕ್ಕು', letters: ['ಬೆ', 'ಕ್ಕು'], hintEn: 'Cat', hintHi: 'बिल्ली', hintKn: 'ಸಾಕು ಪ್ರಾಣಿ (ಬೆಕ್ಕು)', difficulty: 'easy' },
  { word: 'ಆಕಾಶ', letters: ['ಆ', 'ಕಾ', 'ಶ'], hintEn: 'Sky', hintHi: 'आकाश', hintKn: 'ಮೇಲಿರುವ ನೀಲಿ ಆಕಾಶ', difficulty: 'easy' },
  { word: 'ಹುಡುಗ', letters: ['ಹು', 'ಡು', 'ಗ'], hintEn: 'Boy', hintHi: 'लड़का', hintKn: 'ಬಾಲಕ / ಹುಡುಗ', difficulty: 'easy' },
  { word: 'ಕಣ್ಣು', letters: ['ಕ', 'ಣ್ಣು'], hintEn: 'Eye', hintHi: 'आंख', hintKn: 'ನೋಡುವ ಕಣ್ಣು', difficulty: 'easy' },
  { word: 'ಇರುವೆ', letters: ['ಇ', 'ರು', 'ವೆ'], hintEn: 'Ant', hintHi: 'चींटी', hintKn: 'ಸಣ್ಣ ಇರುವೆ', difficulty: 'easy' },
  { word: 'ಹಸು', letters: ['ಹ', 'ಸು'], hintEn: 'Cow', hintHi: 'गाय', hintKn: 'ಹಾಲು ನೀಡುವ ಹಸು', difficulty: 'easy' },
  { word: 'ಟೋಪಿ', letters: ['ಟೋ', 'ಪಿ'], hintEn: 'Cap / Hat', hintHi: 'टोपी', hintKn: 'ತಲೆಗೆ ಹಾಕುವ ಟೋಪಿ', difficulty: 'easy' },
  { word: 'ಕೀಲಿ', letters: ['ಕೀ', 'ಲಿ'], hintEn: 'Key', hintHi: 'चाबी', hintKn: 'ಬಾಗಿಲಿನ ಕೀಲಿ', difficulty: 'easy' },
  { word: 'ತೋಳು', letters: ['ತೋ', 'ಳು'], hintEn: 'Arm / Hand', hintHi: 'बांह', hintKn: 'ದೇಹದ ತೋಳು', difficulty: 'easy' },
  { word: 'ಹಿಂದೆ', letters: ['ಹಿಂ', 'ದೆ'], hintEn: 'Behind', hintHi: 'पीछे', hintKn: 'ಹಿಂಭಾಗ (ಹಿಂದೆ)', difficulty: 'easy' },
  { word: 'ಮುಂದೆ', letters: ['ಮುಂ', 'ದೆ'], hintEn: 'Front / Ahead', hintHi: 'आगे', hintKn: 'ಮುಂಭಾಗ (ಮುಂದೆ)', difficulty: 'easy' },
  { word: 'ಅಲ್ಲಿ', letters: ['ಅ', 'ಲ್ಲಿ'], hintEn: 'There', hintHi: 'वहां', hintKn: 'ದೂರದ ಸ್ಥಳ (ಅಲ್ಲಿ)', difficulty: 'easy' },
  { word: 'ಇಲ್ಲಿ', letters: ['ಇ', 'ಲ್ಲಿ'], hintEn: 'Here', hintHi: 'यहां', hintKn: 'ಹತ್ತಿರದ ಸ್ಥಳ (ಇಲ್ಲಿ)', difficulty: 'easy' },
  { word: 'ಮಾಡು', letters: ['ಮಾ', 'ಡು'], hintEn: 'Do / Make', hintHi: 'करना', hintKn: 'ಕೆಲಸ ಮಾಡು', difficulty: 'easy' },
  { word: 'ಮುರಿ', letters: ['ಮು', 'ರಿ'], hintEn: 'Break', hintHi: 'तोड़ना', hintKn: 'ಮುರಿಯುವುದು', difficulty: 'easy' },
  { word: 'ಸುಳ್ಳು', letters: ['ಸು', 'ಳ್ಳು'], hintEn: 'Lie / Falsehood', hintHi: 'झूठ', hintKn: 'ಸತ್ಯವಲ್ಲದ ಸುಳ್ಳು', difficulty: 'easy' },
  { word: 'ನಗು', letters: ['ನ', 'ಗು'], hintEn: 'Smile / Laugh', hintHi: 'हंसना', hintKn: 'ಸಂತೋಷದ ನಗು', difficulty: 'easy' },
  { word: 'ಅಳು', letters: ['ಅ', 'ಳು'], hintEn: 'Cry', hintHi: 'रोना', hintKn: 'ದುಃಖದ ಅಳು', difficulty: 'easy' },
  { word: 'ಕಮಲ', letters: ['ಕ', 'ಮ', 'ಲ'], hintEn: 'Lotus flower', hintHi: 'कमल का फूल', hintKn: 'ರಾಷ್ಟ್ರೀಯ ಹೂವು (ಕಮಲ)', difficulty: 'easy' },
  { word: 'ಮನೆ', letters: ['ಮ', 'ನೆ'], hintEn: 'Home / House', hintHi: 'रहने का घर', hintKn: 'ವಾಸಿಸುವ ಮನೆ', difficulty: 'easy' },
  { word: 'ಹಾಲು', letters: ['ಹಾ', 'ಲು'], hintEn: 'White drink (Milk)', hintHi: 'सफेद दूध', hintKn: 'ಬಿಳಿ ಬಣ್ಣದ ಹಾಲು', difficulty: 'easy' },
  { word: 'ಕಾಡು', letters: ['ಕಾ', 'ಡು'], hintEn: 'Forest / Jungle', hintHi: 'जंगल', hintKn: 'ಮರಗಳ ಕಾಡು', difficulty: 'easy' },

  // Medium
  { word: 'ವ್ಯಕ್ತಿ', letters: ['ವ್ಯ', 'ಕ್ತಿ'], hintEn: 'Person / Individual', hintHi: 'व्यक्ति / इंसान', hintKn: 'ಮನುಷ್ಯ / ವ್ಯಕ್ತಿ', difficulty: 'medium' },
  { word: 'ದೇವರು', letters: ['ದೇ', 'ವ', 'ರು'], hintEn: 'God / Almighty', hintHi: 'भगवान', hintKn: 'ಪೂಜಿಸುವ ದೇವರು', difficulty: 'medium' },
  { word: 'ಹಾಸಿಗೆ', letters: ['ಹಾ', 'ಸಿ', 'ಗೆ'], hintEn: 'Bed / Mattress', hintHi: 'बिस्तर', hintKn: 'ಮಲಗುವ ಹಾಸಿಗೆ', difficulty: 'medium' },
  { word: 'ಬಹುತೇಕ', letters: ['ಬ', 'ಹು', 'ತೇ', 'ಕ'], hintEn: 'Mostly / Almost', hintHi: 'लगभग', hintKn: 'ಹೆಚ್ಚಾಗಿ (ಬಹುತೇಕ)', difficulty: 'medium' },
  { word: 'ಅದರಿಂದ', letters: ['ಅ', 'ದ', 'ರಿಂ', 'ದ'], hintEn: 'Therefore / From that', hintHi: 'इसलिए', hintKn: 'ಕಾರಣದಿಂದ (ಅದರಿಂದ)', difficulty: 'medium' },
  { word: 'ಏಕೆಂದರೆ', letters: ['ಏ', 'ಕೆಂ', 'ದ', 'ರೆ'], hintEn: 'Because', hintHi: 'क्योंकि', hintKn: 'ಏಕೆಂದರೆ', difficulty: 'medium' },
  { word: 'ನಡುವೆ', letters: ['ನ', 'ಡು', 'ವೆ'], hintEn: 'Between / Middle', hintHi: 'बीच में', hintKn: 'ಮಧ್ಯದಲ್ಲಿ (ನಡುವೆ)', difficulty: 'medium' },
  { word: 'ನಂತರ', letters: ['ನಂ', 'ತ', 'ರ'], hintEn: 'After / Later', hintHi: 'बाद में', hintKn: 'ಮುಂದಿನ ಸಮಯ (ನಂತರ)', difficulty: 'medium' },
  { word: 'ಮೊದಲು', letters: ['ಮೊ', 'ದ', 'ಲು'], hintEn: 'First / Before', hintHi: 'पहले', hintKn: 'ಆರಂಭದಲ್ಲಿ (ಮೊದಲು)', difficulty: 'medium' },
  { word: 'ಭಾರತ', letters: ['ಭಾ', 'ರ', 'ತ'], hintEn: 'Our nation India', hintHi: 'हमारा देश भारत', hintKn: 'ನಮ್ಮ ಪವಿತ್ರ ದೇಶ ಭಾರತ', difficulty: 'medium' },
  { word: 'ನಮಸ್ತೆ', letters: ['ನ', 'ಮ', 'ಸ್ತೆ'], hintEn: 'Greeting', hintHi: 'नमस्ते अभिवादन', hintKn: 'ಆತ್ಮೀಯ ವಂದನೆ', difficulty: 'medium' },
  { word: 'ಪುಸ್ತಕ', letters: ['ಪು', 'ಸ್ತ', 'ಕ'], hintEn: 'Book', hintHi: 'किताब', hintKn: 'ಓದುವ ಪುಸ್ತಕ', difficulty: 'medium' },
  { word: 'ಗಣಿತ', letters: ['ಗ', 'ಣಿ', 'ತ'], hintEn: 'Mathematics', hintHi: 'गणित शास्त्र', hintKn: 'ಸಂಖ್ಯೆಗಳ ಗಣಿತ', difficulty: 'medium' },
  { word: 'ಶಾಲೆ', letters: ['ಶಾ', 'ಲೆ'], hintEn: 'School', hintHi: 'विद्यालय', hintKn: 'ಜ್ಞಾನ ನೀಡುವ ಶಾಲೆ', difficulty: 'medium' },

  // Hard
  { word: 'ಸಾಮಾನ್ಯವಾಗಿ', letters: ['ಸಾ', 'ಮಾ', 'ನ್ಯ', 'ವಾ', 'ಗಿ'], hintEn: 'Generally / Usually', hintHi: 'सामान्यतः', hintKn: 'ಸಾಮಾನ್ಯವಾಗಿ', difficulty: 'hard' },
  { word: 'ಪಕ್ಕದಲ್ಲಿ', letters: ['ಪ', 'ಕ್ಕ', 'ದ', 'ಲ್ಲಿ'], hintEn: 'Beside / Next to', hintHi: 'बगल में', hintKn: 'ಬದಿಯಲ್ಲಿ (ಪಕ್ಕದಲ್ಲಿ)', difficulty: 'hard' },
  { word: 'ಸರಿಪಡಿಸು', letters: ['ಸ', 'ರಿ', 'ಪ', 'ಡಿ', 'ಸು'], hintEn: 'Fix / Repair', hintHi: 'ठीक करना', hintKn: 'ಸರಿಮಾಡು (ಸರಿಪಡಿಸು)', difficulty: 'hard' },
  { word: 'ಸ್ನೇಹಿತ', letters: ['ಸ್ನೇ', 'ಹಿ', 'ತ'], hintEn: 'Friend', hintHi: 'सच्चा मित्र', hintKn: 'ಆತ್ಮೀಯ ಗೆಳೆಯ / ಮಿತ್ರ', difficulty: 'hard' },
  { word: 'ಪರೀಕ್ಷೆ', letters: ['ಪ', 'ರೀ', 'ಕ್ಷೆ'], hintEn: 'Exam / Test', hintHi: 'परीक्षा', hintKn: 'ಜ್ಞಾನದ ಪರೀಕ್ಷೆ', difficulty: 'hard' },
  { word: 'ವಿಜ್ಞಾನ', letters: ['ವಿ', 'ಜ್ಞಾ', 'ನ'], hintEn: 'Science', hintHi: 'विज्ञान', hintKn: 'ವಿಜ್ಞಾನ ವಿಷಯ', difficulty: 'hard' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.join('') === arr.join('') && shuffled.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWordQuestion(
  difficulty: Difficulty,
  wordLang: Language = 'en',
  uiLang: Language = 'en',
  usedKeys: Set<string> = new Set()
): WordQuestion {
  let dataset = ENGLISH_WORDS;

  if (wordLang === 'hi' || wordLang === 'hinglish') {
    dataset = HINDI_WORDS;
  } else if (wordLang === 'kn') {
    dataset = KANNADA_WORDS;
  }

  // Filter dataset by difficulty
  let matchingWords = dataset.filter((w) => w.difficulty === difficulty);
  if (matchingWords.length === 0) {
    matchingWords = dataset;
  }

  // Find unused words
  let unusedWords = matchingWords.filter((w) => !usedKeys.has(w.word));
  
  // If all matching words used, reset usedKeys for this pool so we never get stuck
  if (unusedWords.length === 0) {
    unusedWords = matchingWords;
  }

  const chosen = pickRandom(unusedWords);
  usedKeys.add(chosen.word);

  const id = Math.random().toString(36).substring(2, 9);
  const scrambled = shuffleArray(chosen.letters);

  let hintText = chosen.hintEn;
  if (uiLang === 'hi' || uiLang === 'hinglish') {
    hintText = chosen.hintHi;
  } else if (uiLang === 'kn') {
    hintText = chosen.hintKn;
  }

  const t = translations[uiLang] || translations.en;

  return {
    id,
    key: chosen.word,
    targetWord: chosen.word,
    scrambledLetters: scrambled,
    hintText,
    categoryName: t.wordPuzzleCategory,
    language: wordLang,
    difficulty,
  };
}
