export type UserType = {
   items: Item[];
   totalCount: number;
   error: string | null;
};

export type Item = {
   name: string;
   id: number;
   photos: Photos;
   status: string | null;
   followed: boolean;
};

export type Photos = {
   small?: string | null;
   large?: string | null;
};

export type ProfileType = {
   aboutMe: string | null;
   contacts: Contacts;
   lookingForAJob: boolean;
   lookingForAJobDescription: string | null;
   fullName: string;
   userId: number;
   photos: Photos;
};

export type Contacts = {
   facebook: string | null;
   website: string | null;
   vk: string | null;
   twitter: string | null;
   instagram: string | null;
   youtube: string | null;
   github: string | null;
   mainLink: string | null;
};
