function calculateReadingTime(text) {

  const words = text.split(/\s+/).length;

  const wordsPerMinute = 200;

  return Math.ceil(words / wordsPerMinute);
}

export default calculateReadingTime;