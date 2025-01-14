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
import hospitals from "../../assets/hospitals.json";
import { useSpring, animated } from "react-spring";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props {
  showHospital?: boolean;
}

const HospitalsListDialog: FC<Props> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextHospital = () => {
    setCurrentIndex((prev) => (prev + 1) % hospitals.length);
  };

  const prevHospital = () => {
    setCurrentIndex((prev) => (prev === 0 ? hospitals.length - 1 : prev - 1));
  };

  const slideProps = useSpring({
    opacity: 1,
    transform: "translateX(0%)",
    from: { opacity: 0, transform: "translateX(100%)" },
    reset: true,
  });

  const currentHospital = hospitals[currentIndex];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Hospitals</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Hospitals</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[400px] overflow-auto flex flex-col gap-8">
          <animated.div
            style={slideProps}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <img
              src={currentHospital?.image}
              alt={currentHospital?.name}
              className="w-48 h-48 rounded-full object-cover"
            />
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">{currentHospital?.name}</h3>
              <p className="text-sm text-gray-500">
                Location: {currentHospital?.location}
              </p>

              <p className="text-sm">contact: {currentHospital?.contact}</p>
            </div>
          </animated.div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevHospital}
              aria-label="Previous Hospital"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextHospital}
              aria-label="Next Hospital"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalsListDialog;
