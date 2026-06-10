import BgGradient from "@/components/common/bgGradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import UploadForm from "@/components/upload/uploadForm";
import UploadHeader from "@/components/upload/uploadHeader";
import { hasReachedUploadLimit } from "@/lib/user";
import { containerVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const maxDuration = 60;

const UploadPage = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!user?.id) {
    redirect("/sign-in");
  }
  const userId = user.id;
  const { hasReachedLimit } = await hasReachedUploadLimit({ userId, email });

  if (hasReachedLimit) {
    redirect("/dashboard");
  }

  return (
    <section className="min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
};
export default UploadPage;
