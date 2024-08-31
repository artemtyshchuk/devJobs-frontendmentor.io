import { useEffect, useRef } from "react";
import styles from "./NotFound.module.scss";
import notFound from "assets/desktop/error-404.png";

interface NotFoundProps {}

export const NotFound = ({}: NotFoundProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;

    if (!imgElement) return;

    let posX = Math.random() * (window.innerWidth - imgElement.clientWidth);
    let posY = Math.random() * (window.innerHeight - imgElement.clientHeight);
    let velocityX = 2;
    let velocityY = 2;

    const animate = () => {
      posX += velocityX;
      posY += velocityY;

      if (posX <= 0 || posX + imgElement.clientWidth >= window.innerWidth) {
        velocityX = -velocityX;
      }
      if (posY <= 0 || posY + imgElement.clientHeight >= window.innerHeight) {
        velocityY = -velocityY;
      }

      imgElement.style.transform = `translate(${posX}px, ${posY}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className={styles.notFound}>
      <div className={styles.textWrapper}>
        <p className={styles.text}>{`Page not found :)`}</p>
      </div>
      <img
        ref={imgRef}
        src={notFound}
        alt="not found icon"
        className={styles.image}
      />
    </div>
  );
};
