export const categoriesQuery = `*[_type == "category"] | order(order asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  "image": image.asset->url
}`;

export const productsQuery = `*[_type == "product"] | order(order asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  "category": category->name,
  "categorySlug": category->slug.current,
  description,
  longDescription,
  price,
  specs,
  features,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  isFeatured,
  supplyInfo
}`;

export const productsByCategoryQuery = `*[_type == "product" && category->slug.current == $categorySlug] | order(order asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  "category": category->name,
  "categorySlug": category->slug.current,
  description,
  longDescription,
  price,
  specs,
  features,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  isFeatured,
  supplyInfo
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug && category->slug.current == $categorySlug][0] {
  _id,
  name,
  "slug": slug.current,
  "category": category->name,
  "categorySlug": category->slug.current,
  description,
  longDescription,
  price,
  specs,
  features,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  supplyInfo
}`;

export const blogPostsQuery = `*[_type == "blog"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  author,
  category,
  date,
  "image": image.asset->url,
  readTime
}`;

export const blogPostBySlugQuery = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  author,
  category,
  date,
  "image": image.asset->url,
  readTime
}`;

export const featuredProductsQuery = `*[_type == "product" && isFeatured == true] | order(order asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  "category": category->name,
  "categorySlug": category->slug.current,
  description,
  longDescription,
  price,
  specs,
  features,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  supplyInfo
}`;
