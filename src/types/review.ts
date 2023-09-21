export type ReviewPost = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type Review = {
  id: string;
  createAt: string;
} & ReviewPost;
