export interface Reply {
  author?: string;
  mine?: boolean;
  id: string;
  body: string;
  createdAt: string;
}
export interface Discussion {
  author?: string;
  mine?: boolean;
  likes?: number;
  id: string;
  community: string;
  kind: string;
  title: string;
  body: string;
  createdAt: string;
  sample?: boolean;
  replies: Reply[];
  liked: boolean;
}
export interface CommunityState {
  version: 1;
  posts: Discussion[];
}
export interface CommunityRepository {
  load(): Promise<CommunityState>;
  save(state: CommunityState): Promise<void>;
}
