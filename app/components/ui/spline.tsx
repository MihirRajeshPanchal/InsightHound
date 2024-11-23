'use client';

import Spline from '@splinetool/react-spline';

export default function SplineObj({ url }: { url: string }) {
  return (
    <div className="size-full overflow-hidden">
      <Spline scene={url} />
    </div>
  );
}
