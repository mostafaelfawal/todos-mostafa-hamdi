import Image from "next/image";

export default function EmptyState({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 border-2 border-gray-300 dark:border-gray-500 rounded-xl shadow-[3px_3px_0_#00000020]">
      <Image src={image} alt="empty" width={100} height={100} />
      <p className="font-semibold text-gray-800 dark:text-white mt-2">
        {title}
      </p>
      <p className="text-gray-500 dark:text-gray-300 text-sm">{subtitle}</p>
    </div>
  );
}
