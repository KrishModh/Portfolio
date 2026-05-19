export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};
