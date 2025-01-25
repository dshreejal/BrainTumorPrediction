import ParticleAnimation from "@/components/home/ParticleAnimation";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      <ParticleAnimation />

      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 px-4 ">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-extrabold text-purple-800 mb-6 animate-fade-in">
              About Tumor Insight
            </h1>
            <p className="text-xl text-purple-400 leading-relaxed">
              Tumor Insight is a cutting-edge platform designed to predict and
              classify brain MRI images into four categories:{" "}
              <strong>No Tumor</strong>, <strong>Glioma</strong>,{" "}
              <strong>Meningioma</strong>, and <strong>Pituitary Tumor</strong>.
              Utilizing advanced deep learning models like{" "}
              <strong>VGG16</strong> and <strong>ResNet50</strong>, we provide
              reliable insights to support healthcare professionals in early
              diagnosis and effective treatment planning.
            </p>
            <div className="flex justify-center mt-10">
              <Link to="/predict">
                <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg animate-bounce">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">
            Tumor Types Predicted
          </h3>

          <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "No Tumor",
                color: "bg-green-200",
                textColor: "text-green-800",
              },
              {
                title: "Glioma",
                color: "bg-blue-200",
                textColor: "text-blue-800",
              },
              {
                title: "Meningioma",
                color: "bg-orange-200",
                textColor: "text-orange-800",
              },
              {
                title: "Pituitary Tumor",
                color: "bg-purple-200",
                textColor: "text-purple-800",
              },
            ].map((type) => (
              <div
                key={type.title}
                className={`p-6 ${type.color} rounded-lg shadow-md transform hover:scale-105 transition duration-300`}
              >
                <h3 className={`text-lg font-bold ${type.textColor}`}>
                  {type.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h3 className="text-3xl font-bold text-center text-purple-800 mb-6">
            Features
          </h3>
          <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Free to Use",
                color: "bg-green-100",
                icon: "🌟",
                description: "Up to 3 predictions per user for free.",
              },
              {
                title: "Logged-in Users",
                color: "bg-blue-100",
                icon: "🔒",
                description: "Access up to 10 predictions every 24 hours.",
              },
              {
                title: "Report Generation",
                color: "bg-yellow-100",
                icon: "📄",
                description: "Generate detailed reports for predictions.",
              },
              {
                title: "Download Reports",
                color: "bg-pink-100",
                icon: "📥",
                description: "Download reports in PDF format.",
              },
              {
                title: "Top Neurosurgeons",
                color: "bg-purple-100",
                icon: "🧠",
                description: "View a curated list of experts.",
              },
              {
                title: "Top Hospitals",
                color: "bg-indigo-100",
                icon: "🏥",
                description: "Access top-rated medical institutions.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`p-6 ${feature.color} rounded-lg shadow-md transform hover:scale-105 transition duration-300`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-700">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
