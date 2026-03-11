import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroExterior from "@/components/HeroExterior";
import RoomNav from "@/components/RoomNav";
import FoyerRoom from "@/components/FoyerRoom";
import WorkshopRoom from "@/components/WorkshopRoom";
import StudyRoom from "@/components/StudyRoom";
import LivingRoom from "@/components/LivingRoom";
import BlueprintRoom from "@/components/BlueprintRoom";
import LibraryRoom from "@/components/LibraryRoom";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Exterior / Hero */}
      <div id="exterior">
        <HeroExterior onEnter={() => setEntered(true)} />
      </div>

      {/* Door transition overlay */}
      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="fixed inset-0 z-[100] bg-background pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Room Navigation */}
      <RoomNav />

      {/* Interior Rooms */}
      <FoyerRoom />
      <WorkshopRoom />
      <StudyRoom />
      <LivingRoom />
      <BlueprintRoom />
      <LibraryRoom />
      <ContactSection />
    </div>
  );
};

export default Index;
