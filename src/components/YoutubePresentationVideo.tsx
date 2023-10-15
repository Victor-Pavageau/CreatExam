function YoutubePresentationVideo() {
  return (
    <div className="relative overflow-hidden w-full pt-[56.25%]">
      <iframe
        className="border-0 rounded-xl absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        src="https://www.youtube.com/embed/caPaSaXGgG8"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="CreatExam presentation" />
    </div>
  )
}

export default YoutubePresentationVideo