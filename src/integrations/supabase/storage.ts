import { supabase } from "@/integrations/supabase/client";

const STORAGE_BUCKET = "product-images";
const STORAGE_OBJECT_PREFIX = "/storage/v1/object/";

const extractStoragePath = (value: string): string | null => {
  if (!value) return null;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);
      const idx = url.pathname.indexOf(STORAGE_OBJECT_PREFIX);
      if (idx === -1) return null;

      const pathAfter = url.pathname.slice(idx + STORAGE_OBJECT_PREFIX.length);
      const parts = pathAfter.split("/").filter(Boolean);
      if (parts.length < 3) return null;

      const bucket = parts[1];
      if (bucket !== STORAGE_BUCKET) return null;

      return parts.slice(2).join("/");
    } catch {
      return null;
    }
  }

  if (value.startsWith(`${STORAGE_BUCKET}/`)) {
    return value.slice(STORAGE_BUCKET.length + 1);
  }

  return value;
};

export const normalizeProductImageValue = (imageUrl: string | null) => {
  if (!imageUrl) return imageUrl;

  const storagePath = extractStoragePath(imageUrl);
  if (!storagePath) return imageUrl;

  return storagePath;
};

export const resolveProductImageUrl = async (imageUrl: string | null) => {
  if (!imageUrl) return imageUrl;

  const storagePath = extractStoragePath(imageUrl);
  if (!storagePath) return imageUrl;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(storagePath, 60 * 60);

  if (error || !data?.signedUrl) return imageUrl;
  return data.signedUrl;
};

export const resolveProductImageUrls = async <T extends { image_url: string | null }>(
  products: T[]
) => {
  const resolved = await Promise.all(
    products.map(async (product) => ({
      ...product,
      image_url: await resolveProductImageUrl(product.image_url),
    }))
  );

  return resolved;
};

export const resolveProductMainImageUrl = async (
  imageUrl: string | null,
  mainImagePath?: string | null
) => {
  if (mainImagePath) {
    return resolveProductImageUrl(mainImagePath);
  }

  return resolveProductImageUrl(imageUrl);
};

export const resolveProductGalleryUrls = async (
  galleryPaths?: string[] | null
) => {
  if (!galleryPaths || galleryPaths.length === 0) return [];

  const resolved = await Promise.all(
    galleryPaths.map((path) => resolveProductImageUrl(path))
  );

  return resolved.filter(Boolean) as string[];
};
