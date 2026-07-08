import type { EntryFieldTypes, EntrySkeletonType } from 'contentful'

// blogPost コンテンツタイプの型定義
export type BlogPostSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
    content: EntryFieldTypes.RichText
    slug: EntryFieldTypes.Text
  },
  'blogPost'
>

// updates（更新情報）コンテンツタイプの型定義
export type UpdateSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
    contents: EntryFieldTypes.RichText
    eyecatch: EntryFieldTypes.AssetLink
  },
  'updates'
>

// recruitments コンテンツタイプの型定義
export type RecruitmentSkeleton = EntrySkeletonType<
  {
    jobTitle: EntryFieldTypes.Text
    summary: EntryFieldTypes.Text
    jobDescription: EntryFieldTypes.RichText
    requirements: EntryFieldTypes.RichText
    salary: EntryFieldTypes.Text
    employmentType: EntryFieldTypes.Text
    remoteWork: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
  },
  'recruitments'
>
