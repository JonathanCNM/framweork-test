import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

export interface MotionWrapperProps
  extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 1,
    transform: "translate3d(100%, 0, 0)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0%, 0, 0)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0.9,
    transform: "translate3d(-100%, 0, 0)",
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  ...props
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page"
      {...props}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
