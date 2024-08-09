import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import prisma from "@/app/lib/db";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .input(z.object({ configId: z.string().optional() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const configId = metadata.input.configId;

      const res = await fetch(file.url);

      const buffer = await res.arrayBuffer();

      const imgMetaData = await sharp(buffer).metadata();

      const { width, height } = imgMetaData;

      if (!configId) {
        const configuration = await prisma.configuration.create({
          data: {
            imageUrl: file.url,
            width: width || 500,
            height: height || 500,
          },
        });

        return { configId: configuration.id };
      } else {
        const updatedConfiguration = await prisma.configuration.update({
          where: {
            id: configId as string,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });

        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
