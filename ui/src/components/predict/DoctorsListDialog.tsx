import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import doctors from "../../assets/doctors.json";
import { useSpring, animated } from "react-spring";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

interface Props {
  showHospital?: boolean;
}

const DoctorsListDialog: FC<Props> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextDoctor = () => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setCurrentIndex((prev) => (prev === 0 ? doctors.length - 1 : prev - 1));
  };

  const slideProps = useSpring({
    opacity: 1,
    transform: "translateX(0%)",
    from: { opacity: 0, transform: "translateX(100%)" },
    reset: true,
  });

  const currentDoctor = doctors[currentIndex];
  console.log(currentDoctor);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Top Neurologists</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Top Neurologists</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[400px] overflow-auto flex flex-col gap-8">
          <animated.div
            style={slideProps}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <img
              src={currentDoctor.image}
              alt={currentDoctor.name}
              className="w-48 h-48 rounded-full object-cover"
            />
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">{currentDoctor.name}</h3>
              <p className="text-sm text-gray-500">
                NMC Number: {currentDoctor.nmcNumber}
              </p>
              <p className="font-semibold">{currentDoctor.specialization}</p>
              <div className="flex items-center">
                {Array.from({ length: currentDoctor.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-sm">{currentDoctor.details}</p>
            </div>
          </animated.div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevDoctor}
              aria-label="Previous doctor"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextDoctor}
              aria-label="Next doctor"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorsListDialog;
