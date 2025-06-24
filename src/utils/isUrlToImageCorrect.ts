export const isUrlToImageCorrect = (url: string) => {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.src = url;

    const timeout = setTimeout(() => {
      resolve(false);
    }, 2000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img.width > 0 && img.height > 0);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
  });
};
