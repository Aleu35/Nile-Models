
export interface ModelFormData {
  name: string;
  category: string;
  bio: string;
  social_instagram: string;
  social_facebook: string;
  social_twitter: string;
  social_tiktok: string;
}

export const createEmptyFormData = (): ModelFormData => ({
  name: '',
  category: '',
  bio: '',
  social_instagram: '',
  social_facebook: '',
  social_twitter: '',
  social_tiktok: '',
});
