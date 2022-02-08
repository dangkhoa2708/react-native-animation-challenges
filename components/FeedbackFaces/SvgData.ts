import {
  addArc,
  addCurve,
  addLine,
  addQuadraticCurve,
  close,
  createPath,
} from 'react-native-redash';

// sad face

const sadLeftEyePath = createPath({ x: 5, y: 40 });
addCurve(sadLeftEyePath, {
  to: { x: 70, y: 40 },
  c1: { x: 5, y: 40 },
  c2: { x: 60, y: 50 },
});
addCurve(sadLeftEyePath, {
  to: { x: 5, y: 40 },
  c1: { x: 80, y: 80 },
  c2: { x: 55, y: 120 },
});

close(sadLeftEyePath);

const sadRighEyePath = createPath({ x: 130, y: 45 });
addQuadraticCurve(
  sadRighEyePath,
  {
    x: 170,
    y: 50,
  },
  { x: 190, y: 35 },
);
addQuadraticCurve(
  sadRighEyePath,
  {
    x: 150,
    y: 125,
  },
  { x: 130, y: 50 },
);
close(sadRighEyePath);

const sadMouthPath = createPath({ x: 50, y: 150 });

addCurve(sadMouthPath, {
  to: { x: 140, y: 140 },
  c1: { x: 100, y: 120 },
  c2: { x: 130, y: 120 },
});

// normal face
const normalLeftEyePath = createPath({ x: 5, y: 40 });
addLine(normalLeftEyePath, { x: 70, y: 30 });
addCurve(normalLeftEyePath, {
  to: { x: 5, y: 40 },
  c1: { x: 55, y: 70 },
  c2: { x: 0, y: 70 },
});
close(normalLeftEyePath);

const normalRightEyePath = createPath({ x: 130, y: 30 });
addLine(normalRightEyePath, { x: 190, y: 35 });
addCurve(normalRightEyePath, {
  to: { x: 130, y: 30 },
  c1: { x: 220, y: 65 },
  c2: { x: 150, y: 60 },
});
close(normalRightEyePath);

const normalMouthPath = createPath({ x: 50, y: 125 });
// addLine(normalMouthPath, { x: 140, y: 140 });

addQuadraticCurve(
  normalMouthPath,
  {
    x: 80,
    y: 140,
  },
  { x: 140, y: 140 },
);

// happy face
const happyLeftEyePath = createPath({ x: 10, y: 40 });
addCurve(happyLeftEyePath, {
  to: { x: 70, y: 40 },
  c1: { x: 10, y: 10 },
  c2: { x: 70, y: 10 },
});
addCurve(happyLeftEyePath, {
  to: { x: 10, y: 40 },
  c1: { x: 70, y: 70 },
  c2: { x: 10, y: 70 },
});
close(happyLeftEyePath);

const happyRightEyePath = createPath({ x: 120, y: 40 });
addCurve(happyRightEyePath, {
  to: { x: 180, y: 40 },
  c1: { x: 120, y: 10 },
  c2: { x: 180, y: 10 },
});
addCurve(happyRightEyePath, {
  to: { x: 120, y: 40 },
  c1: { x: 180, y: 70 },
  c2: { x: 120, y: 70 },
});
close(happyRightEyePath);

const happyMouthPath = createPath({ x: 50, y: 125 });
addQuadraticCurve(
  happyMouthPath,
  {
    x: 120,
    y: 180,
  },
  { x: 140, y: 130 },
);

export default {
  SAD: {
    leftEye: sadLeftEyePath,
    rightEye: sadRighEyePath,
    mouth: sadMouthPath,
  },
  NORMAL: {
    leftEye: normalLeftEyePath,
    rightEye: normalRightEyePath,
    mouth: normalMouthPath,
  },
  HAPPY: {
    leftEye: happyLeftEyePath,
    rightEye: happyRightEyePath,
    mouth: happyMouthPath,
  },
};
