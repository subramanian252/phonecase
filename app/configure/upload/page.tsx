"use client";

import { useUploadThing } from "@/app/components/uploadthing";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { unstable_noStore as nostore } from "next/cache";

interface Props {}

function Page(props: Props) {
  nostore();
  const {} = props;

  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const router = useRouter();

  const { toast } = useToast();

  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData?.configId;

      console.log(configId);

      startTransition(() => router.push(`/configure/design?id=${configId}`));
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const [isPending, startTransition] = useTransition();

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });

    setIsDragOver(false);
  };
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const { file } = rejectedFiles[0];

    setIsDragOver(false);

    toast({
      title: "Error",
      description: `${file.name} is not an image.`,
      variant: "destructive",
    });
  };

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative w-full flex flex-1 flex-col items-center justify-center">
        <Dropzone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="w-full h-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6" />
              ) : isUploading || isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Image className="h-6 w-6" />
              )}
              <div className="text-zinc-700 mb-2 mt-5 text-sm flex flex-col">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="w-40 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-bold">Drop File</span> to Upload
                  </p>
                ) : (
                  <p>
                    <span className="font-bold">Click or Drop File</span> to
                    Upload
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-xs text-zinc-900 mt-2">PNG, JPEG, JPG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default Page;
