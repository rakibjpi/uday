import { motion } from "motion/react";
import React from "react";

interface Props {
  title?: string | boolean;
  className?: string;
}

export default function Divider({
  title = "Or continue with",
  className,
}: Props) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0.9, 1.0] }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className={`relative ${className}`}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">{title}</span>
      </div>
    </motion.div>
  );
}
