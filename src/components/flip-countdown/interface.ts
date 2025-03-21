export interface FlipCountdownInterface {
  duration?: number;
  type?: "Day" | "Hour" | "Minute" | "Second";
  targetDate?: Date;
  onEnded?: () => void;
}
