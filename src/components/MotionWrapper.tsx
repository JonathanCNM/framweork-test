import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export interface MotionWrapperProps
  extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
}

const pageVariants: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  ...props
}) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="page"
    {...props}
  >
    {children}
  </motion.div>
);
