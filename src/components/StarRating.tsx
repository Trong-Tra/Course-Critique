interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  hoveredRating?: number;
  onRatingHover?: (rating: number) => void;
  onRatingLeave?: () => void;
}

export default function StarRating({
  rating,
  size = "md",
  showNumber = true,
  interactive = false,
  onRatingChange,
  hoveredRating,
  onRatingHover,
  onRatingLeave,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (interactive && onRatingHover) {
      onRatingHover(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const starNumber = i + 1;
          const currentRating = hoveredRating || rating;
          const isFilled = starNumber <= currentRating;
          const isHovered =
            interactive &&
            hoveredRating &&
            hoveredRating > 0 &&
            starNumber <= hoveredRating;
          const hasNoRating =
            rating === 0 && (!hoveredRating || hoveredRating === 0);

          // Determine star appearance
          let starClass = "";
          let starIcon = "";

          if (hasNoRating && interactive) {
            // No rating selected yet - show empty outline stars
            starClass = "text-gray-400";
            starIcon = "★";
          } else if (isFilled) {
            // Star is filled
            starClass = "text-yellow-400";
            starIcon = "★";
          } else {
            // Star is not filled
            starClass = "text-gray-300";
            starIcon = "★";
          }

          return (
            <button
              key={i}
              type={interactive ? "button" : undefined}
              onClick={
                interactive ? () => handleStarClick(starNumber) : undefined
              }
              onMouseEnter={
                interactive ? () => handleStarHover(starNumber) : undefined
              }
              onMouseLeave={interactive ? onRatingLeave : undefined}
              className={`${sizeClasses[size]} ${starClass} ${
                interactive
                  ? "hover:text-yellow-300 hover:scale-110 cursor-pointer transition-all duration-200"
                  : "cursor-default"
              } ${isHovered ? "transform scale-110" : ""}`}
              disabled={!interactive}
            >
              {starIcon}
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-semibold text-gray-900 ${sizeClasses[size]}`}>
          {(hoveredRating || rating) === 0
            ? "No rating"
            : (hoveredRating || rating).toFixed(1)}
        </span>
      )}
    </div>
  );
}
