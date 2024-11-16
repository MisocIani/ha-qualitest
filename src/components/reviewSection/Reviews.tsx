import React, { useState } from "react";
import styles from "./Reviews.module.css";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";

interface ReviewProps {
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
}

const Review: React.FC<ReviewProps> = ({ reviews }) => {
  const [index, setIndex] = useState(0);
  const { reviewerName, comment, rating } = reviews[index];


  if (reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  const checkNumber = (number: number) => {
    if (number > reviews.length - 1) {
      return 0;
    } else if (number < 0) {
      return reviews.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <article className={styles.review}>
      <div className={styles.reviewContainer}>
        <span className={styles.quote}>
          <FaQuoteRight />
        </span>
      </div>
      <div className={styles.stars}>
          {Array.from({ length: Math.round(rating) }, (_, i) => (
            <IoIosStarOutline key={i} />
          ))}
        </div>
      <h4 className={styles.author}>{reviewerName}</h4>
      <p className={styles.info}>{comment}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.prevBtn} onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className={styles.nextBtn} onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
    </article>
  );
};

export default Review;
