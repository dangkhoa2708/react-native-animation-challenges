import React, { useEffect, useRef, useState } from 'react';
import {
  Surface,
  Shape,
  Path,
  LinearGradient,
} from '@react-native-community/art';

export default function AnimateWave({
  surfaceHeight,
  surfaceWidth,
  percentage,
  amplitude,
}) {
  const [flag, setFlag] = useState(0);
  const increase = useRef(true);
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      let flagProgress = flag;
      let increaseVal = increase.current;
      if (increaseVal) {
        flagProgress += 10;
      } else {
        flagProgress -= 10;
      }
      if (flagProgress == 100) {
        increaseVal = false;
      }
      if (flagProgress == 0) {
        increaseVal = true;
      }
      increase.current = increaseVal;
      setFlag(flagProgress);
    }, 50);
    return () => {
      clearInterval(intervalTimer);
    };
  }, [flag]);

  const artDrawWave = () => {
    const percent = percentage._value;
    const waveHeight = (surfaceHeight * percent) / 100;

    const waveWidth = surfaceWidth;

    if (percent < 100) {
      const linePath = new Path();
      const percent = surfaceHeight - waveHeight;

      const startG = percent;
      const endG = percent + amplitude * 2;
      const gap = amplitude * 2;

      const pointAy = startG + gap * (flag / 100.0);
      const pointBy = endG - gap * (flag / 100.0);
      const pointCy = startG + gap * (flag / 100.0);

      linePath.moveTo(0, pointCy);
      linePath.lineTo(0, surfaceHeight);
      linePath.lineTo(waveWidth, surfaceHeight);
      linePath.lineTo(waveWidth, pointAy);

      linePath.curveTo(
        waveWidth * 0.85,
        pointAy,
        waveWidth * 0.75,
        percent + amplitude,
      );
      linePath.curveTo(waveWidth * 0.65, pointBy, waveWidth / 2, pointBy);
      linePath.curveTo(
        waveWidth * 0.35,
        pointBy,
        waveWidth * 0.25,
        percent + amplitude,
      );
      linePath.curveTo(waveWidth * 0.15, pointCy, 0, pointCy);

      linePath.close();
      // const linear = new LinearGradient([
      //   theme.primaryGradient[0],
      //   theme.primaryGradient[1],
      // ])

      return <Shape d={linePath} fill={'rgba(32,93,241, 0.7)'} />;
    } else {
      const path = new Path()
        .lineTo(0, surfaceHeight)
        .lineTo(surfaceWidth, surfaceHeight)
        .lineTo(surfaceWidth, 0)
        .close();
      return <Shape d={path} strokeWidth={0} fill={'blue'} />;
    }
  };

  const path = new Path()
    .lineTo(0, surfaceHeight)
    .lineTo(surfaceWidth, surfaceHeight)
    .lineTo(surfaceWidth, 0)
    .close();

  return (
    <Surface width={surfaceWidth} height={surfaceHeight}>
      <Shape d={path} fill={'rgba(120,152,229, 0.2)'} />
      {artDrawWave()}
    </Surface>
  );
}
