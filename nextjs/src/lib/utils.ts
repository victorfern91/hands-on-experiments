interface ImageDimensions {
  width: number;
  height: number;
}

export function getImageDimesions(url: string): Promise<ImageDimensions> {
  const img = document.createElement("img");

  const promise = new Promise((resolve, reject) => {
    img.onload = () => {
      // Natural size is the actual image size regardless of rendering.
      // The 'normal' `width`/`height` are for the **rendered** size.
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Resolve promise with the width and height
      resolve({ width, height });
    };

    img.onerror = reject;
  });

  img.src = url;

  return promise as Promise<ImageDimensions>;
}
