import db from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";
interface pageProps {
  searchParams: {
    [key: string]: string | string | undefined;
  };
}
export default async function Page({ searchParams }: pageProps) {
  const { id } = searchParams;

  console.log("id", id);
  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, height, width } = configuration;

  return <DesignConfigurator configId={configuration.id} imageDimensions={{ height, width }} imageUrl={imageUrl} />;
}
