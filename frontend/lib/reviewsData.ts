export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

export const allReviews: Review[] = [
  { id: 1, author: "Voirob", rating: 4, comment: "d**n banaiso vaya shei hoise" },
  { id: 2, author: "Aowfi", rating: 4.5, comment: "suiii" },
  { id: 3, author: "Zobir", rating: 4, comment: "Eto kom dam? Chi nibo na." },
  { id: 4, author: "Badhon", rating: 4.5, comment: "Mama amar bhallage na" },
  { id: 5, author: "Olif", rating: 5, comment: "bhaloi" },
  { id: 6, author: "Rapid Khan", rating: 5, comment: "Shundor hoise" },
  { id: 7, author: "Balakhtiar", rating: 3, comment: "Ei dost price ta ektu beshi lagtese" },
  { id: 8, author: "Riad Kobra", rating: 5, comment: "Amar size nai kenee" },
  { id: 9, author: "Sagid Majhi", rating: 4.5, comment: "Amar kache tw shundor lagse" },
  { id: 10, author: "Shaon", rating: 4, comment: "Nah ager tai bhalo chilo" },
  { id: 11, author: "Ponty", rating: 5, comment: "Kine deeeeee" },
  { id: 12, author: "Myshur", rating: 4.5, comment: "nice" },
  { id: 13, author: "Noor", rating: 5, comment: "Amar tw pochondo hoise, abbu ke dekhai." },
  { id: 14, author: "Nagin", rating: 4.5, comment: "No comment" },
  { id: 15, author: "Mash", rating: 5, comment: "Thik ache. shundor" },
  { id: 16, author: "Rafi", rating: 5, comment: "premium feel, really impressed with the quality." },
  { id: 17, author: "Tanvir", rating: 4.5, comment: "Nice design and fit, perfect for casual outings." },
  { id: 18, author: "Sakib", rating: 5, comment: "Material is top-notch, feels way more expensive than it is." },
  { id: 19, author: "Imran", rating: 4.5, comment: "Good quality overall, just a bit tight on the shoulders." },
  { id: 20, author: "Nayeem", rating: 5, comment: "Loved the fabric and finishing, definitely ordering again." },
  { id: 21, author: "Arif", rating: 4.5, comment: "Clean look and comfortable wear, great value for money." },
  { id: 22, author: "Mahin", rating: 5, comment: "Fits perfectly and looks very stylish, highly recommended." },
  { id: 23, author: "Rakib", rating: 5, comment: "Amazing quality, feels soft and durable at the same time." },
  { id: 24, author: "Shuvo", rating: 4.5, comment: "Nice product, delivery was smooth and packaging was good." },
  { id: 25, author: "Siam", rating: 5, comment: "Gives a premium vibe, exactly what I was looking for." },
  { id: 26, author: "Jahid", rating: 4.5, comment: "Good fit and breathable fabric, ideal for daily wear." },
  { id: 27, author: "Fahim", rating: 5, comment: "Excellent stitching and attention to detail, loved it." },
  { id: 28, author: "Rasel", rating: 4.5, comment: "Very comfortable, but I'd love to see more color options." },
  { id: 29, author: "Tarek", rating: 5, comment: "Stylish and high quality, exceeded my expectations." },
  { id: 30, author: "Nabil", rating: 5, comment: "The fabric feels amazing on skin, super happy with this purchase." },
  { id: 31, author: "Ashik", rating: 4.5, comment: "Great for the price, looks good and feels nice." },
  { id: 32, author: "Shakil", rating: 5, comment: "Premium quality and perfect fitting, worth every taka." },
  { id: 33, author: "Bappy", rating: 4.5, comment: "Nice design and comfort, good for regular use." },
  { id: 34, author: "Mehedi", rating: 5, comment: "Loved the overall quality, definitely a must-buy." },
  { id: 35, author: "Kamal", rating: 4.5, comment: "Good material and stitching, satisfied with the purchase." },
  { id: 36, author: "Hasan", rating: 5, comment: "Very classy look and excellent comfort, highly recommended." },
  { id: 37, author: "Parvez", rating: 4.5, comment: "Comfortable and stylish, just a bit long for my height." },
  { id: 38, author: "Jubayer", rating: 5, comment: "Top-quality product, feels really premium." },
  { id: 39, author: "Sumon", rating: 4.5, comment: "Nice and simple design, perfect for everyday wear." },
  { id: 40, author: "Anik", rating: 5, comment: "Great fit and fabric, looks even better in real life." },
];

// Function to get random reviews for a product
export function getRandomReviews(count: number = 5): Review[] {
  const shuffled = [...allReviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to calculate average rating
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
