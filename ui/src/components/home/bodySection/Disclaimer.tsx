export default function Disclaimer() {
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-purple-800">Disclaimer</h2>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg/relaxed">
            The brain tumor prediction system is designed as an assistive tool
            for healthcare professionals and is not intended to provide a
            definitive diagnosis. It does not guarantee 100% accuracy and should
            be used in conjunction with other diagnostic methods and
            professional medical judgment. Always consult with a qualified
            healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
