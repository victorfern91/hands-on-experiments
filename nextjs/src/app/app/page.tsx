import {Suspense} from "react";

async function Component() {
  // Simulate a delay to demonstrate suspense
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <>
      <h1 className="font-semibold text-2xl">Hello world</h1>
      <div className="p-1.5 rounded-xl bg-green-700/20 min-w-fit max-w-fit text-green-800 font-medium text-sm">Facebook
        Ads
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-3 h-4 bg-gray-200 rounded w-1/5"></div>
      </div>
    }>
      <Component />
    </Suspense>
  );
}