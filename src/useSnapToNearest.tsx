import { useEffect } from "react";

const useSnapToNearest = () => {
  useEffect(() => {
    const snapToNearest = (event: MouseEvent) => {
      const elements = document.querySelectorAll<HTMLElement>(
        'button, a, [tabindex], [role="button"], [role="link"]'
      );
      let nearestElement: HTMLElement | null = null;
      let minDistance = Number.MAX_VALUE;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(
          event.clientX - elementCenterX,
          event.clientY - elementCenterY
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestElement = element;
        }
      });

      if (nearestElement) {
        nearestElement.style.outline = "2px solid blue"; // Highlight the nearest element
        nearestElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    };

    document.addEventListener("mousemove", snapToNearest);

    return () => {
      document.removeEventListener("mousemove", snapToNearest);
    };
  }, []);
};

export default useSnapToNearest;
