import t1 from "@/assets/trans-1.jpg";
import t2 from "@/assets/trans-2.jpg";
import t3 from "@/assets/trans-3.jpg";
import t4 from "@/assets/trans-4.jpg";
import t5 from "@/assets/trans-5.jpg";
import t6 from "@/assets/trans-6.jpg";

// Before/After transformation cards — content from reference site
export const transformations = [
  { id: 1, name: "مينا داوود", age: 31, result: "خسر أكتر من 15 كيلو دهون", before: t1, after: t2 },
  { id: 2, name: "هاني يوسف", age: 39, result: "نسبة دهونه إتحولت من 34% لــ 6.7%", before: t2, after: t3 },
  { id: 3, name: "كرولوس سامح", age: 23, result: "نسبة الدهون قلت من 11% لــ 7%", before: t3, after: t4 },
  { id: 4, name: "محمود البيومي", age: 32, result: "خسر 30 كيلو من وزنه", before: t4, after: t5 },
  { id: 5, name: "زياد ناير", age: 21, result: "وزنه قل من 75 لــ 68 كيلو", before: t5, after: t6 },
  { id: 6, name: "عمر عبد القادر", age: 31, result: "معدل الجري زاد من 2 لــ 11 كيلو", before: t6, after: t1 },
];

const PLACEHOLDER_VIDEO = "https://www.youtube.com/watch?v=TDmQrVuUPpw";

export const videoThumbs = [
  { id: 1, image: t1, youtubeUrl: PLACEHOLDER_VIDEO },
  { id: 2, image: t2, youtubeUrl: PLACEHOLDER_VIDEO },
  { id: 3, image: t3, youtubeUrl: PLACEHOLDER_VIDEO },
  { id: 4, image: t4, youtubeUrl: PLACEHOLDER_VIDEO },
  { id: 5, image: t5, youtubeUrl: PLACEHOLDER_VIDEO },
  { id: 6, image: t6, youtubeUrl: PLACEHOLDER_VIDEO },
  { id: 7, image: t1, youtubeUrl: PLACEHOLDER_VIDEO },
];
