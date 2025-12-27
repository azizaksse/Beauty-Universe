import { useLanguage } from "@/hooks/useLanguage";

const AnnouncementBar = () => {
  const { t, dir } = useLanguage();

  return (
    <div className="bg-foreground text-background py-2.5 text-center text-sm font-medium" dir={dir}>
      <p>
        {t('announcement.welcome')}{" "}
        <span className="text-primary font-bold">69</span> {t('announcement.wilayas')}
      </p>
    </div>
  );
};

export default AnnouncementBar;