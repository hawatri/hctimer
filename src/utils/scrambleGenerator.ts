// Scramble generation algorithms for various WCA events

const FACE_NAMES = {
  333: ['R', 'L', 'U', 'D', 'F', 'B'],
  222: ['R', 'U', 'F'],
  444: ['R', 'L', 'U', 'D', 'F', 'B', 'Rw', 'Lw', 'Uw', 'Dw', 'Fw', 'Bw'],
  555: ['R', 'L', 'U', 'D', 'F', 'B', 'Rw', 'Lw', 'Uw', 'Dw', 'Fw', 'Bw'],
  666: ['R', 'L', 'U', 'D', 'F', 'B', '3Rw', '3Lw', '3Uw', '3Dw', '3Fw', '3Bw'],
  777: ['R', 'L', 'U', 'D', 'F', 'B', '3Rw', '3Lw', '3Uw', '3Dw', '3Fw', '3Bw']
};

const MODIFIERS = ["", "'", "2"];

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const getRandomElement = <T>(array: T[]): T => {
  return array[getRandomInt(array.length)];
};

const generate333Scramble = (): string => {
  const moves: string[] = [];
  const faces = FACE_NAMES[333];
  let lastFace = '';
  let secondLastFace = '';

  for (let i = 0; i < 20; i++) {
    let face: string;
    
    // Avoid consecutive moves on same face or opposite faces
    do {
      face = getRandomElement(faces);
    } while (
      face === lastFace || 
      (face === 'R' && lastFace === 'L') ||
      (face === 'L' && lastFace === 'R') ||
      (face === 'U' && lastFace === 'D') ||
      (face === 'D' && lastFace === 'U') ||
      (face === 'F' && lastFace === 'B') ||
      (face === 'B' && lastFace === 'F') ||
      (face === secondLastFace && (
        (face === 'R' && secondLastFace === 'L') ||
        (face === 'L' && secondLastFace === 'R') ||
        (face === 'U' && secondLastFace === 'D') ||
        (face === 'D' && secondLastFace === 'U') ||
        (face === 'F' && secondLastFace === 'B') ||
        (face === 'B' && secondLastFace === 'F')
      ))
    );

    const modifier = getRandomElement(MODIFIERS);
    moves.push(face + modifier);

    secondLastFace = lastFace;
    lastFace = face;
  }

  return moves.join(' ');
};

const generate222Scramble = (): string => {
  const moves: string[] = [];
  const faces = FACE_NAMES[222];
  let lastFace = '';

  for (let i = 0; i < 9; i++) {
    let face: string;
    
    do {
      face = getRandomElement(faces);
    } while (face === lastFace);

    const modifier = getRandomElement(MODIFIERS);
    moves.push(face + modifier);
    lastFace = face;
  }

  return moves.join(' ');
};

const generateBigCubeScramble = (size: number): string => {
  const moves: string[] = [];
  const faces = FACE_NAMES[size as keyof typeof FACE_NAMES] || FACE_NAMES[333];
  let lastMove = '';

  const moveCount = size === 444 ? 40 : size === 555 ? 60 : size === 666 ? 80 : size === 777 ? 100 : 25;

  for (let i = 0; i < moveCount; i++) {
    let move: string;
    
    do {
      move = getRandomElement(faces);
    } while (move === lastMove);

    const modifier = getRandomElement(MODIFIERS);
    moves.push(move + modifier);
    lastMove = move;
  }

  return moves.join(' ');
};

const generatePyraminxScramble = (): string => {
  const faces = ['R', 'L', 'U', 'B'];
  const tips = ['r', 'l', 'u', 'b'];
  const moves: string[] = [];

  // Main moves
  for (let i = 0; i < 10; i++) {
    const face = getRandomElement(faces);
    const modifier = getRandomElement(MODIFIERS);
    moves.push(face + modifier);
  }

  // Tip moves
  for (let i = 0; i < 4; i++) {
    if (Math.random() < 0.5) {
      const tip = tips[i];
      const modifier = getRandomElement(["", "'"]);
      moves.push(tip + modifier);
    }
  }

  return moves.join(' ');
};

const generateSkewbScramble = (): string => {
  const moves = ['R', 'L', 'U', 'B'];
  const modifiers = ["", "'"];
  const scramble: string[] = [];

  for (let i = 0; i < 10; i++) {
    const move = getRandomElement(moves);
    const modifier = getRandomElement(modifiers);
    scramble.push(move + modifier);
  }

  return scramble.join(' ');
};

const generateSquare1Scramble = (): string => {
  const moves: string[] = [];

  for (let i = 0; i < 12; i++) {
    const top = getRandomInt(12) - 5; // -5 to 6
    const bottom = getRandomInt(12) - 5; // -5 to 6
    
    moves.push(`(${top}, ${bottom})`);
    
    if (i < 11) {
      moves.push('/');
    }
  }

  return moves.join(' ');
};

const generateClockScramble = (): string => {
  const positions = ['UR', 'DR', 'DL', 'UL', 'U', 'R', 'D', 'L', 'ALL'];
  const moves: string[] = [];

  positions.forEach(pos => {
    const amount = getRandomInt(12) - 5; // -5 to 6
    if (amount !== 0) {
      const sign = amount > 0 ? '+' : '';
      moves.push(`${pos}${sign}${amount}`);
    }
  });

  // Add pin positions
  const pins = ['y2'];
  moves.push(getRandomElement(pins));

  return moves.join(' ');
};

const generateMegaminxScramble = (): string => {
  const moves: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    // R moves
    for (let j = 0; j < 10; j++) {
      const direction = getRandomElement(['++', '--']);
      moves.push(`R${direction}`);
    }
    
    // U move
    const uDirection = getRandomElement(["'", ""]);
    moves.push(`U${uDirection}`);
  }

  return moves.join(' ');
};

export const generateScrambleForEvent = (event: string): string => {
  switch (event) {
    case '333':
      return generate333Scramble();
    case '222':
      return generate222Scramble();
    case '444':
      return generateBigCubeScramble(444);
    case '555':
      return generateBigCubeScramble(555);
    case '666':
      return generateBigCubeScramble(666);
    case '777':
      return generateBigCubeScramble(777);
    case 'pyram':
      return generatePyraminxScramble();
    case 'skewb':
      return generateSkewbScramble();
    case 'sq1':
      return generateSquare1Scramble();
    case 'clock':
      return generateClockScramble();
    case 'mega':
      return generateMegaminxScramble();
    default:
      return generate333Scramble();
  }
};