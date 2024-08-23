const Video = ({ ytSlug }: { ytSlug: string }) => {
  return (
    <div className="h-96 w-full mt-5 bg-black p-2">
      <iframe
        loading="lazy"
        className="size-full"
        src={`https://www.youtube.com/embed/${ytSlug}`}
      ></iframe>
    </div>
  );
};

export default Video;
