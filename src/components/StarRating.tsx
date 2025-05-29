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

  const displayRating = hoveredRating || rating;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const starNumber = i + 1;
          const isFilled = starNumber <= displayRating;

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
              className={`${sizeClasses[size]} ${
                isFilled ? "text-yellow-400" : "text-gray-300"
              } ${
                interactive
                  ? "hover:text-yellow-400 cursor-pointer transition-colors"
                  : "cursor-default"
              }`}
              disabled={!interactive}
            >
              ⭐
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-semibold text-gray-900 ${sizeClasses[size]}`}>
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
